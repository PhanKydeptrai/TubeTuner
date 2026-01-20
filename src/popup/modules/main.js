// Main Module
// Initialization and event listeners

import { AppState } from './state.js';
import { I18nModule } from './i18n.js';
import { showNotification, showConfirmDialog } from './utils.js';
import { PresetsModule, PRESET_DEFINITIONS } from './presets.js';
import { SettingsModule } from './settings.js';
import { UIModule, SWITCH_CONFIG } from './ui.js';

// Video Sidebar sub-options that are linked to the master switch
const VIDEO_SIDEBAR_SUB_OPTIONS = [
    'livechatHidden',
    'playlistHidden',
    'recommendationHidden'
];

export function handleToggleChange(key, enabled) {
    // Send to current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url?.includes('youtube.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: key,
                enabled: enabled
            }).catch(() => { });
        }
    });

    // Sync to all YouTube tabs
    chrome.runtime.sendMessage({
        action: 'syncToAllTabs',
        toggleAction: key,
        enabled: enabled
    }).catch(() => { });
}

// Handle when Video Sidebar master switch is toggled
function handleVideoSidebarMasterToggle(enabled) {
    const updates = {
        videoSidebarHidden: enabled,
        livechatHidden: enabled,
        playlistHidden: enabled,
        recommendationHidden: enabled
    };

    chrome.storage.sync.set(updates, () => {
        // Update all sub-switches UI
        updateSubSwitchesUI(updates);

        // Send messages to content script
        if (enabled) {
            handleToggleChange('videoSidebarHidden', true);
            VIDEO_SIDEBAR_SUB_OPTIONS.forEach(key => {
                handleToggleChange(key, true);
            });
        } else {
            VIDEO_SIDEBAR_SUB_OPTIONS.forEach(key => {
                handleToggleChange(key, false);
            });
            handleToggleChange('videoSidebarHidden', false);
        }

        // Update status UI
        chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), (result) => {
            UIModule.updateStatusUI(result);
        });
    });
}

// Handle when a sub-option is toggled
function handleSubOptionToggle(key, enabled) {
    if (!enabled) {
        // If disabling any sub-option, disable Video Sidebar master
        const updates = {
            [key]: false,
            videoSidebarHidden: false
        };

        chrome.storage.sync.set(updates, () => {
            // Update master switch UI
            const masterSwitch = document.getElementById('videoSidebarSwitch');
            if (masterSwitch) {
                masterSwitch.checked = false;
            }

            handleToggleChange(key, false);
            handleToggleChange('videoSidebarHidden', false);

            // Update status UI
            chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                UIModule.updateStatusUI(result);
            });
        });
    } else {
        // Allow enabling individual sub-options without affecting master
        const storageObj = { [key]: true };
        chrome.storage.sync.set(storageObj, () => {
            handleToggleChange(key, true);

            // Update status UI
            chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                UIModule.updateStatusUI(result);
            });
        });
    }
}

// Update UI of sub-switches
function updateSubSwitchesUI(settings) {
    const switches = {
        livechatHidden: document.getElementById('livechatSwitch'),
        playlistHidden: document.getElementById('playlistSwitch'),
        recommendationHidden: document.getElementById('recommendationSwitch')
    };

    Object.entries(switches).forEach(([key, element]) => {
        if (element && settings.hasOwnProperty(key)) {
            element.checked = settings[key];
        }
    });
}

export function setupEventListeners() {
    SWITCH_CONFIG.forEach(config => {
        const switchEl = document.getElementById(config.id);
        if (!switchEl) return;

        // Store reference in AppState
        AppState.switches.set(config.key, switchEl);

        switchEl.addEventListener('change', function (e) {
            const newState = e.target.checked;

            // Handle extension enabled toggle specially
            if (config.key === 'extensionEnabled') {
                AppState.currentExtensionEnabled = newState;
                const sectionsContainer = document.getElementById('sectionsContainer');
                const disabledNotice = document.getElementById('disabledNotice');
                if (sectionsContainer) sectionsContainer.style.display = newState ? 'block' : 'none';
                if (disabledNotice) disabledNotice.style.display = newState ? 'none' : 'block';

                const storageObj = { [config.key]: newState };
                chrome.storage.sync.set(storageObj);
                handleToggleChange(config.key, newState);

                chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                    UIModule.updateStatusUI(result);
                });
                return;
            }

            // Handle Video Sidebar master switch with special logic
            if (config.key === 'videoSidebarHidden') {
                handleVideoSidebarMasterToggle(newState);
                return;
            }

            // Handle sub-options with bidirectional logic
            if (VIDEO_SIDEBAR_SUB_OPTIONS.includes(config.key)) {
                handleSubOptionToggle(config.key, newState);
                return;
            }

            // Handle all other switches normally
            const storageObj = { [config.key]: newState };

            // Save to storage
            chrome.storage.sync.set(storageObj);

            // Sync to YouTube tabs
            handleToggleChange(config.key, newState);

            // Update status
            chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                UIModule.updateStatusUI(result);
            });
        });
    });

    // Setup language buttons
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    if (langVi) langVi.addEventListener('click', () => I18nModule.changeLanguage('vi'));
    if (langEn) langEn.addEventListener('click', () => I18nModule.changeLanguage('en'));

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.documentElement.classList.toggle('dark');
            chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
        });
    }
}

export function setupOptionsLink() {
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    if (openSettingsBtn) {
        openSettingsBtn.addEventListener('click', () => {
            if (chrome.runtime.openOptionsPage) {
                chrome.runtime.openOptionsPage();
            } else {
                window.open(chrome.runtime.getURL('options.html'));
            }
        });
    }
}

export function initializeApp() {
    // 1. Gather all keys we need to fetch from storage
    const switchKeys = SWITCH_CONFIG.map(c => c.key);
    const allKeys = [
        ...switchKeys,
        'sectionStates',
        'theme',
        'language',
        'extensionEnabled' // key is redundant with switchKeys but clearer
    ];

    // 2. Fetch all data in one go
    chrome.storage.sync.get(allKeys, (result) => {
        // 3. Initialize core visual settings first (Theme & Language)
        UIModule.initializeTheme(result.theme);
        I18nModule.initializeLanguage(result.language);

        // 4. Initialize Layout (Collapsible Sections)
        UIModule.initializeCollapsibleSections(result.sectionStates);

        // 5. Apply state settings (Switches & UI Visibility)
        AppState.currentExtensionEnabled = result.extensionEnabled !== false;

        // Update UI with the fetched result
        UIModule.updateUI(result);

        // 6. Setup event listeners
        AppState.statusElement = document.getElementById('status');
        setupEventListeners();
        setupOptionsLink();

        // 7. Finally, reveal the app content immediately after UI is ready
        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';

        // Re-enable transitions after initial render is complete (for user interactions only)
        setTimeout(() => {
            document.body.classList.remove('no-transitions');
        }, 50);
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);
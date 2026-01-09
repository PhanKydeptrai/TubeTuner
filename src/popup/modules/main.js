// Main Module
// Initialization and event listeners

import { AppState } from './state.js';
import { I18nModule } from './i18n.js';
import { showNotification, showConfirmDialog } from './utils.js';
import { PresetsModule, PRESET_DEFINITIONS } from './presets.js';
import { SettingsModule } from './settings.js';
import { UIModule, SWITCH_CONFIG } from './ui.js';

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

export function setupEventListeners() {
    SWITCH_CONFIG.forEach(config => {
        const switchEl = document.getElementById(config.id);
        if (!switchEl) return;

        // Store reference in AppState
        AppState.switches.set(config.key, switchEl);

        switchEl.addEventListener('change', function (e) {
            const newState = e.target.checked;
            const storageObj = { [config.key]: newState };

            // Save to storage
            chrome.storage.sync.set(storageObj);

            // Handle extension enabled toggle specially
            if (config.key === 'extensionEnabled') {
                AppState.currentExtensionEnabled = newState;
                const sectionsContainer = document.getElementById('sectionsContainer');
                const disabledNotice = document.getElementById('disabledNotice');
                if (sectionsContainer) sectionsContainer.style.display = newState ? 'block' : 'none';
                if (disabledNotice) disabledNotice.style.display = newState ? 'none' : 'block';
            }

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
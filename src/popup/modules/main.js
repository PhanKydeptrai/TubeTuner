
import { AppState } from './state.js';
import { I18nModule } from './i18n.js';
import { UIModule, SWITCH_CONFIG } from './ui.js';


const VIDEO_SIDEBAR_SUB_OPTIONS = [
    'livechatHidden',
    'playlistHidden',
    'recommendationHidden'
];

export function handleToggleChange(key, enabled) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url?.includes('youtube.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: key,
                enabled: enabled
            }).catch(() => { });
        }
    });

    chrome.runtime.sendMessage({
        action: 'syncToAllTabs',
        toggleAction: key,
        enabled: enabled
    }).catch(() => { });
}

function handleVideoSidebarMasterToggle(enabled) {
    const updates = {
        videoSidebarHidden: enabled,
        livechatHidden: enabled,
        playlistHidden: enabled,
        recommendationHidden: enabled
    };

    chrome.storage.local.set(updates, () => {
        updateSubSwitchesUI(updates);

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

        chrome.storage.local.get(SWITCH_CONFIG.map(c => c.key), (result) => {
            UIModule.updateStatusUI(result);
        });
    });
}

function handleSubOptionToggle(key, enabled) {
    if (!enabled) {
        const updates = {
            [key]: false,
            videoSidebarHidden: false
        };

        chrome.storage.local.set(updates, () => {
            const masterSwitch = document.getElementById('videoSidebarSwitch');
            if (masterSwitch) {
                masterSwitch.checked = false;
            }

            handleToggleChange(key, false);
            handleToggleChange('videoSidebarHidden', false);

            // Update status UI
            chrome.storage.local.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                UIModule.updateStatusUI(result);
            });
        });
    } else {
        const storageObj = { [key]: true };
        chrome.storage.local.set(storageObj, () => {
            handleToggleChange(key, true);

            // Check if all 3 sub-options are now enabled => auto-enable master toggle
            chrome.storage.local.get(VIDEO_SIDEBAR_SUB_OPTIONS, (result) => {
                const allEnabled = VIDEO_SIDEBAR_SUB_OPTIONS.every(k => result[k] === true);
                if (allEnabled) {
                    chrome.storage.local.set({ videoSidebarHidden: true }, () => {
                        const masterSwitch = document.getElementById('videoSidebarSwitch');
                        if (masterSwitch) {
                            masterSwitch.checked = true;
                        }
                        handleToggleChange('videoSidebarHidden', true);

                        chrome.storage.local.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                            UIModule.updateStatusUI(result);
                        });
                    });
                } else {
                    chrome.storage.local.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                        UIModule.updateStatusUI(result);
                    });
                }
            });
        });
    }
}

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
        const switchEl = AppState.switches.get(config.key) || document.getElementById(config.id);
        if (!switchEl) return;

        if (!AppState.switches.has(config.key)) {
            AppState.switches.set(config.key, switchEl);
        }

        switchEl.addEventListener('change', function (e) {
            const newState = e.target.checked;

            if (config.key === 'extensionEnabled') {
                AppState.currentExtensionEnabled = newState;
                const sectionsContainer = document.getElementById('sectionsContainer');
                const disabledNotice = document.getElementById('disabledNotice');
                if (sectionsContainer) sectionsContainer.style.display = newState ? 'block' : 'none';
                if (disabledNotice) disabledNotice.style.display = newState ? 'none' : 'block';

                const storageObj = { [config.key]: newState };
                chrome.storage.local.set(storageObj);
                handleToggleChange(config.key, newState);

                chrome.storage.local.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                    UIModule.updateStatusUI(result);
                });
                return;
            }

            if (config.key === 'videoSidebarHidden') {
                handleVideoSidebarMasterToggle(newState);
                return;
            }

            if (VIDEO_SIDEBAR_SUB_OPTIONS.includes(config.key)) {
                handleSubOptionToggle(config.key, newState);
                return;
            }

            const storageObj = { [config.key]: newState };
            chrome.storage.local.set(storageObj);

            handleToggleChange(config.key, newState);


            chrome.storage.local.get(SWITCH_CONFIG.map(c => c.key), (result) => {
                UIModule.updateStatusUI(result);
            });
        });
    });
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    if (langVi) langVi.addEventListener('click', () => I18nModule.changeLanguage('vi'));
    if (langEn) langEn.addEventListener('click', () => I18nModule.changeLanguage('en'));

    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.documentElement.classList.toggle('dark');
            chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
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
    const switchKeys = SWITCH_CONFIG.map(c => c.key);
    const allKeys = [
        ...switchKeys,
        'sectionStates',
        'theme',
        'language',
        'extensionEnabled'
    ];

    chrome.storage.local.get(allKeys, (result) => {
        UIModule.initializeTheme(result.theme);
        I18nModule.initializeLanguage(result.language);

        UIModule.initializeCollapsibleSections(result.sectionStates);

        AppState.currentExtensionEnabled = result.extensionEnabled !== false;

        AppState.statusElement = document.getElementById('status');
        SWITCH_CONFIG.forEach(config => {
            const switchEl = document.getElementById(config.id);
            if (switchEl) {
                AppState.switches.set(config.key, switchEl);
            }
        });

        UIModule.updateUI(result);

        setupEventListeners();
        setupOptionsLink();

        document.body.style.visibility = 'visible';
        document.body.style.opacity = '1';

        setTimeout(() => {
            document.body.classList.remove('no-transitions');
        }, 50);
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);
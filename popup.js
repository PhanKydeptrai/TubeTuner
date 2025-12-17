
const PRESET_DEFINITIONS = {
    none: {
        progressBarHidden: false,
        durationHidden: false,
        shortsHidden: false,
        homeFeedHidden: false,
        videoSidebarHidden: false,
        commentsHidden: false,
        notificationsBellHidden: false,
        topHeaderHidden: false,
        exploreSectionHidden: false,
        endScreenCardsHidden: false,
        moreFromYouTubeHidden: false,
        hideChannelHidden: false,
        buttonsBarHidden: false,
        hideDescriptionHidden: false,
        grayscaleEnabled: false,
        shopHidden: false
    },
    balanced: {
        progressBarHidden: false,
        durationHidden: false,
        shortsHidden: true,
        homeFeedHidden: false,
        videoSidebarHidden: false,
        commentsHidden: false,
        notificationsBellHidden: false,
        topHeaderHidden: false,
        exploreSectionHidden: false,
        endScreenCardsHidden: false,
        moreFromYouTubeHidden: false,
        hideChannelHidden: false,
        buttonsBarHidden: false,
        hideDescriptionHidden: false,
        grayscaleEnabled: false,
        shopHidden: true
    },
    focus: {
        progressBarHidden: true,
        durationHidden: true,
        shortsHidden: true,
        homeFeedHidden: true,
        videoSidebarHidden: true,
        commentsHidden: true,
        notificationsBellHidden: true,
        topHeaderHidden: true,
        exploreSectionHidden: true,
        endScreenCardsHidden: true,
        moreFromYouTubeHidden: true,
        hideChannelHidden: true,
        buttonsBarHidden: true,
        hideDescriptionHidden: true,
        grayscaleEnabled: true,
        shopHidden: true
    }
};

const SWITCH_CONFIG = [
    { id: 'extensionEnabledSwitch', key: 'extensionEnabled', default: true, i18nKey: 'extensionEnabled' },
    { id: 'progressSwitch', key: 'progressBarHidden', default: false, i18nKey: 'hideProgressBar' },
    { id: 'durationSwitch', key: 'durationHidden', default: false, i18nKey: 'hideDuration' },
    { id: 'shortsSwitch', key: 'shortsHidden', default: false, i18nKey: 'hideShorts' },
    { id: 'homeFeedSwitch', key: 'homeFeedHidden', default: false, i18nKey: 'hideHomeFeed' },
    { id: 'videoSidebarSwitch', key: 'videoSidebarHidden', default: false, i18nKey: 'hideVideoSidebar' },
    { id: 'commentsSwitch', key: 'commentsHidden', default: false, i18nKey: 'hideComments' },
    { id: 'notificationsBellSwitch', key: 'notificationsBellHidden', default: false, i18nKey: 'hideNotificationsBell' },
    { id: 'topHeaderSwitch', key: 'topHeaderHidden', default: false, i18nKey: 'hideTopHeader' },
    { id: 'exploreSectionSwitch', key: 'exploreSectionHidden', default: false, i18nKey: 'hideExploreSection' },
    { id: 'endScreenCardsSwitch', key: 'endScreenCardsHidden', default: false, i18nKey: 'hideEndScreenCards' },
    { id: 'moreFromYouTubeSwitch', key: 'moreFromYouTubeHidden', default: false, i18nKey: 'hideMoreFromYouTube' },
    { id: 'hideChannelSwitch', key: 'hideChannelHidden', default: false, i18nKey: 'hideChannel' },
    { id: 'buttonsBarSwitch', key: 'buttonsBarHidden', default: false, i18nKey: 'hideButtonsBar' },
    { id: 'hideDescriptionSwitch', key: 'hideDescriptionHidden', default: false, i18nKey: 'hideDescription' },
    { id: 'grayscaleSwitch', key: 'grayscaleEnabled', default: false, i18nKey: 'grayscale' },
    { id: 'shopSwitch', key: 'shopHidden', default: false, i18nKey: 'hideShop' }
];



const AppState = {
    currentLang: 'en',
    currentExtensionEnabled: true,
    switches: new Map(),
    statusElement: null
};


function t(key) {
    return TRANSLATIONS[AppState.currentLang][key] || `[${key}]`;
}

function changeLanguage(lang) {
    try {
        setLanguage(lang, true);
    } catch (e) {
        console.error('Error changing language:', e);
    }
}


function setLanguage(lang, save = true) {
    AppState.currentLang = lang;

    // Remove active class from all language buttons
    document.querySelectorAll('.ext-lang-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to selected language button
    const langBtn = document.getElementById(`lang-${lang}`);
    if (langBtn) langBtn.classList.add('active');

    // Update all UI elements based on language
    updateLanguageUI();

    if (save) {
        chrome.storage.sync.set({ language: lang });
    }
}


function verifyToggleStates() {
    const keys = Array.from(AppState.switches.keys());
    chrome.storage.sync.get(keys, function(result) {
        const mismatches = [];
        keys.forEach(key => {
            const switchEl = AppState.switches.get(key);
            if (switchEl && result[key] !== switchEl.checked) {
                mismatches.push(`${key}: stored=${result[key]}, UI=${switchEl.checked}`);
            }
        });
        if (mismatches.length > 0) {
            console.warn('⚠️ Toggle state mismatches:', mismatches);
        }
    });
}

window.verifyToggleStates = verifyToggleStates;



function updateUI(settings) {
    const {
        extensionEnabled = AppState.currentExtensionEnabled,
        progressBarHidden = false,
        durationHidden = false,
        shortsHidden = false,
        homeFeedHidden = false,
        videoSidebarHidden = false,
        commentsHidden = false,
        notificationsBellHidden = false,
        topHeaderHidden = false,
        exploreSectionHidden = false,
        endScreenCardsHidden = false,
        moreFromYouTubeHidden = false,
        hideChannelHidden = false,
        buttonsBarHidden = false,
        hideDescriptionHidden = false,
        grayscaleEnabled = false,
        shopHidden = false
    } = settings;

    // Update extension enabled state
    AppState.currentExtensionEnabled = extensionEnabled;
    const extensionSwitch = AppState.switches.get('extensionEnabled');
    if (extensionSwitch) {
        extensionSwitch.checked = extensionEnabled;
    }

    // Show/hide sections based on extension state
    const sectionsContainer = document.getElementById('sectionsContainer');
    const disabledNotice = document.getElementById('disabledNotice');
    if (sectionsContainer) {
        sectionsContainer.style.display = extensionEnabled ? 'block' : 'none';
    }
    if (disabledNotice) {
        disabledNotice.style.display = extensionEnabled ? 'none' : 'block';
    }

    if (!extensionEnabled) {
        return;
    }

    // Update all switches
    const switchStates = {
        progressBarHidden,
        durationHidden,
        shortsHidden,
        homeFeedHidden,
        videoSidebarHidden,
        commentsHidden,
        notificationsBellHidden,
        topHeaderHidden,
        exploreSectionHidden,
        endScreenCardsHidden,
        moreFromYouTubeHidden,
        hideChannelHidden,
        buttonsBarHidden,
        hideDescriptionHidden,
        grayscaleEnabled,
        shopHidden
    };

    SWITCH_CONFIG.forEach(config => {
        const switchEl = AppState.switches.get(config.key);
        if (switchEl && switchStates.hasOwnProperty(config.key)) {
            switchEl.checked = switchStates[config.key];
        }
    });

    // Verify state after update
    setTimeout(() => {
        SWITCH_CONFIG.forEach(config => {
            const switchEl = AppState.switches.get(config.key);
            if (switchEl && switchStates.hasOwnProperty(config.key) && switchEl.checked !== switchStates[config.key]) {
                switchEl.checked = switchStates[config.key];
            }
        });
    }, 50);

    // Update status UI
    updateStatusUI(switchStates);
}

/**
 * Update status message based on current settings
 */
function updateStatusUI(settings) {
    if (!AppState.statusElement) return;

    const enabledFeatures = [];

    if (settings.progressBarHidden) enabledFeatures.push(t('progressBar'));
    if (settings.durationHidden) enabledFeatures.push(t('duration'));
    if (settings.shortsHidden) enabledFeatures.push(t('shorts'));
    if (settings.homeFeedHidden) enabledFeatures.push(t('homeFeed'));
    if (settings.videoSidebarHidden) enabledFeatures.push(t('videoSidebar'));
    if (settings.commentsHidden) enabledFeatures.push('comments');
    if (settings.notificationsBellHidden) enabledFeatures.push(t('notificationsBell'));
    if (settings.topHeaderHidden) enabledFeatures.push(t('topHeader'));
    if (settings.exploreSectionHidden) enabledFeatures.push(t('exploreSection'));
    if (settings.shopHidden) enabledFeatures.push(t('shop'));

    const statusBadge = AppState.statusElement.querySelector('ui-badge') || document.createElement('ui-badge');
    statusBadge.setAttribute('variant', enabledFeatures.length > 0 ? 'success' : 'warning');

    if (enabledFeatures.length > 0) {
        statusBadge.textContent = `${t('hidingFeatures')}: ${enabledFeatures.join(', ')}`;
        AppState.statusElement.className = 'status enabled';
    } else {
        statusBadge.textContent = t('allDisabled');
        AppState.statusElement.className = 'status disabled';
    }

    if (!AppState.statusElement.contains(statusBadge)) {
        AppState.statusElement.innerHTML = '';
        AppState.statusElement.appendChild(statusBadge);
    }
}

const UI_ELEMENTS = {
    title: { selector: '.ext-title', key: 'title' },
    subtitle: { selector: '.ext-subtitle', key: 'subtitle' },
    disabledNoticeTitle: { selector: '.ext-disabled-notice .ext-notice-title', key: 'extensionDisabledTitle' },
    disabledNoticeDesc: { selector: '.ext-disabled-notice .ext-notice-description', key: 'extensionDisabledDesc' },
    settingsTitle: { selector: '.ext-settings-title', key: 'settingsManagement' },
    presetsLabel: { selector: '.ext-presets-label', key: 'presetsLabel' },
    presetNameInput: { selector: '#presetNameInput', key: 'presetNamePlaceholder', attr: 'placeholder' },
};

const BUTTON_ELEMENTS = {
    exportSettingsBtn: 'exportSettings',
    importSettingsBtn: 'importSettings',
    applyPresetBtn: 'applyPreset',
    savePresetBtn: 'savePreset',
    deletePresetBtn: 'deletePreset',
    importPresetsBtn: 'importPresets',
    exportPresetsBtn: 'exportPresets',
};

const PRESET_OPTIONS = {
    'builtin:none': 'presetNone',
    'builtin:balanced': 'presetBalanced',
    'builtin:focus': 'presetFocus',
};


function updateLanguageUI() {
    // Update static UI elements
    Object.entries(UI_ELEMENTS).forEach(([key, config]) => {
        const element = document.querySelector(config.selector);
        if (element) {
            if (config.attr === 'placeholder') {
                element.placeholder = t(config.key);
            } else {
                element.textContent = t(config.key);
            }
        }
    });

    // Update button texts
    Object.entries(BUTTON_ELEMENTS).forEach(([buttonId, translationKey]) => {
        const button = document.getElementById(buttonId);
        if (button) {
            const span = button.querySelector('span') || button;
            if (span.querySelector('svg')) {
                // If button has SVG (loading state), preserve it and update only text
                const textSpan = button.querySelector('span:not(.animate-spin)') || span;
                textSpan.textContent = t(translationKey);
            } else {
                span.textContent = t(translationKey);
            }
        }
    });

    // Update section titles dynamically
    const sectionTitles = document.querySelectorAll('.ext-section-title');
    const titleKeys = ['aboutTitle', 'contentFeedControlsTitle', 'interfaceElementsTitle', 'videoControlsTitle'];
    sectionTitles.forEach((el, idx) => {
        if (titleKeys[idx]) el.textContent = t(titleKeys[idx]);
    });

    // Update About section content
    const aboutDescription = document.getElementById('aboutDescription');
    if (aboutDescription) aboutDescription.textContent = t('aboutDescription');

    const aboutFeaturesTitle = document.getElementById('aboutFeaturesTitle');
    if (aboutFeaturesTitle) aboutFeaturesTitle.textContent = t('aboutFeaturesTitle');

    const aboutFeatures = [1, 2, 3, 4, 5];
    aboutFeatures.forEach(num => {
        const featureEl = document.getElementById(`aboutFeature${num}`);
        if (featureEl) {
            featureEl.textContent = t(`aboutFeature${num}`);
        }
    });

    const githubLink = document.getElementById('aboutGithubLinkText');
    if (githubLink) githubLink.textContent = t('aboutGithubLink');

    // Update switch labels using SWITCH_CONFIG
    SWITCH_CONFIG.forEach(config => {
        const switchEl = document.getElementById(config.id);
        if (switchEl) {
            const label = switchEl.closest('.ext-control-item')?.querySelector('.ext-control-label');
            if (label) label.textContent = t(config.i18nKey);
        }
    });

    // Update preset select options
    const presetSelect = document.getElementById('presetSelect');
    if (presetSelect) {
        const builtInGroup = presetSelect.querySelector('optgroup[label]');
        if (builtInGroup) builtInGroup.label = t('builtInGroup');

        presetSelect.querySelectorAll('option').forEach(option => {
            const key = option.value || option.textContent;
            if (PRESET_OPTIONS[key]) {
                option.textContent = t(PRESET_OPTIONS[key]);
            }
        });

        const optgroups = presetSelect.querySelectorAll('optgroup');
        if (optgroups[0]) optgroups[0].label = t('builtInGroup');
        if (optgroups[1]) optgroups[1].label = t('customGroup');
    }
}


function setupEventListeners() {
    SWITCH_CONFIG.forEach(config => {
        const switchEl = document.getElementById(config.id);
        if (!switchEl) return;

        // Store reference in AppState
        AppState.switches.set(config.key, switchEl);

        switchEl.addEventListener('change', function(e) {
            const newState = e.target.checked;
            const storageObj = { [config.key]: newState };

            // Save to storage
            chrome.storage.sync.set(storageObj);

            if (config.key !== 'extensionEnabled') {
                chrome.storage.sync.set({ currentPreset: 'builtin:none' });
            }

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
            chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), function(result) {
                updateStatusUI(result);
            });
        });
    });

    // Setup language buttons
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    if (langVi) langVi.addEventListener('click', () => changeLanguage('vi'));
    if (langEn) langEn.addEventListener('click', () => changeLanguage('en'));

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark');
            chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
        });
    }
}

/**
 * Handle toggle changes and sync to YouTube tabs
 */
function handleToggleChange(key, enabled) {
    // Send to current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]?.url?.includes('youtube.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: key,
                enabled: enabled
            }).catch(() => {});
        }
    });

    // Sync to all YouTube tabs
    chrome.runtime.sendMessage({
        action: 'syncToAllTabs',
        toggleAction: key,
        enabled: enabled
    }).catch(() => {});
}


function initializeTheme() {
    chrome.storage.sync.get('theme', function(data) {
        const savedTheme = data.theme || 'auto';

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    });
}

/**
 * Initialize language from storage
 */
function initializeLanguage() {
    chrome.storage.sync.get('language', function(data) {
        const savedLanguage = data.language || 'en';
        setLanguage(savedLanguage, false);
    });
}

/**
 * Initialize collapsible sections
 */
function initializeCollapsibleSections() {
    const sections = document.querySelectorAll('.ext-collapsible-section');

    chrome.storage.sync.get('sectionStates', function(result) {
        const savedStates = result.sectionStates || {};

        sections.forEach(section => {
            const titleElement = section.querySelector('.ext-section-title');
            if (!titleElement) return;

            const sectionId = titleElement.textContent.trim().toLowerCase()
                .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            section.setAttribute('data-section-id', sectionId);

            const header = section.querySelector('.ext-section-header');
            if (!header) return;

            const isOpen = savedStates[sectionId] !== undefined ? savedStates[sectionId] : (sectionId === 'content-feed-controls');

            section.classList.add('no-animation');
            if (isOpen) section.classList.add('open');

            setTimeout(() => section.classList.remove('no-animation'), 100);

            header.addEventListener('click', () => {
                const wasOpen = section.classList.contains('open');
                section.classList.toggle('open');
                saveSectionState(sectionId, !wasOpen);
            });
        });
    });
}

function saveSectionState(sectionId, isOpen) {
    chrome.storage.sync.get('sectionStates', function(result) {
        const sectionStates = result.sectionStates || {};
        sectionStates[sectionId] = isOpen;
        chrome.storage.sync.set({ sectionStates });
    });
}



const VALID_SETTING_KEYS = [
    'extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden',
    'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden',
    'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden',
    'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled',
    'shopHidden', 'language', 'theme'
];


function exportSettings() {
    const exportBtn = document.getElementById('exportSettingsBtn');
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${t('exporting')}</span>`;
    exportBtn.disabled = true;

    chrome.storage.sync.get(VALID_SETTING_KEYS, function(result) {
        const settingsToExport = {};
        let count = 0;

        VALID_SETTING_KEYS.forEach(key => {
            if (result.hasOwnProperty(key)) {
                settingsToExport[key] = result[key];
                count++;
            }
        });

        if (count === 0) {
            showNotification(t('noSettingsToExport'), 'info');
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            return;
        }

        const settingsExport = {
            metadata: {
                exportDate: new Date().toISOString(),
                extensionName: 'TubeTuner',
                extensionVersion: '1.2',
                formatVersion: '1.0',
                settingsCount: count
            },
            settings: settingsToExport
        };

        const blob = new Blob([JSON.stringify(settingsExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const a = document.createElement('a');
        a.href = url;
        a.download = `TubeTuner-settings-${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification(t('exportSuccess'), 'success');

        setTimeout(() => {
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }, 1000);
    });
}


function importSettings(file) {
    const importBtn = document.getElementById('importSettingsBtn');
    const originalText = importBtn.innerHTML;
    importBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${t('importing')}</span>`;
    importBtn.disabled = true;

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);

            if (!importedData || typeof importedData !== 'object') {
                throw new Error('Invalid file format');
            }

            if (!importedData.metadata || !importedData.settings) {
                throw new Error('File missing metadata or settings');
            }

            if (importedData.metadata.extensionName && importedData.metadata.extensionName !== 'TubeTuner') {
                throw new Error('File is not from TubeTuner');
            }

            const settings = importedData.settings;
            const settingsToImport = {};
            let validCount = 0;

            VALID_SETTING_KEYS.forEach(key => {
                if (settings.hasOwnProperty(key)) {
                    const value = settings[key];
                    const expectedType = typeof value;
                    if (expectedType === 'boolean' || expectedType === 'string') {
                        settingsToImport[key] = value;
                        validCount++;
                    }
                }
            });

            if (validCount === 0) {
                throw new Error('No valid settings found in file');
            }

            chrome.storage.sync.set(settingsToImport, function() {
                showNotification(t('importSuccess'), 'success');
                chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
                    tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                });
                setTimeout(() => window.location.reload(), 1500);
            });

        } catch (error) {
            showNotification(error.message || t('importError'), 'error');
            importBtn.innerHTML = originalText;
            importBtn.disabled = false;
        }
    };

    reader.onerror = () => {
        showNotification(t('importError'), 'error');
        importBtn.innerHTML = originalText;
        importBtn.disabled = false;
    };

    reader.readAsText(file);
}


function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.ext-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `ext-notification ext-notification-${type}`;
    notification.textContent = message;

    const container = document.querySelector('.ext-container');
    if (container) {
        container.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 3000);
    }
}


function loadPresetOptions() {
    const presetSelect = document.getElementById('presetSelect');
    if (!presetSelect) return;

    chrome.storage.sync.get(['customPresets', 'currentPreset'], function(result) {
        const customs = result.customPresets || {};
        const currentPreset = result.currentPreset || 'builtin:none';

        while (presetSelect.firstChild) presetSelect.removeChild(presetSelect.firstChild);

        const optgroupBuilt = document.createElement('optgroup');
        optgroupBuilt.label = t('builtInGroup');
        Object.keys(PRESET_DEFINITIONS).forEach(key => {
            const opt = document.createElement('option');
            opt.value = `builtin:${key}`;
            opt.textContent = t(`preset${key.charAt(0).toUpperCase() + key.slice(1)}`);
            optgroupBuilt.appendChild(opt);
        });
        presetSelect.appendChild(optgroupBuilt);

        const customNames = Object.keys(customs);
        if (customNames.length > 0) {
            const optgroupCustom = document.createElement('optgroup');
            optgroupCustom.label = t('customGroup');
            customNames.forEach(name => {
                const opt = document.createElement('option');
                opt.value = `custom:${name}`;
                opt.textContent = name;
                optgroupCustom.appendChild(opt);
            });
            presetSelect.appendChild(optgroupCustom);
        }

        // Set the currently selected preset
        presetSelect.value = currentPreset;

        try {
            updateLanguageUI();
        } catch (e) {}
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize core settings
    initializeTheme();
    initializeLanguage();
    initializeCollapsibleSections();

    // Cache status element
    AppState.statusElement = document.getElementById('status');

    // Setup all event listeners
    setupEventListeners();

    // Load initial settings
    const allKeys = SWITCH_CONFIG.map(c => c.key).concat(['sectionStates']);
    chrome.storage.sync.get(allKeys, function(result) {
        AppState.currentExtensionEnabled = result.extensionEnabled !== false;
        updateUI(result);
    });

    // Setup export/import
    const exportBtn = document.getElementById('exportSettingsBtn');
    const importBtn = document.getElementById('importSettingsBtn');
    const importFileInput = document.getElementById('importFileInput');

    if (exportBtn) {
        exportBtn.addEventListener('click', exportSettings);
    }

    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', () => importFileInput.click());

        importFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.name.toLowerCase().endsWith('.json')) {
                    showNotification(t('invalidFileType'), 'error');
                    e.target.value = '';
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    showNotification(t('fileTooLarge'), 'error');
                    e.target.value = '';
                    return;
                }

                if (confirm(t('confirmImport'))) {
                    importSettings(file);
                }
                e.target.value = '';
            }
        });
    }

    // Setup preset management
    const presetSelect = document.getElementById('presetSelect');
    const applyPresetBtn = document.getElementById('applyPresetBtn');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const deletePresetBtn = document.getElementById('deletePresetBtn');
    const importPresetsBtn = document.getElementById('importPresetsBtn');
    const importPresetsFileInput = document.getElementById('importPresetsFileInput');
    const exportPresetsBtn = document.getElementById('exportPresetsBtn');
    const presetNameInput = document.getElementById('presetNameInput');

    if (presetSelect) loadPresetOptions();

    if (applyPresetBtn && presetSelect) {
        applyPresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected) return;

            if (!confirm(t('confirmApplyPreset'))) return;

            let settings = null;

            if (selected.startsWith('builtin:')) {
                const key = selected.split(':')[1];
                if (PRESET_DEFINITIONS[key]) {
                    settings = Object.assign({}, PRESET_DEFINITIONS[key], { extensionEnabled: true });
                    chrome.storage.sync.set({ currentPreset: selected }, function() {});
                }
            } else if (selected.startsWith('custom:')) {
                const name = selected.split(':')[1];
                chrome.storage.sync.get(['customPresets'], function(result) {
                    const customs = result.customPresets || {};
                    if (customs[name]) {
                        const customSettings = Object.assign({}, customs[name], { extensionEnabled: true });
                        chrome.storage.sync.set(Object.assign({}, customSettings, { currentPreset: selected }), function() {
                            showNotification(t('presetApplied'), 'success');
                            updateUI(customSettings);
                            chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
                                tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                            });
                        });
                    }
                });
                return;
            }

            if (settings) {
                chrome.storage.sync.set(settings, function() {
                    showNotification(t('presetApplied'), 'success');
                    updateUI(settings);
                    chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
                        tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                    });
                });
            }
        });
    }

    if (savePresetBtn) {
        savePresetBtn.addEventListener('click', function() {
            const name = presetNameInput?.value?.trim();
            if (!name) {
                showNotification(t('presetNameEmpty'), 'error');
                return;
            }

            const preset = {};
            SWITCH_CONFIG.forEach(config => {
                const switchEl = AppState.switches.get(config.key);
                if (switchEl) {
                    preset[config.key] = switchEl.checked;
                }
            });

            chrome.storage.sync.get(['customPresets'], function(result) {
                const customs = result.customPresets || {};
                customs[name] = preset;
                chrome.storage.sync.set({ customPresets: customs }, function() {
                    showNotification(t('presetSaved'), 'success');
                    presetNameInput.value = '';
                    loadPresetOptions();
                });
            });
        });
    }

    if (deletePresetBtn) {
        deletePresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected || !selected.startsWith('custom:')) {
                showNotification(t('selectCustomPresetToDelete'), 'error');
                return;
            }
            const name = selected.split(':')[1];
            if (!confirm(`${t('deletePresetConfirmation')} "${name}"?`)) return;

            chrome.storage.sync.get(['customPresets'], function(result) {
                const customs = result.customPresets || {};
                if (customs[name]) delete customs[name];
                chrome.storage.sync.set({ customPresets: customs }, function() {
                    showNotification(t('presetDeleted'), 'success');
                    // Reset to 'none' preset if the deleted preset was selected
                    chrome.storage.sync.set({ currentPreset: 'builtin:none' });
                    loadPresetOptions();
                });
            });
        });
    }

    if (importPresetsBtn && importPresetsFileInput) {
        importPresetsBtn.addEventListener('click', () => importPresetsFileInput.click());

        importPresetsFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith('.json')) {
                showNotification(t('invalidFileType'), 'error');
                e.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const data = JSON.parse(evt.target.result);
                    let toMerge = {};

                    if (Array.isArray(data)) {
                        data.forEach(item => {
                            if (item && item.name && item.preset) toMerge[item.name] = item.preset;
                        });
                    } else if (typeof data === 'object') {
                        toMerge = data;
                    } else {
                        throw new Error('Invalid format');
                    }

                    chrome.storage.sync.get(['customPresets'], function(result) {
                        const customs = result.customPresets || {};
                        Object.assign(customs, toMerge);
                        chrome.storage.sync.set({ customPresets: customs }, function() {
                            showNotification(t('presetsImported'), 'success');
                            loadPresetOptions();
                        });
                    });
                } catch (err) {
                    showNotification(t('importError'), 'error');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });
    }

    if (exportPresetsBtn) {
        exportPresetsBtn.addEventListener('click', function() {
            chrome.storage.sync.get(['customPresets'], function(result) {
                const customs = result.customPresets || {};
                const blob = new Blob([JSON.stringify(customs, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'tubetuner-presets.json';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            });
        });
    }
});

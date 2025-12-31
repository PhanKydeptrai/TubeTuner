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

export function setupEventListeners() {
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
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark');
            chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
        });
    }
}

export function setupSettingsEventListeners() {
    const exportBtn = document.getElementById('exportSettingsBtn');
    const importBtn = document.getElementById('importSettingsBtn');
    const importFileInput = document.getElementById('importFileInput');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => SettingsModule.exportSettings());
    }

    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', () => importFileInput.click());

        importFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.name.toLowerCase().endsWith('.json')) {
                    showNotification(I18nModule.t('invalidFileType'), 'error');
                    e.target.value = '';
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    showNotification(I18nModule.t('fileTooLarge'), 'error');
                    e.target.value = '';
                    return;
                }

                showConfirmDialog(I18nModule.t('confirmImport'), () => {
                    SettingsModule.importSettings(file);
                    e.target.value = '';
                });
            }
        });
    }
}

export function setupPresetEventListeners() {
    const presetSelect = document.getElementById('presetSelect');
    const applyPresetBtn = document.getElementById('applyPresetBtn');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const deletePresetBtn = document.getElementById('deletePresetBtn');
    const importPresetsBtn = document.getElementById('importPresetsBtn');
    const importPresetsFileInput = document.getElementById('importPresetsFileInput');
    const exportPresetsBtn = document.getElementById('exportPresetsBtn');
    const presetNameInput = document.getElementById('presetNameInput');

    if (presetSelect) PresetsModule.loadPresetOptions();

    if (applyPresetBtn && presetSelect) {
        applyPresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected) return;

            showNotification(I18nModule.t('applyingPreset'), 'info');
            const selectedOption = presetSelect.options[presetSelect.selectedIndex];
            const displayText = selectedOption.text;
            const confirmMessage = `${I18nModule.t('confirmApplyPreset')} "${displayText}"?`;

            showConfirmDialog(confirmMessage, () => {
                PresetsModule.applyPreset(selected);
            });
        });
    }

    if (savePresetBtn) {
        savePresetBtn.addEventListener('click', function() {
            const name = presetNameInput?.value?.trim();
            if (!name) {
                showNotification(I18nModule.t('presetNameRequired'), 'error');
                return;
            }

            // Check if name conflicts with built-in presets
            if (PRESET_DEFINITIONS && PRESET_DEFINITIONS[name]) {
                showNotification(I18nModule.t('presetNameReserved'), 'error');
                return;
            }

            const preset = {};
            SWITCH_CONFIG.forEach(config => {
                const switchEl = AppState.switches.get(config.key);
                if (switchEl) {
                    preset[config.key] = switchEl.checked;
                }
            });

            // Check if custom preset already exists
            chrome.storage.sync.get(['customPresets'], (result) => {
                const customs = result.customPresets || {};
                if (customs[name]) {
                    showConfirmDialog(I18nModule.t('confirmOverwritePreset').replace('%s', name), () => {
                        PresetsModule.savePreset(name, preset);
                        presetNameInput.value = '';
                    });
                } else {
                    PresetsModule.savePreset(name, preset);
                    presetNameInput.value = '';
                }
            });
        });
    }

    if (deletePresetBtn) {
        deletePresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected || !selected.startsWith('custom:')) {
                showNotification(I18nModule.t('selectPresetToDelete'), 'error');
                return;
            }
            
            // Get the display text of the selected option
            const selectedOption = presetSelect.options[presetSelect.selectedIndex];
            const displayText = selectedOption.text;
            const name = selected.split(':')[1];
            const confirmMessage = `${I18nModule.t('confirmDeletePreset')} "${displayText}"?`;
            
            showConfirmDialog(confirmMessage, () => {
                PresetsModule.deletePreset(name);
            });
        });
    }

    if (importPresetsBtn && importPresetsFileInput) {
        importPresetsBtn.addEventListener('click', () => importPresetsFileInput.click());

        importPresetsFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith('.json')) {
                showNotification(I18nModule.t('invalidFileType'), 'error');
                e.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const data = JSON.parse(evt.target.result);
                    PresetsModule.importPresets(data);
                } catch (err) {
                    showNotification(I18nModule.t('importError'), 'error');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });
    }

    if (exportPresetsBtn) {
        exportPresetsBtn.addEventListener('click', () => PresetsModule.exportPresets());
    }
}

export function loadAndApplySettings() {
    // Load settings from chrome.storage.sync and apply to UI
    const allKeys = SWITCH_CONFIG.map(c => c.key).concat(['sectionStates']);
    chrome.storage.sync.get(allKeys, (result) => {
        AppState.currentExtensionEnabled = result.extensionEnabled !== false;
        UIModule.updateUI(result);
    });
}

export function initializeApp() {
    // Initialize core settings
    UIModule.initializeTheme();
    I18nModule.initializeLanguage();
    UIModule.initializeCollapsibleSections();

    // Cache status element
    AppState.statusElement = document.getElementById('status');

    // Setup all event listeners
    setupEventListeners();
    setupSettingsEventListeners();
    setupPresetEventListeners();

    // Load initial settings
    loadAndApplySettings();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

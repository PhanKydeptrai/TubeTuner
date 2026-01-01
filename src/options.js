
import { I18nModule } from './popup/modules/i18n.js';
import { SettingsModule } from './popup/modules/settings.js';
import { PresetsModule, PRESET_DEFINITIONS } from './popup/modules/presets.js';
import { UIModule, SWITCH_CONFIG } from './popup/modules/ui.js';
import { showNotification, showConfirmDialog } from './popup/modules/utils.js';

// Setup settings export/import listeners (Identical to main.js)
function setupSettingsEventListeners() {
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

// Setup preset listeners (Modified for Options Page)
function setupPresetEventListeners() {
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

            // DIFFERENT FROM POPUP: Read current settings from storage, not DOM
            const settingKeys = SWITCH_CONFIG.map(c => c.key);
            chrome.storage.sync.get(settingKeys, (result) => {
                const preset = {};
                settingKeys.forEach(key => {
                    if (result.hasOwnProperty(key)) {
                        preset[key] = result[key];
                    } else {
                         // Default to false or defined default if key missing
                         preset[key] = false; 
                    }
                });

                // Check if custom preset already exists
                chrome.storage.sync.get(['customPresets'], (presetsResult) => {
                    const customs = presetsResult.customPresets || {};
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
        });
    }

    if (deletePresetBtn) {
        deletePresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected || !selected.startsWith('custom:')) {
                showNotification(I18nModule.t('selectPresetToDelete'), 'error');
                return;
            }
            
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

function initializeOptions() {
    UIModule.initializeTheme();
    I18nModule.initializeLanguage();
    
    // Initial UI translation update
    setTimeout(() => {
        I18nModule.updateLanguageUI();
        
        // Custom updates for options page specific elements
        const settingsTitle = document.getElementById('settingsTitle');
        if (settingsTitle) settingsTitle.textContent = I18nModule.t('settingsManagement');
        
        const openSettingsTitle = document.querySelector('.options-title');
        if (openSettingsTitle) openSettingsTitle.textContent = I18nModule.t('title') + ' ' + I18nModule.t('advancedSettings');
    }, 100);

    setupSettingsEventListeners();
    setupPresetEventListeners();
}

document.addEventListener('DOMContentLoaded', initializeOptions);

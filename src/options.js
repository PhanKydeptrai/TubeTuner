
import { I18nModule } from './popup/modules/i18n.js';
import { SettingsModule } from './popup/modules/settings.js';
import { PresetsModule, PRESET_DEFINITIONS } from './popup/modules/presets.js';
import { UIModule, SWITCH_CONFIG } from './popup/modules/ui.js';
import { showNotification, showConfirmDialog } from './popup/modules/utils.js';

function setupSettingsEventListeners() {
    const exportBtn = document.getElementById('exportSettingsBtn');
    const importBtn = document.getElementById('importSettingsBtn');
    const importFileInput = document.getElementById('importFileInput');

    if (exportBtn) {
        exportBtn.addEventListener('click', () => SettingsModule.exportSettings());
    }

    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', () => importFileInput.click());

        importFileInput.addEventListener('change', function (e) {
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
        applyPresetBtn.addEventListener('click', function () {
            const selected = presetSelect.value;
            if (!selected) return;

            showNotification(I18nModule.t('applyingPreset'), 'info');
            const selectedOption = presetSelect.options[presetSelect.selectedIndex];
            const displayText = selectedOption.text;
            const confirmMessage = `${I18nModule.t('confirmApplyPreset')} "${displayText}"?`;

            showConfirmDialog(confirmMessage, () => {
                PresetsModule.applyPreset(selected);
                // After applying, reset update mode
                setUpdatePresetMode(false);
            });
        });
    }

    if (savePresetBtn) {
        savePresetBtn.addEventListener('click', function () {
            // If in "update" mode, update the currently selected custom preset directly
            if (savePresetBtn.dataset.updateMode === 'true') {
                const selected = presetSelect?.value;
                if (!selected || !selected.startsWith('custom:')) return;

                const presetName = selected.split(':')[1];
                const settingKeys = SWITCH_CONFIG.map(c => c.key);
                chrome.storage.local.get(settingKeys, (result) => {
                    const preset = {};
                    settingKeys.forEach(key => {
                        preset[key] = result.hasOwnProperty(key) ? result[key] : false;
                    });
                    PresetsModule.savePreset(presetName, preset);
                    setUpdatePresetMode(false);
                });
                return;
            }

            // Normal "save new preset" flow
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
            chrome.storage.local.get(settingKeys, (result) => {
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
                chrome.storage.local.get(['customPresets'], (presetsResult) => {
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
        deletePresetBtn.addEventListener('click', function () {
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
                setUpdatePresetMode(false);
            });
        });
    }

    if (importPresetsBtn && importPresetsFileInput) {
        importPresetsBtn.addEventListener('click', () => importPresetsFileInput.click());

        importPresetsFileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith('.json')) {
                showNotification(I18nModule.t('invalidFileType'), 'error');
                e.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function (evt) {
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

    // When user manually changes the preset select, reset update mode
    if (presetSelect) {
        presetSelect.addEventListener('change', () => {
            setUpdatePresetMode(false);
        });
    }

    // Watch for any storage changes: if a custom preset is selected and settings differ, enter update mode
    chrome.storage.onChanged.addListener((changes, area) => {
        if (area !== 'local') return;

        // Ignore changes to customPresets or non-setting keys
        const settingKeys = SWITCH_CONFIG.map(c => c.key);
        const hasSettingChange = Object.keys(changes).some(k => settingKeys.includes(k));
        if (!hasSettingChange) return;

        checkAndSetUpdateMode();
    });
}

/**
 * Checks if the current settings differ from the selected custom preset.
 * If they do, enters "update" mode; otherwise resets to "save" mode.
 */
function checkAndSetUpdateMode() {
    const presetSelect = document.getElementById('presetSelect');
    if (!presetSelect) return;

    const selected = presetSelect.value;
    if (!selected || !selected.startsWith('custom:')) {
        setUpdatePresetMode(false);
        return;
    }

    const presetName = selected.split(':')[1];
    const settingKeys = SWITCH_CONFIG.map(c => c.key);

    chrome.storage.local.get(['customPresets', ...settingKeys], (result) => {
        const customs = result.customPresets || {};
        const savedPreset = customs[presetName];
        if (!savedPreset) {
            setUpdatePresetMode(false);
            return;
        }

        // Compare current settings with saved preset
        const isDifferent = settingKeys.some(key => {
            const currentVal = result.hasOwnProperty(key) ? result[key] : false;
            const presetVal = savedPreset.hasOwnProperty(key) ? savedPreset[key] : false;
            return currentVal !== presetVal;
        });

        setUpdatePresetMode(isDifferent);
    });
}

/**
 * Switches the Save Preset button between "Save" and "Update" modes.
 */
function setUpdatePresetMode(active) {
    const savePresetBtn = document.getElementById('savePresetBtn');
    if (!savePresetBtn) return;

    if (active) {
        savePresetBtn.dataset.updateMode = 'true';
        savePresetBtn.textContent = I18nModule.t('updatePreset');
        savePresetBtn.classList.add('ext-btn-update');
    } else {
        delete savePresetBtn.dataset.updateMode;
        savePresetBtn.textContent = I18nModule.t('savePreset');
        savePresetBtn.classList.remove('ext-btn-update');
    }
}

function setupThemeEventListeners() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const isDark = document.documentElement.classList.toggle('dark');
            chrome.storage.local.set({ theme: isDark ? 'dark' : 'light' });
        });
    }
}

function initializeOptions() {
    UIModule.initializeTheme();
    I18nModule.initializeLanguage();

    setTimeout(() => {
        I18nModule.updateLanguageUI();

        const settingsTitle = document.getElementById('settingsTitle');
        if (settingsTitle) settingsTitle.textContent = I18nModule.t('settingsManagement');
    }, 100);

    setupSettingsEventListeners();
    setupPresetEventListeners();
    setupThemeEventListeners();

    // On load, check if current settings already differ from selected custom preset
    setTimeout(() => {
        checkAndSetUpdateMode();
    }, 300);
}

document.addEventListener('DOMContentLoaded', initializeOptions);

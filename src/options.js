
import { I18nModule } from './popup/modules/i18n.js';
import { SettingsModule } from './popup/modules/settings.js';
import { PresetsModule, PRESET_DEFINITIONS } from './popup/modules/presets.js';
import { UIModule, SWITCH_CONFIG } from './popup/modules/ui.js';
import { showNotification, showConfirmDialog } from './popup/modules/utils.js';

const CUSTOM_PRESET_PREFIX = 'custom:';

function getCustomPresetNameFromId(presetId) {
    return presetId && presetId.startsWith(CUSTOM_PRESET_PREFIX)
        ? presetId.slice(CUSTOM_PRESET_PREFIX.length)
        : null;
}

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
    const renamePresetBtn = document.getElementById('renamePresetBtn');
    const deletePresetBtn = document.getElementById('deletePresetBtn');
    const importPresetsBtn = document.getElementById('importPresetsBtn');
    const importPresetsFileInput = document.getElementById('importPresetsFileInput');
    const exportPresetsBtn = document.getElementById('exportPresetsBtn');
    const presetNameInput = document.getElementById('presetNameInput');

    if (presetSelect) {
        presetSelect.addEventListener('change', () => {
            syncPresetNameInputWithSelection();
            checkAndSetUpdateMode();
        });
    }

    if (presetNameInput) {
        presetNameInput.addEventListener('input', () => {
            updateRenamePresetButtonState();
        });
    }

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
                const presetName = getCustomPresetNameFromId(presetSelect?.value);
                if (!presetName) return;

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
                        });
                    } else {
                        PresetsModule.savePreset(name, preset);
                    }
                });
            });
        });
    }

    if (renamePresetBtn) {
        renamePresetBtn.addEventListener('click', function () {
            const currentName = getCustomPresetNameFromId(presetSelect?.value);
            if (!currentName) {
                showNotification(I18nModule.t('selectPresetToRename'), 'error');
                return;
            }

            const newName = presetNameInput?.value?.trim();
            if (!newName) {
                showNotification(I18nModule.t('presetNameRequired'), 'error');
                return;
            }

            if (PRESET_DEFINITIONS && PRESET_DEFINITIONS[newName]) {
                showNotification(I18nModule.t('presetNameReserved'), 'error');
                return;
            }

            if (newName === currentName) {
                updateRenamePresetButtonState();
                return;
            }

            chrome.storage.local.get(['customPresets'], (result) => {
                const customs = result.customPresets || {};
                const renamePreset = () => {
                    PresetsModule.renamePreset(currentName, newName);
                };

                if (Object.prototype.hasOwnProperty.call(customs, newName)) {
                    showConfirmDialog(I18nModule.t('confirmOverwritePreset').replace('%s', newName), renamePreset);
                    return;
                }

                renamePreset();
            });
        });
    }

    if (deletePresetBtn) {
        deletePresetBtn.addEventListener('click', function () {
            const name = getCustomPresetNameFromId(presetSelect?.value);
            if (!name) {
                showNotification(I18nModule.t('selectPresetToDelete'), 'error');
                return;
            }

            const selectedOption = presetSelect.options[presetSelect.selectedIndex];
            const displayText = selectedOption.text;
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

    const presetName = getCustomPresetNameFromId(presetSelect.value);
    if (!presetName) {
        setUpdatePresetMode(false);
        return;
    }

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

function syncPresetNameInputWithSelection() {
    const presetSelect = document.getElementById('presetSelect');
    const presetNameInput = document.getElementById('presetNameInput');
    if (!presetSelect || !presetNameInput) return;

    const selectedPresetName = getCustomPresetNameFromId(presetSelect.value);
    presetNameInput.value = selectedPresetName || '';
    updateRenamePresetButtonState();
}

function updateRenamePresetButtonState() {
    const presetSelect = document.getElementById('presetSelect');
    const presetNameInput = document.getElementById('presetNameInput');
    const renamePresetBtn = document.getElementById('renamePresetBtn');
    if (!presetSelect || !presetNameInput || !renamePresetBtn) return;

    const selectedPresetName = getCustomPresetNameFromId(presetSelect.value);
    const nextPresetName = presetNameInput.value.trim();
    renamePresetBtn.disabled = !selectedPresetName || !nextPresetName || nextPresetName === selectedPresetName;
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

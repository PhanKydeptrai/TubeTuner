// Presets Module
// Manages preset definitions and operations

import { I18nModule } from './i18n.js';
import { showNotification } from './utils.js';
import { UIModule } from './ui.js';

export const PRESET_DEFINITIONS = {
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
        shopHidden: false,
        livechatHidden: false
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
        shopHidden: true,
        livechatHidden: false
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
        shopHidden: true,
        livechatHidden: true
    }
};

export const PresetsModule = {
    getCurrentPreset() {
        return new Promise((resolve) => {
            const settingKeys = Object.keys(PRESET_DEFINITIONS.none);
            chrome.storage.sync.get(settingKeys.concat(['customPresets']), (result) => {
                const customs = result.customPresets || {};
                
                // Check built-in presets
                for (const [presetName, presetSettings] of Object.entries(PRESET_DEFINITIONS)) {
                    const matches = Object.keys(presetSettings).every(key => {
                        return result[key] === presetSettings[key];
                    });
                    
                    if (matches) {
                        resolve(`builtin:${presetName}`);
                        return;
                    }
                }
                
                // Check custom presets - must match ALL setting keys in PRESET_DEFINITIONS.none
                for (const [customName, customSettings] of Object.entries(customs)) {
                    const matches = settingKeys.every(key => {
                        // Get the value from customSettings, or use the value from PRESET_DEFINITIONS.none as default
                        const customValue = customSettings.hasOwnProperty(key) ? customSettings[key] : PRESET_DEFINITIONS.none[key];
                        return result[key] === customValue;
                    });
                    
                    if (matches) {
                        resolve(`custom:${customName}`);
                        return;
                    }
                }
                
                // No preset matches current settings
                resolve(null);
            });
        });
    },

    loadPresetOptions() {
        const presetSelect = document.getElementById('presetSelect');
        if (!presetSelect) return;

        chrome.storage.sync.get(['customPresets'], (result) => {
            const customs = result.customPresets || {};
            const settingKeys = Object.keys(PRESET_DEFINITIONS.none);

            // Normalize custom presets: ensure they have all setting keys
            let needsUpdate = false;
            for (const customName of Object.keys(customs)) {
                const customSettings = customs[customName];
                for (const key of settingKeys) {
                    if (!customSettings.hasOwnProperty(key)) {
                        customSettings[key] = PRESET_DEFINITIONS.none[key];
                        needsUpdate = true;
                    }
                }
            }

            // Save normalized presets if needed
            if (needsUpdate) {
                chrome.storage.sync.set({ customPresets: customs }, () => {});
            }

            while (presetSelect.firstChild) presetSelect.removeChild(presetSelect.firstChild);

            const optgroupBuilt = document.createElement('optgroup');
            optgroupBuilt.label = I18nModule.t('builtInGroup');
            Object.keys(PRESET_DEFINITIONS).forEach(key => {
                const opt = document.createElement('option');
                opt.value = `builtin:${key}`;
                opt.textContent = I18nModule.t(`preset${key.charAt(0).toUpperCase() + key.slice(1)}`);
                optgroupBuilt.appendChild(opt);
            });
            presetSelect.appendChild(optgroupBuilt);

            const customNames = Object.keys(customs);
            if (customNames.length > 0) {
                const optgroupCustom = document.createElement('optgroup');
                optgroupCustom.label = I18nModule.t('customGroup');
                customNames.forEach(name => {
                    const opt = document.createElement('option');
                    opt.value = `custom:${name}`;
                    opt.textContent = name;
                    optgroupCustom.appendChild(opt);
                });
                presetSelect.appendChild(optgroupCustom);
            }

            // Set the current preset
            this.getCurrentPreset().then(currentPreset => {
                if (currentPreset) {
                    presetSelect.value = currentPreset;
                }
            }).catch(() => {});

            try {
                I18nModule.updateLanguageUI();
            } catch (e) {}
        });
    },

    applyPreset(presetId) {
        let settings = null;

        if (presetId.startsWith('builtin:')) {
            const key = presetId.split(':')[1];
            if (PRESET_DEFINITIONS[key]) {
                settings = Object.assign({}, PRESET_DEFINITIONS[key], { extensionEnabled: true });
            }
        } else if (presetId.startsWith('custom:')) {
            const name = presetId.split(':')[1];
            chrome.storage.sync.get(['customPresets'], (result) => {
                const customs = result.customPresets || {};
                if (customs[name]) {
                    const customSettings = Object.assign({}, customs[name], { extensionEnabled: true });
                    chrome.storage.sync.set(customSettings, () => {
                        showNotification(I18nModule.t('presetApplied'), 'success');
                        UIModule.updateUI(customSettings);
                        chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
                            tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'syncSettings', changes: customSettings }).catch(() => {}));
                        });
                    });
                }
            });
            return;
        }

        if (settings) {
            chrome.storage.sync.set(settings, () => {
                showNotification(I18nModule.t('presetApplied'), 'success');
                UIModule.updateUI(settings);
                chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
                    tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'syncSettings', changes: settings }).catch(() => {}));
                });
            });
        }
    },

    savePreset(name, preset) {
        chrome.storage.sync.get(['customPresets'], (result) => {
            const customs = result.customPresets || {};
            customs[name] = preset;
            chrome.storage.sync.set({ customPresets: customs }, () => {
                showNotification(I18nModule.t('presetSaved'), 'success');
                this.loadPresetOptions();
            });
        });
    },

    deletePreset(name) {
        chrome.storage.sync.get(['customPresets'], (result) => {
            const customs = result.customPresets || {};
            if (customs[name]) delete customs[name];
            chrome.storage.sync.set({ customPresets: customs }, () => {
                showNotification(I18nModule.t('presetDeleted'), 'success');
                this.loadPresetOptions();
            });
        });
    },

    importPresets(data) {
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

        chrome.storage.sync.get(['customPresets'], (result) => {
            const customs = result.customPresets || {};
            Object.assign(customs, toMerge);
            chrome.storage.sync.set({ customPresets: customs }, () => {
                showNotification(I18nModule.t('presetsImported'), 'success');
                this.loadPresetOptions();
            });
        });
    },

    exportPresets() {
        chrome.storage.sync.get(['customPresets'], (result) => {
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
    }
};

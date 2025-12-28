// Presets Module
// Manages preset definitions and operations

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

export const PresetsModule = {
    loadPresetOptions() {
        const presetSelect = document.getElementById('presetSelect');
        if (!presetSelect) return;

        chrome.storage.sync.get(['customPresets'], (result) => {
            const customs = result.customPresets || {};

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
                            tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
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
                    tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
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

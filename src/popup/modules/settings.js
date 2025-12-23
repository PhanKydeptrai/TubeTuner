// Settings Module
// Manages settings export and import

const VALID_SETTING_KEYS = [
    'extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden',
    'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden',
    'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden',
    'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled',
    'shopHidden', 'language', 'theme'
];

const SettingsModule = {
    exportSettings() {
        const exportBtn = document.getElementById('exportSettingsBtn');
        const originalText = exportBtn.innerHTML;
        exportBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${I18nModule.t('exporting')}</span>`;
        exportBtn.disabled = true;

        chrome.storage.sync.get(VALID_SETTING_KEYS, (result) => {
            const settingsToExport = {};
            let count = 0;

            VALID_SETTING_KEYS.forEach(key => {
                if (result.hasOwnProperty(key)) {
                    settingsToExport[key] = result[key];
                    count++;
                }
            });

            if (count === 0) {
                showNotification(I18nModule.t('noSettingsToExport'), 'info');
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

            showNotification(I18nModule.t('exportSuccess'), 'success');

            setTimeout(() => {
                exportBtn.innerHTML = originalText;
                exportBtn.disabled = false;
            }, 1000);
        });
    },

    importSettings(file) {
        const importBtn = document.getElementById('importSettingsBtn');
        const originalText = importBtn.innerHTML;
        importBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${I18nModule.t('importing')}</span>`;
        importBtn.disabled = true;

        const reader = new FileReader();

        reader.onload = (e) => {
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

                chrome.storage.sync.set(settingsToImport, () => {
                    showNotification(I18nModule.t('importSuccess'), 'success');
                    chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
                        tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                    });
                    setTimeout(() => window.location.reload(), 1500);
                });

            } catch (error) {
                showNotification(error.message || I18nModule.t('importError'), 'error');
                importBtn.innerHTML = originalText;
                importBtn.disabled = false;
            }
        };

        reader.onerror = () => {
            showNotification(I18nModule.t('importError'), 'error');
            importBtn.innerHTML = originalText;
            importBtn.disabled = false;
        };

        reader.readAsText(file);
    }
};

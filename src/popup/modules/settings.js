// Settings Module
// Manages settings export and import

import { I18nModule } from './i18n.js';
import { showNotification } from './utils.js';

export const VALID_SETTING_KEYS = [
    'extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden',
    'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden',
    'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden',
    'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled',
    'shopHidden', 'playlistHidden', 'livechatHidden', 'language', 'theme'
];

export const SettingsModule = {
    exportSettings() {
        const exportBtn = document.getElementById('exportSettingsBtn');
        const originalTextContent = exportBtn.textContent;
        
        // Create spinner and loading text safely
        exportBtn.textContent = '';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.classList.add("animate-spin");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M21 12a9 9 0 11-6.219-8.56");
        svg.appendChild(path);
        
        const span = document.createElement("span");
        span.textContent = I18nModule.t('exporting');
        
        exportBtn.appendChild(svg);
        exportBtn.appendChild(span);
        exportBtn.disabled = true;

        const keysToFetch = [...VALID_SETTING_KEYS, 'customPresets'];
        chrome.storage.sync.get(keysToFetch, (result) => {
            const settingsToExport = {};
            let count = 0;

            VALID_SETTING_KEYS.forEach(key => {
                if (result.hasOwnProperty(key)) {
                    settingsToExport[key] = result[key];
                    count++;
                }
            });

            // Count custom presets if they exist
            let presetsCount = 0;
            if (result.customPresets && Object.keys(result.customPresets).length > 0) {
                presetsCount = Object.keys(result.customPresets).length;
            }

            if (count === 0 && presetsCount === 0) {
                showNotification(I18nModule.t('noSettingsToExport'), 'info');
                exportBtn.textContent = originalTextContent;
                exportBtn.disabled = false;
                return;
            }

            const settingsExport = {
                metadata: {
                    exportDate: new Date().toISOString(),
                    extensionName: 'TubeTuner',
                    extensionVersion: '1.2',
                    formatVersion: '1.0',
                    settingsCount: count,
                    presetsCount: presetsCount
                },
                settings: settingsToExport,
                customPresets: result.customPresets || {}
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
                exportBtn.textContent = originalTextContent;
                exportBtn.disabled = false;
            }, 1000);
        });
    },

    importSettings(file) {
        const importBtn = document.getElementById('importSettingsBtn');
        const originalTextContent = importBtn.textContent;
        
        // Create spinner and loading text safely
        importBtn.textContent = '';
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        svg.setAttribute("stroke-width", "2");
        svg.setAttribute("stroke-linecap", "round");
        svg.setAttribute("stroke-linejoin", "round");
        svg.classList.add("animate-spin");
        
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M21 12a9 9 0 11-6.219-8.56");
        svg.appendChild(path);
        
        const span = document.createElement("span");
        span.textContent = I18nModule.t('importing');
        
        importBtn.appendChild(svg);
        importBtn.appendChild(span);
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

                const importedPresets = importedData.customPresets;
                let presetsCount = 0;
                if (importedPresets && typeof importedPresets === 'object') {
                    presetsCount = Object.keys(importedPresets).length;
                }

                if (validCount === 0 && presetsCount === 0) {
                    throw new Error('No valid settings found in file');
                }

                const finalizeImport = () => {
                    chrome.storage.sync.set(settingsToImport, () => {
                        showNotification(I18nModule.t('importSuccess'), 'success');
                        chrome.tabs.query({ url: '*://*.youtube.com/*' }, (tabs) => {
                            tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                        });
                        setTimeout(() => window.location.reload(), 1500);
                    });
                };

                if (presetsCount > 0) {
                    chrome.storage.sync.get(['customPresets'], (result) => {
                        const existingPresets = result.customPresets || {};
                        settingsToImport.customPresets = { ...existingPresets, ...importedPresets };
                        finalizeImport();
                    });
                } else {
                    finalizeImport();
                }

            } catch (error) {
                showNotification(error.message || I18nModule.t('importError'), 'error');
                importBtn.textContent = originalTextContent;
                importBtn.disabled = false;
            }
        };

        reader.onerror = () => {
            showNotification(I18nModule.t('importError'), 'error');
            importBtn.textContent = originalTextContent;
            importBtn.disabled = false;
        };

        reader.readAsText(file);
    }
};

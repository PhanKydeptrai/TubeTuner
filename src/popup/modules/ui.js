// UI Module
// Manages UI updates and rendering

import { AppState } from './state.js';
import { I18nModule } from './i18n.js';

export const SWITCH_CONFIG = [
    { id: 'extensionEnabledSwitch', key: 'extensionEnabled', default: true },
    { id: 'progressSwitch', key: 'progressBarHidden', default: false },
    { id: 'durationSwitch', key: 'durationHidden', default: false },
    { id: 'shortsSwitch', key: 'shortsHidden', default: false },
    { id: 'homeFeedSwitch', key: 'homeFeedHidden', default: false },
    { id: 'videoSidebarSwitch', key: 'videoSidebarHidden', default: false },
    { id: 'commentsSwitch', key: 'commentsHidden', default: false },
    { id: 'notificationsBellSwitch', key: 'notificationsBellHidden', default: false },
    { id: 'topHeaderSwitch', key: 'topHeaderHidden', default: false },
    { id: 'exploreSectionSwitch', key: 'exploreSectionHidden', default: false },
    { id: 'endScreenCardsSwitch', key: 'endScreenCardsHidden', default: false },
    { id: 'moreFromYouTubeSwitch', key: 'moreFromYouTubeHidden', default: false },
    { id: 'hideChannelSwitch', key: 'hideChannelHidden', default: false },
    { id: 'buttonsBarSwitch', key: 'buttonsBarHidden', default: false },
    { id: 'hideDescriptionSwitch', key: 'hideDescriptionHidden', default: false },
    { id: 'grayscaleSwitch', key: 'grayscaleEnabled', default: false },
    { id: 'shopSwitch', key: 'shopHidden', default: false }
];

export const UIModule = {
    updateUI(settings) {
        // Set default values for all settings
        const defaultSettings = {};
        SWITCH_CONFIG.forEach(config => {
            defaultSettings[config.key] = config.default;
        });
        
        // Merge provided settings with defaults
        const mergedSettings = { ...defaultSettings, ...settings };

        // Update extension enabled state
        const extensionEnabled = mergedSettings.extensionEnabled;
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

        // Update all switches (both enabled and disabled state)
        const switchStates = {};
        SWITCH_CONFIG.forEach(config => {
            if (config.key !== 'extensionEnabled') {
                switchStates[config.key] = mergedSettings[config.key];
            }
        });

        // Set the checked state for all switches
        SWITCH_CONFIG.forEach(config => {
            if (config.key === 'extensionEnabled') return; // Already handled above
            
            const switchEl = AppState.switches.get(config.key);
            if (switchEl) {
                const shouldBeChecked = switchStates[config.key];
                switchEl.checked = shouldBeChecked;
            }
        });

        // Verify state after update - set a small delay to ensure DOM has updated
        setTimeout(() => {
            SWITCH_CONFIG.forEach(config => {
                if (config.key === 'extensionEnabled') return;
                
                const switchEl = AppState.switches.get(config.key);
                if (switchEl && switchStates.hasOwnProperty(config.key) && switchEl.checked !== switchStates[config.key]) {
                    console.warn(`State mismatch for ${config.key}, correcting...`);
                    switchEl.checked = switchStates[config.key];
                }
            });
        }, 50);

        // Update status UI
        this.updateStatusUI(mergedSettings);
    },

    updateStatusUI(settings) {
        if (!AppState.statusElement) return;

        const enabledFeatures = [];

        if (settings.progressBarHidden) enabledFeatures.push(I18nModule.t('progressBar'));
        if (settings.durationHidden) enabledFeatures.push(I18nModule.t('duration'));
        if (settings.shortsHidden) enabledFeatures.push(I18nModule.t('shorts'));
        if (settings.homeFeedHidden) enabledFeatures.push(I18nModule.t('homeFeed'));
        if (settings.videoSidebarHidden) enabledFeatures.push(I18nModule.t('videoSidebar'));
        if (settings.commentsHidden) enabledFeatures.push('comments');
        if (settings.notificationsBellHidden) enabledFeatures.push(I18nModule.t('notificationsBell'));
        if (settings.topHeaderHidden) enabledFeatures.push(I18nModule.t('topHeader'));
        if (settings.exploreSectionHidden) enabledFeatures.push(I18nModule.t('exploreSection'));
        if (settings.shopHidden) enabledFeatures.push(I18nModule.t('shop'));

        const statusBadge = AppState.statusElement.querySelector('ui-badge') || document.createElement('ui-badge');
        statusBadge.setAttribute('variant', enabledFeatures.length > 0 ? 'success' : 'warning');

        if (enabledFeatures.length > 0) {
            statusBadge.textContent = `${I18nModule.t('hidingFeatures')}: ${enabledFeatures.join(', ')}`;
            AppState.statusElement.className = 'status enabled';
        } else {
            statusBadge.textContent = I18nModule.t('allDisabled');
            AppState.statusElement.className = 'status disabled';
        }

        if (!AppState.statusElement.contains(statusBadge)) {
            AppState.statusElement.innerHTML = '';
            AppState.statusElement.appendChild(statusBadge);
        }
    },

    initializeTheme() {
        chrome.storage.sync.get('theme', (data) => {
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
    },

    initializeCollapsibleSections() {
        const sections = document.querySelectorAll('.ext-collapsible-section');

        chrome.storage.sync.get('sectionStates', (result) => {
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
                    this.saveSectionState(sectionId, !wasOpen);
                });
            });
        });
    },

    saveSectionState(sectionId, isOpen) {
        chrome.storage.sync.get('sectionStates', (result) => {
            const sectionStates = result.sectionStates || {};
            sectionStates[sectionId] = isOpen;
            chrome.storage.sync.set({ sectionStates });
        });
    }
};

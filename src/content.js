// TubeTuner - Content Script

import * as features from './features/index.js';

// Configuration registry for all features
// Maps the action name (from messages) to the settings key and the toggle function
const featureRegistry = [
    { action: 'toggleProgressBar',      key: 'progressBarHidden',       func: features.toggleProgressBar },
    { action: 'toggleDuration',         key: 'durationHidden',          func: features.toggleDuration },
    { action: 'toggleShorts',           key: 'shortsHidden',            func: features.toggleShorts },
    { action: 'toggleHomeFeed',         key: 'homeFeedHidden',          func: features.toggleHomeFeed },
    { action: 'toggleVideoSidebar',     key: 'videoSidebarHidden',      func: features.toggleVideoSidebar },
    { action: 'toggleComments',         key: 'commentsHidden',          func: features.toggleComments },
    { action: 'toggleNotificationsBell',key: 'notificationsBellHidden', func: features.toggleNotificationsBell },
    { action: 'toggleTopHeader',        key: 'topHeaderHidden',         func: features.toggleTopHeader },
    { action: 'toggleExploreSection',   key: 'exploreSectionHidden',    func: features.toggleExploreSection },
    { action: 'toggleEndScreenCards',   key: 'endScreenCardsHidden',    func: features.toggleEndScreenCards },
    { action: 'toggleMoreFromYouTube',  key: 'moreFromYouTubeHidden',   func: features.toggleMoreFromYouTube },
    { action: 'toggleHideChannel',      key: 'hideChannelHidden',       func: features.toggleHideChannel },
    { action: 'toggleButtonsBar',       key: 'buttonsBarHidden',        func: features.toggleButtonsBar },
    { action: 'toggleHideDescription',  key: 'hideDescriptionHidden',   func: features.toggleHideDescription },
    { action: 'toggleGrayscale',        key: 'grayscaleEnabled',        func: features.toggleGrayscale },
    { action: 'toggleShop',             key: 'shopHidden',              func: features.toggleShop },
    { action: 'togglePlaylist',         key: 'playlistHidden',          func: features.togglePlaylist },
    { action: 'toggleLivechat',         key: 'livechatHidden',          func: features.toggleLivechat },
    { action: 'toggleRecommendation',   key: 'recommendationHidden',    func: features.toggleRecommendation }
];

// Quick lookups
const actionMap = {};
const keyMap = {};

featureRegistry.forEach(item => {
    actionMap[item.action] = item;
    keyMap[item.key] = item;
});

// State variables
let settings = {
    extensionEnabled: true,
    // Other keys will be populated dynamically
};

// Initialize settings object with defaults (false) for all features
featureRegistry.forEach(item => {
    settings[item.key] = false;
});

// Helper function to apply all toggles based on extensionEnabled
function applyAllToggles() {
    featureRegistry.forEach(({ key, func }) => {
        const isEnabled = settings.extensionEnabled ? settings[key] : false;
        func(isEnabled);
    });
}

// Helper function to reapply hidden toggles on URL change (only if enabled and hidden/active)
function reapplyHiddens() {
    if (settings.extensionEnabled) {
        featureRegistry.forEach(({ key, func }) => {
            if (settings[key]) {
                func(true);
            }
        });
    }
}

// Initialize extension
function initialize() {
    // Prepare list of keys to fetch: extensionEnabled + all feature keys
    const keysToFetch = ['extensionEnabled', ...featureRegistry.map(item => item.key)];

    chrome.storage.sync.get(keysToFetch, (result) => {
        // extensionEnabled defaults to true if undefined (undefined !== false is true)
        settings.extensionEnabled = result.extensionEnabled !== false;

        // Populate feature settings
        featureRegistry.forEach(({ key }) => {
            settings[key] = result[key] === true;
        });

        if (settings.extensionEnabled) {
            applyAllToggles();
        }
    });

    // Observe URL changes to reapply styles if needed
    let currentUrl = location.href;
    const urlObserver = new MutationObserver(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            if (settings.extensionEnabled) {
                reapplyHiddens();
            }
        }
    });

    urlObserver.observe(document, {
        subtree: true,
        childList: true
    });
}

// Listen for storage changes to sync across tabs
chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace !== 'sync') return;

    for (const [key, change] of Object.entries(changes)) {
        const newValue = change.newValue;
        if (key === 'extensionEnabled') {
            settings.extensionEnabled = newValue !== false;
        } else if (keyMap[key]) {
            // It's a known feature key
            settings[key] = newValue === true;
        }
    }

    applyAllToggles();
});

// Listen for messages from popup and background script
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'syncSettings') {
        // Bulk update
        for (const [key, value] of Object.entries(request.changes)) {
            if (key === 'extensionEnabled') {
                settings.extensionEnabled = value !== false;
            } else if (keyMap[key]) {
                settings[key] = value === true;
            }
        }
        applyAllToggles();
        sendResponse({ success: true });
        return true;
    } else if (request.action === 'getStatus') {
        sendResponse(settings);
        return true;
    }

    // Handle individual feature toggle actions
    const actionEntry = actionMap[request.action];
    if (actionEntry) {
        const { key, func } = actionEntry;
        settings[key] = request.enabled;
        func(request.enabled);
        sendResponse({ success: true, willRefresh: false });
        return true;
    }

    return true;
});

initialize();
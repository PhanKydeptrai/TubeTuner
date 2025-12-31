// TubeTuner - Content Script

import { toggleProgressBar } from './features/progressBar.js';
import { toggleDuration } from './features/duration.js';
import { toggleShorts } from './features/shorts.js';
import { toggleHomeFeed } from './features/homeFeed.js';
import { toggleVideoSidebar } from './features/videoSidebar.js';
import { toggleComments } from './features/comments.js';
import { toggleNotificationsBell } from './features/notificationsBell.js';
import { toggleTopHeader } from './features/topHeader.js';
import { toggleExploreSection } from './features/exploreSection.js';
import { toggleEndScreenCards } from './features/endScreenCards.js';
import { toggleMoreFromYouTube } from './features/moreFromYouTube.js';
import { toggleHideChannel } from './features/hideChannel.js';
import { toggleButtonsBar } from './features/buttonsBar.js';
import { toggleHideDescription } from './features/hideDescription.js';
import { toggleGrayscale } from './features/grayscale.js';
import { toggleShop } from './features/shop.js';

// State variables
let settings = {
    extensionEnabled: true,
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
    shopHidden: false,
    grayscaleEnabled: false
};

// Khởi tạo extension
function initialize() {
    // Lấy trạng thái từ storage
    chrome.storage.sync.get(['extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], (result) => {
        // Cập nhật settings object
        settings.extensionEnabled = result.extensionEnabled !== false; // Default is true
        settings.progressBarHidden = result.progressBarHidden === true;
        settings.durationHidden = result.durationHidden === true;
        settings.shortsHidden = result.shortsHidden === true;
        settings.homeFeedHidden = result.homeFeedHidden === true;
        settings.videoSidebarHidden = result.videoSidebarHidden === true;
        settings.commentsHidden = result.commentsHidden === true;
        settings.notificationsBellHidden = result.notificationsBellHidden === true;
        settings.topHeaderHidden = result.topHeaderHidden === true;
        settings.exploreSectionHidden = result.exploreSectionHidden === true;
        settings.endScreenCardsHidden = result.endScreenCardsHidden === true;
        settings.moreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
        settings.hideChannelHidden = result.hideChannelHidden === true;
        settings.buttonsBarHidden = result.buttonsBarHidden === true;
        settings.hideDescriptionHidden = result.hideDescriptionHidden === true;
        settings.grayscaleEnabled = result.grayscaleEnabled === true;
        settings.shopHidden = result.shopHidden === true;

        // Settings loaded

        // Áp dụng ngay
        setTimeout(() => {
            if (settings.extensionEnabled) {
                toggleProgressBar(settings.progressBarHidden);
                toggleDuration(settings.durationHidden);
                toggleShorts(settings.shortsHidden);
                toggleHomeFeed(settings.homeFeedHidden);
                toggleVideoSidebar(settings.videoSidebarHidden);
                toggleComments(settings.commentsHidden);
                toggleNotificationsBell(settings.notificationsBellHidden);
                toggleTopHeader(settings.topHeaderHidden);
                toggleExploreSection(settings.exploreSectionHidden);
                toggleEndScreenCards(settings.endScreenCardsHidden);
                toggleMoreFromYouTube(settings.moreFromYouTubeHidden);
                toggleHideChannel(settings.hideChannelHidden);
                toggleButtonsBar(settings.buttonsBarHidden);
                toggleHideDescription(settings.hideDescriptionHidden);
                toggleGrayscale(settings.grayscaleEnabled);
                toggleShop(settings.shopHidden);
            }
        }, 1000);
    });

    // Theo dõi thay đổi URL (YouTube SPA)
    let currentUrl = location.href;
    const urlObserver = new MutationObserver(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
            // URL changed, reapplying extension
            setTimeout(() => {
                // Áp dụng lại tất cả settings
                if (settings.extensionEnabled) {
                    if (settings.progressBarHidden) toggleProgressBar(true);
                    if (settings.durationHidden) toggleDuration(true);
                    if (settings.shortsHidden) toggleShorts(true);
                    if (settings.homeFeedHidden) toggleHomeFeed(true);
                    if (settings.videoSidebarHidden) toggleVideoSidebar(true);
                    if (settings.commentsHidden) toggleComments(true);
                    if (settings.notificationsBellHidden) toggleNotificationsBell(true);
                    if (settings.topHeaderHidden) toggleTopHeader(true);
                    if (settings.exploreSectionHidden) toggleExploreSection(true);
                    if (settings.endScreenCardsHidden) toggleEndScreenCards(true);
                    if (settings.moreFromYouTubeHidden) toggleMoreFromYouTube(true);
                    if (settings.hideChannelHidden) toggleHideChannel(true);
                    if (settings.buttonsBarHidden) toggleButtonsBar(true);
                    if (settings.hideDescriptionHidden) toggleHideDescription(true);
                    if (settings.shopHidden) toggleShop(true);
                }
            }, 2000);
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

    // Storage changed in this tab, applying changes

    // Apply changes immediately
    for (const [key, change] of Object.entries(changes)) {
        const newValue = change.newValue;

        switch (key) {
            case 'extensionEnabled':
                settings.extensionEnabled = newValue !== false;
                // If extension is disabled, remove all applied changes
                if (!settings.extensionEnabled) {
                    // Disable all features
                    toggleProgressBar(false);
                    toggleDuration(false);
                    toggleShorts(false);
                    toggleHomeFeed(false);
                    toggleVideoSidebar(false);
                    toggleComments(false);
                    toggleNotificationsBell(false);
                    toggleTopHeader(false);
                    toggleExploreSection(false);
                    toggleEndScreenCards(false);
                    toggleMoreFromYouTube(false);
                    toggleHideChannel(false);
                    toggleButtonsBar(false);
                    toggleHideDescription(false);
                    toggleGrayscale(false);
                    toggleShop(false);
                } else {
                    // Re-enable features based on current settings
                    toggleProgressBar(settings.progressBarHidden);
                    toggleDuration(settings.durationHidden);
                    toggleShorts(settings.shortsHidden);
                    toggleHomeFeed(settings.homeFeedHidden);
                    toggleVideoSidebar(settings.videoSidebarHidden);
                    toggleComments(settings.commentsHidden);
                    toggleNotificationsBell(settings.notificationsBellHidden);
                    toggleTopHeader(settings.topHeaderHidden);
                    toggleExploreSection(settings.exploreSectionHidden);
                    toggleEndScreenCards(settings.endScreenCardsHidden);
                    toggleMoreFromYouTube(settings.moreFromYouTubeHidden);
                    toggleHideChannel(settings.hideChannelHidden);
                    toggleButtonsBar(settings.buttonsBarHidden);
                    toggleHideDescription(settings.hideDescriptionHidden);
                    toggleGrayscale(settings.grayscaleEnabled);
                    toggleShop(settings.shopHidden);
                }
                break;
            case 'progressBarHidden':
                settings.progressBarHidden = newValue === true;
                toggleProgressBar(settings.progressBarHidden);
                break;
            case 'durationHidden':
                settings.durationHidden = newValue === true;
                toggleDuration(settings.durationHidden);
                break;
            case 'shortsHidden':
                settings.shortsHidden = newValue === true;
                toggleShorts(settings.shortsHidden);
                break;
            case 'homeFeedHidden':
                settings.homeFeedHidden = newValue === true;
                toggleHomeFeed(settings.homeFeedHidden);
                break;
            case 'videoSidebarHidden':
                settings.videoSidebarHidden = newValue === true;
                toggleVideoSidebar(settings.videoSidebarHidden);
                break;
            case 'commentsHidden':
                settings.commentsHidden = newValue === true;
                toggleComments(settings.commentsHidden);
                break;
            case 'notificationsBellHidden':
                settings.notificationsBellHidden = newValue === true;
                toggleNotificationsBell(settings.notificationsBellHidden);
                break;
            case 'topHeaderHidden':
                settings.topHeaderHidden = newValue === true;
                toggleTopHeader(settings.topHeaderHidden);
                break;
            case 'exploreSectionHidden':
                settings.exploreSectionHidden = newValue === true;
                toggleExploreSection(settings.exploreSectionHidden);
                break;
            case 'endScreenCardsHidden':
                settings.endScreenCardsHidden = newValue === true;
                toggleEndScreenCards(settings.endScreenCardsHidden);
                break;
            case 'moreFromYouTubeHidden':
                settings.moreFromYouTubeHidden = newValue === true;
                toggleMoreFromYouTube(settings.moreFromYouTubeHidden);
                break;
            case 'hideChannelHidden':
                settings.hideChannelHidden = newValue === true;
                toggleHideChannel(settings.hideChannelHidden);
                break;
            case 'buttonsBarHidden':
                settings.buttonsBarHidden = newValue === true;
                toggleButtonsBar(settings.buttonsBarHidden);
                break;
            case 'hideDescriptionHidden':
                settings.hideDescriptionHidden = newValue === true;
                toggleHideDescription(settings.hideDescriptionHidden);
                break;
            case 'grayscaleEnabled':
                // New grayscale setting from storage change
                settings.grayscaleEnabled = newValue === true;
                toggleGrayscale(settings.grayscaleEnabled);
                break;
            case 'shopHidden':
                settings.shopHidden = newValue === true;
                toggleShop(settings.shopHidden);
                break;
        }
    }
});

// Lắng nghe message từ popup và background script
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    // Received message

    // Handle sync messages from background script
    if (request.action === 'syncSettings') {
        // Syncing settings from background script

        // Apply all changed settings
        for (const [key, value] of Object.entries(request.changes)) {
            switch (key) {
                case 'extensionEnabled':
                    settings.extensionEnabled = value !== false;
                    // If extension is disabled, remove all applied changes
                    if (!settings.extensionEnabled) {
                        // Disable all features
                        toggleProgressBar(false);
                        toggleDuration(false);
                        toggleShorts(false);
                        toggleHomeFeed(false);
                        toggleVideoSidebar(false);
                        toggleComments(false);
                        toggleNotificationsBell(false);
                        toggleTopHeader(false);
                        toggleExploreSection(false);
                        toggleEndScreenCards(false);
                        toggleMoreFromYouTube(false);
                        toggleHideChannel(false);
                        toggleButtonsBar(false);
                        toggleHideDescription(false);
                        toggleGrayscale(false);
                        toggleShop(false);
                    } else {
                        // Re-enable features based on current settings
                        toggleProgressBar(settings.progressBarHidden);
                        toggleDuration(settings.durationHidden);
                        toggleShorts(settings.shortsHidden);
                        toggleHomeFeed(settings.homeFeedHidden);
                        toggleVideoSidebar(settings.videoSidebarHidden);
                        toggleComments(settings.commentsHidden);
                        toggleNotificationsBell(settings.notificationsBellHidden);
                        toggleTopHeader(settings.topHeaderHidden);
                        toggleExploreSection(settings.exploreSectionHidden);
                        toggleEndScreenCards(settings.endScreenCardsHidden);
                        toggleMoreFromYouTube(settings.moreFromYouTubeHidden);
                        toggleHideChannel(settings.hideChannelHidden);
                        toggleButtonsBar(settings.buttonsBarHidden);
                        toggleHideDescription(settings.hideDescriptionHidden);
                        toggleGrayscale(settings.grayscaleEnabled);
                        toggleShop(settings.shopHidden);
                    }
                    break;
                case 'progressBarHidden':
                    settings.progressBarHidden = value === true;
                    toggleProgressBar(settings.progressBarHidden);
                    break;
                case 'durationHidden':
                    settings.durationHidden = value === true;
                    toggleDuration(settings.durationHidden);
                    break;
                case 'shortsHidden':
                    settings.shortsHidden = value === true;
                    toggleShorts(settings.shortsHidden);
                    break;
                case 'homeFeedHidden':
                    settings.homeFeedHidden = value === true;
                    toggleHomeFeed(settings.homeFeedHidden);
                    break;
                case 'videoSidebarHidden':
                    settings.videoSidebarHidden = value === true;
                    toggleVideoSidebar(settings.videoSidebarHidden);
                    break;
                case 'commentsHidden':
                    settings.commentsHidden = value === true;
                    toggleComments(settings.commentsHidden);
                    break;
                case 'notificationsBellHidden':
                    settings.notificationsBellHidden = value === true;
                    toggleNotificationsBell(settings.notificationsBellHidden);
                    break;
                case 'topHeaderHidden':
                    settings.topHeaderHidden = value === true;
                    toggleTopHeader(settings.topHeaderHidden);
                    break;
                case 'exploreSectionHidden':
                    settings.exploreSectionHidden = value === true;
                    toggleExploreSection(settings.exploreSectionHidden);
                    break;
                case 'endScreenCardsHidden':
                    settings.endScreenCardsHidden = value === true;
                    toggleEndScreenCards(settings.endScreenCardsHidden);
                    break;
                case 'moreFromYouTubeHidden':
                    settings.moreFromYouTubeHidden = value === true;
                    toggleMoreFromYouTube(settings.moreFromYouTubeHidden);
                    break;
                case 'hideChannelHidden':
                    settings.hideChannelHidden = value === true;
                    toggleHideChannel(settings.hideChannelHidden);
                    break;
                case 'buttonsBarHidden':
                    settings.buttonsBarHidden = value === true;
                    toggleButtonsBar(settings.buttonsBarHidden);
                    break;
                case 'hideDescriptionHidden':
                    settings.hideDescriptionHidden = value === true;
                    toggleHideDescription(settings.hideDescriptionHidden);
                    break;
                case 'grayscaleEnabled':
                    settings.grayscaleEnabled = value === true;
                    toggleGrayscale(settings.grayscaleEnabled);
                    break;
                case 'shopHidden':
                    settings.shopHidden = value === true;
                    toggleShop(settings.shopHidden);
                    break;
            }
        }

        sendResponse({ success: true });
        return true;
    }

    // Handle direct toggle messages from popup
    if (request.action === 'toggleProgressBar') {
        settings.progressBarHidden = request.enabled; // Update local state for consistency
        toggleProgressBar(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleDuration') {
        settings.durationHidden = request.enabled;
        toggleDuration(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleShorts') {
        settings.shortsHidden = request.enabled;
        toggleShorts(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleHomeFeed') {
        settings.homeFeedHidden = request.enabled;
        toggleHomeFeed(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleVideoSidebar') {
        settings.videoSidebarHidden = request.enabled;
        toggleVideoSidebar(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleComments') {
        settings.commentsHidden = request.enabled;
        toggleComments(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleNotificationsBell') {
        settings.notificationsBellHidden = request.enabled;
        toggleNotificationsBell(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleTopHeader') {
        settings.topHeaderHidden = request.enabled;
        toggleTopHeader(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleExploreSection') {
        settings.exploreSectionHidden = request.enabled;
        toggleExploreSection(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleEndScreenCards') {
        settings.endScreenCardsHidden = request.enabled;
        toggleEndScreenCards(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleMoreFromYouTube') {
        settings.moreFromYouTubeHidden = request.enabled;
        toggleMoreFromYouTube(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleHideChannel') {
        settings.hideChannelHidden = request.enabled;
        toggleHideChannel(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleButtonsBar') {
        settings.buttonsBarHidden = request.enabled;
        toggleButtonsBar(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleHideDescription') {
        settings.hideDescriptionHidden = request.enabled;
        toggleHideDescription(request.enabled);
        sendResponse({ success: true, willRefresh: false });

    } else if (request.action === 'toggleGrayscale') {
        settings.grayscaleEnabled = request.enabled;
        // Direct toggle command from popup
        toggleGrayscale(request.enabled);
        sendResponse({ success: true, willRefresh: false });
    } else if (request.action === 'toggleShop') {
        settings.shopHidden = request.enabled;
        toggleShop(request.enabled);
        sendResponse({ success: true, willRefresh: false });
    } else if (request.action === 'getStatus') {
        sendResponse(settings);
    }

    // Return true để giữ message channel mở cho async response
    return true;
});

// Chạy khi document ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

// Backup khi window load
window.addEventListener('load', () => {
    setTimeout(() => {
        // Window loaded, reapplying extension
        if (settings.progressBarHidden) toggleProgressBar(true);
        if (settings.durationHidden) toggleDuration(true);
        if (settings.shortsHidden) toggleShorts(true);
        if (settings.homeFeedHidden) toggleHomeFeed(true);
        if (settings.videoSidebarHidden) toggleVideoSidebar(true);
        if (settings.commentsHidden) toggleComments(true);
        if (settings.notificationsBellHidden) toggleNotificationsBell(true);
        if (settings.topHeaderHidden) toggleTopHeader(true);
        if (settings.exploreSectionHidden) toggleExploreSection(true);
        if (settings.endScreenCardsHidden) toggleEndScreenCards(true);
        if (settings.moreFromYouTubeHidden) toggleMoreFromYouTube(true);
        if (settings.hideChannelHidden) toggleHideChannel(true);
        if (settings.buttonsBarHidden) toggleButtonsBar(true);
        if (settings.hideDescriptionHidden) toggleHideDescription(true);
        if (settings.grayscaleEnabled) toggleGrayscale(true);
        if (settings.shopHidden) toggleShop(true);
    }, 2000);
});
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
import { togglePlaylist } from './features/playlist.js';
import { toggleLivechat } from './features/livechat.js';

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
    grayscaleEnabled: false,
    playlistHidden: false,
    livechatHidden: false
};

// Initialize extension
function initialize() {
    chrome.storage.sync.get(['extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden', 'playlistHidden', 'livechatHidden'], (result) => {
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
        settings.playlistHidden = result.playlistHidden === true;
        settings.livechatHidden = result.livechatHidden === true;

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
            toggleLivechat(settings.livechatHidden);
        }
    });

    let currentUrl = location.href;
    const urlObserver = new MutationObserver(() => {
        if (location.href !== currentUrl) {
            currentUrl = location.href;
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
                 if (settings.playlistHidden) togglePlaylist(true);
                 if (settings.livechatHidden) toggleLivechat(true);
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
        if (key === 'extensionEnabled') settings.extensionEnabled = newValue !== false;
        else if (key === 'progressBarHidden') settings.progressBarHidden = newValue === true;
        else if (key === 'durationHidden') settings.durationHidden = newValue === true;
        else if (key === 'shortsHidden') settings.shortsHidden = newValue === true;
        else if (key === 'homeFeedHidden') settings.homeFeedHidden = newValue === true;
        else if (key === 'videoSidebarHidden') settings.videoSidebarHidden = newValue === true;
        else if (key === 'commentsHidden') settings.commentsHidden = newValue === true;
        else if (key === 'notificationsBellHidden') settings.notificationsBellHidden = newValue === true;
        else if (key === 'topHeaderHidden') settings.topHeaderHidden = newValue === true;
        else if (key === 'exploreSectionHidden') settings.exploreSectionHidden = newValue === true;
        else if (key === 'endScreenCardsHidden') settings.endScreenCardsHidden = newValue === true;
        else if (key === 'moreFromYouTubeHidden') settings.moreFromYouTubeHidden = newValue === true;
        else if (key === 'hideChannelHidden') settings.hideChannelHidden = newValue === true;
        else if (key === 'buttonsBarHidden') settings.buttonsBarHidden = newValue === true;
        else if (key === 'hideDescriptionHidden') settings.hideDescriptionHidden = newValue === true;
         else if (key === 'grayscaleEnabled') settings.grayscaleEnabled = newValue === true;
         else if (key === 'shopHidden') settings.shopHidden = newValue === true;
         else if (key === 'playlistHidden') settings.playlistHidden = newValue === true;
         else if (key === 'livechatHidden') settings.livechatHidden = newValue === true;
    }

    if (!settings.extensionEnabled) {
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
        togglePlaylist(false);
    } else {
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
             togglePlaylist(settings.playlistHidden);
             toggleLivechat(settings.livechatHidden);
         }
});

// Listen for messages from popup and background script
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'syncSettings') {
        for (const [key, value] of Object.entries(request.changes)) {
            if (key === 'extensionEnabled') settings.extensionEnabled = value !== false;
            else if (key === 'progressBarHidden') settings.progressBarHidden = value === true;
            else if (key === 'durationHidden') settings.durationHidden = value === true;
            else if (key === 'shortsHidden') settings.shortsHidden = value === true;
            else if (key === 'homeFeedHidden') settings.homeFeedHidden = value === true;
            else if (key === 'videoSidebarHidden') settings.videoSidebarHidden = value === true;
            else if (key === 'commentsHidden') settings.commentsHidden = value === true;
            else if (key === 'notificationsBellHidden') settings.notificationsBellHidden = value === true;
            else if (key === 'topHeaderHidden') settings.topHeaderHidden = value === true;
            else if (key === 'exploreSectionHidden') settings.exploreSectionHidden = value === true;
            else if (key === 'endScreenCardsHidden') settings.endScreenCardsHidden = value === true;
            else if (key === 'moreFromYouTubeHidden') settings.moreFromYouTubeHidden = value === true;
            else if (key === 'hideChannelHidden') settings.hideChannelHidden = value === true;
            else if (key === 'buttonsBarHidden') settings.buttonsBarHidden = value === true;
            else if (key === 'hideDescriptionHidden') settings.hideDescriptionHidden = value === true;
             else if (key === 'grayscaleEnabled') settings.grayscaleEnabled = value === true;
             else if (key === 'shopHidden') settings.shopHidden = value === true;
             else if (key === 'playlistHidden') settings.playlistHidden = value === true;
             else if (key === 'livechatHidden') settings.livechatHidden = value === true;
        }

        if (!settings.extensionEnabled) {
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
            togglePlaylist(false);
        } else {
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
             togglePlaylist(settings.playlistHidden);
             toggleLivechat(settings.livechatHidden);
         }

        sendResponse({ success: true });
        return true;
    }

    if (request.action === 'toggleProgressBar') {
        settings.progressBarHidden = request.enabled;
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
        toggleGrayscale(request.enabled);
        sendResponse({ success: true, willRefresh: false });
    } else if (request.action === 'toggleShop') {
        settings.shopHidden = request.enabled;
        toggleShop(request.enabled);
        sendResponse({ success: true, willRefresh: false });
    } else if (request.action === 'togglePlaylist') {
        settings.playlistHidden = request.enabled;
        togglePlaylist(request.enabled);
        sendResponse({ success: true, willRefresh: false });
    } else if (request.action === 'toggleLivechat') {
        settings.livechatHidden = request.enabled;
        toggleLivechat(request.enabled);
        sendResponse({ success: true, willRefresh: false });
    } else if (request.action === 'getStatus') {
        sendResponse(settings);
    }

    return true;
});

initialize();

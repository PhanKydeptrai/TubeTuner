// TubeTuner - Background Script for Tab Synchronization
(function() {
    'use strict';

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== 'sync') return;

        chrome.tabs.query({ url: ['*://www.youtube.com/*', '*://youtube.com/*'] }, (tabs) => {
            if (tabs.length === 0) return;

            const syncMessage = {
                action: 'syncSettings',
                changes: {}
            };

            for (const [key, change] of Object.entries(changes)) {
                // Skip non-setting keys like language, theme, sectionStates
                if (['language', 'theme', 'sectionStates'].includes(key)) {
                    continue;
                }
                syncMessage.changes[key] = change.newValue;
            }

            if (Object.keys(syncMessage.changes).length > 0) {
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, syncMessage).catch(error => {
                        // Ignore errors for tabs that might not have content script loaded yet
                    });
                });
            }
        });
    });

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.action === 'syncToAllTabs') {
            chrome.tabs.query({ url: ['*://www.youtube.com/*', '*://youtube.com/*'] }, (tabs) => {
                const message = {
                    action: request.toggleAction,
                    enabled: request.enabled
                };

                tabs.forEach(tab => {
                    // Skip the sender tab if specified
                    if (sender.tab && sender.tab.id === tab.id) return;

                    chrome.tabs.sendMessage(tab.id, message).catch(error => {});
                });
            });

            sendResponse({ success: true });
        }

        return true; // Keep message channel open for async response
    });

    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        if (changeInfo.status === 'complete' && 
            tab.url && 
            (tab.url.includes('youtube.com'))) {

            chrome.storage.sync.get([
                'extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden', 
                'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden',
                'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden',
                'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden',
                'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden', 'playlistHidden', 'livechatHidden', 'recommendationHidden'
            ], (settings) => {
                const syncMessage = {
                    action: 'syncSettings',
                    changes: settings,
                    isInitialSync: true
                };

                // Wait a bit for content script to load
                setTimeout(() => {
                    chrome.tabs.sendMessage(tabId, syncMessage).catch(error => {});
                }, 1000);
            });
        }
    });

})();

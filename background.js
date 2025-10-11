// TubeTuner - Background Script for Tab Synchronization
(function() {
    'use strict';

    console.log('TubeTuner background script loaded');

    // Listen for storage changes and sync across all YouTube tabs
    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace !== 'sync') return;

        console.log('🔄 Storage changed, syncing across tabs:', changes);

        // Get all YouTube tabs
        chrome.tabs.query({ url: ['*://www.youtube.com/*', '*://youtube.com/*'] }, (tabs) => {
            if (tabs.length === 0) return;

            console.log(`📡 Found ${tabs.length} YouTube tabs to sync`);

            // Prepare the sync message with all changed settings
            const syncMessage = {
                action: 'syncSettings',
                changes: {}
            };

            // Process each changed setting
            for (const [key, change] of Object.entries(changes)) {
                // Skip non-setting keys like language, theme, sectionStates
                if (['language', 'theme', 'sectionStates'].includes(key)) {
                    continue;
                }

                syncMessage.changes[key] = change.newValue;
                console.log(`📝 Setting changed: ${key} = ${change.newValue}`);
            }

            // Only send sync message if there are actual setting changes
            if (Object.keys(syncMessage.changes).length > 0) {
                // Send sync message to all YouTube tabs
                tabs.forEach(tab => {
                    chrome.tabs.sendMessage(tab.id, syncMessage).catch(error => {
                        // Ignore errors for tabs that might not have content script loaded yet
                        console.log(`⚠️ Could not sync to tab ${tab.id}:`, error.message);
                    });
                });
            }
        });
    });

    // Handle messages from content scripts or popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('📨 Background received message:', request);

        if (request.action === 'syncToAllTabs') {
            // Sync specific setting to all YouTube tabs
            chrome.tabs.query({ url: ['*://www.youtube.com/*', '*://youtube.com/*'] }, (tabs) => {
                const message = {
                    action: request.toggleAction,
                    enabled: request.enabled
                };

                tabs.forEach(tab => {
                    // Skip the sender tab if specified
                    if (sender.tab && sender.tab.id === tab.id) return;

                    chrome.tabs.sendMessage(tab.id, message).catch(error => {
                        console.log(`⚠️ Could not sync to tab ${tab.id}:`, error.message);
                    });
                });
            });

            sendResponse({ success: true });
        }

        return true; // Keep message channel open for async response
    });

    // Handle tab updates to ensure new YouTube tabs get current settings
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
        // Only process when tab is completely loaded and is a YouTube page
        if (changeInfo.status === 'complete' && 
            tab.url && 
            (tab.url.includes('youtube.com'))) {
            
            console.log('🆕 New YouTube tab loaded, syncing current settings');

            // Get all current settings and send to the new tab
            chrome.storage.sync.get([
                'progressBarHidden', 'durationHidden', 'shortsHidden', 
                'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden',
                'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden',
                'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden',
                'buttonsBarHidden', 'hideDescriptionHidden'
            ], (settings) => {
                // Send initial sync message to the new tab
                const syncMessage = {
                    action: 'syncSettings',
                    changes: settings,
                    isInitialSync: true
                };

                // Wait a bit for content script to load
                setTimeout(() => {
                    chrome.tabs.sendMessage(tabId, syncMessage).catch(error => {
                        console.log(`⚠️ Could not sync to new tab ${tabId}:`, error.message);
                    });
                }, 1000);
            });
        }
    });

})();

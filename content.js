// TubeTuner - Content Script
(function() {
    'use strict';

    // State variables
    let settings = {
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
        hideDescriptionHidden: false
    };

    // Add grayscale setting to internal state
    settings.grayscaleEnabled = false;
    
    // Simple function to toggle the progress bar
    function toggleProgressBar(hide) {
        // debug: toggle progress bar
        settings.progressBarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-progress-hidden');
            // added class youtube-progress-hidden
        } else {
            document.body.classList.remove('youtube-progress-hidden');
            // removed class youtube-progress-hidden
        }
    }

    // Function to toggle video duration
    function toggleDuration(hide) {
        // debug: toggle duration
        settings.durationHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-duration-hidden');
            // added class youtube-duration-hidden
        } else {
            document.body.classList.remove('youtube-duration-hidden');
            // removed class youtube-duration-hidden
        }
    }
    
    // Function to toggle Shorts
    function toggleShorts(hide) {
        // debug: toggle shorts
        settings.shortsHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-shorts-hidden');
            // added class youtube-shorts-hidden
            applyShortsFixes();
        } else {
            document.body.classList.remove('youtube-shorts-hidden');
            // removed class youtube-shorts-hidden
            restoreShorts();
        }
    }

    // Function to restore Shorts when the feature is turned off
    function restoreShorts() {
        // restoring Shorts visibility

        // Remove all JavaScript-added attributes
        const attributesToRemove = [
            'shorts-hidden',
            'shorts-section',
            'is-short',
            'shorts-video',
            'shorts-link',
            'shorts-element',
            'shorts-component',
            'shorts-tab'
        ];

        attributesToRemove.forEach(attr => {
            document.querySelectorAll(`[${attr}]`).forEach(element => {
                element.removeAttribute(attr);
            });
        });

        // Shorts visibility restored
    }

    // Function to toggle Home Feed
    function toggleHomeFeed(hide) {
        // debug: toggle home feed
        settings.homeFeedHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-home-feed-hidden');
            document.body.setAttribute('data-home-feed-hidden', 'true');
            // added class youtube-home-feed-hidden
            applyHomeFeedFixes();
        } else {
            document.body.classList.remove('youtube-home-feed-hidden');
            document.body.removeAttribute('data-home-feed-hidden');
            // removed class youtube-home-feed-hidden
            restoreHomeFeed();
        }
    }

    // Function to toggle Video Sidebar
    function toggleVideoSidebar(hide) {
        // debug: toggle video sidebar
        settings.videoSidebarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-video-sidebar-hidden');
            document.body.setAttribute('data-video-sidebar-hidden', 'true');
            // added class youtube-video-sidebar-hidden
            applyVideoSidebarFixes();
        } else {
            document.body.classList.remove('youtube-video-sidebar-hidden');
            document.body.removeAttribute('data-video-sidebar-hidden');
            // removed class youtube-video-sidebar-hidden
            restoreVideoSidebar();
        }
    }

    // Function to toggle Comments Section
    function toggleComments(hide) {
        // debug: toggle comments section
        settings.commentsHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-comments-hidden');
            document.body.setAttribute('data-comments-hidden', 'true');
            // added class youtube-comments-hidden
            applyCommentsFixes();
        } else {
            document.body.classList.remove('youtube-comments-hidden');
            document.body.removeAttribute('data-comments-hidden');
            // removed class youtube-comments-hidden
            restoreComments();
        }
    }

    // Function to toggle Notifications Bell
    function toggleNotificationsBell(hide) {
        // debug: toggle notifications bell
        settings.notificationsBellHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-notifications-bell-hidden');
            document.body.setAttribute('data-notifications-bell-hidden', 'true');
            // added class youtube-notifications-bell-hidden
            applyNotificationsBellFixes();
        } else {
            document.body.classList.remove('youtube-notifications-bell-hidden');
            document.body.removeAttribute('data-notifications-bell-hidden');
            // removed class youtube-notifications-bell-hidden
            restoreNotificationsBell();
        }
    }

    // Function to toggle Top Header/Navigation Bar
    function toggleTopHeader(hide) {
        // debug: toggle top header
        settings.topHeaderHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-top-header-hidden');
            document.body.setAttribute('data-top-header-hidden', 'true');
            // added class youtube-top-header-hidden
            applyTopHeaderFixes();
        } else {
            document.body.classList.remove('youtube-top-header-hidden');
            document.body.removeAttribute('data-top-header-hidden');
            // removed class youtube-top-header-hidden
            restoreTopHeader();
        }
    }

    // Function to toggle Explore Section
    function toggleExploreSection(hide) {
        // debug: toggle explore section
        settings.exploreSectionHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-explore-section-hidden');
            document.body.setAttribute('data-explore-section-hidden', 'true');
            // added class youtube-explore-section-hidden
            applyExploreSectionFixes();
        } else {
            document.body.classList.remove('youtube-explore-section-hidden');
            document.body.removeAttribute('data-explore-section-hidden');
            // removed class youtube-explore-section-hidden
            restoreExploreSection();
        }
    }

    // Function to toggle End Screen Cards/Annotations
    function toggleEndScreenCards(hide) {
        // debug: toggle end screen cards
        settings.endScreenCardsHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-end-screen-cards-hidden');
            document.body.setAttribute('data-end-screen-cards-hidden', 'true');
            // added class youtube-end-screen-cards-hidden
            applyEndScreenCardsFixes();
        } else {
            document.body.classList.remove('youtube-end-screen-cards-hidden');
            document.body.removeAttribute('data-end-screen-cards-hidden');
            // removed class youtube-end-screen-cards-hidden
            restoreEndScreenCards();
        }
    }

    // Function to toggle More from YouTube Section
    function toggleMoreFromYouTube(hide) {
        // debug: toggle more from YouTube
        settings.moreFromYouTubeHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-more-from-youtube-hidden');
            // added class youtube-more-from-youtube-hidden
            applyMoreFromYouTubeFixes();
        } else {
            document.body.classList.remove('youtube-more-from-youtube-hidden');
            // removed class youtube-more-from-youtube-hidden
            restoreMoreFromYouTube();
        }
    }

    // Function to toggle Hide Channel
    function toggleHideChannel(hide) {
        // debug: toggle hide channel
        settings.hideChannelHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-hide-channel-hidden');
            // added class youtube-hide-channel-hidden
            applyHideChannelFixes();
        } else {
            document.body.classList.remove('youtube-hide-channel-hidden');
            // removed class youtube-hide-channel-hidden
            restoreHideChannel();
        }
    }

    // Function to toggle Buttons Bar
    function toggleButtonsBar(hide) {
        // debug: toggle buttons bar
        settings.buttonsBarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-buttons-bar-hidden');
            // added class youtube-buttons-bar-hidden
            applyButtonsBarFixes();
        } else {
            document.body.classList.remove('youtube-buttons-bar-hidden');
            // removed class youtube-buttons-bar
            restoreButtonsBar();
        }
    }

    // Function to toggle Hide Description
    function toggleHideDescription(hide) {
        // debug: toggle hide description
        settings.hideDescriptionHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-hide-description-hidden');
            // added class youtube-hide-description-hidden
            applyHideDescriptionFixes();
        } else {
            document.body.classList.remove('youtube-hide-description-hidden');
            // removed class youtube-hide-description-hidden
            restoreHideDescription();
        }
    }

    // Function to toggle Grayscale (black & white) mode
    function toggleGrayscale(enabled) {
        settings.grayscaleEnabled = enabled;

        const styleId = 'tubetuner-grayscale-style';

        if (enabled) {
            document.body.classList.add('youtube-grayscale-enabled');

            // Inject style to apply grayscale only to specific elements without affecting layout
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    /* Apply grayscale only to video elements */
                    video,
                    .html5-video-player,
                    .video-stream {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to thumbnail images only */
                    yt-image img,
                    yt-img-shadow img,
                    .yt-core-image,
                    ytd-thumbnail img,
                    ytd-video-renderer img,
                    ytd-compact-video-renderer img,
                    ytd-grid-video-renderer img,
                    ytd-rich-item-renderer img,
                    ytd-reel-item-renderer img,
                    ytd-shorts img,
                    ytd-shorts-shelf-renderer img,
                    ytd-reel-shelf-renderer img,
                    ytd-shorts-compact-video-renderer img,
                    ytd-shorts-video-renderer img {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to specific content text that won't affect layout */
                    ytd-video-meta-block yt-formatted-string,
                    .ytd-video-meta-block .ytd-video-meta-block-info,
                    ytd-channel-renderer yt-formatted-string,
                    ytd-shelf-renderer yt-formatted-string,
                    ytd-rich-section-renderer yt-formatted-string,
                    yt-formatted-string,
                    ytd-rich-grid-media yt-formatted-string,
                    ytd-compact-video-renderer yt-formatted-string,
                    .yt-core-attributed-string,
                    .yt-core-attributed-string *,
                    #video-title,
                    #video-title *,
                    .ytd-video-renderer #video-title,
                    .ytd-compact-video-renderer #video-title,
                    .ytd-grid-video-renderer #video-title {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to YouTube logo */
                    #logo,
                    #logo *,
                    yt-icon,
                    yt-icon *,
                    .logo,
                    .yt-logo,
                    #masthead-logo,
                    yt-icon-shape,
                    .yt-spec-icon-shape,
                    #masthead #logo,
                    #masthead .logo,
                    a[href="/"] img,
                    a[href="/"] svg,
                    .yt-spec-button-shape-next yt-icon,
                    .yt-spec-button-shape-next yt-icon-shape {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to badges including Live badges */
                    .badge,
                    .yt-badge-shape,
                    .badge-style-type-simple,
                    .yt-thumbnail-overlay-badge-view-model,
                    .badge-shape,
                    .yt-badge {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to right panel (secondary) on watch pages */
                    #secondary,
                    #secondary * {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            document.body.classList.remove('youtube-grayscale-enabled');

            const existing = document.getElementById(styleId);
            if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        }
    }

    // Debug function to check Home Feed status
    function debugHomeFeedStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-home-feed-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-home-feed-hidden');
        const primaryElement = document.querySelector('ytd-browse[page-subtype="home"] #primary');
        const primaryHidden = primaryElement ? window.getComputedStyle(primaryElement).display === 'none' : false;
        const sidebarVisible = document.querySelector('#guide') ? window.getComputedStyle(document.querySelector('#guide')).display !== 'none' : false;

        // Debug Home Feed Status (Simple)
        // bodyHasClass: %s, bodyHasAttribute: %s, primaryHidden: %s, sidebarVisible: %s, isHomeFeedHidden: %s, currentPage: %s

        return {
            bodyHasClass,
            bodyHasAttribute,
            primaryHidden,
            sidebarVisible,
            isHomeFeedHidden
        };
    }

    // Debug function to check Video Sidebar status
    function debugVideoSidebarStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-video-sidebar-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-video-sidebar-hidden');
        const secondaryElement = document.querySelector('ytd-watch-flexy #secondary');
        const secondaryHidden = secondaryElement ? window.getComputedStyle(secondaryElement).display === 'none' : false;
        const isWatchPage = window.location.pathname.includes('/watch');

        // Debug Video Sidebar Status (Simple)
        // bodyHasClass: %s, bodyHasAttribute: %s, secondaryHidden: %s, isWatchPage: %s, isVideoSidebarHidden: %s, currentPage: %s

        return {
            bodyHasClass,
            bodyHasAttribute,
            secondaryHidden,
            isWatchPage,
            isVideoSidebarHidden
        };
    }

    // Debug function to check Comments status
    function debugCommentsStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-comments-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-comments-hidden');
        const commentsElement = document.querySelector('ytd-comments');
        const commentsHidden = commentsElement ? window.getComputedStyle(commentsElement).display === 'none' : false;
        const isWatchPage = window.location.pathname.includes('/watch');

        // Debug Comments Status (Simple)
        // bodyHasClass: %s, bodyHasAttribute: %s, commentsHidden: %s, isWatchPage: %s, settingsCommentsHidden: %s, currentPage: %s

        return {
            bodyHasClass,
            bodyHasAttribute,
            commentsHidden,
            isWatchPage,
            commentsHidden: settings.commentsHidden
        };
    }

    // Debug function to check Shorts status
    function debugShortsStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-shorts-hidden');
        const shortsLinks = document.querySelectorAll('a[href*="/shorts/"]');
        const hiddenShorts = Array.from(shortsLinks).filter(link =>
            window.getComputedStyle(link).display === 'none' ||
            window.getComputedStyle(link.closest('ytd-rich-grid-media, ytd-grid-video-renderer, ytd-video-renderer') || link).display === 'none'
        );

        // Debug Shorts Status
        // bodyHasClass: %s, totalShorts: %d, hiddenShorts: %d, isShortsHidden: %s

        return {
            bodyHasClass,
            totalShorts: shortsLinks.length,
            hiddenShorts: hiddenShorts.length,
            isShortsHidden
        };
    }

    // Debug function to check Notifications Bell status
    function debugNotificationsBellStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-notifications-bell-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-notifications-bell-hidden');
        const notificationsBellElement = document.querySelector('ytd-notification-topbar-button-renderer, #notification-button, button[aria-label*="Notifications"]');
        const notificationsBellHidden = notificationsBellElement ? window.getComputedStyle(notificationsBellElement).display === 'none' : false;

        // Debug Notifications Bell Status
        // bodyHasClass: %s, bodyHasAttribute: %s, notificationsBellHidden: %s, settingsNotificationsBellHidden: %s, currentPage: %s

        return {
            bodyHasClass,
            bodyHasAttribute,
            notificationsBellHidden,
            notificationsBellHidden: settings.notificationsBellHidden
        };
    }

    // Function to apply notifications bell hiding
    function applyNotificationsBellFixes() {
        if (!isNotificationsBellHidden) return;

        // applying notifications bell hiding fixes

        // Mark notifications bell elements for CSS targeting
        const notificationsBellSelectors = [
            'ytd-notification-topbar-button-renderer',
            '#notification-button',
            'button[aria-label*="Notifications"]',
            'button[aria-label*="notifications"]',
            'yt-icon-button[aria-label*="Notifications"]',
            'yt-icon-button[aria-label*="notifications"]'
        ];

        let hiddenCount = 0;
        notificationsBellSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('notifications-bell-element', 'true');
                hiddenCount++;
            });
        });

        // marked notifications bell elements for hiding: %d
    }

    // Function to restore notifications bell
    function restoreNotificationsBell() {
        // restoring notifications bell

        // Remove marking attributes
        document.querySelectorAll('[notifications-bell-element="true"]').forEach(element => {
            element.removeAttribute('notifications-bell-element');
        });

        // notifications bell restored
    }

    // Function to hide the top navigation bar
    function applyTopHeaderFixes() {
        if (!isTopHeaderHidden) return;

        // applying top header fixes

        let hiddenCount = 0;

        // Mark the top navigation bar elements
        const headerSelectors = [
            'ytd-masthead#masthead',
            '#masthead-container',
            'header#header.ytd-app',
            'div#masthead'
        ];

        headerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('top-header-element', 'true');
                hiddenCount++;
            });
        });

        // marked top header elements for hiding: %d
    }

    // Function to restore the top navigation bar
    function restoreTopHeader() {
        // restoring top header

        // Remove the marking attribute
        document.querySelectorAll('[top-header-element="true"]').forEach(element => {
            element.removeAttribute('top-header-element');
        });

        // top header restored
    }

    // Debug function for top navigation bar status
    function debugTopHeaderStatus() {
        const isHidden = document.body.classList.contains('youtube-top-header-hidden');
        const elements = document.querySelectorAll('[top-header-element="true"]');

        // Top Header Status (summary)

        elements.forEach((el, i) => {
            // listing element tag
        });
    }

    // Function to apply Explore Section hiding
    function applyExploreSectionFixes() {
        if (!settings.exploreSectionHidden) return;

        // applying Explore Section hiding

        const hideExploreSections = () => {
            // Find and hide the Explore section renderer
            const exploreSections = document.querySelectorAll('ytd-guide-section-renderer');

            exploreSections.forEach(section => {
                const titleElement = section.querySelector('yt-formatted-string#guide-section-title');
                if (titleElement && (titleElement.textContent.trim() === 'Explore' || titleElement.textContent.trim() === 'Khám phá')) {
                    section.setAttribute('hidden', 'true');
                }
            });
        };

        // Run immediately
        hideExploreSections();

        // Set up MutationObserver to monitor DOM changes for new guide sections
        if (!window.exploreSectionObserver) {
            window.exploreSectionObserver = new MutationObserver((mutations) => {
                let shouldReapply = false;
                mutations.forEach((mutation) => {
                    if (mutation.type === 'childList') {
                        mutation.addedNodes.forEach((node) => {
                            if (node.nodeType === Node.ELEMENT_NODE) {
                                // Check if added node is or contains guide section renderers
                                if (node.matches && (
                                    node.matches('ytd-guide-section-renderer') ||
                                    node.querySelector('ytd-guide-section-renderer')
                                )) {
                                    shouldReapply = true;
                                }
                            }
                        });
                    }
                });

                if (shouldReapply) {
                    // new guide sections detected, reapplying fixes
                    setTimeout(hideExploreSections, 100);
                }
            });

            window.exploreSectionObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Function to restore Explore Section
    function restoreExploreSection() {
        // restoring Explore Section

        // Remove hidden attributes from Explore section renderers
        document.querySelectorAll('ytd-guide-section-renderer[hidden="true"]').forEach(element => {
            element.removeAttribute('hidden');
        });

        // Disconnect observer if it exists
        if (window.exploreSectionObserver) {
            window.exploreSectionObserver.disconnect();
            window.exploreSectionObserver = null;
        }

        // Explore Section restored
    }

    // Debug function for End Screen Cards
    function debugEndScreenCardsStatus() {
        // Debug End Screen Cards Status (summary)
    }

    // Apply End Screen Cards hiding
    function applyEndScreenCardsFixes() {
        if (!isEndScreenCardsHidden) return;

        // applying End Screen Cards hiding

        const markEndScreenElements = () => {
            let hiddenCount = 0;

            // 1. END SCREEN ELEMENTS - Mark YouTube end screen elements
            const endScreenSelectors = [
                '.ytp-ce-element',
                '.ytp-ce-video',
                '.ytp-ce-playlist',
                '.ytp-ce-channel',
                '.ytp-ce-website',
                '.ytp-endscreen-content',
                '.ytp-ce-covering-overlay',
                '.ytp-ce-expanding-overlay'
            ];

            endScreenSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    if (!element.hasAttribute('end-screen-element')) {
                        element.setAttribute('end-screen-element', 'true');
                        hiddenCount++;
                    }
                });
            });

            // 2. CARD ELEMENTS - Mark YouTube card and annotation elements
            const cardSelectors = [
                '.ytp-cards-teaser',
                '.ytp-cards-button',
                '.iv-card',
                '.annotation',
                '.ytp-cards-button-icon',
                '.ytp-cards-teaser-box'
            ];

            cardSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    if (!element.hasAttribute('card-element')) {
                        element.setAttribute('card-element', 'true');
                        hiddenCount++;
                    }
                });
            });

            // marked end screen cards/annotation elements for hiding: %d
        };

        // Run immediately and set up MutationObserver to monitor DOM changes
        markEndScreenElements();

        // Set up observer to catch dynamically added end screen elements
        const endScreenObserver = new MutationObserver((mutations) => {
            let shouldReapply = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if added node contains end screen elements
                            if (node.matches && (
                                node.matches('.ytp-ce-element, .ytp-ce-video, .ytp-ce-playlist, .ytp-ce-channel, .ytp-ce-website, .ytp-endscreen-content, .ytp-cards-teaser, .ytp-cards-button, .iv-card, .annotation') ||
                                node.querySelector('.ytp-ce-element, .ytp-ce-video, .ytp-ce-playlist, .ytp-ce-channel, .ytp-ce-website, .ytp-endscreen-content, .ytp-cards-teaser, .ytp-cards-button, .iv-card, .annotation')
                            )) {
                                shouldReapply = true;
                            }
                        }
                    });
                }
            });

            if (shouldReapply) {
                // new end screen elements detected, reapplying fixes
                setTimeout(markEndScreenElements, 100);
            }
        });

        endScreenObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        // End Screen Cards hiding applied with observer
    }

    // Restore End Screen Cards
    function restoreEndScreenCards() {
        // restoring end screen cards elements

        // Remove all custom attributes
        document.querySelectorAll('[end-screen-element]').forEach(element => {
            element.removeAttribute('end-screen-element');
        });

        document.querySelectorAll('[card-element]').forEach(element => {
            element.removeAttribute('card-element');
        });

        // end screen cards elements restored
    }

    // Debug function for More from YouTube
    function debugMoreFromYouTubeStatus() {
        // Debug More from YouTube Status (summary)
    }

    // Hide "More from YouTube" guide section function
    function applyMoreFromYouTubeFixes() {
        if (!settings.moreFromYouTubeHidden) return;

        console.log('[TubeTuner] Applying More from YouTube hiding fixes');

        const hideMoreFromYouTubeSection = () => {
            let hiddenCount = 0;

            // Target the specific ytd-guide-section-renderer elements in sidebar
            const guideSections = document.querySelectorAll('ytd-guide-section-renderer.style-scope.ytd-guide-renderer[modern-typography][guide-persistent-and-visible]');

            console.log('[TubeTuner] Found', guideSections.length, 'guide section renderers');

            // Also check individual guide entries that might contain "More from YouTube"
            const guideEntries = document.querySelectorAll('ytd-guide-entry-renderer');
            console.log('[TubeTuner] Found', guideEntries.length, 'guide entry renderers');

            guideEntries.forEach((entry, index) => {
                if (entry.classList.contains('youtube-more-from-hidden') || entry.hasAttribute('data-more-from-processed')) {
                    return;
                }

                const entryText = entry.textContent.toLowerCase();
                console.log('[TubeTuner] Guide entry', index + 1, 'text:', entryText);

                if (entryText.includes('more from youtube') || entryText.includes('thêm từ youtube')) {
                    console.log('[TubeTuner] Found More from YouTube in guide entry, hiding it');
                    entry.classList.add('youtube-more-from-hidden');
                    entry.setAttribute('data-more-from-processed', 'true');
                    hiddenCount++;
                }
            });

            guideSections.forEach((section, index) => {
                // Skip if already processed
                if (section.classList.contains('youtube-more-from-hidden') || section.hasAttribute('data-more-from-processed')) {
                    return;
                }

                // Mark as processed to avoid reprocessing
                section.setAttribute('data-more-from-processed', 'true');

                // Get the text content of the section
                const sectionText = section.textContent.toLowerCase();
                console.log('[TubeTuner] Guide section', index + 1, 'text:', sectionText.substring(0, 100) + '...');

                // Check for "More from YouTube" patterns - more specific matching
                const isMoreFromYouTubeSection = (
                    sectionText.includes('more from youtube') ||
                    sectionText.includes('thêm từ youtube')
                );

                if (isMoreFromYouTubeSection) {
                    console.log('[TubeTuner] Found More from YouTube section, hiding it');
                    section.classList.add('youtube-more-from-hidden');
                    hiddenCount++;
                }
            });

            // Also check for any other elements that might contain "More from YouTube"
            const allElements = document.querySelectorAll('ytd-shelf-renderer, ytd-horizontal-card-list-renderer, ytd-rich-shelf-renderer, ytd-rich-grid-renderer, ytd-expanded-shelf-contents-renderer');

            console.log('[TubeTuner] Found', allElements.length, 'additional elements to check');

            allElements.forEach((element, index) => {
                if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) {
                    return;
                }

                element.setAttribute('data-more-from-processed', 'true');
                const elementText = element.textContent.toLowerCase();

                console.log('[TubeTuner] Additional element', index + 1, 'text:', elementText.substring(0, 100) + '...');

                if (elementText.includes('more from youtube') || elementText.includes('thêm từ youtube')) {
                    console.log('[TubeTuner] Found More from YouTube in additional element, hiding it');
                    element.classList.add('youtube-more-from-hidden');
                    hiddenCount++;
                }
            });

            // Search for elements that might be "More from YouTube" sections by their structure
            // Look for sections that contain links or buttons related to YouTube features
            const potentialSections = document.querySelectorAll('ytd-guide-section-renderer, ytd-rich-shelf-renderer, ytd-shelf-renderer, [class*="shelf"], [class*="section"]');
            console.log('[TubeTuner Debug] Found', potentialSections.length, 'potential sections to analyze');

            potentialSections.forEach((section, index) => {
                if (section.classList.contains('youtube-more-from-hidden') || section.hasAttribute('data-more-from-processed')) {
                    return;
                }

                // Check if this section contains YouTube-related links or has specific attributes
                const links = section.querySelectorAll('a[href*="/"], yt-formatted-string, #title-text');
                let hasYouTubeContent = false;
                let sectionTitle = '';

                links.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    const href = link.getAttribute('href') || '';

                    if (linkText.includes('youtube') || href.includes('/youtube') || href.includes('youtube.com')) {
                        hasYouTubeContent = true;
                        sectionTitle = linkText;
                    }
                });

                // Also check the section's own text content
                const sectionText = section.textContent.toLowerCase();
                if (sectionText.includes('more from youtube') || sectionText.includes('thêm từ youtube')) {
                    hasYouTubeContent = true;
                    sectionTitle = sectionText.split('more from youtube')[0].trim() || sectionText.split('thêm từ youtube')[0].trim();
                }

                if (hasYouTubeContent && (sectionTitle.includes('more from') || sectionTitle.includes('thêm từ'))) {
                    console.log('[TubeTuner] Found potential More from YouTube section:', sectionTitle);
                    section.classList.add('youtube-more-from-hidden');
                    section.setAttribute('data-more-from-processed', 'true');
                    hiddenCount++;
                }
            });

            // Additional broad search for any element containing "More from YouTube"
            if (hiddenCount === 0) {
                console.log('[TubeTuner] No elements hidden yet, doing broad search...');
                const allTextElements = document.querySelectorAll('*');
                let broadHiddenCount = 0;

                for (let i = 0; i < allTextElements.length && broadHiddenCount < 10; i++) {
                    const element = allTextElements[i];
                    if (element.children.length > 0) continue; // Skip elements with children
                    if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) continue;

                    const text = element.textContent.toLowerCase();
                    if ((text.includes('more from youtube') || text.includes('thêm từ youtube')) && text.length < 200) {
                        console.log('[TubeTuner] Broad search found:', text, 'in element:', element.tagName, element.className);

                        // Find parent container to hide
                        let parentToHide = element;
                        for (let depth = 0; depth < 5 && parentToHide; depth++) {
                            if (parentToHide.offsetHeight > 50 && parentToHide.offsetWidth > 100) {
                                parentToHide.classList.add('youtube-more-from-hidden');
                                parentToHide.setAttribute('data-more-from-processed', 'true');
                                broadHiddenCount++;
                                console.log('[TubeTuner] Hidden parent element at depth', depth);
                                break;
                            }
                            parentToHide = parentToHide.parentElement;
                        }
                    }
                }
                console.log('[TubeTuner] Broad search hidden', broadHiddenCount, 'additional elements');
            }

            // Simple and direct search for any element containing "More from YouTube"
            const allPageElements = document.querySelectorAll('*');
            let simpleHiddenCount = 0;

            for (let i = 0; i < allPageElements.length && simpleHiddenCount < 5; i++) {
                const element = allPageElements[i];
                if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) {
                    continue;
                }

                const text = element.textContent.toLowerCase();

                // Direct match for "More from YouTube" or "Thêm từ YouTube"
                if ((text.includes('more from youtube') || text.includes('thêm từ youtube')) && text.length < 300) {
                    console.log('[TubeTuner] Simple search found element with text:', text.substring(0, 150) + '...');

                    // Try to find a suitable parent to hide
                    let targetElement = element;

                    // Look for a parent that seems like a section or card
                    for (let depth = 0; depth < 8 && targetElement; depth++) {
                        const tagName = targetElement.tagName.toLowerCase();
                        const className = targetElement.className.toLowerCase();

                        // Good candidates to hide: sections, shelves, cards, etc.
                        if (tagName === 'ytd-rich-shelf-renderer' ||
                            tagName === 'ytd-shelf-renderer' ||
                            tagName === 'ytd-guide-section-renderer' ||
                            tagName === 'ytd-guide-entry-renderer' ||
                            className.includes('shelf') ||
                            className.includes('section') ||
                            (targetElement.offsetHeight > 100 && targetElement.offsetWidth > 200)) {

                            console.log('[TubeTuner] Hiding element at depth', depth, ':', tagName, className);
                            targetElement.classList.add('youtube-more-from-hidden');
                            targetElement.setAttribute('data-more-from-processed', 'true');
                            simpleHiddenCount++;
                            break;
                        }

                        targetElement = targetElement.parentElement;
                    }
                }
            }

            console.log('[TubeTuner] Simple search hidden', simpleHiddenCount, 'additional elements');
        };

        // Run immediately
        hideMoreFromYouTubeSection();

        // Run again after a short delay to catch dynamically loaded content
        setTimeout(hideMoreFromYouTubeSection, 1000);
        setTimeout(hideMoreFromYouTubeSection, 3000);

        // Set up observer to catch new elements
        if (!window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver = new MutationObserver((mutations) => {
                if (settings.moreFromYouTubeHidden) {
                    // Check if any significant DOM changes occurred
                    let hasSignificantChanges = false;
                    mutations.forEach(mutation => {
                        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            hasSignificantChanges = true;
                        }
                    });

                    if (hasSignificantChanges) {
                        console.log('[TubeTuner] Significant DOM changes detected, re-checking for More from YouTube');
                        clearTimeout(window.moreFromYouTubeTimeout);
                        window.moreFromYouTubeTimeout = setTimeout(hideMoreFromYouTubeSection, 500);
                    }
                }
            });

            window.moreFromYouTubeObserver.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false
            });
        }

        // More from YouTube hiding applied
    }

    // Restore More from YouTube
    function restoreMoreFromYouTube() {
        // restoring more from YouTube elements

        // Remove hiding class from all elements
        document.querySelectorAll('.youtube-more-from-hidden').forEach(element => {
            element.classList.remove('youtube-more-from-hidden');
        });

        // Remove processed markers
        document.querySelectorAll('[data-more-from-processed]').forEach(element => {
            element.removeAttribute('data-more-from-processed');
        });

        // Disconnect observer if it exists
        if (window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver.disconnect();
            window.moreFromYouTubeObserver = null;
        }

        // Clear timeout if it exists
        if (window.moreFromYouTubeTimeout) {
            clearTimeout(window.moreFromYouTubeTimeout);
            window.moreFromYouTubeTimeout = null;
        }

        // More from YouTube elements restored
    }

    // Apply Hide Channel fixes
    function applyHideChannelFixes() {
        if (!isHideChannelHidden) return;

        // applying hide channel fixes

        let hiddenCount = 0;

        // Hide channel name, avatar, and subscribe button in video pages
        const channelSelectors = [
            'ytd-channel-name',
            '#owner-container',
            '#channel-name',
            'ytd-video-owner-renderer',
            '#upload-info #owner-container',
            '#meta #owner',
            'ytd-video-secondary-info-renderer #owner',
            'ytd-subscribe-button-renderer',
            '#subscribe-button',
            'ytd-button-renderer#subscribe-button',
            'paper-button#subscribe-button',
            'yt-button-shape#subscribe-button'
        ];

        channelSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('hide-channel-element', 'true');
                hiddenCount++;
            });
        });

        // marked channel elements for hiding: %d
    }

    // Restore Hide Channel
    function restoreHideChannel() {
        // restoring channel elements

        // Remove hiding markers
        document.querySelectorAll('[hide-channel-element="true"]').forEach(element => {
            element.removeAttribute('hide-channel-element');
        });

        // channel elements restored
    }

    // Apply Buttons Bar fixes
    function applyButtonsBarFixes() {
        if (!isButtonsBarHidden) return;

        // applying buttons bar fixes

        let hiddenCount = 0;

        // Hide specific ytd-menu-renderer in watch metadata
        const buttonsBarSelectors = [
            'ytd-menu-renderer.style-scope.ytd-watch-metadata'
        ];

        buttonsBarSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('buttons-bar-element', 'true');
                hiddenCount++;
            });
        });

        // marked buttons bar elements for hiding: %d
    }

    // Restore Buttons Bar
    function restoreButtonsBar() {
        // restoring buttons bar elements

        // Remove hiding markers
        document.querySelectorAll('[buttons-bar-element="true"]').forEach(element => {
            element.removeAttribute('buttons-bar-element');
        });

        // buttons bar elements restored
    }

    // Apply Hide Description fixes
    function applyHideDescriptionFixes() {
        if (!isHideDescriptionHidden) return;

        // applying hide description fixes

        let hiddenCount = 0;

        // Hide video description
        const descriptionSelectors = [
            'ytd-video-secondary-info-renderer',
            '#description',
            '#meta-contents',
            'ytd-expandable-video-description-body-renderer',
            '#description-inner',
            '#expand'
        ];

        descriptionSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('hide-description-element', 'true');
                hiddenCount++;
            });
        });

        // marked description elements for hiding: %d
    }

    // Restore Hide Description
    function restoreHideDescription() {
        // restoring description elements

        // Remove hiding markers
        document.querySelectorAll('[hide-description-element="true"]').forEach(element => {
            element.removeAttribute('hide-description-element');
        });

        // description elements restored
    }

    // Debug functions for new features
    function debugHideChannelStatus() {
        const isHidden = document.body.classList.contains('youtube-hide-channel-hidden');
        const elements = document.querySelectorAll('[hide-channel-element="true"]');

        // Hide Channel Status (summary)
    }

    function debugButtonsBarStatus() {
        const isHidden = document.body.classList.contains('youtube-buttons-bar-hidden');
        const elements = document.querySelectorAll('[buttons-bar-element="true"]');

        // Buttons Bar Status (summary)
    }

    function debugHideDescriptionStatus() {
        const isHidden = document.body.classList.contains('youtube-hide-description-hidden');
        const elements = document.querySelectorAll('[hide-description-element="true"]');

        // Hide Description Status (summary)
    }

    // Hàm debug trạng thái Explore Section
    function debugExploreSectionStatus() {
        const isHidden = document.body.classList.contains('youtube-explore-section-hidden');
        const elements = document.querySelectorAll('[explore-section-element="true"]');
        const sections = document.querySelectorAll('[explore-section="true"]');

        // Explore Section Status (summary)

        // elements listing removed for brevity

        // sections listing removed for brevity
    }

    // Expose debug function globally for testing
    window.debugYouTubeExtension = {
        debugShortsStatus,
        toggleShorts,
        isShortsHidden: () => isShortsHidden,
        debugHomeFeedStatus,
        toggleHomeFeed,
        isHomeFeedHidden: () => isHomeFeedHidden,
        debugVideoSidebarStatus,
        toggleVideoSidebar,
        isVideoSidebarHidden: () => isVideoSidebarHidden,
        debugCommentsStatus,
        toggleComments,
        isCommentsHidden: () => isCommentsHidden,
        debugNotificationsBellStatus,
        toggleNotificationsBell,
        isNotificationsBellHidden: () => isNotificationsBellHidden,
        debugTopHeaderStatus,
        toggleTopHeader,
        isTopHeaderHidden: () => isTopHeaderHidden,
        debugExploreSectionStatus,
        toggleExploreSection,
        isExploreSectionHidden: () => settings.exploreSectionHidden
    };
    
    // Comprehensive Shorts hiding function
    function applyShortsFixes() {
        if (!isShortsHidden) return;

        const markShortsElements = () => {
            let hiddenCount = 0;

            // 1. SIDEBAR - Mark guide entries containing Shorts (let CSS handle hiding)
            document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer').forEach(entry => {
                const link = entry.querySelector('a[href="/shorts"], a[href*="/shorts"], a[title*="Shorts"], a[title*="shorts"]');
                if (link) {
                    entry.setAttribute('shorts-hidden', 'true');
                    hiddenCount++;
                }
            });

            // 2. SECTIONS - Mark sections with "Shorts" in title (let CSS handle hiding)
            document.querySelectorAll('ytd-rich-section-renderer, ytd-shelf-renderer').forEach(section => {
                const titleSelectors = [
                    '#title-text',
                    '.ytd-shelf-renderer #title-text',
                    'h2',
                    '.title',
                    '[role="heading"]'
                ];

                for (const selector of titleSelectors) {
                    const headerText = section.querySelector(selector);
                    if (headerText && headerText.textContent) {
                        const text = headerText.textContent.toLowerCase();
                        if (text.includes('shorts') || text.includes('short')) {
                            section.setAttribute('shorts-section', 'true');
                            hiddenCount++;
                            break;
                        }
                    }
                }
            });

            // 3. INDIVIDUAL VIDEOS - Mark all Shorts videos (let CSS handle hiding)
            document.querySelectorAll('a[href*="/shorts/"]').forEach(link => {
                // Mark the link itself
                link.setAttribute('shorts-link', 'true');

                // Find and mark all possible containers
                const containerSelectors = [
                    'ytd-grid-video-renderer',
                    'ytd-compact-video-renderer',
                    'ytd-video-renderer',
                    'ytd-rich-item-renderer',
                    'ytd-rich-grid-media',
                    'ytd-thumbnail',
                    'ytd-playlist-panel-video-renderer'
                ];

                containerSelectors.forEach(selector => {
                    const container = link.closest(selector);
                    if (container) {
                        container.setAttribute('is-short', 'true');
                        container.setAttribute('shorts-video', 'true');
                        hiddenCount++;
                    }
                });
            });

            // 4. ATTRIBUTE-BASED HIDING - Only specific YouTube Shorts elements
            const specificShortsSelectors = [
                'ytd-guide-entry-renderer[aria-label*="Shorts"]',
                'ytd-mini-guide-entry-renderer[aria-label*="Shorts"]',
                'ytd-guide-entry-renderer[title*="Shorts"]',
                'ytd-mini-guide-entry-renderer[title*="Shorts"]',
                'tp-yt-paper-tab[aria-label*="Shorts"]',
                'yt-tab-shape[aria-label*="Shorts"]'
            ];

            specificShortsSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    // Only mark, don't directly hide - let CSS handle it
                    element.setAttribute('shorts-element', 'true');
                    hiddenCount++;
                });
            });

            // 5. CHANNEL TABS - Mark Shorts tabs (let CSS handle hiding)
            document.querySelectorAll('tp-yt-paper-tab[tab-id="shorts"], yt-tab-shape').forEach(tab => {
                const tabTitle = tab.getAttribute('tab-title') || tab.textContent || '';
                if (tabTitle.toLowerCase().includes('shorts') || tabTitle.toLowerCase().includes('short')) {
                    tab.setAttribute('shorts-tab', 'true');
                    hiddenCount++;
                }
            });

            // 6. SPECIFIC SHORTS COMPONENTS - Only YouTube Shorts specific elements
            const shortsComponentSelectors = [
                'ytd-shorts',
                'ytd-shorts-shelf-renderer',
                'ytd-reel-shelf-renderer',
                'ytd-shorts-compact-video-renderer',
                'ytd-shorts-video-renderer',
                'ytd-reel-item-renderer',
                'ytm-shorts-lockup-view-model',
                'ytm-reel-item-renderer',
                'ytm-shorts-shelf-renderer'
            ];

            shortsComponentSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(element => {
                    element.setAttribute('shorts-component', 'true');
                    hiddenCount++;
                });
            });

            // total hidden count available for diagnostics if needed
        };

        // Run immediately and set up MutationObserver to monitor DOM changes
        markShortsElements();

        // Create an efficient observer to monitor DOM changes
        let observerTimeout;
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;

            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    // Check if any added nodes contain Shorts-related content
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === 1) { // Element node
                            const element = node;
                            if (element.querySelector &&
                                (element.querySelector('a[href*="/shorts/"]') ||
                                 element.textContent?.toLowerCase().includes('shorts'))) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });

            if (shouldUpdate) {
                // Debounce the updates to avoid excessive processing
                clearTimeout(observerTimeout);
                observerTimeout = setTimeout(() => {
                    markShortsElements();
                }, 500);
            }
        });

        // Configure and start observer
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Store observer for cleanup if needed
        window.shortsObserver = observer;
    }
    
    // Khởi tạo extension
    function initialize() {
        // Lấy trạng thái từ storage
        chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled'], (result) => {
            // Cập nhật settings object
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

            // Settings loaded

            // Áp dụng ngay
            setTimeout(() => {
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
                }
            }

            sendResponse({ success: true });
            return true;
        }

        // Handle direct toggle messages from popup
        if (request.action === 'toggleProgressBar') {
            toggleProgressBar(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleDuration') {
            toggleDuration(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleShorts') {
            toggleShorts(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHomeFeed') {
            toggleHomeFeed(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleVideoSidebar') {
            toggleVideoSidebar(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleComments') {
            toggleComments(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleNotificationsBell') {
            toggleNotificationsBell(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleTopHeader') {
            toggleTopHeader(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleExploreSection') {
            toggleExploreSection(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleEndScreenCards') {
            toggleEndScreenCards(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleMoreFromYouTube') {
            toggleMoreFromYouTube(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHideChannel') {
            toggleHideChannel(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleButtonsBar') {
            toggleButtonsBar(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHideDescription') {
            toggleHideDescription(request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleGrayscale') {
            // Direct toggle command from popup
            toggleGrayscale(request.enabled);
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
        }, 2000);
    });

})();

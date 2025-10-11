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
        exploreTrendingHidden: false,
        endScreenCardsHidden: false,
        moreFromYouTubeHidden: false,
        hideChannelHidden: false,
        buttonsBarHidden: false,
        hideDescriptionHidden: false
    };
    
    // Hàm đơn giản để toggle progress bar
    function toggleProgressBar(hide) {
        console.log('Toggle progress bar:', hide);
        settings.progressBarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-progress-hidden');
            console.log('Added class youtube-progress-hidden');
        } else {
            document.body.classList.remove('youtube-progress-hidden');
            console.log('Removed class youtube-progress-hidden');
        }
    }

    // Hàm toggle duration/thời lượng video
    function toggleDuration(hide) {
        console.log('Toggle duration:', hide);
        settings.durationHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-duration-hidden');
            console.log('Added class youtube-duration-hidden');
        } else {
            document.body.classList.remove('youtube-duration-hidden');
            console.log('Removed class youtube-duration-hidden');
        }
    }
    
    // Hàm toggle Shorts
    function toggleShorts(hide) {
        console.log('🎬 Toggle shorts:', hide);
        settings.shortsHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-shorts-hidden');
            console.log('✅ Added class youtube-shorts-hidden');
            applyShortsFixes();
        } else {
            document.body.classList.remove('youtube-shorts-hidden');
            console.log('❌ Removed class youtube-shorts-hidden');
            restoreShorts();
        }
    }

    // Hàm khôi phục Shorts khi tắt tính năng
    function restoreShorts() {
        console.log('🔄 Restoring Shorts visibility...');

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

        console.log('✅ Shorts visibility restored');
    }

    // Hàm toggle Home Feed
    function toggleHomeFeed(hide) {
        console.log('🏠 Toggle home feed:', hide);
        settings.homeFeedHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-home-feed-hidden');
            document.body.setAttribute('data-home-feed-hidden', 'true');
            console.log('✅ Added class youtube-home-feed-hidden');
            applyHomeFeedFixes();
        } else {
            document.body.classList.remove('youtube-home-feed-hidden');
            document.body.removeAttribute('data-home-feed-hidden');
            console.log('❌ Removed class youtube-home-feed-hidden');
            restoreHomeFeed();
        }
    }

    // Hàm toggle Video Sidebar
    function toggleVideoSidebar(hide) {
        console.log('📺 Toggle video sidebar:', hide);
        settings.videoSidebarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-video-sidebar-hidden');
            document.body.setAttribute('data-video-sidebar-hidden', 'true');
            console.log('✅ Added class youtube-video-sidebar-hidden');
            applyVideoSidebarFixes();
        } else {
            document.body.classList.remove('youtube-video-sidebar-hidden');
            document.body.removeAttribute('data-video-sidebar-hidden');
            console.log('❌ Removed class youtube-video-sidebar-hidden');
            restoreVideoSidebar();
        }
    }

    // Hàm toggle Comments Section
    function toggleComments(hide) {
        console.log('💬 Toggle comments section:', hide);
        settings.commentsHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-comments-hidden');
            document.body.setAttribute('data-comments-hidden', 'true');
            console.log('✅ Added class youtube-comments-hidden');
            applyCommentsFixes();
        } else {
            document.body.classList.remove('youtube-comments-hidden');
            document.body.removeAttribute('data-comments-hidden');
            console.log('❌ Removed class youtube-comments-hidden');
            restoreComments();
        }
    }

    // Hàm toggle Notifications Bell
    function toggleNotificationsBell(hide) {
        console.log('🔔 Toggle notifications bell:', hide);
        settings.notificationsBellHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-notifications-bell-hidden');
            document.body.setAttribute('data-notifications-bell-hidden', 'true');
            console.log('✅ Added class youtube-notifications-bell-hidden');
            applyNotificationsBellFixes();
        } else {
            document.body.classList.remove('youtube-notifications-bell-hidden');
            document.body.removeAttribute('data-notifications-bell-hidden');
            console.log('❌ Removed class youtube-notifications-bell-hidden');
            restoreNotificationsBell();
        }
    }

    // Hàm toggle Top Header/Navigation Bar
    function toggleTopHeader(hide) {
        console.log('🎯 Toggle top header:', hide);
        settings.topHeaderHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-top-header-hidden');
            document.body.setAttribute('data-top-header-hidden', 'true');
            console.log('✅ Added class youtube-top-header-hidden');
            applyTopHeaderFixes();
        } else {
            document.body.classList.remove('youtube-top-header-hidden');
            document.body.removeAttribute('data-top-header-hidden');
            console.log('❌ Removed class youtube-top-header-hidden');
            restoreTopHeader();
        }
    }

    // Hàm toggle Explore & Trending Tabs
    function toggleExploreTrending(hide) {
        console.log('🔍 Toggle explore trending:', hide);
        settings.exploreTrendingHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-explore-trending-hidden');
            document.body.setAttribute('data-explore-trending-hidden', 'true');
            console.log('✅ Added class youtube-explore-trending-hidden');
            applyExploreTrendingFixes();
        } else {
            document.body.classList.remove('youtube-explore-trending-hidden');
            document.body.removeAttribute('data-explore-trending-hidden');
            console.log('❌ Removed class youtube-explore-trending-hidden');
            restoreExploreTrending();
        }
    }

    // Hàm toggle End Screen Cards/Annotations
    function toggleEndScreenCards(hide) {
        console.log('🎬 Toggle end screen cards:', hide);
        settings.endScreenCardsHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-end-screen-cards-hidden');
            document.body.setAttribute('data-end-screen-cards-hidden', 'true');
            console.log('✅ Added class youtube-end-screen-cards-hidden');
            applyEndScreenCardsFixes();
        } else {
            document.body.classList.remove('youtube-end-screen-cards-hidden');
            document.body.removeAttribute('data-end-screen-cards-hidden');
            console.log('❌ Removed class youtube-end-screen-cards-hidden');
            restoreEndScreenCards();
        }
    }

    // Hàm toggle More from YouTube Section
    function toggleMoreFromYouTube(hide) {
        console.log('📺 Toggle more from YouTube:', hide);
        settings.moreFromYouTubeHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-more-from-youtube-hidden');
            console.log('✅ Added class youtube-more-from-youtube-hidden');
            applyMoreFromYouTubeFixes();
        } else {
            document.body.classList.remove('youtube-more-from-youtube-hidden');
            console.log('❌ Removed class youtube-more-from-youtube-hidden');
            restoreMoreFromYouTube();
        }
    }

    // Hàm toggle Hide Channel
    function toggleHideChannel(hide) {
        console.log('📺 Toggle hide channel:', hide);
        settings.hideChannelHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-hide-channel-hidden');
            console.log('✅ Added class youtube-hide-channel-hidden');
            applyHideChannelFixes();
        } else {
            document.body.classList.remove('youtube-hide-channel-hidden');
            console.log('❌ Removed class youtube-hide-channel-hidden');
            restoreHideChannel();
        }
    }

    // Hàm toggle Buttons Bar
    function toggleButtonsBar(hide) {
        console.log('🔘 Toggle buttons bar:', hide);
        settings.buttonsBarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-buttons-bar-hidden');
            console.log('✅ Added class youtube-buttons-bar-hidden');
            applyButtonsBarFixes();
        } else {
            document.body.classList.remove('youtube-buttons-bar-hidden');
            console.log('❌ Removed class youtube-buttons-bar-hidden');
            restoreButtonsBar();
        }
    }

    // Hàm toggle Hide Description
    function toggleHideDescription(hide) {
        console.log('📝 Toggle hide description:', hide);
        settings.hideDescriptionHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-hide-description-hidden');
            console.log('✅ Added class youtube-hide-description-hidden');
            applyHideDescriptionFixes();
        } else {
            document.body.classList.remove('youtube-hide-description-hidden');
            console.log('❌ Removed class youtube-hide-description-hidden');
            restoreHideDescription();
        }
    }

    // Hàm khôi phục Home Feed khi tắt tính năng
    function restoreHomeFeed() {
        console.log('🔄 Restoring Home Feed visibility...');

        // Simple approach: CSS will handle showing content when class is removed
        // No need for complex DOM manipulation

        console.log('✅ Home Feed visibility restored via CSS');
    }

    // Hàm khôi phục Video Sidebar khi tắt tính năng
    function restoreVideoSidebar() {
        console.log('🔄 Restoring Video Sidebar visibility...');

        // Simple approach: CSS will handle showing content when class is removed
        // No need for complex DOM manipulation

        console.log('✅ Video Sidebar visibility restored via CSS');
    }

    // Hàm khôi phục Comments khi tắt tính năng
    function restoreComments() {
        console.log('🔄 Restoring Comments visibility...');

        // Simple approach: CSS will handle showing content when class is removed
        // No need for complex DOM manipulation

        console.log('✅ Comments visibility restored via CSS');
    }

    // Simple Home Feed hiding function
    function applyHomeFeedFixes() {
        if (!isHomeFeedHidden) return;

        console.log('🏠 Applying simple Home Feed hiding...');

        // Simple approach: just hide the main content area on home page
        // CSS will handle the rest with: body.youtube-home-feed-hidden ytd-browse[page-subtype="home"] #primary

        // No need for complex DOM manipulation or marking elements
        // The CSS rule is sufficient and won't interfere with sidebar navigation

        console.log('✅ Home Feed hiding applied via CSS');
    }

    // Simple Video Sidebar hiding function
    function applyVideoSidebarFixes() {
        if (!isVideoSidebarHidden) return;

        console.log('📺 Applying simple Video Sidebar hiding...');

        // Simple approach: just hide the secondary column on video watch pages
        // CSS will handle the rest with: body.youtube-video-sidebar-hidden ytd-watch-flexy #secondary

        // No need for complex DOM manipulation or marking elements
        // The CSS rule is sufficient and will hide all sidebar content

        console.log('✅ Video Sidebar hiding applied via CSS');
    }

    // Simple Comments hiding function
    function applyCommentsFixes() {
        if (!isCommentsHidden) return;

        console.log('💬 Applying simple Comments hiding...');

        // Simple approach: just hide the comments section on video watch pages
        // CSS will handle the rest with: body.youtube-comments-hidden ytd-comments

        // No need for complex DOM manipulation or marking elements
        // The CSS rule is sufficient and will hide all comments content

        console.log('✅ Comments hiding applied via CSS');
    }

    // Hàm debug để kiểm tra trạng thái Home Feed
    function debugHomeFeedStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-home-feed-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-home-feed-hidden');
        const primaryElement = document.querySelector('ytd-browse[page-subtype="home"] #primary');
        const primaryHidden = primaryElement ? window.getComputedStyle(primaryElement).display === 'none' : false;
        const sidebarVisible = document.querySelector('#guide') ? window.getComputedStyle(document.querySelector('#guide')).display !== 'none' : false;

        console.log('🔍 Debug Home Feed Status (Simple):');
        console.log('   Body has class:', bodyHasClass);
        console.log('   Body has data attribute:', bodyHasAttribute);
        console.log('   Primary content hidden:', primaryHidden);
        console.log('   Sidebar visible:', sidebarVisible);
        console.log('   isHomeFeedHidden variable:', isHomeFeedHidden);
        console.log('   Current page:', window.location.pathname);

        return {
            bodyHasClass,
            bodyHasAttribute,
            primaryHidden,
            sidebarVisible,
            isHomeFeedHidden
        };
    }

    // Hàm debug để kiểm tra trạng thái Video Sidebar
    function debugVideoSidebarStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-video-sidebar-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-video-sidebar-hidden');
        const secondaryElement = document.querySelector('ytd-watch-flexy #secondary');
        const secondaryHidden = secondaryElement ? window.getComputedStyle(secondaryElement).display === 'none' : false;
        const isWatchPage = window.location.pathname.includes('/watch');

        console.log('🔍 Debug Video Sidebar Status (Simple):');
        console.log('   Body has class:', bodyHasClass);
        console.log('   Body has data attribute:', bodyHasAttribute);
        console.log('   Secondary content hidden:', secondaryHidden);
        console.log('   Is watch page:', isWatchPage);
        console.log('   isVideoSidebarHidden variable:', isVideoSidebarHidden);
        console.log('   Current page:', window.location.pathname);

        return {
            bodyHasClass,
            bodyHasAttribute,
            secondaryHidden,
            isWatchPage,
            isVideoSidebarHidden
        };
    }

    // Hàm debug để kiểm tra trạng thái Comments
    function debugCommentsStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-comments-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-comments-hidden');
        const commentsElement = document.querySelector('ytd-comments');
        const commentsHidden = commentsElement ? window.getComputedStyle(commentsElement).display === 'none' : false;
        const isWatchPage = window.location.pathname.includes('/watch');

        console.log('🔍 Debug Comments Status (Simple):');
        console.log('   Body has class:', bodyHasClass);
        console.log('   Body has data attribute:', bodyHasAttribute);
        console.log('   Comments content hidden:', commentsHidden);
        console.log('   Is watch page:', isWatchPage);
        console.log('   commentsHidden variable:', settings.commentsHidden);
        console.log('   Current page:', window.location.pathname);

        return {
            bodyHasClass,
            bodyHasAttribute,
            commentsHidden,
            isWatchPage,
            commentsHidden: settings.commentsHidden
        };
    }

    // Hàm debug để kiểm tra trạng thái Shorts
    function debugShortsStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-shorts-hidden');
        const shortsLinks = document.querySelectorAll('a[href*="/shorts/"]');
        const hiddenShorts = Array.from(shortsLinks).filter(link =>
            window.getComputedStyle(link).display === 'none' ||
            window.getComputedStyle(link.closest('ytd-rich-grid-media, ytd-grid-video-renderer, ytd-video-renderer') || link).display === 'none'
        );

        console.log('🔍 Debug Shorts Status:');
        console.log('   Body has class:', bodyHasClass);
        console.log('   Total shorts found:', shortsLinks.length);
        console.log('   Hidden shorts:', hiddenShorts.length);
        console.log('   isShortsHidden variable:', isShortsHidden);

        return {
            bodyHasClass,
            totalShorts: shortsLinks.length,
            hiddenShorts: hiddenShorts.length,
            isShortsHidden
        };
    }

    // Hàm debug để kiểm tra trạng thái Notifications Bell
    function debugNotificationsBellStatus() {
        const bodyHasClass = document.body.classList.contains('youtube-notifications-bell-hidden');
        const bodyHasAttribute = document.body.hasAttribute('data-notifications-bell-hidden');
        const notificationsBellElement = document.querySelector('ytd-notification-topbar-button-renderer, #notification-button, button[aria-label*="Notifications"]');
        const notificationsBellHidden = notificationsBellElement ? window.getComputedStyle(notificationsBellElement).display === 'none' : false;

        console.log('🔍 Debug Notifications Bell Status:');
        console.log('   Body has class:', bodyHasClass);
        console.log('   Body has data attribute:', bodyHasAttribute);
        console.log('   Notifications bell hidden:', notificationsBellHidden);
        console.log('   notificationsBellHidden variable:', settings.notificationsBellHidden);
        console.log('   Current page:', window.location.pathname);

        return {
            bodyHasClass,
            bodyHasAttribute,
            notificationsBellHidden,
            notificationsBellHidden: settings.notificationsBellHidden
        };
    }

    // Hàm áp dụng ẩn notifications bell
    function applyNotificationsBellFixes() {
        if (!isNotificationsBellHidden) return;

        console.log('🔔 Applying notifications bell hiding fixes...');

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

        console.log(`🔔 Marked ${hiddenCount} notifications bell elements for hiding`);
    }

    // Hàm khôi phục notifications bell
    function restoreNotificationsBell() {
        console.log('🔔 Restoring notifications bell...');

        // Remove marking attributes
        document.querySelectorAll('[notifications-bell-element="true"]').forEach(element => {
            element.removeAttribute('notifications-bell-element');
        });

        console.log('🔔 Notifications bell restored');
    }

    // Hàm ẩn thanh điều hướng trên cùng
    function applyTopHeaderFixes() {
        if (!isTopHeaderHidden) return;

        console.log('🎯 Applying top header fixes...');

        let hiddenCount = 0;

        // Đánh dấu các phần tử của thanh điều hướng trên cùng
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

        console.log(`🎯 Marked ${hiddenCount} top header elements for hiding`);
    }

    // Hàm khôi phục thanh điều hướng trên cùng
    function restoreTopHeader() {
        console.log('🎯 Restoring top header...');

        // Xóa thuộc tính đánh dấu
        document.querySelectorAll('[top-header-element="true"]').forEach(element => {
            element.removeAttribute('top-header-element');
        });

        console.log('🎯 Top header restored');
    }

    // Hàm debug trạng thái thanh điều hướng trên cùng
    function debugTopHeaderStatus() {
        const isHidden = document.body.classList.contains('youtube-top-header-hidden');
        const elements = document.querySelectorAll('[top-header-element="true"]');

        console.log('🎯 Top Header Status:');
        console.log(`- Hidden: ${isHidden}`);
        console.log(`- Marked elements: ${elements.length}`);

        elements.forEach((el, i) => {
            console.log(`- Element ${i+1}: ${el.tagName}#${el.id || 'no-id'}.${Array.from(el.classList).join('.')}`);
        });
    }

    // Hàm áp dụng Explore & Trending hiding
    function applyExploreTrendingFixes() {
        if (!isExploreTrendingHidden) return;

        console.log('🔍 Applying Explore & Trending hiding...');

        // Mark Explore and Trending navigation elements for hiding
        const exploreElements = document.querySelectorAll(`
            ytd-guide-entry-renderer a[title*="Explore"],
            ytd-guide-entry-renderer a[title*="Trending"],
            ytd-guide-entry-renderer a[title*="Khám phá"],
            ytd-guide-entry-renderer a[title*="Thịnh hành"],
            ytd-guide-entry-renderer a[href*="/feed/explore"],
            ytd-guide-entry-renderer a[href*="/feed/trending"],
            ytd-guide-entry-renderer a[href*="/explore"],
            ytd-guide-entry-renderer a[href*="/trending"],
            ytd-mini-guide-entry-renderer a[title*="Explore"],
            ytd-mini-guide-entry-renderer a[title*="Trending"],
            ytd-mini-guide-entry-renderer a[title*="Khám phá"],
            ytd-mini-guide-entry-renderer a[title*="Thịnh hành"],
            ytd-mini-guide-entry-renderer a[href*="/feed/explore"],
            ytd-mini-guide-entry-renderer a[href*="/feed/trending"],
            ytd-mini-guide-entry-renderer a[href*="/explore"],
            ytd-mini-guide-entry-renderer a[href*="/trending"]
        `);

        // Also mark ytd-guide-section-renderer containers that contain Explore elements
        const exploreSections = document.querySelectorAll(`
            ytd-guide-section-renderer:has(ytd-guide-entry-renderer a[href*="/explore"]),
            ytd-guide-section-renderer:has(ytd-guide-entry-renderer a[title*="Explore"]),
            ytd-guide-section-renderer:has(ytd-guide-entry-renderer a[title*="Khám phá"])
        `);

        let hiddenCount = 0;
        exploreElements.forEach(element => {
            if (element && !element.hasAttribute('explore-trending-element')) {
                element.setAttribute('explore-trending-element', 'true');
                // Also mark the parent guide entry renderer
                const parentGuideEntry = element.closest('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer');
                if (parentGuideEntry) {
                    parentGuideEntry.setAttribute('explore-trending-hidden', 'true');
                }
                hiddenCount++;
            }
        });

        // Mark ytd-guide-section-renderer containers
        exploreSections.forEach(section => {
            if (section && !section.hasAttribute('explore-trending-section')) {
                section.setAttribute('explore-trending-section', 'true');
                hiddenCount++;
            }
        });

        console.log(`🔍 Marked ${hiddenCount} explore/trending elements and sections for hiding`);
    }

    // Hàm khôi phục Explore & Trending tabs
    function restoreExploreTrending() {
        console.log('🔍 Restoring Explore & Trending tabs...');

        // Remove marking attributes
        document.querySelectorAll('[explore-trending-element="true"]').forEach(element => {
            element.removeAttribute('explore-trending-element');
        });

        document.querySelectorAll('[explore-trending-hidden="true"]').forEach(element => {
            element.removeAttribute('explore-trending-hidden');
        });

        // Remove section marking attributes
        document.querySelectorAll('[explore-trending-section="true"]').forEach(element => {
            element.removeAttribute('explore-trending-section');
        });

        console.log('🔍 Explore & Trending tabs and sections restored');
    }

    // Debug function for End Screen Cards
    function debugEndScreenCardsStatus() {
        console.log('🎬 Debug End Screen Cards Status:');
        console.log('- Body class:', document.body.classList.contains('youtube-end-screen-cards-hidden'));
        console.log('- Data attribute:', document.body.getAttribute('data-end-screen-cards-hidden'));

        // Check for end screen elements
        const endScreenElements = document.querySelectorAll('.ytp-ce-element, .ytp-ce-video, .ytp-ce-playlist, .ytp-ce-channel, .ytp-ce-website, .ytp-endscreen-content, .ytp-ce-covering-overlay, .ytp-ce-expanding-overlay');
        console.log('- End screen elements found:', endScreenElements.length);

        const cardElements = document.querySelectorAll('.ytp-cards-teaser, .ytp-cards-button, .iv-card, .annotation');
        console.log('- Card/annotation elements found:', cardElements.length);
    }

    // Apply End Screen Cards hiding
    function applyEndScreenCardsFixes() {
        if (!isEndScreenCardsHidden) return;

        console.log('🎬 Applying End Screen Cards hiding...');

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

            console.log(`🎯 Marked ${hiddenCount} end screen cards/annotation elements for hiding`);
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
                console.log('🎬 New end screen elements detected, reapplying fixes...');
                setTimeout(markEndScreenElements, 100);
            }
        });

        endScreenObserver.observe(document.body, {
            childList: true,
            subtree: true
        });

        console.log('✅ End Screen Cards hiding applied with observer');
    }

    // Restore End Screen Cards
    function restoreEndScreenCards() {
        console.log('🎬 Restoring end screen cards elements...');

        // Remove all custom attributes
        document.querySelectorAll('[end-screen-element]').forEach(element => {
            element.removeAttribute('end-screen-element');
        });

        document.querySelectorAll('[card-element]').forEach(element => {
            element.removeAttribute('card-element');
        });

        console.log('✅ End screen cards elements restored');
    }

    // Debug function for More from YouTube
    function debugMoreFromYouTubeStatus() {
        console.log('📺 Debug More from YouTube Status:');
        console.log('- Body class:', document.body.classList.contains('youtube-more-from-youtube-hidden'));

        // Check for hidden elements
        const hiddenElements = document.querySelectorAll('.youtube-more-from-hidden');
        console.log('- Hidden More from YouTube elements:', hiddenElements.length);

        // Check for guide section renderers specifically
        const guideSections = document.querySelectorAll('ytd-guide-section-renderer.style-scope.ytd-guide-renderer[modern-typography][guide-persistent-and-visible]');
        console.log('- Total guide section renderers found:', guideSections.length);

        // Check guide sections for "More from YouTube" content
        let potentialGuideSections = 0;
        guideSections.forEach(section => {
            const text = section.textContent.toLowerCase();
            if (text.includes('more from') || text.includes('thêm từ')) {
                potentialGuideSections++;
                console.log('- Found potential guide section:', text.substring(0, 100) + '...');
            }
        });
        console.log('- Potential More from YouTube guide sections:', potentialGuideSections);

        // Also check other elements
        const otherElements = document.querySelectorAll('ytd-shelf-renderer, ytd-horizontal-card-list-renderer, ytd-rich-shelf-renderer');
        console.log('- Total other shelf elements found:', otherElements.length);

        let potentialOtherElements = 0;
        otherElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            if (text.includes('more from') || text.includes('thêm từ')) {
                potentialOtherElements++;
                console.log('- Found potential other element:', element.tagName, text.substring(0, 80) + '...');
            }
        });
        console.log('- Potential More from YouTube other elements:', potentialOtherElements);
    }

    // Hide "More from YouTube" guide section function
    function applyMoreFromYouTubeFixes() {
        if (!isMoreFromYouTubeHidden) return;

        console.log('📺 Applying More from YouTube hiding...');

        const hideMoreFromYouTubeSection = () => {
            let hiddenCount = 0;

            // Target the specific ytd-guide-section-renderer elements in sidebar
            const guideSections = document.querySelectorAll('ytd-guide-section-renderer.style-scope.ytd-guide-renderer[modern-typography][guide-persistent-and-visible]');

            console.log(`🔍 Found ${guideSections.length} guide section renderers`);

            guideSections.forEach(section => {
                // Skip if already processed
                if (section.classList.contains('youtube-more-from-hidden') || section.hasAttribute('data-more-from-processed')) {
                    return;
                }

                // Mark as processed to avoid reprocessing
                section.setAttribute('data-more-from-processed', 'true');

                // Get the text content of the section
                const sectionText = section.textContent.toLowerCase();

                console.log('🔍 Checking guide section text:', sectionText.substring(0, 100) + '...');

                // Check for "More from YouTube" patterns
                const isMoreFromYouTubeSection = (
                    sectionText.includes('more from youtube') ||
                    sectionText.includes('thêm từ youtube') ||
                    sectionText.includes('more from') ||
                    sectionText.includes('thêm từ')
                );

                if (isMoreFromYouTubeSection) {
                    section.classList.add('youtube-more-from-hidden');
                    hiddenCount++;
                    console.log('🎯 Hidden More from YouTube guide section:', sectionText.substring(0, 80) + '...');
                }
            });

            // Also check for any other elements that might contain "More from YouTube"
            const allElements = document.querySelectorAll('ytd-shelf-renderer, ytd-horizontal-card-list-renderer, ytd-rich-shelf-renderer');

            allElements.forEach(element => {
                if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) {
                    return;
                }

                element.setAttribute('data-more-from-processed', 'true');
                const elementText = element.textContent.toLowerCase();

                if (elementText.includes('more from') || elementText.includes('thêm từ')) {
                    element.classList.add('youtube-more-from-hidden');
                    hiddenCount++;
                    console.log('🎯 Hidden More from YouTube content element:', element.tagName);
                }
            });

            console.log(`✅ Hidden ${hiddenCount} "More from YouTube" elements total`);
        };

        // Run immediately
        hideMoreFromYouTubeSection();

        // Set up observer to catch new elements
        if (!window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver = new MutationObserver(() => {
                if (isMoreFromYouTubeHidden) {
                    clearTimeout(window.moreFromYouTubeTimeout);
                    window.moreFromYouTubeTimeout = setTimeout(hideMoreFromYouTubeSection, 500);
                }
            });

            window.moreFromYouTubeObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        console.log('✅ More from YouTube hiding applied');
    }

    // Restore More from YouTube
    function restoreMoreFromYouTube() {
        console.log('📺 Restoring more from YouTube elements...');

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

        console.log('✅ More from YouTube elements restored');
    }

    // Apply Hide Channel fixes
    function applyHideChannelFixes() {
        if (!isHideChannelHidden) return;

        console.log('📺 Applying hide channel fixes...');

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

        console.log(`📺 Marked ${hiddenCount} channel elements for hiding`);
    }

    // Restore Hide Channel
    function restoreHideChannel() {
        console.log('📺 Restoring channel elements...');

        // Remove hiding markers
        document.querySelectorAll('[hide-channel-element="true"]').forEach(element => {
            element.removeAttribute('hide-channel-element');
        });

        console.log('✅ Channel elements restored');
    }

    // Apply Buttons Bar fixes
    function applyButtonsBarFixes() {
        if (!isButtonsBarHidden) return;

        console.log('🔘 Applying buttons bar fixes...');

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

        console.log(`🔘 Marked ${hiddenCount} buttons bar elements for hiding`);
    }

    // Restore Buttons Bar
    function restoreButtonsBar() {
        console.log('🔘 Restoring buttons bar elements...');

        // Remove hiding markers
        document.querySelectorAll('[buttons-bar-element="true"]').forEach(element => {
            element.removeAttribute('buttons-bar-element');
        });

        console.log('✅ Buttons bar elements restored');
    }

    // Apply Hide Description fixes
    function applyHideDescriptionFixes() {
        if (!isHideDescriptionHidden) return;

        console.log('📝 Applying hide description fixes...');

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

        console.log(`📝 Marked ${hiddenCount} description elements for hiding`);
    }

    // Restore Hide Description
    function restoreHideDescription() {
        console.log('📝 Restoring description elements...');

        // Remove hiding markers
        document.querySelectorAll('[hide-description-element="true"]').forEach(element => {
            element.removeAttribute('hide-description-element');
        });

        console.log('✅ Description elements restored');
    }

    // Debug functions for new features
    function debugHideChannelStatus() {
        const isHidden = document.body.classList.contains('youtube-hide-channel-hidden');
        const elements = document.querySelectorAll('[hide-channel-element="true"]');

        console.log('📺 Hide Channel Status:');
        console.log(`- Hidden: ${isHidden}`);
        console.log(`- Marked elements: ${elements.length}`);
    }

    function debugButtonsBarStatus() {
        const isHidden = document.body.classList.contains('youtube-buttons-bar-hidden');
        const elements = document.querySelectorAll('[buttons-bar-element="true"]');

        console.log('🔘 Buttons Bar Status:');
        console.log(`- Hidden: ${isHidden}`);
        console.log(`- Marked elements: ${elements.length}`);
    }

    function debugHideDescriptionStatus() {
        const isHidden = document.body.classList.contains('youtube-hide-description-hidden');
        const elements = document.querySelectorAll('[hide-description-element="true"]');

        console.log('📝 Hide Description Status:');
        console.log(`- Hidden: ${isHidden}`);
        console.log(`- Marked elements: ${elements.length}`);
    }

    // Hàm debug trạng thái Explore & Trending
    function debugExploreTrendingStatus() {
        const isHidden = document.body.classList.contains('youtube-explore-trending-hidden');
        const elements = document.querySelectorAll('[explore-trending-element="true"]');
        const sections = document.querySelectorAll('[explore-trending-section="true"]');

        console.log('🔍 Explore & Trending Status:');
        console.log(`- Hidden: ${isHidden}`);
        console.log(`- Marked elements: ${elements.length}`);
        console.log(`- Marked sections: ${sections.length}`);

        elements.forEach((el, i) => {
            console.log(`- Element ${i+1}: ${el.tagName}#${el.id || 'no-id'}.${Array.from(el.classList).join('.')}`);
        });

        sections.forEach((section, i) => {
            console.log(`- Section ${i+1}: ${section.tagName}#${section.id || 'no-id'}.${Array.from(section.classList).join('.')}`);
        });
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
        debugExploreTrendingStatus,
        toggleExploreTrending,
        isExploreTrendingHidden: () => isExploreTrendingHidden
    };
    
    // Comprehensive Shorts hiding function
    function applyShortsFixes() {
        if (!isShortsHidden) return;

        console.log('🎬 Applying comprehensive Shorts fixes...');

        const markShortsElements = () => {
            let hiddenCount = 0;

            // 1. SIDEBAR - Mark guide entries containing Shorts (let CSS handle hiding)
            document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer').forEach(entry => {
                const link = entry.querySelector('a[href="/shorts"], a[href*="/shorts"], a[title*="Shorts"], a[title*="shorts"]');
                if (link) {
                    entry.setAttribute('shorts-hidden', 'true');
                    hiddenCount++;
                    console.log('✅ Marked sidebar Shorts entry');
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
                            console.log('✅ Marked Shorts section:', headerText.textContent);
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
                    console.log('✅ Marked Shorts tab');
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

            console.log(`🎯 Total elements hidden: ${hiddenCount}`);
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
                    console.log('🔄 DOM changed, reapplying Shorts hiding...');
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
        console.log('TubeTuner initialized');

        // Lấy trạng thái từ storage
        chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden'], (result) => {
            // Cập nhật settings object
            settings.progressBarHidden = result.progressBarHidden === true;
            settings.durationHidden = result.durationHidden === true;
            settings.shortsHidden = result.shortsHidden === true;
            settings.homeFeedHidden = result.homeFeedHidden === true;
            settings.videoSidebarHidden = result.videoSidebarHidden === true;
            settings.commentsHidden = result.commentsHidden === true;
            settings.notificationsBellHidden = result.notificationsBellHidden === true;
            settings.topHeaderHidden = result.topHeaderHidden === true;
            settings.exploreTrendingHidden = result.exploreTrendingHidden === true;
            settings.endScreenCardsHidden = result.endScreenCardsHidden === true;
            settings.moreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
            settings.hideChannelHidden = result.hideChannelHidden === true;
            settings.buttonsBarHidden = result.buttonsBarHidden === true;
            settings.hideDescriptionHidden = result.hideDescriptionHidden === true;

            console.log('Settings loaded:', settings);

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
                toggleExploreTrending(settings.exploreTrendingHidden);
                toggleEndScreenCards(settings.endScreenCardsHidden);
                toggleMoreFromYouTube(settings.moreFromYouTubeHidden);
                toggleHideChannel(settings.hideChannelHidden);
                toggleButtonsBar(settings.buttonsBarHidden);
                toggleHideDescription(settings.hideDescriptionHidden);
            }, 1000);
        });
        
        // Theo dõi thay đổi URL (YouTube SPA)
        let currentUrl = location.href;
        const urlObserver = new MutationObserver(() => {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                console.log('URL changed, reapplying extension');
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
                    if (settings.exploreTrendingHidden) toggleExploreTrending(true);
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

        console.log('🔄 Storage changed in this tab, applying changes:', changes);

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
                case 'exploreTrendingHidden':
                    settings.exploreTrendingHidden = newValue === true;
                    toggleExploreTrending(settings.exploreTrendingHidden);
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
            }
        }
    });

    // Lắng nghe message từ popup và background script
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
        console.log('🔔 Received message:', request);

        // Handle sync messages from background script
        if (request.action === 'syncSettings') {
            console.log('🔄 Syncing settings from background script:', request.changes);

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
                    case 'exploreTrendingHidden':
                        settings.exploreTrendingHidden = value === true;
                        toggleExploreTrending(settings.exploreTrendingHidden);
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
                }
            }

            sendResponse({ success: true });
            return true;
        }

        // Handle direct toggle messages from popup
        if (request.action === 'toggleProgressBar') {
            toggleProgressBar(request.enabled);
            console.log('✅ Progress bar toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleDuration') {
            toggleDuration(request.enabled);
            console.log('✅ Duration toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleShorts') {
            console.log('🎬 Processing toggleShorts request, enabled:', request.enabled);
            toggleShorts(request.enabled);
            console.log('✅ Shorts toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHomeFeed') {
            console.log('🏠 Processing toggleHomeFeed request, enabled:', request.enabled);
            toggleHomeFeed(request.enabled);
            console.log('✅ Home Feed toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleVideoSidebar') {
            console.log('📺 Processing toggleVideoSidebar request, enabled:', request.enabled);
            toggleVideoSidebar(request.enabled);
            console.log('✅ Video Sidebar toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleComments') {
            console.log('💬 Processing toggleComments request, enabled:', request.enabled);
            toggleComments(request.enabled);
            console.log('✅ Comments toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleNotificationsBell') {
            console.log('🔔 Processing toggleNotificationsBell request, enabled:', request.enabled);
            toggleNotificationsBell(request.enabled);
            console.log('✅ Notifications Bell toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleTopHeader') {
            console.log('🎯 Processing toggleTopHeader request, enabled:', request.enabled);
            toggleTopHeader(request.enabled);
            console.log('✅ Top Header toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleExploreTrending') {
            console.log('🔍 Processing toggleExploreTrending request, enabled:', request.enabled);
            toggleExploreTrending(request.enabled);
            console.log('✅ Explore Trending toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleEndScreenCards') {
            console.log('🎬 Processing toggleEndScreenCards request, enabled:', request.enabled);
            toggleEndScreenCards(request.enabled);
            console.log('✅ End Screen Cards toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleMoreFromYouTube') {
            console.log('📺 Processing toggleMoreFromYouTube request, enabled:', request.enabled);
            toggleMoreFromYouTube(request.enabled);
            console.log('✅ More from YouTube toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHideChannel') {
            console.log('📺 Processing toggleHideChannel request, enabled:', request.enabled);
            toggleHideChannel(request.enabled);
            console.log('✅ Hide Channel toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleButtonsBar') {
            console.log('🔘 Processing toggleButtonsBar request, enabled:', request.enabled);
            toggleButtonsBar(request.enabled);
            console.log('✅ Buttons Bar toggled to:', request.enabled);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHideDescription') {
            console.log('📝 Processing toggleHideDescription request, enabled:', request.enabled);
            toggleHideDescription(request.enabled);
            console.log('✅ Hide Description toggled to:', request.enabled);
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
            console.log('Window loaded, reapplying extension');
            if (settings.progressBarHidden) toggleProgressBar(true);
            if (settings.durationHidden) toggleDuration(true);
            if (settings.shortsHidden) toggleShorts(true);
            if (settings.homeFeedHidden) toggleHomeFeed(true);
            if (settings.videoSidebarHidden) toggleVideoSidebar(true);
            if (settings.commentsHidden) toggleComments(true);
            if (settings.notificationsBellHidden) toggleNotificationsBell(true);
            if (settings.topHeaderHidden) toggleTopHeader(true);
            if (settings.exploreTrendingHidden) toggleExploreTrending(true);
            if (settings.endScreenCardsHidden) toggleEndScreenCards(true);
            if (settings.moreFromYouTubeHidden) toggleMoreFromYouTube(true);
            if (settings.hideChannelHidden) toggleHideChannel(true);
            if (settings.buttonsBarHidden) toggleButtonsBar(true);
            if (settings.hideDescriptionHidden) toggleHideDescription(true);
        }, 2000);
    });

})();

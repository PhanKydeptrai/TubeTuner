// YouTube Progress Bar Hider - Phiên bản đơn giản và hiệu quả
(function() {
    'use strict';

    let isProgressHidden = true;
    let isDurationHidden = true;
    let isShortsHidden = false;
    let isHomeFeedHidden = false;
    let isVideoSidebarHidden = false;
    let isCommentsHidden = false;
    
    // Hàm đơn giản để toggle progress bar
    function toggleProgressBar(hide) {
        console.log('Toggle progress bar:', hide);
        
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

        if (hide) {
            document.body.classList.add('youtube-shorts-hidden');
            console.log('✅ Added class youtube-shorts-hidden');
            applyShortsFixes();

            // Debug: kiểm tra ngay sau khi áp dụng
            setTimeout(() => {
                debugShortsStatus();
            }, 500);
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

        if (hide) {
            document.body.classList.add('youtube-home-feed-hidden');
            // Add data attribute to help with CSS targeting
            document.body.setAttribute('data-home-feed-hidden', 'true');
            console.log('✅ Added class youtube-home-feed-hidden');
            applyHomeFeedFixes();

            // Debug: kiểm tra ngay sau khi áp dụng
            setTimeout(() => {
                debugHomeFeedStatus();
            }, 500);
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

        if (hide) {
            document.body.classList.add('youtube-video-sidebar-hidden');
            // Add data attribute to help with CSS targeting
            document.body.setAttribute('data-video-sidebar-hidden', 'true');
            console.log('✅ Added class youtube-video-sidebar-hidden');
            applyVideoSidebarFixes();

            // Debug: kiểm tra ngay sau khi áp dụng
            setTimeout(() => {
                debugVideoSidebarStatus();
            }, 500);
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

        if (hide) {
            document.body.classList.add('youtube-comments-hidden');
            // Add data attribute to help with CSS targeting
            document.body.setAttribute('data-comments-hidden', 'true');
            console.log('✅ Added class youtube-comments-hidden');
            applyCommentsFixes();

            // Debug: kiểm tra ngay sau khi áp dụng
            setTimeout(() => {
                debugCommentsStatus();
            }, 500);
        } else {
            document.body.classList.remove('youtube-comments-hidden');
            document.body.removeAttribute('data-comments-hidden');
            console.log('❌ Removed class youtube-comments-hidden');
            restoreComments();
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
        console.log('   isCommentsHidden variable:', isCommentsHidden);
        console.log('   Current page:', window.location.pathname);

        return {
            bodyHasClass,
            bodyHasAttribute,
            commentsHidden,
            isWatchPage,
            isCommentsHidden
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
        isCommentsHidden: () => isCommentsHidden
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
        console.log('YouTube Progress Bar & Duration Hider initialized');
        
        // Lấy trạng thái từ storage
        chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'autoRefreshEnabled'], (result) => {
            isProgressHidden = result.progressBarHidden !== false;
            isDurationHidden = result.durationHidden !== false;
            isShortsHidden = result.shortsHidden === true;
            isHomeFeedHidden = result.homeFeedHidden === true;
            isVideoSidebarHidden = result.videoSidebarHidden === true;
            isCommentsHidden = result.commentsHidden === true;
            console.log('Progress bar hidden:', isProgressHidden);
            console.log('Duration hidden:', isDurationHidden);
            console.log('Shorts hidden:', isShortsHidden);
            console.log('Home Feed hidden:', isHomeFeedHidden);
            console.log('Video Sidebar hidden:', isVideoSidebarHidden);
            console.log('Comments hidden:', isCommentsHidden);
            console.log('Auto-refresh enabled:', result.autoRefreshEnabled !== false);

            // Áp dụng ngay
            setTimeout(() => {
                toggleProgressBar(isProgressHidden);
                toggleDuration(isDurationHidden);
                toggleShorts(isShortsHidden);
                toggleHomeFeed(isHomeFeedHidden);
                toggleVideoSidebar(isVideoSidebarHidden);
                toggleComments(isCommentsHidden);
            }, 1000);
        });
        
        // Theo dõi thay đổi URL (YouTube SPA)
        let currentUrl = location.href;
        const urlObserver = new MutationObserver(() => {
            if (location.href !== currentUrl) {
                currentUrl = location.href;
                console.log('URL changed, reapplying extension');
                setTimeout(() => {
                    if (isProgressHidden) {
                        toggleProgressBar(true);
                    }
                    if (isDurationHidden) {
                        toggleDuration(true);
                    }
                    if (isShortsHidden) {
                        toggleShorts(true);
                    }
                    if (isHomeFeedHidden) {
                        toggleHomeFeed(true);
                    }
                    if (isVideoSidebarHidden) {
                        toggleVideoSidebar(true);
                    }
                    if (isCommentsHidden) {
                        toggleComments(true);
                    }
                }, 2000);
            }
        });
        
        urlObserver.observe(document, { 
            subtree: true, 
            childList: true 
        });
    }
    
    // Lắng nghe message từ popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('🔔 Received message:', request);

        if (request.action === 'toggleProgressBar') {
            isProgressHidden = request.enabled;
            toggleProgressBar(isProgressHidden);
            console.log('✅ Progress bar toggled to:', isProgressHidden);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleDuration') {
            isDurationHidden = request.enabled;
            toggleDuration(isDurationHidden);
            console.log('✅ Duration toggled to:', isDurationHidden);
            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleShorts') {
            console.log('🎬 Processing toggleShorts request, enabled:', request.enabled);
            isShortsHidden = request.enabled;
            toggleShorts(isShortsHidden);
            console.log('✅ Shorts toggled to:', isShortsHidden);

            // Thêm delay nhỏ để đảm bảo CSS được áp dụng
            setTimeout(() => {
                const bodyHasClass = document.body.classList.contains('youtube-shorts-hidden');
                console.log('🔍 Body class check after toggle:', bodyHasClass);

                // Kiểm tra số lượng shorts videos
                const shortsCount = document.querySelectorAll('a[href*="/shorts/"]').length;
                console.log('📊 Found shorts videos:', shortsCount);
            }, 100);

            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleHomeFeed') {
            console.log('🏠 Processing toggleHomeFeed request, enabled:', request.enabled);
            isHomeFeedHidden = request.enabled;
            toggleHomeFeed(isHomeFeedHidden);
            console.log('✅ Home Feed toggled to:', isHomeFeedHidden);

            // Thêm delay nhỏ để đảm bảo CSS được áp dụng
            setTimeout(() => {
                const bodyHasClass = document.body.classList.contains('youtube-home-feed-hidden');
                console.log('🔍 Body class check after toggle:', bodyHasClass);

                // Kiểm tra số lượng home feed elements
                const homeFeedCount = document.querySelectorAll('[home-feed-content="true"]').length;
                console.log('📊 Found home feed elements:', homeFeedCount);
            }, 100);

            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleVideoSidebar') {
            console.log('📺 Processing toggleVideoSidebar request, enabled:', request.enabled);
            isVideoSidebarHidden = request.enabled;
            toggleVideoSidebar(isVideoSidebarHidden);
            console.log('✅ Video Sidebar toggled to:', isVideoSidebarHidden);

            // Thêm delay nhỏ để đảm bảo CSS được áp dụng
            setTimeout(() => {
                const bodyHasClass = document.body.classList.contains('youtube-video-sidebar-hidden');
                console.log('🔍 Body class check after toggle:', bodyHasClass);

                // Kiểm tra số lượng sidebar elements
                const sidebarCount = document.querySelectorAll('ytd-watch-flexy #secondary').length;
                console.log('📊 Found sidebar elements:', sidebarCount);
            }, 100);

            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'toggleComments') {
            console.log('💬 Processing toggleComments request, enabled:', request.enabled);
            isCommentsHidden = request.enabled;
            toggleComments(isCommentsHidden);
            console.log('✅ Comments toggled to:', isCommentsHidden);

            // Thêm delay nhỏ để đảm bảo CSS được áp dụng
            setTimeout(() => {
                const bodyHasClass = document.body.classList.contains('youtube-comments-hidden');
                console.log('🔍 Body class check after toggle:', bodyHasClass);

                // Kiểm tra số lượng comments elements
                const commentsCount = document.querySelectorAll('ytd-comments').length;
                console.log('📊 Found comments elements:', commentsCount);
            }, 100);

            sendResponse({ success: true, willRefresh: false });

        } else if (request.action === 'getStatus') {
            sendResponse({
                progressHidden: isProgressHidden,
                durationHidden: isDurationHidden,
                shortsHidden: isShortsHidden,
                homeFeedHidden: isHomeFeedHidden,
                videoSidebarHidden: isVideoSidebarHidden,
                commentsHidden: isCommentsHidden
            });
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
            if (isProgressHidden) {
                toggleProgressBar(true);
            }
            if (isDurationHidden) {
                toggleDuration(true);
            }
            if (isShortsHidden) {
                toggleShorts(true);
            }
            if (isHomeFeedHidden) {
                toggleHomeFeed(true);
            }
            if (isVideoSidebarHidden) {
                toggleVideoSidebar(true);
            }
            if (isCommentsHidden) {
                toggleComments(true);
            }
        }, 2000);
    });

})();

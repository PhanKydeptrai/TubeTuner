// YouTube Progress Bar Hider - Phiên bản đơn giản và hiệu quả
(function() {
    'use strict';

    let isProgressHidden = true;
    let isDurationHidden = true;
    let isShortsHidden = false;
    
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
        console.log('Toggle shorts:', hide);
        
        if (hide) {
            document.body.classList.add('youtube-shorts-hidden');
            console.log('Added class youtube-shorts-hidden');
            applyShortsFixes();
        } else {
            document.body.classList.remove('youtube-shorts-hidden');
            console.log('Removed class youtube-shorts-hidden');
        }
    }
    
    // Hàm để áp dụng các fix cho việc ẩn Shorts
    function applyShortsFixes() {
        if (!isShortsHidden) return;
        
        console.log('Applying Shorts fixes');
        
        // Thêm class cho các phần tử chứa Shorts
        const markShortsElements = () => {
            // Tìm các section chứa Shorts
            document.querySelectorAll('ytd-rich-section-renderer').forEach(section => {
                const headerText = section.querySelector('#title-text');
                if (headerText && headerText.textContent && headerText.textContent.includes('Shorts')) {
                    section.classList.add('ytd-shorts-section');
                }
            });
            
            document.querySelectorAll('ytd-shelf-renderer').forEach(shelf => {
                const headerText = shelf.querySelector('#title-text');
                if (headerText && headerText.textContent && headerText.textContent.includes('Shorts')) {
                    shelf.classList.add('ytd-shorts-section');
                }
            });
            
            // Đánh dấu các video là shorts
            document.querySelectorAll('a[href*="/shorts/"]').forEach(link => {
                let videoRenderer = link.closest('ytd-grid-video-renderer, ytd-compact-video-renderer, ytd-video-renderer, ytd-rich-item-renderer');
                if (videoRenderer) {
                    videoRenderer.setAttribute('is-short', 'true');
                }
                
                let thumbnail = link.closest('ytd-thumbnail');
                if (thumbnail) {
                    thumbnail.setAttribute('is-short', 'true');
                }
                
                let gridMedia = link.closest('ytd-rich-grid-media');
                if (gridMedia) {
                    gridMedia.setAttribute('is-short', 'true');
                }
            });
        };
        
        // Chạy ngay lập tức và thiết lập MutationObserver để theo dõi các thay đổi DOM
        markShortsElements();
        
        // Tạo một observer để theo dõi các thay đổi trong DOM
        const observer = new MutationObserver((mutations) => {
            let shouldUpdate = false;
            
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    shouldUpdate = true;
                }
            });
            
            if (shouldUpdate) {
                markShortsElements();
            }
        });
        
        // Cấu hình và bắt đầu observer
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Khởi tạo extension
    function initialize() {
        console.log('YouTube Progress Bar & Duration Hider initialized');
        
        // Lấy trạng thái từ storage
        chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'autoRefreshEnabled'], (result) => {
            isProgressHidden = result.progressBarHidden !== false;
            isDurationHidden = result.durationHidden !== false;
            isShortsHidden = result.shortsHidden === true;
            console.log('Progress bar hidden:', isProgressHidden);
            console.log('Duration hidden:', isDurationHidden);
            console.log('Shorts hidden:', isShortsHidden);
            console.log('Auto-refresh enabled:', result.autoRefreshEnabled !== false);
            
            // Áp dụng ngay
            setTimeout(() => {
                toggleProgressBar(isProgressHidden);
                toggleDuration(isDurationHidden);
                toggleShorts(isShortsHidden);
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
        console.log('Received message:', request);
        
        if (request.action === 'toggleProgressBar') {
            isProgressHidden = request.enabled;
            toggleProgressBar(isProgressHidden);
            console.log('Progress bar toggled to:', isProgressHidden);
            
            // Luôn phản hồi thành công, không phụ thuộc vào auto-refresh
            sendResponse({ success: true, willRefresh: false });
        } else if (request.action === 'toggleDuration') {
            isDurationHidden = request.enabled;
            toggleDuration(isDurationHidden);
            console.log('Duration toggled to:', isDurationHidden);
            
            // Luôn phản hồi thành công, không phụ thuộc vào auto-refresh
            sendResponse({ success: true, willRefresh: false });
        } else if (request.action === 'toggleShorts') {
            isShortsHidden = request.enabled;
            toggleShorts(isShortsHidden);
            console.log('Shorts toggled to:', isShortsHidden);
            
            // Luôn phản hồi thành công, không phụ thuộc vào auto-refresh
            sendResponse({ success: true, willRefresh: false });
        } else if (request.action === 'getStatus') {
            sendResponse({ 
                progressHidden: isProgressHidden,
                durationHidden: isDurationHidden,
                shortsHidden: isShortsHidden
            });
        }
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
        }, 2000);
    });

})();

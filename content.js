// YouTube Progress Bar Hider - Phiên bản đơn giản và hiệu quả
(function() {
    'use strict';

    let isProgressHidden = true;
    let isDurationHidden = true;
    
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
    }    // Khởi tạo extension
    function initialize() {
        console.log('YouTube Progress Bar & Duration Hider initialized');
        
        // Lấy trạng thái từ storage
        chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'autoRefreshEnabled'], (result) => {
            isProgressHidden = result.progressBarHidden !== false;
            isDurationHidden = result.durationHidden !== false;
            console.log('Progress bar hidden:', isProgressHidden);
            console.log('Duration hidden:', isDurationHidden);
            console.log('Auto-refresh enabled:', result.autoRefreshEnabled !== false);
            
            // Áp dụng ngay
            setTimeout(() => {
                toggleProgressBar(isProgressHidden);
                toggleDuration(isDurationHidden);
            }, 1000);
        });        // Theo dõi thay đổi URL (YouTube SPA)
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
                }, 2000);
            }
        });
        
        urlObserver.observe(document, { 
            subtree: true, 
            childList: true 
        });
    }    // Lắng nghe message từ popup
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log('Received message:', request);
        
        if (request.action === 'toggleProgressBar') {
            isProgressHidden = request.enabled;
            toggleProgressBar(isProgressHidden);
            console.log('Progress bar toggled to:', isProgressHidden);
            
            // Nếu có auto-refresh, không cần phản hồi ngay vì trang sẽ được refresh
            if (request.autoRefresh) {
                console.log('Auto-refresh is enabled, page will be refreshed');
                sendResponse({ success: true, willRefresh: true });
            } else {
                sendResponse({ success: true, willRefresh: false });
            }
        } else if (request.action === 'toggleDuration') {
            isDurationHidden = request.enabled;
            toggleDuration(isDurationHidden);
            console.log('Duration toggled to:', isDurationHidden);
            
            // Nếu có auto-refresh, không cần phản hồi ngay vì trang sẽ được refresh
            if (request.autoRefresh) {
                console.log('Auto-refresh is enabled, page will be refreshed');
                sendResponse({ success: true, willRefresh: true });
            } else {
                sendResponse({ success: true, willRefresh: false });
            }
        } else if (request.action === 'getStatus') {
            sendResponse({ 
                progressHidden: isProgressHidden,
                durationHidden: isDurationHidden
            });
        }
    });

    // Chạy khi document ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }    // Backup khi window load
    window.addEventListener('load', () => {
        setTimeout(() => {
            console.log('Window loaded, reapplying extension');
            if (isProgressHidden) {
                toggleProgressBar(true);
            }
            if (isDurationHidden) {
                toggleDuration(true);
            }
        }, 2000);
    });

})();

// YouTube Progress Bar Hider Popup Script
document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const durationSwitch = document.getElementById('durationSwitch');
    const autoRefreshSwitch = document.getElementById('autoRefreshSwitch');
    const status = document.getElementById('status');
    
    // Lấy trạng thái hiện tại
    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'autoRefreshEnabled'], function(result) {
        const isEnabled = result.progressBarHidden !== false; // Mặc định là true
        const durationHidden = result.durationHidden !== false; // Mặc định là true
        const autoRefreshEnabled = result.autoRefreshEnabled !== false; // Mặc định là true
        updateUI(isEnabled, durationHidden);
        updateAutoRefreshUI(autoRefreshEnabled);
    });
    
    // Xử lý click toggle extension
    toggleSwitch.addEventListener('click', function() {
        const currentlyActive = toggleSwitch.classList.contains('active');
        const newState = !currentlyActive;
        
        // Cập nhật UI
        chrome.storage.sync.get(['durationHidden'], function(result) {
            updateUI(newState, result.durationHidden !== false);
        });
        
        // Lưu trạng thái
        chrome.storage.sync.set({ progressBarHidden: newState });
        
        handleToggleChange('toggleProgressBar', newState);
    });
    
    // Xử lý click toggle duration
    durationSwitch.addEventListener('click', function() {
        const currentlyActive = durationSwitch.classList.contains('active');
        const newState = !currentlyActive;
        
        // Cập nhật UI
        chrome.storage.sync.get(['progressBarHidden'], function(result) {
            updateUI(result.progressBarHidden !== false, newState);
        });
        
        // Lưu trạng thái
        chrome.storage.sync.set({ durationHidden: newState });
        
        handleToggleChange('toggleDuration', newState);
    });
    
    // Xử lý click toggle auto-refresh
    autoRefreshSwitch.addEventListener('click', function() {
        const currentlyActive = autoRefreshSwitch.classList.contains('active');
        const newState = !currentlyActive;
        
        // Cập nhật UI
        updateAutoRefreshUI(newState);
        
        // Lưu trạng thái
        chrome.storage.sync.set({ autoRefreshEnabled: newState });
    });
    
    function handleToggleChange(action, enabled) {
        // Kiểm tra auto-refresh
        chrome.storage.sync.get(['autoRefreshEnabled'], function(result) {
            const autoRefreshEnabled = result.autoRefreshEnabled !== false;
            
            // Gửi message đến content script
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                if (tabs[0] && (tabs[0].url.includes('youtube.com'))) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        action: action,
                        enabled: enabled,
                        autoRefresh: autoRefreshEnabled
                    }, function(response) {
                        if (chrome.runtime.lastError) {
                            console.log('Content script chưa sẵn sàng, extension sẽ hoạt động khi tải lại trang.');
                        }
                        
                        // Nếu auto-refresh được bật, refresh trang
                        if (autoRefreshEnabled) {
                            chrome.tabs.reload(tabs[0].id);
                        }
                    });
                }
            });
        });
    }
    
    function updateUI(progressHidden, durationHidden) {
        // Update progress bar toggle
        if (progressHidden) {
            toggleSwitch.classList.add('active');
        } else {
            toggleSwitch.classList.remove('active');
        }
        
        // Update duration toggle
        if (durationHidden) {
            durationSwitch.classList.add('active');
        } else {
            durationSwitch.classList.remove('active');
        }
        
        // Update status
        if (progressHidden || durationHidden) {
            const features = [];
            if (progressHidden) features.push('thanh tiến trình');
            if (durationHidden) features.push('thời lượng');
            
            status.textContent = `Đang ẩn: ${features.join(', ')}`;
            status.className = 'status enabled';
        } else {
            status.textContent = 'Đã tắt tất cả';
            status.className = 'status disabled';
        }
    }
    
    function updateAutoRefreshUI(isEnabled) {
        if (isEnabled) {
            autoRefreshSwitch.classList.add('active');
        } else {
            autoRefreshSwitch.classList.remove('active');
        }
    }
});

// YouTube Progress Bar Hider Popup Script
document.addEventListener('DOMContentLoaded', function() {
    const toggleSwitch = document.getElementById('toggleSwitch');
    const durationSwitch = document.getElementById('durationSwitch');
    const autoRefreshSwitch = document.getElementById('autoRefreshSwitch');
    const status = document.getElementById('status');
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    
    // Translation object
    const translations = {
        vi: {
            title: 'YouTube Hider Extension',
            subtitle: 'Ẩn thanh tiến trình & thời lượng',
            hideProgressBar: 'Ẩn thanh tiến trình',
            hideDuration: 'Ẩn thời lượng video',
            autoRefresh: 'Tự động refresh',
            statusActive: 'Đang hoạt động',
            hidingFeatures: 'Đang ẩn',
            progressBar: 'thanh tiến trình',
            duration: 'thời lượng',
            allDisabled: 'Đã tắt tất cả',
            extensionInfo: 'Extension sẽ ẩn thanh tiến trình và/hoặc thời lượng video trên YouTube nhưng giữ nguyên các chức năng điều khiển khác như âm lượng, play/pause.',
            autoRefreshInfo: 'Tự động refresh: Tự động làm mới trang khi bật/tắt extension để áp dụng thay đổi ngay lập tức.',
            bestWithAutoRefresh: 'Extension hoạt động tốt nhất khi có auto-refresh',
            importantNote: 'Lưu ý quan trọng: Để có trải nghiệm tốt nhất, hãy bật extension trước khi vào trang YouTube.'
        },
        en: {
            title: 'YouTube Hider Extension',
            subtitle: 'Hide progress bar & duration',
            hideProgressBar: 'Hide progress bar',
            hideDuration: 'Hide video duration',
            autoRefresh: 'Auto refresh',
            statusActive: 'Active',
            hidingFeatures: 'Hiding',
            progressBar: 'progress bar',
            duration: 'duration',
            allDisabled: 'All features disabled',
            extensionInfo: 'This extension hides the progress bar and/or video duration on YouTube while preserving other controls like volume and play/pause buttons.',
            autoRefreshInfo: 'Auto refresh: Automatically refreshes the page when toggling the extension to apply changes immediately.',
            bestWithAutoRefresh: 'Extension works best with auto-refresh enabled',
            importantNote: 'Important note: For the best experience, enable the extension before visiting YouTube.'
        }
    };
    
    let currentLang = 'vi'; // Default language is Vietnamese    // Lấy trạng thái hiện tại
    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'autoRefreshEnabled', 'language'], function(result) {
        const isEnabled = result.progressBarHidden !== false; // Mặc định là true
        const durationHidden = result.durationHidden !== false; // Mặc định là true
        const autoRefreshEnabled = result.autoRefreshEnabled !== false; // Mặc định là true
        
        // Set language
        if (result.language) {
            currentLang = result.language;
            console.log('Loaded saved language preference:', currentLang);
        } else {
            console.log('No saved language preference, using default:', currentLang);
        }
        
        updateLanguageUI();
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
            if (progressHidden) features.push(translations[currentLang].progressBar);
            if (durationHidden) features.push(translations[currentLang].duration);
            
            status.textContent = `${translations[currentLang].hidingFeatures}: ${features.join(', ')}`;
            status.className = 'status enabled';
        } else {
            status.textContent = translations[currentLang].allDisabled;
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
    
    // Language handling functions
    function updateLanguageUI() {
        // Update language toggle
        langVi.classList.toggle('active', currentLang === 'vi');
        langEn.classList.toggle('active', currentLang === 'en');
        
        console.log('Applying language UI updates for:', currentLang);
        
        // Update all text elements
        document.querySelector('.title').textContent = translations[currentLang].title;
        document.querySelector('.subtitle').textContent = translations[currentLang].subtitle;
        document.querySelectorAll('.toggle-label')[0].textContent = translations[currentLang].hideProgressBar;
        document.querySelectorAll('.toggle-label')[1].textContent = translations[currentLang].hideDuration;
        if (document.querySelectorAll('.toggle-label')[2]) {
            document.querySelectorAll('.toggle-label')[2].textContent = translations[currentLang].autoRefresh;
        }
          // Update info sections
        document.querySelector('.info').innerHTML = translations[currentLang].extensionInfo;
        
        // Update important note
        document.querySelector('.important-note').innerHTML = 
            '<strong>' + translations[currentLang].importantNote.split(':')[0] + ':</strong> ' + 
            translations[currentLang].importantNote.split(':')[1];
        
        // Update status based on current state
        updateUI(toggleSwitch.classList.contains('active'), durationSwitch.classList.contains('active'));
    }
      // Language toggle event listeners
    langVi.addEventListener('click', function() {
        currentLang = 'vi';
        chrome.storage.sync.set({ language: currentLang });
        console.log('Language preference saved:', currentLang);
        updateLanguageUI();
    });
    
    langEn.addEventListener('click', function() {
        currentLang = 'en';
        chrome.storage.sync.set({ language: currentLang });
        console.log('Language preference saved:', currentLang);
        updateLanguageUI();
    });
});

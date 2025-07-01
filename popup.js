// YouTube Progress Bar Hider Popup Script
let currentLang = 'vi'; // Default language is Vietnamese
let translations = {}; // Khai báo toàn cục để truy cập từ bên ngoài DOMContentLoaded
let toggleSwitch, durationSwitch, shortsSwitch, status; // Global variables để có thể truy cập từ bên ngoài

// Hàm global để xử lý click trực tiếp từ HTML
function changeLanguage(lang) {
    console.log('changeLanguage called with:', lang);
    if (lang !== currentLang) {
        currentLang = lang;
        chrome.storage.sync.set({ language: currentLang });
        console.log('Language preference saved:', currentLang);
        updateLanguageUI();
    }
}

// Hàm global để cập nhật UI
function updateLanguageUI() {
    console.log('updateLanguageUI called, current language:', currentLang);
    
    // Update language toggle
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    
    if (langVi && langEn) {
        langVi.classList.toggle('active', currentLang === 'vi');
        langEn.classList.toggle('active', currentLang === 'en');
        
        console.log('Applying language UI updates for:', currentLang);
        
        // Update all text elements
        document.querySelector('.title').textContent = translations[currentLang].title;
        document.querySelector('.subtitle').textContent = translations[currentLang].subtitle;
        document.querySelectorAll('.toggle-label')[0].textContent = translations[currentLang].hideProgressBar;
        document.querySelectorAll('.toggle-label')[1].textContent = translations[currentLang].hideDuration;
        document.querySelectorAll('.toggle-label')[2].textContent = translations[currentLang].hideShorts;
        
        // Update info sections
        document.querySelector('.info-content').innerHTML = `
            ${translations[currentLang].extensionInfo}
            <ul class="feature-list">
                <li class="feature-item">${translations[currentLang].progressBar}</li>
                <li class="feature-item">${translations[currentLang].duration}</li>
                <li class="feature-item">${translations[currentLang].shorts}</li>
            </ul>
            <p style="margin-top: 8px;">${translations[currentLang].controlsInfo}</p>
        `;
        
        // Update info title
        document.querySelector('.info-title').textContent = translations[currentLang].infoTitle;
        
        // Update important note
        const importantNote = document.querySelector('.important-note');
        if (importantNote) {
            importantNote.innerHTML = `
                <strong>${translations[currentLang].importantNote.split(':')[0]}</strong>
                ${translations[currentLang].importantNote.split(':')[1]}
            `;
        }
        
        // Update status based on current state
        updateStatusUI();
    } else {
        console.error('Language buttons not found in updateLanguageUI!');
    }
}

// Hàm global để cập nhật UI dựa trên trạng thái
function updateUI(progressHidden, durationHidden, shortsHidden) {
    if (!toggleSwitch || !durationSwitch || !shortsSwitch) {
        console.error('Toggle switches not defined yet');
        return;
    }
    
    // Update progress bar toggle - sử dụng setAttribute thay vì toggleAttribute
    if (progressHidden) {
        toggleSwitch.setAttribute('active', '');
    } else {
        toggleSwitch.removeAttribute('active');
    }
    
    // Update duration toggle
    if (durationHidden) {
        durationSwitch.setAttribute('active', '');
    } else {
        durationSwitch.removeAttribute('active');
    }
    
    // Update shorts toggle
    if (shortsHidden) {
        shortsSwitch.setAttribute('active', '');
    } else {
        shortsSwitch.removeAttribute('active');
    }
    
    // Update status
    updateStatusUI(progressHidden, durationHidden, shortsHidden);
}

// Function to update status UI
function updateStatusUI(progressHidden, durationHidden, shortsHidden) {
    if (!status) return;
    
    // If parameters not provided, get current state from switches
    if (progressHidden === undefined && toggleSwitch) {
        progressHidden = toggleSwitch.hasAttribute('active');
    }
    
    if (durationHidden === undefined && durationSwitch) {
        durationHidden = durationSwitch.hasAttribute('active');
    }
    
    if (shortsHidden === undefined && shortsSwitch) {
        shortsHidden = shortsSwitch.hasAttribute('active');
    }
    
    // Update status
    if (progressHidden || durationHidden || shortsHidden) {
        const features = [];
        if (progressHidden) features.push(translations[currentLang].progressBar);
        if (durationHidden) features.push(translations[currentLang].duration);
        if (shortsHidden) features.push(translations[currentLang].shorts);
        
        const statusBadge = status.querySelector('ui-badge') || document.createElement('ui-badge');
        statusBadge.setAttribute('variant', 'success');
        statusBadge.textContent = `${translations[currentLang].hidingFeatures}: ${features.join(', ')}`;
        
        if (!status.contains(statusBadge)) {
            status.innerHTML = '';
            status.appendChild(statusBadge);
        }
        
        status.className = 'status enabled';
    } else {
        const statusBadge = status.querySelector('ui-badge') || document.createElement('ui-badge');
        statusBadge.setAttribute('variant', 'warning');
        statusBadge.textContent = translations[currentLang].allDisabled;
        
        if (!status.contains(statusBadge)) {
            status.innerHTML = '';
            status.appendChild(statusBadge);
        }
        
        status.className = 'status disabled';
    }
}

// Hàm để áp dụng theme từ localStorage hoặc system preference
function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        console.log('Applying saved theme:', savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('Applying system theme preference:', prefersDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', prefersDark);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Áp dụng theme trước khi khởi tạo các component
    applyInitialTheme();
    
    // Initialize global variables
    toggleSwitch = document.getElementById('toggleSwitch');
    durationSwitch = document.getElementById('durationSwitch');
    shortsSwitch = document.getElementById('shortsSwitch');
    status = document.getElementById('status');
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    
    // Ghi log ra để xem các phần tử có được tìm thấy không
    console.log('DOM Elements found:', {
        toggleSwitch,
        durationSwitch,
        shortsSwitch,
        status,
        langVi,
        langEn
    });
    
    // Translation object
    translations = {
        vi: {
            title: 'YouTube Hider',
            subtitle: 'Ẩn thanh tiến trình & thời lượng',
            hideProgressBar: 'Ẩn thanh tiến trình',
            hideDuration: 'Ẩn thời lượng video',
            hideShorts: 'Ẩn Shorts',
            statusActive: 'Đang hoạt động',
            hidingFeatures: 'Đang ẩn',
            progressBar: 'thanh tiến trình',
            duration: 'thời lượng',
            shorts: 'shorts',
            allDisabled: 'Đã tắt tất cả',
            infoTitle: 'Giới thiệu',
            extensionInfo: 'Extension giúp bạn tập trung vào nội dung video mà không bị phân tâm bởi:',
            controlsInfo: 'Tất cả các chức năng điều khiển khác như âm lượng, play/pause vẫn hoạt động bình thường.',
            importantNote: 'Lưu ý quan trọng: Để có trải nghiệm tốt nhất, hãy bật extension trước khi vào trang YouTube.'
        },
        en: {
            title: 'YouTube Hider',
            subtitle: 'Hide progress bar & duration',
            hideProgressBar: 'Hide progress bar',
            hideDuration: 'Hide video duration',
            hideShorts: 'Hide Shorts',
            statusActive: 'Active',
            hidingFeatures: 'Hiding',
            progressBar: 'progress bar',
            duration: 'duration',
            shorts: 'shorts',
            allDisabled: 'All features disabled',
            infoTitle: 'Introduction',
            extensionInfo: 'This extension helps you focus on video content without distractions from:',
            controlsInfo: 'All other control features like volume and play/pause buttons still work normally.',
            importantNote: 'Important note: For the best experience, enable the extension before visiting YouTube.'
        }
    };
    
    // Lấy trạng thái hiện tại
    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'language', 'theme'], function(result) {
        const isEnabled = result.progressBarHidden !== false; // Mặc định là true
        const durationHidden = result.durationHidden !== false; // Mặc định là true
        const shortsHidden = result.shortsHidden === true; // Mặc định là false
        
        // Set language
        if (result.language) {
            currentLang = result.language;
            console.log('Loaded saved language preference:', currentLang);
        } else {
            console.log('No saved language preference, using default:', currentLang);
        }
        
        // Đồng bộ theme từ storage với localStorage
        if (result.theme) {
            localStorage.setItem('theme', result.theme);
            document.documentElement.classList.toggle('dark', result.theme === 'dark');
            console.log('Synced theme from storage:', result.theme);
        }
        
        updateLanguageUI();
        updateUI(isEnabled, durationHidden, shortsHidden);
    });
    
    // Xử lý click toggle extension
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            const newState = e.detail.active;
            
            // Lưu trạng thái
            chrome.storage.sync.set({ progressBarHidden: newState });
            
            // Cập nhật UI
            chrome.storage.sync.get(['durationHidden', 'shortsHidden'], function(result) {
                updateUI(newState, result.durationHidden !== false, result.shortsHidden === true);
            });
            
            handleToggleChange('toggleProgressBar', newState);
        });
    }
    
    // Xử lý click toggle duration
    if (durationSwitch) {
        durationSwitch.addEventListener('change', function(e) {
            const newState = e.detail.active;
            
            // Lưu trạng thái
            chrome.storage.sync.set({ durationHidden: newState });
            
            // Cập nhật UI
            chrome.storage.sync.get(['progressBarHidden', 'shortsHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, newState, result.shortsHidden === true);
            });
            
            handleToggleChange('toggleDuration', newState);
        });
    }
    
    // Xử lý click toggle shorts
    if (shortsSwitch) {
        shortsSwitch.addEventListener('change', function(e) {
            const newState = e.detail.active;
            
            // Lưu trạng thái
            chrome.storage.sync.set({ shortsHidden: newState });
            
            // Cập nhật UI
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, newState);
            });
            
            handleToggleChange('toggleShorts', newState);
        });
    }
    
    // Thêm sự kiện click cho nút ngôn ngữ
    if (langVi) {
        langVi.addEventListener('click', function() {
            changeLanguage('vi');
        });
    }
    
    if (langEn) {
        langEn.addEventListener('click', function() {
            changeLanguage('en');
        });
    }
    
    // Hàm xử lý thay đổi toggle
    function handleToggleChange(action, enabled) {
        console.log(`${action} changed to:`, enabled);
        
        // Gửi thông điệp tới content script
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: action,
                    enabled: enabled
                });
            }
        });
    }
});

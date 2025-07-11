// YouTube Progress Bar Hider Popup Script
let currentLang = 'vi'; // Default language is Vietnamese
let translations = {}; // Khai báo toàn cục để truy cập từ bên ngoài DOMContentLoaded
let toggleSwitch, durationSwitch, shortsSwitch, homeFeedSwitch, videoSidebarSwitch, commentsSwitch, status; // Global variables để có thể truy cập từ bên ngoài

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

// Debug function to verify toggle state persistence
function verifyToggleStates() {
    console.log('🔍 Verifying toggle states...');

    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden'], function(result) {
        const storedStates = {
            progressBarHidden: result.progressBarHidden !== false,
            durationHidden: result.durationHidden !== false,
            shortsHidden: result.shortsHidden === true,
            homeFeedHidden: result.homeFeedHidden === true,
            videoSidebarHidden: result.videoSidebarHidden === true,
            commentsHidden: result.commentsHidden === true
        };

        const uiStates = {
            progressBarHidden: toggleSwitch ? toggleSwitch.checked : 'N/A',
            durationHidden: durationSwitch ? durationSwitch.checked : 'N/A',
            shortsHidden: shortsSwitch ? shortsSwitch.checked : 'N/A',
            homeFeedHidden: homeFeedSwitch ? homeFeedSwitch.checked : 'N/A',
            videoSidebarHidden: videoSidebarSwitch ? videoSidebarSwitch.checked : 'N/A',
            commentsHidden: commentsSwitch ? commentsSwitch.checked : 'N/A'
        };

        console.log('📊 Stored states:', storedStates);
        console.log('📊 UI states:', uiStates);

        // Check for mismatches
        Object.keys(storedStates).forEach(key => {
            if (storedStates[key] !== uiStates[key] && uiStates[key] !== 'N/A') {
                console.warn(`⚠️ Mismatch for ${key}: stored=${storedStates[key]}, UI=${uiStates[key]}`);
            }
        });
    });
}

// Expose debug function globally
window.verifyToggleStates = verifyToggleStates;

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
function updateUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden) {
    console.log('🔄 updateUI called with:', {
        progressHidden,
        durationHidden,
        shortsHidden,
        homeFeedHidden,
        videoSidebarHidden,
        commentsHidden
    });

    if (!toggleSwitch || !durationSwitch || !shortsSwitch || !homeFeedSwitch || !videoSidebarSwitch || !commentsSwitch) {
        console.error('❌ Toggle switches not defined yet:', {
            toggleSwitch: !!toggleSwitch,
            durationSwitch: !!durationSwitch,
            shortsSwitch: !!shortsSwitch,
            homeFeedSwitch: !!homeFeedSwitch,
            videoSidebarSwitch: !!videoSidebarSwitch,
            commentsSwitch: !!commentsSwitch
        });
        return;
    }

    // Update progress bar toggle - sử dụng checked property cho checkbox
    toggleSwitch.checked = progressHidden;
    console.log('✅ Progress bar toggle set to:', progressHidden);

    // Update duration toggle
    durationSwitch.checked = durationHidden;
    console.log('✅ Duration toggle set to:', durationHidden);

    // Update shorts toggle
    shortsSwitch.checked = shortsHidden;
    console.log('✅ Shorts toggle set to:', shortsHidden);

    // Update home feed toggle with extra verification
    homeFeedSwitch.checked = homeFeedHidden;
    console.log('✅ Home feed toggle set to:', homeFeedHidden);

    // Update video sidebar toggle
    videoSidebarSwitch.checked = videoSidebarHidden;
    console.log('✅ Video sidebar toggle set to:', videoSidebarHidden);

    // Update comments toggle
    commentsSwitch.checked = commentsHidden;
    console.log('✅ Comments toggle set to:', commentsHidden);

    // Verify the state was actually set
    setTimeout(() => {
        const actualHomeFeedState = homeFeedSwitch.checked;
        const actualVideoSidebarState = videoSidebarSwitch.checked;
        const actualCommentsState = commentsSwitch.checked;
        console.log('🔍 Home feed toggle verification - Expected:', homeFeedHidden, 'Actual:', actualHomeFeedState);
        console.log('🔍 Video sidebar toggle verification - Expected:', videoSidebarHidden, 'Actual:', actualVideoSidebarState);
        console.log('🔍 Comments toggle verification - Expected:', commentsHidden, 'Actual:', actualCommentsState);
        if (actualHomeFeedState !== homeFeedHidden) {
            console.warn('⚠️ Home feed toggle state mismatch, retrying...');
            homeFeedSwitch.checked = homeFeedHidden;
        }
        if (actualVideoSidebarState !== videoSidebarHidden) {
            console.warn('⚠️ Video sidebar toggle state mismatch, retrying...');
            videoSidebarSwitch.checked = videoSidebarHidden;
        }
        if (actualCommentsState !== commentsHidden) {
            console.warn('⚠️ Comments toggle state mismatch, retrying...');
            commentsSwitch.checked = commentsHidden;
        }
    }, 50);

    // Update status
    updateStatusUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden);
}

// Function to update status UI
function updateStatusUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden) {
    if (!status) return;

    // If parameters not provided, get current state from switches
    if (progressHidden === undefined && toggleSwitch) {
        progressHidden = toggleSwitch.checked;
    }

    if (durationHidden === undefined && durationSwitch) {
        durationHidden = durationSwitch.checked;
    }

    if (shortsHidden === undefined && shortsSwitch) {
        shortsHidden = shortsSwitch.checked;
    }

    if (homeFeedHidden === undefined && homeFeedSwitch) {
        homeFeedHidden = homeFeedSwitch.checked;
    }

    if (videoSidebarHidden === undefined && videoSidebarSwitch) {
        videoSidebarHidden = videoSidebarSwitch.checked;
    }

    if (commentsHidden === undefined && commentsSwitch) {
        commentsHidden = commentsSwitch.checked;
    }
    
    // Update status
    if (progressHidden || durationHidden || shortsHidden || homeFeedHidden || videoSidebarHidden || commentsHidden) {
        const features = [];
        if (progressHidden) features.push(translations[currentLang].progressBar);
        if (durationHidden) features.push(translations[currentLang].duration);
        if (shortsHidden) features.push(translations[currentLang].shorts);
        if (homeFeedHidden) features.push(translations[currentLang].homeFeed);
        if (videoSidebarHidden) features.push(translations[currentLang].videoSidebar || 'video sidebar');
        if (commentsHidden) features.push(translations[currentLang].comments || 'comments');
        
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
    // Khởi tạo theme theo cài đặt trước đó hoặc theme của hệ thống
    initializeTheme();

    // Khởi tạo ngôn ngữ theo cài đặt trước đó
    initializeLanguage();

    // Xử lý các toggle switch
    initializeSwitches();

    // Handle collapsible sections
    document.querySelectorAll('.ext-section-header').forEach(header => {
        header.addEventListener('click', () => {
            const section = header.parentElement;
            section.classList.toggle('open');
        });
    });

    // Theme toggle button
    document.querySelector('.theme-toggle').addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        saveThemeSetting(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Language selection
    document.getElementById('lang-vi').addEventListener('click', function() {
        setLanguage('vi');
    });
    
    document.getElementById('lang-en').addEventListener('click', function() {
        setLanguage('en');
    });

    // Initialize global variables
    toggleSwitch = document.getElementById('progressSwitch');
    durationSwitch = document.getElementById('durationSwitch');
    shortsSwitch = document.getElementById('shortsSwitch');
    homeFeedSwitch = document.getElementById('homeFeedSwitch');
    videoSidebarSwitch = document.getElementById('videoSidebarSwitch');
    commentsSwitch = document.getElementById('commentsSwitch');
    status = document.getElementById('status');
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    
    // Ghi log ra để xem các phần tử có được tìm thấy không
    console.log('DOM Elements found:', {
        toggleSwitch,
        durationSwitch,
        shortsSwitch,
        homeFeedSwitch,
        videoSidebarSwitch,
        commentsSwitch,
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
            homeFeed: 'trang chủ',
            videoSidebar: 'thanh bên video',
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
            homeFeed: 'home feed',
            videoSidebar: 'video sidebar',
            allDisabled: 'All features disabled',
            infoTitle: 'Introduction',
            extensionInfo: 'This extension helps you focus on video content without distractions from:',
            controlsInfo: 'All other control features like volume and play/pause buttons still work normally.',
            importantNote: 'Important note: For the best experience, enable the extension before visiting YouTube.'
        }
    };
    
    // Lấy trạng thái hiện tại với improved error handling và timing
    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'language', 'theme'], function(result) {
        const isEnabled = result.progressBarHidden !== false; // Mặc định là true
        const durationHidden = result.durationHidden !== false; // Mặc định là true
        const shortsHidden = result.shortsHidden === true; // Mặc định là false
        const homeFeedHidden = result.homeFeedHidden === true; // Mặc định là false
        const videoSidebarHidden = result.videoSidebarHidden === true; // Mặc định là false
        const commentsHidden = result.commentsHidden === true; // Mặc định là false

        console.log('🔍 Loading stored states:', {
            progressBarHidden: isEnabled,
            durationHidden: durationHidden,
            shortsHidden: shortsHidden,
            homeFeedHidden: homeFeedHidden,
            videoSidebarHidden: videoSidebarHidden,
            commentsHidden: commentsHidden,
            rawHomeFeedHidden: result.homeFeedHidden,
            rawVideoSidebarHidden: result.videoSidebarHidden,
            rawCommentsHidden: result.commentsHidden
        });

        // Verify DOM elements are available before updating UI
        if (!toggleSwitch || !durationSwitch || !shortsSwitch || !homeFeedSwitch || !videoSidebarSwitch || !commentsSwitch) {
            console.error('❌ DOM elements not ready, retrying in 100ms...');
            setTimeout(() => {
                // Re-initialize DOM elements
                toggleSwitch = document.getElementById('progressSwitch');
                durationSwitch = document.getElementById('durationSwitch');
                shortsSwitch = document.getElementById('shortsSwitch');
                homeFeedSwitch = document.getElementById('homeFeedSwitch');
                videoSidebarSwitch = document.getElementById('videoSidebarSwitch');
                commentsSwitch = document.getElementById('commentsSwitch');
                status = document.getElementById('status');

                console.log('🔄 Retrying UI update with elements:', {
                    toggleSwitch: !!toggleSwitch,
                    durationSwitch: !!durationSwitch,
                    shortsSwitch: !!shortsSwitch,
                    homeFeedSwitch: !!homeFeedSwitch,
                    videoSidebarSwitch: !!videoSidebarSwitch,
                    commentsSwitch: !!commentsSwitch
                });

                updateUI(isEnabled, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden);
            }, 100);
        } else {
            console.log('✅ DOM elements ready, updating UI immediately');
            updateUI(isEnabled, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden);
        }

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
    });
    
    // Xử lý click toggle extension
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ progressBarHidden: newState });

            // Cập nhật UI
            chrome.storage.sync.get(['durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                updateUI(newState, result.durationHidden !== false, result.shortsHidden === true, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden);
                console.log('🔄 Updated UI after progress bar toggle, homeFeedHidden:', currentHomeFeedHidden, 'videoSidebarHidden:', currentVideoSidebarHidden, 'commentsHidden:', currentCommentsHidden);
            });

            handleToggleChange('toggleProgressBar', newState);
        });
    }
    
    // Xử lý click toggle duration
    if (durationSwitch) {
        durationSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ durationHidden: newState });

            // Cập nhật UI
            chrome.storage.sync.get(['progressBarHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                updateUI(result.progressBarHidden !== false, newState, result.shortsHidden === true, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden);
                console.log('🔄 Updated UI after duration toggle, homeFeedHidden:', currentHomeFeedHidden, 'videoSidebarHidden:', currentVideoSidebarHidden, 'commentsHidden:', currentCommentsHidden);
            });

            handleToggleChange('toggleDuration', newState);
        });
    }
    
    // Xử lý click toggle shorts
    if (shortsSwitch) {
        shortsSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ shortsHidden: newState });

            // Cập nhật UI
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, newState, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden);
                console.log('🔄 Updated UI after shorts toggle, homeFeedHidden:', currentHomeFeedHidden, 'videoSidebarHidden:', currentVideoSidebarHidden, 'commentsHidden:', currentCommentsHidden);
            });

            handleToggleChange('toggleShorts', newState);
        });
    }

    // Xử lý click toggle home feed
    if (homeFeedSwitch) {
        homeFeedSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;
            console.log('🏠 Home Feed toggle changed to:', newState);

            // Lưu trạng thái
            chrome.storage.sync.set({ homeFeedHidden: newState }, function() {
                console.log('✅ Home Feed state saved to storage:', newState);
            });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'videoSidebarHidden', 'commentsHidden'], function(result) {
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, newState, currentVideoSidebarHidden, currentCommentsHidden);
                console.log('🔄 Updated UI after home feed toggle, newState:', newState, 'videoSidebarHidden:', currentVideoSidebarHidden, 'commentsHidden:', currentCommentsHidden);
            });

            handleToggleChange('toggleHomeFeed', newState);
        });
    }

    // Xử lý click toggle video sidebar
    if (videoSidebarSwitch) {
        videoSidebarSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;
            console.log('📺 Video Sidebar toggle changed to:', newState);

            // Lưu trạng thái
            chrome.storage.sync.set({ videoSidebarHidden: newState }, function() {
                console.log('✅ Video Sidebar state saved to storage:', newState);
            });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'commentsHidden'], function(result) {
                const currentCommentsHidden = result.commentsHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, newState, currentCommentsHidden);
                console.log('🔄 Updated UI after video sidebar toggle, newState:', newState, 'commentsHidden:', currentCommentsHidden);
            });

            handleToggleChange('toggleVideoSidebar', newState);
        });
    }

    // Xử lý click toggle comments
    if (commentsSwitch) {
        commentsSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ commentsHidden: newState });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, newState);
                console.log('🔄 Updated UI after comments toggle, newState:', newState);
            });

            handleToggleChange('toggleComments', newState);
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

// Initialize theme based on saved settings or system preference
function initializeTheme() {
    chrome.storage.sync.get('theme', function(data) {
        const savedTheme = data.theme || 'auto';
        
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // Auto mode - use system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
            }
        }
    });
}

// Save theme setting
function saveThemeSetting(theme) {
    chrome.storage.sync.set({ theme: theme });
}

// Initialize language
function initializeLanguage() {
    chrome.storage.sync.get('language', function(data) {
        const savedLanguage = data.language || 'vi';
        setLanguage(savedLanguage, false);
    });
}

// Set language and update UI
function setLanguage(lang, save = true) {
    // Remove active class from all language buttons
    document.querySelectorAll('.ext-lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected language button
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    const translations = {
        'vi': {
            'title': 'YouTube Hider',
            'subtitle': 'Ẩn các phần tử YouTube không mong muốn',
            // Content & Feed Controls
            'contentFeedControlsTitle': 'Content & Feed Controls',
            'hideHomeFeed': 'Ẩn trang chủ',
            'hideVideoSidebar': 'Ẩn thanh bên video',
            'hideShorts': 'Ẩn Shorts',
            'hideComments': 'Ẩn phần bình luận',
            'hidePlaylistPanel': 'Ẩn panel playlist',
            'hideMixes': 'Ẩn Mixes',
            // Interface Elements
            'interfaceElementsTitle': 'Interface Elements',
            'hideTopHeader': 'Ẩn thanh điều hướng trên',
            'hideNotificationsBell': 'Ẩn chuông thông báo',
            'hideExploreTrending': 'Ẩn tab Khám phá & Thịnh hành',
            'hideSubscriptionsTab': 'Ẩn tab Đăng ký',
            'hideMoreFromYouTube': 'Ẩn "Thêm từ YouTube"',
            'hideProfilePhotos': 'Ẩn ảnh đại diện',
            // Video Controls
            'videoControlsTitle': 'Video Controls',
            'hideProgressBar': 'Ẩn thanh tiến trình',
            'hideDuration': 'Ẩn thời lượng video',
            'hideLiveChat': 'Ẩn chat trực tiếp',
            'hideEndScreenRecommendations': 'Ẩn đề xuất cuối video',
            'hideEndScreenCards': 'Ẩn thẻ cuối video',
            'hideVideoInfoPanel': 'Ẩn panel thông tin video',
            'disableAutoplay': 'Tắt tự động phát',
            'disableAnnotations': 'Tắt chú thích video',
            // Other Features
            'otherFeaturesTitle': 'Other Features',
            'hideFundraiserBanners': 'Ẩn banner gây quỹ',
            'hideMerchandise': 'Ẩn hàng hóa/vé/ưu đãi',
            'hideInappropriateSearch': 'Ẩn kết quả tìm kiếm không phù hợp',
            // General
            'active': 'Đang hoạt động',
            'inactive': 'Đã tắt',
            'infoTitle': 'Giới thiệu',
            'infoContent': 'Extension giúp bạn tập trung vào nội dung video mà không bị phân tâm bởi:',
            'featureProgress': 'Các phần tử giao diện không cần thiết',
            'featureDuration': 'Nội dung đề xuất và quảng cáo',
            'featureShorts': 'Các tính năng gây xao nhãng',
            'homeFeed': 'Trang chủ',
            'infoExtra': 'Tùy chỉnh trải nghiệm YouTube theo ý muốn của bạn với hơn 20 tùy chọn ẩn/hiện.',
            'noticeTitle': 'Lưu ý quan trọng',
            'noticeDesc': 'Để có trải nghiệm tốt nhất, hãy bật extension trước khi vào trang YouTube.'
        },
        'en': {
            'title': 'YouTube Hider',
            'subtitle': 'Hide unwanted YouTube elements',
            // Content & Feed Controls
            'contentFeedControlsTitle': 'Content & Feed Controls',
            'hideHomeFeed': 'Hide Home Feed',
            'hideVideoSidebar': 'Hide Video Sidebar',
            'hideShorts': 'Hide Shorts',
            'hideComments': 'Hide Comments Section',
            'hidePlaylistPanel': 'Hide Playlist Panel',
            'hideMixes': 'Hide Mixes',
            // Interface Elements
            'interfaceElementsTitle': 'Interface Elements',
            'hideTopHeader': 'Hide Top Header/Navigation Bar',
            'hideNotificationsBell': 'Hide Notifications Bell',
            'hideExploreTrending': 'Hide Explore & Trending Tabs',
            'hideSubscriptionsTab': 'Hide Subscriptions Tab',
            'hideMoreFromYouTube': 'Hide "More from YouTube" Section',
            'hideProfilePhotos': 'Hide Profile Photos/Avatars',
            // Video Controls
            'videoControlsTitle': 'Video Controls',
            'hideProgressBar': 'Hide progress bar',
            'hideDuration': 'Hide video duration',
            'hideLiveChat': 'Hide Live Chat',
            'hideEndScreenRecommendations': 'Hide End Screen Recommendations',
            'hideEndScreenCards': 'Hide End Screen Cards/Annotations',
            'hideVideoInfoPanel': 'Hide Video Info Panel',
            'disableAutoplay': 'Disable Autoplay',
            'disableAnnotations': 'Disable Video Annotations',
            // Other Features
            'otherFeaturesTitle': 'Other Features',
            'hideFundraiserBanners': 'Hide Fundraiser Banners',
            'hideMerchandise': 'Hide Merchandise/Tickets/Offers',
            'hideInappropriateSearch': 'Hide Inappropriate Search Results',
            // General
            'active': 'Active',
            'inactive': 'Inactive',
            'infoTitle': 'Introduction',
            'infoContent': 'This extension helps you focus on video content without distractions from:',
            'featureProgress': 'Unnecessary interface elements',
            'featureDuration': 'Recommended content and ads',
            'featureShorts': 'Distracting features',
            'homeFeed': 'Home Feed',
            'infoExtra': 'Customize your YouTube experience with over 20 hide/show options.',
            'noticeTitle': 'Important Notice',
            'noticeDesc': 'For the best experience, please enable the extension before visiting YouTube.'
        }
    };
    
    // Update UI text based on selected language
    const t = translations[lang];

    // Header
    document.querySelector('.ext-title').textContent = t.title;
    document.querySelector('.ext-subtitle').textContent = t.subtitle;

    // Section titles
    const sectionTitles = document.querySelectorAll('.ext-section-title');
    if (sectionTitles[0]) sectionTitles[0].textContent = t.contentFeedControlsTitle;
    if (sectionTitles[1]) sectionTitles[1].textContent = t.interfaceElementsTitle;
    if (sectionTitles[2]) sectionTitles[2].textContent = t.videoControlsTitle;
    if (sectionTitles[3]) sectionTitles[3].textContent = t.otherFeaturesTitle;

    // Control labels - using a mapping approach for better maintainability
    const labelMappings = [
        // Content & Feed Controls
        { id: 'homeFeedSwitch', text: t.hideHomeFeed },
        { id: 'videoSidebarSwitch', text: t.hideVideoSidebar },
        { id: 'shortsSwitch', text: t.hideShorts },
        { id: 'commentsSwitch', text: t.hideComments },
        { id: 'playlistPanelSwitch', text: t.hidePlaylistPanel },
        { id: 'mixesSwitch', text: t.hideMixes },
        // Interface Elements
        { id: 'topHeaderSwitch', text: t.hideTopHeader },
        { id: 'notificationsBellSwitch', text: t.hideNotificationsBell },
        { id: 'exploreTrendingSwitch', text: t.hideExploreTrending },
        { id: 'subscriptionsTabSwitch', text: t.hideSubscriptionsTab },
        { id: 'moreFromYouTubeSwitch', text: t.hideMoreFromYouTube },
        { id: 'profilePhotosSwitch', text: t.hideProfilePhotos },
        // Video Controls
        { id: 'progressSwitch', text: t.hideProgressBar },
        { id: 'durationSwitch', text: t.hideDuration },
        { id: 'liveChatSwitch', text: t.hideLiveChat },
        { id: 'endScreenRecommendationsSwitch', text: t.hideEndScreenRecommendations },
        { id: 'endScreenCardsSwitch', text: t.hideEndScreenCards },
        { id: 'videoInfoPanelSwitch', text: t.hideVideoInfoPanel },
        { id: 'disableAutoplaySwitch', text: t.disableAutoplay },
        { id: 'disableAnnotationsSwitch', text: t.disableAnnotations },
        // Other Features
        { id: 'fundraiserBannersSwitch', text: t.hideFundraiserBanners },
        { id: 'merchandiseSwitch', text: t.hideMerchandise },
        { id: 'inappropriateSearchSwitch', text: t.hideInappropriateSearch }
    ];

    // Update all control labels
    labelMappings.forEach(mapping => {
        const switchElement = document.getElementById(mapping.id);
        if (switchElement) {
            const label = switchElement.closest('.ext-control-item')?.querySelector('.ext-control-label');
            if (label) {
                label.textContent = mapping.text;
            }
        }
    });

    // Other UI elements
    document.querySelector('#status').textContent = t.active;
    document.querySelector('.ext-info-title').textContent = t.infoTitle;
    document.querySelector('.ext-info-content').firstChild.textContent = t.infoContent;
    document.querySelectorAll('.ext-feature-item')[0].textContent = t.featureProgress;
    document.querySelectorAll('.ext-feature-item')[1].textContent = t.featureDuration;
    document.querySelectorAll('.ext-feature-item')[2].textContent = t.featureShorts;
    document.querySelector('.ext-info-content p').textContent = t.infoExtra;
    document.querySelector('.ext-notice-title').textContent = t.noticeTitle;
    document.querySelector('.ext-notice-description').textContent = t.noticeDesc;

    // Save language preference if needed
    if (save) {
        chrome.storage.sync.set({ language: lang });
    }
}

// Initialize switches based on saved settings
function initializeSwitches() {
    const switches = [
        { id: 'progressSwitch', setting: 'hideProgressBar', default: true },
        { id: 'durationSwitch', setting: 'hideDuration', default: true },
        { id: 'shortsSwitch', setting: 'hideShorts', default: false }
    ];
    
    // Get all settings at once
    chrome.storage.sync.get(['hideProgressBar', 'hideDuration', 'hideShorts'], function(data) {
        switches.forEach(switchItem => {
            const switchElement = document.getElementById(switchItem.id);
            const isEnabled = data[switchItem.setting] !== undefined ? data[switchItem.setting] : switchItem.default;
            
            if (switchElement) {
                switchElement.checked = isEnabled;
                
                // Add event listener
                switchElement.addEventListener('change', function() {
                    const setting = {};
                    setting[switchItem.setting] = this.checked;
                    chrome.storage.sync.set(setting);
                    
                    // Update status message
                    updateStatus();
                    
                    // Send message to content script to update immediately if on YouTube
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
                            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
                        }
                    });
                });
            }
        });
        
        // Initial status update
        updateStatus();
    });
}

// Update status message based on current settings
function updateStatus() {
    chrome.storage.sync.get(['hideProgressBar', 'hideDuration', 'hideShorts'], function(data) {
        const anyFeatureEnabled = data.hideProgressBar || data.hideDuration || data.hideShorts;
        const statusElement = document.getElementById('status');
        
        if (anyFeatureEnabled) {
            statusElement.className = 'ext-status enabled';
            statusElement.textContent = document.getElementById('lang-vi').classList.contains('active') ? 
                'Đang hoạt động' : 'Active';
        } else {
            statusElement.className = 'ext-status disabled';
            statusElement.textContent = document.getElementById('lang-vi').classList.contains('active') ? 
                'Đã tắt' : 'Inactive';
        }
    });
}

// YouTube Progress Bar Hider Popup Script
let currentLang = 'vi'; // Default language is Vietnamese
let translations = {}; // Khai báo toàn cục để truy cập từ bên ngoài DOMContentLoaded
let toggleSwitch, durationSwitch, shortsSwitch, homeFeedSwitch, videoSidebarSwitch, commentsSwitch, notificationsBellSwitch, topHeaderSwitch, exploreTrendingSwitch, endScreenCardsSwitch, moreFromYouTubeSwitch, hideChannelSwitch, buttonsBarSwitch, hideDescriptionSwitch, status; // Global variables để có thể truy cập từ bên ngoài

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
        
        // Update Export/Import settings section
        const settingsTitle = document.querySelector('.ext-settings-title');
        const exportBtn = document.querySelector('#exportSettingsBtn span');
        const importBtn = document.querySelector('#importSettingsBtn span');

        if (settingsTitle) {
            settingsTitle.textContent = translations[currentLang].settingsManagement;
        }
        if (exportBtn) {
            exportBtn.textContent = translations[currentLang].exportSettings;
        }
        if (importBtn) {
            importBtn.textContent = translations[currentLang].importSettings;
        }

        // Update status based on current state
        updateStatusUI();
    } else {
        console.error('Language buttons not found in updateLanguageUI!');
    }
}

// Hàm global để cập nhật UI dựa trên trạng thái
function updateUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreTrendingHidden, endScreenCardsHidden, moreFromYouTubeHidden) {
    console.log('🔄 updateUI called with:', {
        progressHidden,
        durationHidden,
        shortsHidden,
        homeFeedHidden,
        videoSidebarHidden,
        commentsHidden,
        notificationsBellHidden,
        topHeaderHidden,
        exploreTrendingHidden,
        endScreenCardsHidden,
        moreFromYouTubeHidden
    });

    if (!toggleSwitch || !durationSwitch || !shortsSwitch || !homeFeedSwitch || !videoSidebarSwitch || !commentsSwitch || !notificationsBellSwitch || !topHeaderSwitch) {
        console.error('❌ Toggle switches not defined yet:', {
            toggleSwitch: !!toggleSwitch,
            durationSwitch: !!durationSwitch,
            shortsSwitch: !!shortsSwitch,
            homeFeedSwitch: !!homeFeedSwitch,
            videoSidebarSwitch: !!videoSidebarSwitch,
            commentsSwitch: !!commentsSwitch,
            notificationsBellSwitch: !!notificationsBellSwitch,
            topHeaderSwitch: !!topHeaderSwitch
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

    // Update notifications bell toggle
    notificationsBellSwitch.checked = notificationsBellHidden;
    console.log('✅ Notifications bell toggle set to:', notificationsBellHidden);

    // Update top header toggle
    topHeaderSwitch.checked = topHeaderHidden;
    console.log('✅ Top header toggle set to:', topHeaderHidden);

    // Update explore trending toggle
    if (exploreTrendingSwitch) {
        exploreTrendingSwitch.checked = exploreTrendingHidden;
        console.log('✅ Explore trending toggle set to:', exploreTrendingHidden);
    }

    // Update end screen cards toggle
    if (endScreenCardsSwitch) {
        endScreenCardsSwitch.checked = endScreenCardsHidden;
        console.log('✅ End screen cards toggle set to:', endScreenCardsHidden);
    }

    // Update more from YouTube toggle
    if (moreFromYouTubeSwitch) {
        moreFromYouTubeSwitch.checked = moreFromYouTubeHidden;
        console.log('✅ More from YouTube toggle set to:', moreFromYouTubeHidden);
    }

    // Update hide channel toggle
    if (hideChannelSwitch) {
        hideChannelSwitch.checked = hideChannelHidden;
        console.log('✅ Hide channel toggle set to:', hideChannelHidden);
    }

    // Update buttons bar toggle
    if (buttonsBarSwitch) {
        buttonsBarSwitch.checked = buttonsBarHidden;
        console.log('✅ Buttons bar toggle set to:', buttonsBarHidden);
    }

    // Update hide description toggle
    if (hideDescriptionSwitch) {
        hideDescriptionSwitch.checked = hideDescriptionHidden;
        console.log('✅ Hide description toggle set to:', hideDescriptionHidden);
    }

    // Verify the state was actually set
    setTimeout(() => {
        const actualHomeFeedState = homeFeedSwitch.checked;
        const actualVideoSidebarState = videoSidebarSwitch.checked;
        const actualCommentsState = commentsSwitch.checked;
        const actualNotificationsBellState = notificationsBellSwitch.checked;
        const actualTopHeaderState = topHeaderSwitch.checked;
        const actualExploreTrendingState = exploreTrendingSwitch ? exploreTrendingSwitch.checked : false;
        const actualEndScreenCardsState = endScreenCardsSwitch ? endScreenCardsSwitch.checked : false;
        const actualMoreFromYouTubeState = moreFromYouTubeSwitch ? moreFromYouTubeSwitch.checked : false;
        console.log('🔍 Home feed toggle verification - Expected:', homeFeedHidden, 'Actual:', actualHomeFeedState);
        console.log('🔍 Video sidebar toggle verification - Expected:', videoSidebarHidden, 'Actual:', actualVideoSidebarState);
        console.log('🔍 Comments toggle verification - Expected:', commentsHidden, 'Actual:', actualCommentsState);
        console.log('🔍 Notifications bell toggle verification - Expected:', notificationsBellHidden, 'Actual:', actualNotificationsBellState);
        console.log('🔍 Top header toggle verification - Expected:', topHeaderHidden, 'Actual:', actualTopHeaderState);
        console.log('🔍 Explore trending toggle verification - Expected:', exploreTrendingHidden, 'Actual:', actualExploreTrendingState);
        console.log('🔍 End screen cards toggle verification - Expected:', endScreenCardsHidden, 'Actual:', actualEndScreenCardsState);
        console.log('🔍 More from YouTube toggle verification - Expected:', moreFromYouTubeHidden, 'Actual:', actualMoreFromYouTubeState);
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
        if (actualNotificationsBellState !== notificationsBellHidden) {
            console.warn('⚠️ Notifications bell toggle state mismatch, retrying...');
            notificationsBellSwitch.checked = notificationsBellHidden;
        }
        if (actualTopHeaderState !== topHeaderHidden) {
            console.warn('⚠️ Top header toggle state mismatch, retrying...');
            topHeaderSwitch.checked = topHeaderHidden;
        }
        if (exploreTrendingSwitch && actualExploreTrendingState !== exploreTrendingHidden) {
            console.warn('⚠️ Explore trending toggle state mismatch, retrying...');
            exploreTrendingSwitch.checked = exploreTrendingHidden;
        }
        if (endScreenCardsSwitch && actualEndScreenCardsState !== endScreenCardsHidden) {
            console.warn('⚠️ End screen cards toggle state mismatch, retrying...');
            endScreenCardsSwitch.checked = endScreenCardsHidden;
        }
        if (moreFromYouTubeSwitch && actualMoreFromYouTubeState !== moreFromYouTubeHidden) {
            console.warn('⚠️ More from YouTube toggle state mismatch, retrying...');
            moreFromYouTubeSwitch.checked = moreFromYouTubeHidden;
        }

        // Verify new features
        const actualHideChannelState = hideChannelSwitch ? hideChannelSwitch.checked : false;
        const actualButtonsBarState = buttonsBarSwitch ? buttonsBarSwitch.checked : false;
        const actualHideDescriptionState = hideDescriptionSwitch ? hideDescriptionSwitch.checked : false;

        if (hideChannelSwitch && actualHideChannelState !== hideChannelHidden) {
            console.warn('⚠️ Hide channel toggle state mismatch, retrying...');
            hideChannelSwitch.checked = hideChannelHidden;
        }
        if (buttonsBarSwitch && actualButtonsBarState !== buttonsBarHidden) {
            console.warn('⚠️ Buttons bar toggle state mismatch, retrying...');
            buttonsBarSwitch.checked = buttonsBarHidden;
        }
        if (hideDescriptionSwitch && actualHideDescriptionState !== hideDescriptionHidden) {
            console.warn('⚠️ Hide description toggle state mismatch, retrying...');
            hideDescriptionSwitch.checked = hideDescriptionHidden;
        }
    }, 50);

    // Update status
    updateStatusUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreTrendingHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden);
}

// Function to update status UI
function updateStatusUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreTrendingHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden) {
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

    if (notificationsBellHidden === undefined && notificationsBellSwitch) {
        notificationsBellHidden = notificationsBellSwitch.checked;
    }

    if (topHeaderHidden === undefined && topHeaderSwitch) {
        topHeaderHidden = topHeaderSwitch.checked;
    }

    // Update status
    if (progressHidden || durationHidden || shortsHidden || homeFeedHidden || videoSidebarHidden || commentsHidden || notificationsBellHidden || topHeaderHidden) {
        const features = [];
        if (progressHidden) features.push(translations[currentLang].progressBar);
        if (durationHidden) features.push(translations[currentLang].duration);
        if (shortsHidden) features.push(translations[currentLang].shorts);
        if (homeFeedHidden) features.push(translations[currentLang].homeFeed);
        if (videoSidebarHidden) features.push(translations[currentLang].videoSidebar || 'video sidebar');
        if (commentsHidden) features.push(translations[currentLang].comments || 'comments');
        if (notificationsBellHidden) features.push(translations[currentLang].notificationsBell || 'notifications bell');
        if (topHeaderHidden) features.push(translations[currentLang].topHeader || 'top header');
        if (exploreTrendingHidden) features.push(translations[currentLang].exploreTrending || 'explore trending');
        
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

    // Handle collapsible sections with state persistence
    initializeCollapsibleSections();

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
    notificationsBellSwitch = document.getElementById('notificationsBellSwitch');
    topHeaderSwitch = document.getElementById('topHeaderSwitch');
    exploreTrendingSwitch = document.getElementById('exploreTrendingSwitch');
    endScreenCardsSwitch = document.getElementById('endScreenCardsSwitch');
    moreFromYouTubeSwitch = document.getElementById('moreFromYouTubeSwitch');
    hideChannelSwitch = document.getElementById('hideChannelSwitch');
    buttonsBarSwitch = document.getElementById('buttonsBarSwitch');
    hideDescriptionSwitch = document.getElementById('hideDescriptionSwitch');
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
            title: 'TubeTuner',
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
            notificationsBell: 'chuông thông báo',
            topHeader: 'thanh điều hướng trên',
            exploreTrending: 'tab khám phá & thịnh hành',
            allDisabled: 'Đã tắt tất cả',
            infoTitle: 'Giới thiệu',
            extensionInfo: 'Extension giúp bạn tập trung vào nội dung video mà không bị phân tâm bởi:',
            controlsInfo: 'Tất cả các chức năng điều khiển khác như âm lượng, play/pause vẫn hoạt động bình thường.',
            importantNote: 'Lưu ý quan trọng: Để có trải nghiệm tốt nhất, hãy bật extension trước khi vào trang YouTube.',
            settingsManagement: 'Quản lý cài đặt',
            exportSettings: 'Xuất cài đặt',
            importSettings: 'Nhập cài đặt',
            exportSuccess: 'Đã xuất cài đặt thành công!',
            importSuccess: 'Đã nhập cài đặt thành công! Đang tải lại...',
            importError: 'Lỗi: File cài đặt không hợp lệ!',
            exporting: 'Đang xuất...',
            importing: 'Đang nhập...',
            confirmImport: 'Bạn có chắc muốn nhập cài đặt mới? Điều này sẽ ghi đè lên cài đặt hiện tại.',
            backupCreated: 'Đã tạo bản sao lưu tự động',
            invalidFileType: 'Chỉ chấp nhận file JSON!',
            fileTooLarge: 'File quá lớn (tối đa 5MB)!',
            noSettingsToExport: 'Không có cài đặt nào để xuất!'
        },
        en: {
            title: 'TubeTuner',
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
            notificationsBell: 'notifications bell',
            topHeader: 'top header',
            exploreTrending: 'explore & trending tabs',
            allDisabled: 'All features disabled',
            infoTitle: 'Introduction',
            extensionInfo: 'This extension helps you focus on video content without distractions from:',
            controlsInfo: 'All other control features like volume and play/pause buttons still work normally.',
            importantNote: 'Important note: For the best experience, enable the extension before visiting YouTube.',
            settingsManagement: 'Settings Management',
            exportSettings: 'Export Settings',
            importSettings: 'Import Settings',
            exportSuccess: 'Settings exported successfully!',
            importSuccess: 'Settings imported successfully! Reloading...',
            importError: 'Error: Invalid settings file!',
            exporting: 'Exporting...',
            importing: 'Importing...',
            confirmImport: 'Are you sure you want to import new settings? This will overwrite current settings.',
            backupCreated: 'Auto backup created',
            invalidFileType: 'Only JSON files are accepted!',
            fileTooLarge: 'File too large (max 5MB)!',
            noSettingsToExport: 'No settings to export!'
        }
    };
    
    // Lấy trạng thái hiện tại với improved error handling và timing
    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'language', 'theme', 'sectionStates'], function(result) {
        const isEnabled = result.progressBarHidden !== false; // Mặc định là true
        const durationHidden = result.durationHidden !== false; // Mặc định là true
        const shortsHidden = result.shortsHidden === true; // Mặc định là false
        const homeFeedHidden = result.homeFeedHidden === true; // Mặc định là false
        const videoSidebarHidden = result.videoSidebarHidden === true; // Mặc định là false
        const commentsHidden = result.commentsHidden === true; // Mặc định là false
        const notificationsBellHidden = result.notificationsBellHidden === true; // Mặc định là false
        const topHeaderHidden = result.topHeaderHidden === true; // Mặc định là false
        const exploreTrendingHidden = result.exploreTrendingHidden === true; // Mặc định là false
        const endScreenCardsHidden = result.endScreenCardsHidden === true; // Mặc định là false
        const moreFromYouTubeHidden = result.moreFromYouTubeHidden === true; // Mặc định là false
        const hideChannelHidden = result.hideChannelHidden === true; // Mặc định là false
        const buttonsBarHidden = result.buttonsBarHidden === true; // Mặc định là false
        const hideDescriptionHidden = result.hideDescriptionHidden === true; // Mặc định là false

        console.log('🔍 Loading stored states:', {
            progressBarHidden: isEnabled,
            durationHidden: durationHidden,
            shortsHidden: shortsHidden,
            homeFeedHidden: homeFeedHidden,
            videoSidebarHidden: videoSidebarHidden,
            commentsHidden: commentsHidden,
            notificationsBellHidden: notificationsBellHidden,
            topHeaderHidden: topHeaderHidden,
            rawHomeFeedHidden: result.homeFeedHidden,
            rawVideoSidebarHidden: result.videoSidebarHidden,
            rawCommentsHidden: result.commentsHidden,
            rawNotificationsBellHidden: result.notificationsBellHidden,
            rawTopHeaderHidden: result.topHeaderHidden,
            exploreTrendingHidden: exploreTrendingHidden,
            rawExploreTrendingHidden: result.exploreTrendingHidden,
            endScreenCardsHidden: endScreenCardsHidden,
            rawEndScreenCardsHidden: result.endScreenCardsHidden,
            moreFromYouTubeHidden: moreFromYouTubeHidden,
            rawMoreFromYouTubeHidden: result.moreFromYouTubeHidden
        });

        // Verify DOM elements are available before updating UI
        if (!toggleSwitch || !durationSwitch || !shortsSwitch || !homeFeedSwitch || !videoSidebarSwitch || !commentsSwitch || !notificationsBellSwitch || !topHeaderSwitch) {
            console.error('❌ DOM elements not ready, retrying in 100ms...');
            setTimeout(() => {
                // Re-initialize DOM elements
                toggleSwitch = document.getElementById('progressSwitch');
                durationSwitch = document.getElementById('durationSwitch');
                shortsSwitch = document.getElementById('shortsSwitch');
                homeFeedSwitch = document.getElementById('homeFeedSwitch');
                videoSidebarSwitch = document.getElementById('videoSidebarSwitch');
                commentsSwitch = document.getElementById('commentsSwitch');
                notificationsBellSwitch = document.getElementById('notificationsBellSwitch');
                topHeaderSwitch = document.getElementById('topHeaderSwitch');
                hideChannelSwitch = document.getElementById('hideChannelSwitch');
                buttonsBarSwitch = document.getElementById('buttonsBarSwitch');
                hideDescriptionSwitch = document.getElementById('hideDescriptionSwitch');
                status = document.getElementById('status');

                console.log('🔄 Retrying UI update with elements:', {
                    toggleSwitch: !!toggleSwitch,
                    durationSwitch: !!durationSwitch,
                    shortsSwitch: !!shortsSwitch,
                    homeFeedSwitch: !!homeFeedSwitch,
                    videoSidebarSwitch: !!videoSidebarSwitch,
                    commentsSwitch: !!commentsSwitch,
                    notificationsBellSwitch: !!notificationsBellSwitch
                });

                updateUI(isEnabled, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreTrendingHidden, endScreenCardsHidden, moreFromYouTubeHidden);
            }, 100);
        } else {
            console.log('✅ DOM elements ready, updating UI immediately');
            updateUI(isEnabled, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreTrendingHidden, endScreenCardsHidden, moreFromYouTubeHidden);
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
            chrome.storage.sync.get(['durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreTrendingHidden = result.exploreTrendingHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                updateUI(newState, result.durationHidden !== false, result.shortsHidden === true, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreTrendingHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden);
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
            chrome.storage.sync.get(['progressBarHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreTrendingHidden = result.exploreTrendingHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                updateUI(result.progressBarHidden !== false, newState, result.shortsHidden === true, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreTrendingHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden);
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
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreTrendingHidden = result.exploreTrendingHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, newState, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreTrendingHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden);
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
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden'], function(result) {
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreTrendingHidden = result.exploreTrendingHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, newState, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreTrendingHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden);
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
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden'], function(result) {
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreTrendingHidden = result.exploreTrendingHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, newState, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreTrendingHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden);
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
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden'], function(result) {
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreTrendingHidden = result.exploreTrendingHidden === true;
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, newState, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreTrendingHidden);
                console.log('🔄 Updated UI after comments toggle, newState:', newState);
            });

            handleToggleChange('toggleComments', newState);
        });
    }

    // Xử lý click toggle notifications bell
    if (notificationsBellSwitch) {
        notificationsBellSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ notificationsBellHidden: newState });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'topHeaderHidden', 'exploreTrendingHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, newState, result.topHeaderHidden === true, result.exploreTrendingHidden === true);
                console.log('🔄 Updated UI after notifications bell toggle, newState:', newState);
            });

            handleToggleChange('toggleNotificationsBell', newState);
        });
    }

    // Xử lý click toggle top header
    if (topHeaderSwitch) {
        topHeaderSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ topHeaderHidden: newState });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'exploreTrendingHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, newState, result.exploreTrendingHidden === true);
                console.log('🔄 Updated UI after top header toggle, newState:', newState);
            });

            handleToggleChange('toggleTopHeader', newState);
        });
    }

    // Xử lý click toggle explore trending
    if (exploreTrendingSwitch) {
        exploreTrendingSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ exploreTrendingHidden: newState });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'endScreenCardsHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, newState, result.endScreenCardsHidden === true);
                console.log('🔄 Updated UI after explore trending toggle, newState:', newState);
            });

            handleToggleChange('toggleExploreTrending', newState);
        });
    }

    // Xử lý click toggle end screen cards
    if (endScreenCardsSwitch) {
        endScreenCardsSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ endScreenCardsHidden: newState });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'moreFromYouTubeHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, result.exploreTrendingHidden === true, newState, result.moreFromYouTubeHidden === true);
                console.log('🔄 Updated UI after end screen cards toggle, newState:', newState);
            });

            handleToggleChange('toggleEndScreenCards', newState);
        });
    }

    // Xử lý click toggle more from YouTube
    if (moreFromYouTubeSwitch) {
        moreFromYouTubeSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ moreFromYouTubeHidden: newState });

            // Cập nhật UI ngay lập tức với trạng thái mới
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden'], function(result) {
                updateUI(result.progressBarHidden !== false, result.durationHidden !== false, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, result.exploreTrendingHidden === true, result.endScreenCardsHidden === true, newState);
                console.log('🔄 Updated UI after more from YouTube toggle, newState:', newState);
            });

            handleToggleChange('toggleMoreFromYouTube', newState);
        });
    }

    // Xử lý click toggle hide channel
    if (hideChannelSwitch) {
        hideChannelSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ hideChannelHidden: newState });

            handleToggleChange('toggleHideChannel', newState);
        });
    }

    // Xử lý click toggle buttons bar
    if (buttonsBarSwitch) {
        buttonsBarSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ buttonsBarHidden: newState });

            handleToggleChange('toggleButtonsBar', newState);
        });
    }

    // Xử lý click toggle hide description
    if (hideDescriptionSwitch) {
        hideDescriptionSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Lưu trạng thái
            chrome.storage.sync.set({ hideDescriptionHidden: newState });

            handleToggleChange('toggleHideDescription', newState);
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

    // Setup Export/Import Settings event listeners
    const exportBtn = document.getElementById('exportSettingsBtn');
    const importBtn = document.getElementById('importSettingsBtn');
    const importFileInput = document.getElementById('importFileInput');

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            console.log('🔄 Export settings button clicked');
            exportSettings();
        });
    }

    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', function() {
            console.log('🔄 Import settings button clicked');
            importFileInput.click();
        });

        importFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                console.log('📁 File selected for import:', file.name);

                // Validate file type
                if (!file.name.toLowerCase().endsWith('.json')) {
                    showNotification(
                        translations[currentLang].invalidFileType,
                        'error'
                    );
                    e.target.value = '';
                    return;
                }

                // Validate file size (max 5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showNotification(
                        translations[currentLang].fileTooLarge,
                        'error'
                    );
                    e.target.value = '';
                    return;
                }

                // Show confirmation dialog
                if (confirm(translations[currentLang].confirmImport)) {
                    importSettings(file);
                }
                // Reset file input
                e.target.value = '';
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
            'title': 'TubeTuner',
            'subtitle': 'Ẩn các phần tử YouTube không mong muốn',
            // Content & Feed Controls
            'contentFeedControlsTitle': 'Content & Feed Controls',
            'hideHomeFeed': 'Ẩn trang chủ',
            'hideVideoSidebar': 'Ẩn thanh bên video',
            'hideShorts': 'Ẩn Shorts',
            'hideComments': 'Ẩn phần bình luận',
            'hideChannel': 'Ẩn kênh',
            // Interface Elements
            'interfaceElementsTitle': 'Interface Elements',
            'hideTopHeader': 'Ẩn thanh điều hướng trên',
            'hideNotificationsBell': 'Ẩn chuông thông báo',
            'hideExploreTrending': 'Ẩn tab Khám phá & Thịnh hành',
            'hideMoreFromYouTube': 'Ẩn "Thêm từ YouTube"',
            'hideButtonsBar': 'Ẩn thanh nút bấm',
            // Video Controls
            'videoControlsTitle': 'Video Controls',
            'hideProgressBar': 'Ẩn thanh tiến trình',
            'hideDuration': 'Ẩn thời lượng video',
            'hideEndScreenCards': 'Ẩn thẻ cuối video',
            'hideDescription': 'Ẩn mô tả video',


            // General
            'active': 'Đang hoạt động',
            'inactive': 'Đã tắt',
            'infoTitle': 'Giới thiệu',
            'infoContent': 'Extension giúp bạn tập trung vào nội dung video mà không bị phân tâm bởi:',
            'featureProgress': 'Các phần tử giao diện không cần thiết',
            'featureDuration': 'Nội dung đề xuất và quảng cáo',
            'featureShorts': 'Các tính năng gây xao nhãng',
            'homeFeed': 'Trang chủ',
            'infoExtra': 'Tùy chỉnh trải nghiệm YouTube theo ý muốn của bạn với 14 tùy chọn ẩn/hiện.',
            'noticeTitle': 'Lưu ý quan trọng',
            'noticeDesc': 'Để có trải nghiệm tốt nhất, hãy bật extension trước khi vào trang YouTube.'
        },
        'en': {
            'title': 'TubeTuner',
            'subtitle': 'Hide unwanted YouTube elements',
            // Content & Feed Controls
            'contentFeedControlsTitle': 'Content & Feed Controls',
            'hideHomeFeed': 'Hide Home Feed',
            'hideVideoSidebar': 'Hide Video Sidebar',
            'hideShorts': 'Hide Shorts',
            'hideComments': 'Hide Comments Section',
            'hideChannel': 'Hide Channel',
            // Interface Elements
            'interfaceElementsTitle': 'Interface Elements',
            'hideTopHeader': 'Hide Top Header/Navigation Bar',
            'hideNotificationsBell': 'Hide Notifications Bell',
            'hideExploreTrending': 'Hide Explore & Trending Tabs',
            'hideMoreFromYouTube': 'Hide "More from YouTube" Section',
            'hideButtonsBar': 'Hide Buttons Bar',
            // Video Controls
            'videoControlsTitle': 'Video Controls',
            'hideProgressBar': 'Hide progress bar',
            'hideDuration': 'Hide video duration',
            'hideEndScreenCards': 'Hide End Screen Cards/Annotations',
            'hideDescription': 'Hide Video Description',


            // General
            'active': 'Active',
            'inactive': 'Inactive',
            'infoTitle': 'Introduction',
            'infoContent': 'This extension helps you focus on video content without distractions from:',
            'featureProgress': 'Unnecessary interface elements',
            'featureDuration': 'Recommended content and ads',
            'featureShorts': 'Distracting features',
            'homeFeed': 'Home Feed',
            'infoExtra': 'Customize your YouTube experience with 14 hide/show options.',
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
        { id: 'hideChannelSwitch', text: t.hideChannel },
        // Interface Elements
        { id: 'topHeaderSwitch', text: t.hideTopHeader },
        { id: 'notificationsBellSwitch', text: t.hideNotificationsBell },
        { id: 'exploreTrendingSwitch', text: t.hideExploreTrending },
        { id: 'moreFromYouTubeSwitch', text: t.hideMoreFromYouTube },
        { id: 'buttonsBarSwitch', text: t.hideButtonsBar },
        // Video Controls
        { id: 'progressSwitch', text: t.hideProgressBar },
        { id: 'durationSwitch', text: t.hideDuration },
        { id: 'endScreenCardsSwitch', text: t.hideEndScreenCards },
        { id: 'hideDescriptionSwitch', text: t.hideDescription },


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

// Initialize collapsible sections with state persistence
function initializeCollapsibleSections() {
    // Get section identifiers based on their titles
    const sections = document.querySelectorAll('.ext-collapsible-section');
    const sectionIds = [];

    sections.forEach((section, index) => {
        const titleElement = section.querySelector('.ext-section-title');
        if (titleElement) {
            // Create a unique ID based on the section title
            const sectionId = titleElement.textContent.trim().toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            section.setAttribute('data-section-id', sectionId);
            sectionIds.push(sectionId);
        }
    });

    // Load saved section states
    chrome.storage.sync.get('sectionStates', function(result) {
        const savedStates = result.sectionStates || {};
        console.log('📂 Loading saved section states:', savedStates);

        sections.forEach(section => {
            const sectionId = section.getAttribute('data-section-id');
            const header = section.querySelector('.ext-section-header');

            if (sectionId && header) {
                // Apply saved state or use default (Content & Feed Controls open by default)
                const isOpen = savedStates[sectionId] !== undefined ? savedStates[sectionId] : (sectionId === 'content-feed-controls');

                // Add no-animation class for initial state
                section.classList.add('no-animation');

                if (isOpen) {
                    section.classList.add('open');
                } else {
                    section.classList.remove('open');
                }

                // Remove no-animation class after a short delay to enable transitions for user interactions
                setTimeout(() => {
                    section.classList.remove('no-animation');
                }, 100);

                // Add click event listener
                header.addEventListener('click', () => {
                    const wasOpen = section.classList.contains('open');
                    section.classList.toggle('open');

                    // Save the new state
                    saveSectionState(sectionId, !wasOpen);

                    console.log(`📂 Section "${sectionId}" ${!wasOpen ? 'opened' : 'closed'}`);
                });
            }
        });
    });
}

// Save section state to storage
function saveSectionState(sectionId, isOpen) {
    chrome.storage.sync.get('sectionStates', function(result) {
        const sectionStates = result.sectionStates || {};
        sectionStates[sectionId] = isOpen;

        chrome.storage.sync.set({ sectionStates: sectionStates }, function() {
            console.log('💾 Saved section state:', sectionId, '=', isOpen);
        });
    });
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

// Export Settings functionality
function exportSettings() {
    // Show loading state
    const exportBtn = document.getElementById('exportSettingsBtn');
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${translations[currentLang].exporting}</span>`;
    exportBtn.disabled = true;

    // Get all settings from chrome storage
    chrome.storage.sync.get(null, function(allSettings) {
        // Check if there are any settings to export
        if (!allSettings || Object.keys(allSettings).length === 0) {
            showNotification(
                translations[currentLang].noSettingsToExport,
                'info'
            );
            // Restore button state
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            return;
        }

        // Create settings object with metadata
        const settingsExport = {
            metadata: {
                exportDate: new Date().toISOString(),
                extensionName: "TubeTuner",
                version: "1.2",
                exportedBy: "TubeTuner Settings Export",
                settingsCount: Object.keys(allSettings).length
            },
            settings: allSettings
        };

        // Convert to JSON string with pretty formatting
        const jsonString = JSON.stringify(settingsExport, null, 2);

        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = `youtube-extension-settings-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up
        URL.revokeObjectURL(url);

        console.log('✅ Settings exported successfully:', Object.keys(allSettings).length, 'settings');

        // Show success message
        showNotification(
            translations[currentLang].exportSuccess,
            'success'
        );

        // Restore button state
        setTimeout(() => {
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }, 1000);
    });
}

// Create backup before importing
function createBackupBeforeImport(callback) {
    chrome.storage.sync.get(null, function(currentSettings) {
        const backup = {
            metadata: {
                backupDate: new Date().toISOString(),
                extensionName: "TubeTuner",
                version: "1.2",
                backupType: "Auto backup before import"
            },
            settings: currentSettings
        };

        const jsonString = JSON.stringify(backup, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `youtube-extension-backup-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        console.log('✅ Backup created before import');

        if (callback) callback();
    });
}

// Import Settings functionality
function importSettings(file) {
    // Show loading state
    const importBtn = document.getElementById('importSettingsBtn');
    const originalText = importBtn.innerHTML;
    importBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${translations[currentLang].importing}</span>`;
    importBtn.disabled = true;

    // Create backup first
    createBackupBeforeImport(function() {
        console.log('📦 Backup created, proceeding with import...');
    });

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            // Validate file size (max 1MB)
            if (file.size > 1024 * 1024) {
                throw new Error('File too large (max 1MB)');
            }

            const importedData = JSON.parse(e.target.result);

            // Validate imported data structure
            if (!importedData || typeof importedData !== 'object') {
                throw new Error('Invalid JSON format');
            }

            if (!importedData.settings || typeof importedData.settings !== 'object') {
                throw new Error('Invalid settings file format - missing settings object');
            }

            // Check if it's from the same extension
            if (importedData.metadata && importedData.metadata.extensionName &&
                !importedData.metadata.extensionName.includes('YouTube')) {
                throw new Error('Settings file is not from YouTube extension');
            }

            const settings = importedData.settings;

            // Validate that imported settings contain expected keys
            const expectedKeys = [
                'progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden',
                'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden',
                'topHeaderHidden', 'exploreTrendingHidden', 'endScreenCardsHidden',
                'moreFromYouTubeHidden', 'language', 'theme', 'sectionStates'
            ];

            // Filter settings to only include valid keys and validate types
            const validSettings = {};
            let validCount = 0;

            for (const key of expectedKeys) {
                if (settings.hasOwnProperty(key)) {
                    const value = settings[key];

                    // Type validation
                    if (key === 'language' && typeof value === 'string' && ['vi', 'en'].includes(value)) {
                        validSettings[key] = value;
                        validCount++;
                    } else if (key === 'theme' && typeof value === 'string' && ['light', 'dark', 'auto'].includes(value)) {
                        validSettings[key] = value;
                        validCount++;
                    } else if (key === 'sectionStates' && typeof value === 'object' && value !== null) {
                        validSettings[key] = value;
                        validCount++;
                    } else if (typeof value === 'boolean') {
                        validSettings[key] = value;
                        validCount++;
                    }
                }
            }

            if (validCount === 0) {
                throw new Error('No valid settings found in file');
            }

            // Show preview of what will be imported
            const settingsPreview = Object.keys(validSettings).join(', ');
            console.log('📋 Settings to be imported:', settingsPreview);

            // Apply imported settings
            chrome.storage.sync.set(validSettings, function() {
                if (chrome.runtime.lastError) {
                    console.error('❌ Error saving settings:', chrome.runtime.lastError);
                    showNotification(
                        currentLang === 'vi' ? 'Lỗi lưu cài đặt!' : 'Error saving settings!',
                        'error'
                    );

                    // Restore button state
                    setTimeout(() => {
                        importBtn.innerHTML = originalText;
                        importBtn.disabled = false;
                    }, 2000);
                    return;
                }

                console.log('✅ Settings imported successfully:', validCount, 'settings applied');

                // Show success message with details
                const successMsg = currentLang === 'vi' ?
                    `Đã nhập ${validCount} cài đặt thành công! Đang tải lại...` :
                    `Successfully imported ${validCount} settings! Reloading...`;

                showNotification(successMsg, 'success');

                // Send message to content script to update immediately if on YouTube
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' });
                    }
                });

                // Reload the popup to reflect new settings
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });

        } catch (error) {
            console.error('❌ Error importing settings:', error);
            showNotification(
                translations[currentLang].importError + ` (${error.message})`,
                'error'
            );

            // Restore button state
            setTimeout(() => {
                importBtn.innerHTML = originalText;
                importBtn.disabled = false;
            }, 2000);
        }
    };

    reader.onerror = function() {
        showNotification(
            currentLang === 'vi' ? 'Lỗi đọc file!' : 'Error reading file!',
            'error'
        );

        // Restore button state
        setTimeout(() => {
            importBtn.innerHTML = originalText;
            importBtn.disabled = false;
        }, 2000);
    };

    reader.readAsText(file);
}

// Show notification message
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.ext-notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `ext-notification ext-notification-${type}`;
    notification.textContent = message;

    // Add to DOM
    const container = document.querySelector('.ext-container');
    container.appendChild(notification);

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

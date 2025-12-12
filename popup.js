// YouTube Progress Bar Hider Popup Script
let currentLang = 'en'; // Default language is English
let translations = {}; // Global declaration to access from outside DOMContentLoaded
let toggleSwitch, durationSwitch, shortsSwitch, homeFeedSwitch, videoSidebarSwitch, commentsSwitch, notificationsBellSwitch, topHeaderSwitch, exploreSectionSwitch, endScreenCardsSwitch, moreFromYouTubeSwitch, hideChannelSwitch, buttonsBarSwitch, hideDescriptionSwitch, grayscaleSwitch, shopSwitch, status; // Global variables to access from outside
let extensionEnabledSwitch; // Master extension toggle
let currentExtensionEnabled = true; // Global extension enabled state

// Console log calls have been removed in production build

// Global function to handle direct click from HTML
function changeLanguage(lang) {
    // Delegate to centralized setLanguage which updates UI and persists the choice.
    // Use the existing setLanguage function (declared later) so all UI text mapping
    // is updated consistently without needing to reload the popup.
    try {
        setLanguage(lang, true);
    } catch (e) {
        // If setLanguage isn't available yet for some reason, fall back to the
        // original minimal behavior so the preference is still saved.
        if (lang !== currentLang) {
            currentLang = lang;
            chrome.storage.sync.set({ language: currentLang });
            if (typeof updateLanguageUI === 'function') updateLanguageUI();
        }
    }
}

// Debug function to verify toggle state persistence
function verifyToggleStates() {

    chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden'], function(result) {
        const storedStates = {
            progressBarHidden: result.progressBarHidden === true,
            durationHidden: result.durationHidden === true,
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

// Global function to update UI
function updateLanguageUI() {

    // Update language toggle
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');

    if (langVi && langEn) {
        langVi.classList.toggle('active', currentLang === 'vi');
        langEn.classList.toggle('active', currentLang === 'en');

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

        // Update grayscale label
        const grayscaleSwitch = document.getElementById('grayscaleSwitch');
        if (grayscaleSwitch) {
            const label = grayscaleSwitch.closest('.ext-control-item').querySelector('.ext-control-label');
            if (label) {
                label.textContent = translations[currentLang].grayscale;
            }
        }

        // Update shop label
        const shopSwitchEl = document.getElementById('shopSwitch');
        if (shopSwitchEl) {
            const label = shopSwitchEl.closest('.ext-control-item').querySelector('.ext-control-label');
            if (label) {
                label.textContent = translations[currentLang].hideShop;
            }
        }

        // Update extension enabled label
        const extensionEnabledSwitch = document.getElementById('extensionEnabledSwitch');
        if (extensionEnabledSwitch) {
            const label = extensionEnabledSwitch.closest('.ext-control-item').querySelector('.ext-control-label');
            if (label) {
                label.textContent = translations[currentLang].extensionEnabled;
            }
        }

        // Update disabled notice
        const disabledTitle = document.querySelector('.ext-notice-title');
        const disabledDesc = document.querySelector('.ext-notice-description');
        if (disabledTitle && disabledTitle.textContent.includes('Extension')) {
            disabledTitle.textContent = translations[currentLang].extensionDisabledTitle;
        }
        if (disabledDesc && disabledDesc.textContent.includes('TubeTuner')) {
            disabledDesc.textContent = translations[currentLang].extensionDisabledDesc;
        }

        // Update status based on current state
        updateStatusUI();
    } else {
        console.error('Language buttons not found in updateLanguageUI!');
    }
}

// Global function to update UI based on state
// Update UI elements (checkboxes) based on stored state
function updateUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreSectionHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden, grayscaleEnabled, shopHidden) {

    // Update extension enabled toggle
    if (extensionEnabledSwitch) {
        extensionEnabledSwitch.checked = currentExtensionEnabled;
    }

    // Show/hide sections and disabled notice based on extension enabled state
    const sectionsContainer = document.getElementById('sectionsContainer');
    const disabledNotice = document.getElementById('disabledNotice');
    if (sectionsContainer) {
        sectionsContainer.style.display = currentExtensionEnabled ? 'block' : 'none';
    }
    if (disabledNotice) {
        disabledNotice.style.display = currentExtensionEnabled ? 'none' : 'block';
    }

    if (!currentExtensionEnabled) {
        // If extension is disabled, don't update individual toggles
        return;
    }

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

    // Update progress bar toggle - use checked property for checkbox
    toggleSwitch.checked = progressHidden;

    // Update duration toggle
    durationSwitch.checked = durationHidden;

    // Update shorts toggle
    shortsSwitch.checked = shortsHidden;

    // Update home feed toggle with extra verification
    homeFeedSwitch.checked = homeFeedHidden;

    // Update video sidebar toggle
    videoSidebarSwitch.checked = videoSidebarHidden;

    // Update comments toggle
    commentsSwitch.checked = commentsHidden;

    // Update notifications bell toggle
    notificationsBellSwitch.checked = notificationsBellHidden;

    // Update top header toggle
    topHeaderSwitch.checked = topHeaderHidden;

    // Update explore section toggle
    if (exploreSectionSwitch) {
        exploreSectionSwitch.checked = exploreSectionHidden;
    }

    // Update end screen cards toggle
    if (endScreenCardsSwitch) {
        endScreenCardsSwitch.checked = endScreenCardsHidden;
    }

    // Update more from YouTube toggle
    if (moreFromYouTubeSwitch) {
        moreFromYouTubeSwitch.checked = moreFromYouTubeHidden;
    }

    // Update hide channel toggle
    if (hideChannelSwitch) {
        hideChannelSwitch.checked = hideChannelHidden;
    }

    // Update buttons bar toggle
    if (buttonsBarSwitch) {
        buttonsBarSwitch.checked = buttonsBarHidden;
    }

    // Update hide description toggle
    if (hideDescriptionSwitch) {
        hideDescriptionSwitch.checked = hideDescriptionHidden;
    }

    // Update grayscale toggle
    if (typeof grayscaleSwitch !== 'undefined' && document.getElementById('grayscaleSwitch')) {
        document.getElementById('grayscaleSwitch').checked = grayscaleEnabled;
    }

    // Update shop toggle
    if (shopSwitch) {
        shopSwitch.checked = shopHidden;
    }

    // Verify the state was actually set
    setTimeout(() => {
        const actualHomeFeedState = homeFeedSwitch.checked;
        const actualVideoSidebarState = videoSidebarSwitch.checked;
        const actualCommentsState = commentsSwitch.checked;
        const actualNotificationsBellState = notificationsBellSwitch.checked;
        const actualTopHeaderState = topHeaderSwitch.checked;
        const actualExploreSectionState = exploreSectionSwitch ? exploreSectionSwitch.checked : false;
        const actualEndScreenCardsState = endScreenCardsSwitch ? endScreenCardsSwitch.checked : false;
        const actualMoreFromYouTubeState = moreFromYouTubeSwitch ? moreFromYouTubeSwitch.checked : false;

        // Verification checks executed
        if (actualHomeFeedState !== homeFeedHidden) {
            // Home feed toggle mismatch, retrying...
            homeFeedSwitch.checked = homeFeedHidden;
        }
        if (actualVideoSidebarState !== videoSidebarHidden) {
            // Video sidebar toggle mismatch, retrying...
            videoSidebarSwitch.checked = videoSidebarHidden;
        }
        if (actualCommentsState !== commentsHidden) {
            // Comments toggle mismatch, retrying...
            commentsSwitch.checked = commentsHidden;
        }
        if (actualNotificationsBellState !== notificationsBellHidden) {
            // Notifications bell toggle mismatch, retrying...
            notificationsBellSwitch.checked = notificationsBellHidden;
        }
        if (actualTopHeaderState !== topHeaderHidden) {
            // Top header toggle mismatch, retrying...
            topHeaderSwitch.checked = topHeaderHidden;
        }
        if (exploreSectionSwitch && actualExploreSectionState !== exploreSectionHidden) {
            // Explore section toggle mismatch, retrying...
            exploreSectionSwitch.checked = exploreSectionHidden;
        }
        if (endScreenCardsSwitch && actualEndScreenCardsState !== endScreenCardsHidden) {
            // End screen cards toggle mismatch, retrying...
            endScreenCardsSwitch.checked = endScreenCardsHidden;
        }
        if (moreFromYouTubeSwitch && actualMoreFromYouTubeState !== moreFromYouTubeHidden) {
            // More from YouTube toggle mismatch, retrying...
            moreFromYouTubeSwitch.checked = moreFromYouTubeHidden;
        }

        // Ensure grayscale toggle persisted
        const grayscaleEl = document.getElementById('grayscaleSwitch');
        if (grayscaleEl && grayscaleEl.checked !== grayscaleEnabled) {
            grayscaleEl.checked = grayscaleEnabled;
        }

        // Verify new features
        const actualHideChannelState = hideChannelSwitch ? hideChannelSwitch.checked : false;
        const actualButtonsBarState = buttonsBarSwitch ? buttonsBarSwitch.checked : false;
        const actualHideDescriptionState = hideDescriptionSwitch ? hideDescriptionSwitch.checked : false;

        if (hideChannelSwitch && actualHideChannelState !== hideChannelHidden) {
            // Hide channel toggle mismatch, retrying...
            hideChannelSwitch.checked = hideChannelHidden;
        }
        if (buttonsBarSwitch && actualButtonsBarState !== buttonsBarHidden) {
            // Buttons bar toggle mismatch, retrying...
            buttonsBarSwitch.checked = buttonsBarHidden;
        }
        if (hideDescriptionSwitch && actualHideDescriptionState !== hideDescriptionHidden) {
            // Hide description toggle mismatch, retrying...
            hideDescriptionSwitch.checked = hideDescriptionHidden;
        }
    }, 50);

    // Update status
    updateStatusUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreSectionHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden, shopHidden);
}

// Function to update status UI
function updateStatusUI(progressHidden, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreSectionHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden, shopHidden) {
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

    if (shopHidden === undefined && shopSwitch) {
        shopHidden = shopSwitch.checked;
    }

    // Update status
    if (progressHidden || durationHidden || shortsHidden || homeFeedHidden || videoSidebarHidden || commentsHidden || notificationsBellHidden || topHeaderHidden || shopHidden) {
        const features = [];
        if (progressHidden) features.push(translations[currentLang].progressBar);
        if (durationHidden) features.push(translations[currentLang].duration);
        if (shortsHidden) features.push(translations[currentLang].shorts);
        if (homeFeedHidden) features.push(translations[currentLang].homeFeed);
        if (videoSidebarHidden) features.push(translations[currentLang].videoSidebar || 'video sidebar');
        if (commentsHidden) features.push(translations[currentLang].comments || 'comments');
        if (notificationsBellHidden) features.push(translations[currentLang].notificationsBell || 'notifications bell');
        if (topHeaderHidden) features.push(translations[currentLang].topHeader || 'top header');
        if (exploreSectionHidden) features.push(translations[currentLang].exploreSection || 'explore section');
        if (shopHidden) features.push(translations[currentLang].shop || 'YouTube Shop');

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

// Function to apply theme from localStorage or system preference
function applyInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', prefersDark);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme according to previous settings or system theme
    initializeTheme();

    // Initialize language according to previous settings
    initializeLanguage();

    // Handle toggle switches
    initializeSwitches();

    // Handle collapsible sections with state persistence
    initializeCollapsibleSections();

    // Theme toggle button
    document.querySelector('.theme-toggle').addEventListener('click', function() {
        document.documentElement.classList.toggle('dark');
        saveThemeSetting(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    });

    // Language selection
    // Language selection handled above during initialization

    // Initialize global variables
    toggleSwitch = document.getElementById('progressSwitch');
    durationSwitch = document.getElementById('durationSwitch');
    shortsSwitch = document.getElementById('shortsSwitch');
    homeFeedSwitch = document.getElementById('homeFeedSwitch');
    videoSidebarSwitch = document.getElementById('videoSidebarSwitch');
    commentsSwitch = document.getElementById('commentsSwitch');
    notificationsBellSwitch = document.getElementById('notificationsBellSwitch');
    topHeaderSwitch = document.getElementById('topHeaderSwitch');
    exploreSectionSwitch = document.getElementById('exploreSectionSwitch');
    endScreenCardsSwitch = document.getElementById('endScreenCardsSwitch');
    moreFromYouTubeSwitch = document.getElementById('moreFromYouTubeSwitch');
    hideChannelSwitch = document.getElementById('hideChannelSwitch');
    buttonsBarSwitch = document.getElementById('buttonsBarSwitch');
    hideDescriptionSwitch = document.getElementById('hideDescriptionSwitch');
    grayscaleSwitch = document.getElementById('grayscaleSwitch');
    shopSwitch = document.getElementById('shopSwitch');
    extensionEnabledSwitch = document.getElementById('extensionEnabledSwitch');
    status = document.getElementById('status');
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');

    // DOM elements initialized

    // Translation object
    translations = {
        vi: {
            title: 'TubeTuner',
            subtitle: 'Ẩn thanh tiến trình & thời lượng',
            hideProgressBar: 'Ẩn thanh tiến trình',
            hideDuration: 'Ẩn thời lượng video',
            hideShorts: 'Ẩn Shorts',
            extensionEnabled: 'Bật/Tắt Extension',
            extensionDisabledTitle: 'Extension đã tắt',
            extensionDisabledDesc: 'TubeTuner hiện đang được tắt. Bật lại để sử dụng các tính năng tùy chỉnh YouTube.',
            statusActive: 'Đang hoạt động',
            hidingFeatures: 'Đang ẩn',
            progressBar: 'thanh tiến trình',
            duration: 'thời lượng',
            shorts: 'shorts',
            homeFeed: 'trang chủ',
            videoSidebar: 'thanh bên video',
            notificationsBell: 'chuông thông báo',
            topHeader: 'thanh điều hướng trên',
            exploreSection: 'phần khám phá',
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
            ,
            // New translation entries for grayscale feature
            grayscale: 'Giao diện đen trắng',
            enableGrayscale: 'Bật giao diện đen trắng',
            disableGrayscale: 'Tắt giao diện đen trắng',
            // Shop feature translations
            shop: 'YouTube Shop',
            hideShop: 'Ẩn YouTube Shop',
            // About section translations
            aboutTitle: 'Giới thiệu',
            aboutDescription: 'TubeTuner là extension giúp bạn tùy chỉnh trải nghiệm YouTube theo ý muốn. Ẩn các phần tử không cần thiết như thanh tiến trình, Shorts, quảng cáo, và nhiều thành phần khác để tập trung vào nội dung quan trọng.',
            aboutFeaturesTitle: 'Tính năng chính:',
            aboutFeature1: '✨ Ẩn/hiện các phần tử giao diện YouTube',
            aboutFeature2: '🎨 Chế độ giao diện đen trắng',
            aboutFeature3: '🔄 Đồng bộ cài đặt giữa các tab',
            aboutFeature4: '💾 Sao lưu/khôi phục cài đặt',
            aboutFeature5: '🌐 Hỗ trợ đa ngôn ngữ (VI/EN)',
            aboutGithubLink: 'GitHub Repository'
        },
        en: {
            title: 'TubeTuner',
            subtitle: 'Hide progress bar & duration',
            hideProgressBar: 'Hide progress bar',
            hideDuration: 'Hide video duration',
            hideShorts: 'Hide Shorts',
            extensionEnabled: 'Enable/Disable Extension',
            extensionDisabledTitle: 'Extension Disabled',
            extensionDisabledDesc: 'TubeTuner is currently disabled. Enable it to use YouTube customization features.',
            statusActive: 'Active',
            hidingFeatures: 'Hiding',
            progressBar: 'progress bar',
            duration: 'duration',
            shorts: 'shorts',
            homeFeed: 'home feed',
            videoSidebar: 'video sidebar',
            notificationsBell: 'notifications bell',
            topHeader: 'top header',
            exploreSection: 'explore section',
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
            noSettingsToExport: 'No settings to export!',
            // Shop feature translations
            shop: 'YouTube Shop',
            hideShop: 'Hide YouTube Shop'
        }
    };

    // Get current state with improved error handling and timing
    chrome.storage.sync.get(['extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden', 'language', 'theme', 'sectionStates'], function(result) {
        currentExtensionEnabled = result.extensionEnabled !== false; // Default is true
        const isEnabled = result.progressBarHidden === true; // Default is false
        const durationHidden = result.durationHidden === true; // Default is false
        const shortsHidden = result.shortsHidden === true; // Default is false
        const homeFeedHidden = result.homeFeedHidden === true; // Default is false
        const videoSidebarHidden = result.videoSidebarHidden === true; // Default is false
        const commentsHidden = result.commentsHidden === true; // Default is false
        const notificationsBellHidden = result.notificationsBellHidden === true; // Default is false
        const topHeaderHidden = result.topHeaderHidden === true; // Default is false
        const exploreSectionHidden = result.exploreSectionHidden === true; // Default is false
        const endScreenCardsHidden = result.endScreenCardsHidden === true; // Default is false
        const moreFromYouTubeHidden = result.moreFromYouTubeHidden === true; // Default is false
        const hideChannelHidden = result.hideChannelHidden === true; // Default is false
        const buttonsBarHidden = result.buttonsBarHidden === true; // Default is false
        const hideDescriptionHidden = result.hideDescriptionHidden === true; // Default is false
        const grayscaleEnabled = result.grayscaleEnabled === true; // Default is false
        const shopHidden = result.shopHidden === true; // Default is false

        // Loaded stored states

        // Verify DOM elements are available before updating UI
        if (!toggleSwitch || !durationSwitch || !shortsSwitch || !homeFeedSwitch || !videoSidebarSwitch || !commentsSwitch || !notificationsBellSwitch || !topHeaderSwitch || !hideChannelSwitch || !buttonsBarSwitch || !hideDescriptionSwitch || !shopSwitch) {
            // DOM elements not ready, retrying in 100ms...
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
                grayscaleSwitch = document.getElementById('grayscaleSwitch');
                shopSwitch = document.getElementById('shopSwitch');
                status = document.getElementById('status');

                // Retrying UI update with elements

                updateUI(isEnabled, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreSectionHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden, grayscaleEnabled, shopHidden);
            }, 100);
        } else {
            // DOM elements ready, updating UI immediately
            updateUI(isEnabled, durationHidden, shortsHidden, homeFeedHidden, videoSidebarHidden, commentsHidden, notificationsBellHidden, topHeaderHidden, exploreSectionHidden, endScreenCardsHidden, moreFromYouTubeHidden, hideChannelHidden, buttonsBarHidden, hideDescriptionHidden, grayscaleEnabled, shopHidden);
        }

        // Set language
        if (result.language) {
            currentLang = result.language;
            // Loaded saved language preference
        } else {
            // No saved language preference, using default
        }

        // Sync theme from storage with localStorage
        if (result.theme) {
            localStorage.setItem('theme', result.theme);
            document.documentElement.classList.toggle('dark', result.theme === 'dark');
            // Synced theme from storage
        }

        updateLanguageUI();
    });
    
    // Handle extension enabled toggle click
    if (extensionEnabledSwitch) {
        extensionEnabledSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;
            currentExtensionEnabled = newState; // Update global state

            // Save state
            chrome.storage.sync.set({ extensionEnabled: newState });

            // Update UI immediately
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, result.exploreSectionHidden === true, result.endScreenCardsHidden === true, result.moreFromYouTubeHidden === true, result.hideChannelHidden === true, result.buttonsBarHidden === true, result.hideDescriptionHidden === true, result.grayscaleEnabled === true, result.shopHidden === true);
                // Updated UI after extension enabled toggle
            });

            handleToggleChange('toggleExtensionEnabled', newState);
        });
    }

    // Handle toggle extension click
    if (toggleSwitch) {
        toggleSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ progressBarHidden: newState });

            // Update UI
            chrome.storage.sync.get(['durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreSectionHidden = result.exploreSectionHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                const currentHideChannelHidden = result.hideChannelHidden === true;
                const currentButtonsBarHidden = result.buttonsBarHidden === true;
                const currentHideDescriptionHidden = result.hideDescriptionHidden === true;
                const currentShopHidden = result.shopHidden === true;
                updateUI(newState, result.durationHidden === true, result.shortsHidden === true, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreSectionHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden, currentHideChannelHidden, currentButtonsBarHidden, currentHideDescriptionHidden, result.grayscaleEnabled === true, currentShopHidden);
                // Updated UI after progress bar toggle
            });

            handleToggleChange('toggleProgressBar', newState);
        });
    }

    
    // Handle toggle duration click
    if (durationSwitch) {
        durationSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ durationHidden: newState });

            // Update UI
            chrome.storage.sync.get(['extensionEnabled', 'progressBarHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled'], function(result) {
                const currentExtensionEnabled = result.extensionEnabled !== false;
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreSectionHidden = result.exploreSectionHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                const currentHideChannelHidden = result.hideChannelHidden === true;
                const currentButtonsBarHidden = result.buttonsBarHidden === true;
                const currentHideDescriptionHidden = result.hideDescriptionHidden === true;
                const currentShopHidden = result.shopHidden === true;
                updateUI(result.progressBarHidden === true, newState, result.shortsHidden === true, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreSectionHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden, currentHideChannelHidden, currentButtonsBarHidden, currentHideDescriptionHidden, result.grayscaleEnabled === true, currentShopHidden);
                // Updated UI after duration toggle
            });

            handleToggleChange('toggleDuration', newState);
        });
    }
    
    // Handle toggle shorts click
    if (shortsSwitch) {
        shortsSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ shortsHidden: newState });

            // Update UI
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled'], function(result) {
                const currentHomeFeedHidden = result.homeFeedHidden === true;
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreSectionHidden = result.exploreSectionHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                const currentHideChannelHidden = result.hideChannelHidden === true;
                const currentButtonsBarHidden = result.buttonsBarHidden === true;
                const currentHideDescriptionHidden = result.hideDescriptionHidden === true;
                const currentShopHidden = result.shopHidden === true;
                updateUI(result.progressBarHidden === true, result.durationHidden === true, newState, currentHomeFeedHidden, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreSectionHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden, currentHideChannelHidden, currentButtonsBarHidden, currentHideDescriptionHidden, result.grayscaleEnabled === true, currentShopHidden);
                // Updated UI after shorts toggle
            });

            handleToggleChange('toggleShorts', newState);
        });
    }

    // Handle toggle home feed click
    if (homeFeedSwitch) {
        homeFeedSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ homeFeedHidden: newState }, function() {
                // Home Feed state saved to storage
            });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled'], function(result) {
                const currentVideoSidebarHidden = result.videoSidebarHidden === true;
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreSectionHidden = result.exploreSectionHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                const currentHideChannelHidden = result.hideChannelHidden === true;
                const currentButtonsBarHidden = result.buttonsBarHidden === true;
                const currentHideDescriptionHidden = result.hideDescriptionHidden === true;
                const currentShopHidden = result.shopHidden === true;
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, newState, currentVideoSidebarHidden, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreSectionHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden, currentHideChannelHidden, currentButtonsBarHidden, currentHideDescriptionHidden, result.grayscaleEnabled === true, currentShopHidden);
                // Updated UI after home feed toggle
            });

            handleToggleChange('toggleHomeFeed', newState);
        });
    }

    // Handle toggle video sidebar click
    if (videoSidebarSwitch) {
        videoSidebarSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ videoSidebarHidden: newState }, function() {
                // Video Sidebar state saved to storage
            });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                const currentCommentsHidden = result.commentsHidden === true;
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreSectionHidden = result.exploreSectionHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                const currentHideChannelHidden = result.hideChannelHidden === true;
                const currentButtonsBarHidden = result.buttonsBarHidden === true;
                const currentHideDescriptionHidden = result.hideDescriptionHidden === true;
                const currentShopHidden = result.shopHidden === true;
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, newState, currentCommentsHidden, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreSectionHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden, currentHideChannelHidden, currentButtonsBarHidden, currentHideDescriptionHidden, result.grayscaleEnabled === true, currentShopHidden);
                // Updated UI after video sidebar toggle
            });

            handleToggleChange('toggleVideoSidebar', newState);
        });
    }

    // Handle toggle comments click
    if (commentsSwitch) {
        commentsSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ commentsHidden: newState });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                const currentNotificationsBellHidden = result.notificationsBellHidden === true;
                const currentTopHeaderHidden = result.topHeaderHidden === true;
                const currentExploreSectionHidden = result.exploreSectionHidden === true;
                const currentEndScreenCardsHidden = result.endScreenCardsHidden === true;
                const currentMoreFromYouTubeHidden = result.moreFromYouTubeHidden === true;
                const currentHideChannelHidden = result.hideChannelHidden === true;
                const currentButtonsBarHidden = result.buttonsBarHidden === true;
                const currentHideDescriptionHidden = result.hideDescriptionHidden === true;
                const currentShopHidden = result.shopHidden === true;
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, newState, currentNotificationsBellHidden, currentTopHeaderHidden, currentExploreSectionHidden, currentEndScreenCardsHidden, currentMoreFromYouTubeHidden, currentHideChannelHidden, currentButtonsBarHidden, currentHideDescriptionHidden, result.grayscaleEnabled === true, currentShopHidden);
                // Updated UI after comments toggle
            });

            handleToggleChange('toggleComments', newState);
        });
    }

    // Handle toggle notifications bell click
    if (notificationsBellSwitch) {
        notificationsBellSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ notificationsBellHidden: newState });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, newState, result.topHeaderHidden === true, result.exploreSectionHidden === true, result.endScreenCardsHidden === true, result.moreFromYouTubeHidden === true, result.hideChannelHidden === true, result.buttonsBarHidden === true, result.hideDescriptionHidden === true, result.grayscaleEnabled === true, result.shopHidden === true);
                // Updated UI after notifications bell toggle
            });

            handleToggleChange('toggleNotificationsBell', newState);
        });
    }

    // Handle toggle top header click
    if (topHeaderSwitch) {
        topHeaderSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ topHeaderHidden: newState });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, newState, result.exploreSectionHidden === true, result.endScreenCardsHidden === true, result.moreFromYouTubeHidden === true, result.hideChannelHidden === true, result.buttonsBarHidden === true, result.hideDescriptionHidden === true, result.grayscaleEnabled === true, result.shopHidden === true);
                // Updated UI after top header toggle
            });

            handleToggleChange('toggleTopHeader', newState);
        });
    }

    // Handle toggle explore section click
    if (exploreSectionSwitch) {
        exploreSectionSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ exploreSectionHidden: newState });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, newState, result.endScreenCardsHidden === true, result.moreFromYouTubeHidden === true, result.hideChannelHidden === true, result.buttonsBarHidden === true, result.hideDescriptionHidden === true, result.grayscaleEnabled === true, result.shopHidden === true);
                // Updated UI after explore section toggle
            });

            handleToggleChange('toggleExploreSection', newState);
        });
    }

    // Handle toggle end screen cards click
    if (endScreenCardsSwitch) {
        endScreenCardsSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ endScreenCardsHidden: newState });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'moreFromYouTubeHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, result.exploreSectionHidden === true, newState, result.moreFromYouTubeHidden === true, result.hideChannelHidden === true, result.buttonsBarHidden === true, result.hideDescriptionHidden === true, result.grayscaleEnabled === true, result.shopHidden === true);
                // Updated UI after end screen cards toggle
            });

            handleToggleChange('toggleEndScreenCards', newState);
        });
    }

    // Handle toggle more from YouTube click
    if (moreFromYouTubeSwitch) {
        moreFromYouTubeSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ moreFromYouTubeHidden: newState });

            // Update UI immediately with new state
            chrome.storage.sync.get(['progressBarHidden', 'durationHidden', 'shortsHidden', 'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden', 'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled', 'shopHidden'], function(result) {
                updateUI(result.progressBarHidden === true, result.durationHidden === true, result.shortsHidden === true, result.homeFeedHidden === true, result.videoSidebarHidden === true, result.commentsHidden === true, result.notificationsBellHidden === true, result.topHeaderHidden === true, result.exploreSectionHidden === true, result.endScreenCardsHidden === true, newState, result.hideChannelHidden === true, result.buttonsBarHidden === true, result.hideDescriptionHidden === true, result.grayscaleEnabled === true, result.shopHidden === true);
                // Updated UI after more from YouTube toggle
            });

            handleToggleChange('toggleMoreFromYouTube', newState);
        });
    }

    // Handle toggle hide channel click
    if (hideChannelSwitch) {
        hideChannelSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ hideChannelHidden: newState });

            handleToggleChange('toggleHideChannel', newState);
        });
    }

    // Handle toggle buttons bar click
    if (buttonsBarSwitch) {
        buttonsBarSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ buttonsBarHidden: newState });

            handleToggleChange('toggleButtonsBar', newState);
        });
    }

    // Handle toggle hide description click
    if (hideDescriptionSwitch) {
        hideDescriptionSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ hideDescriptionHidden: newState });

            handleToggleChange('toggleHideDescription', newState);
        });
    }

    // Handle toggle grayscale click
    if (grayscaleSwitch) {
        grayscaleSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ grayscaleEnabled: newState });

            handleToggleChange('toggleGrayscale', newState);
        });
    }

    // Handle toggle shop click
    if (shopSwitch) {
        shopSwitch.addEventListener('change', function(e) {
            const newState = e.target.checked;

            // Save state
            chrome.storage.sync.set({ shopHidden: newState });

            handleToggleChange('toggleShop', newState);
        });
    }

    // Add click event for language buttons
    const lv = document.getElementById('lang-vi');
    const le = document.getElementById('lang-en');

    if (lv) {
        lv.addEventListener('click', function() {
            changeLanguage('vi');
        });
    }
    
    if (le) {
        le.addEventListener('click', function() {
            changeLanguage('en');
        });
    }
    
    // Function to handle toggle changes with multi-tab synchronization
    function handleToggleChange(action, enabled) {
        // Toggle action changed

        // Send message to current tab immediately
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    action: action,
                    enabled: enabled
                }).catch(error => {
                    // Could not send message to current tab
                });
            }
        });

        // Send message to background script to sync with all other tabs
        chrome.runtime.sendMessage({
            action: 'syncToAllTabs',
            toggleAction: action,
            enabled: enabled
        }).catch(error => {
            // Could not send sync message to background
        });
    }

    // Setup Export/Import Settings event listeners
    const exportBtn = document.getElementById('exportSettingsBtn');
    const importBtn = document.getElementById('importSettingsBtn');
    const importFileInput = document.getElementById('importFileInput');

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Export settings button clicked
            exportSettings();
        });
    }

    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', function() {
            // Import settings button clicked
            importFileInput.click();
        });

        importFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // File selected for import

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
        const savedLanguage = data.language || 'en';
        setLanguage(savedLanguage, false);
    });
}

// Set language and update UI
function setLanguage(lang, save = true) {
    // Update global language state so other functions that rely on
    // `currentLang` and `translations` will reflect the new language.
    currentLang = lang;

    // Remove active class from all language buttons
    document.querySelectorAll('.ext-lang-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to selected language button
    document.getElementById(`lang-${lang}`).classList.add('active');
    
    translations = {
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
            'hideExploreSection': 'Ẩn phần Khám phá',
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
            ,
            // Grayscale feature translations
            'grayscale': 'Giao diện đen trắng',
            'enableGrayscale': 'Bật giao diện đen trắng',
            'disableGrayscale': 'Tắt giao diện đen trắng',
            // Shop feature translations
            'shop': 'YouTube Shop',
            'hideShop': 'Ẩn YouTube Shop',
            // Settings management
            'settingsManagement': 'Quản lý cài đặt',
            'exportSettings': 'Xuất cài đặt',
            'importSettings': 'Nhập cài đặt',
            'exportSuccess': 'Đã xuất cài đặt thành công!',
            'importSuccess': 'Đã nhập cài đặt thành công! Đang tải lại...',
            'importError': 'Lỗi: File cài đặt không hợp lệ!',
            'exporting': 'Đang xuất...',
            'importing': 'Đang nhập...',
            'confirmImport': 'Bạn có chắc muốn nhập cài đặt mới? Điều này sẽ ghi đè lên cài đặt hiện tại.',
            'backupCreated': 'Đã tạo bản sao lưu tự động',
            'invalidFileType': 'Chỉ chấp nhận file JSON!',
            'fileTooLarge': 'File quá lớn (tối đa 5MB)!',
            'noSettingsToExport': 'Không có cài đặt nào để xuất!',
            'extensionEnabled': 'Bật/Tắt Extension',
            'extensionDisabledTitle': 'Extension đã tắt',
            'extensionDisabledDesc': 'TubeTuner hiện đang được tắt. Bật lại để sử dụng các tính năng tùy chỉnh YouTube.',
            // About section translations
            'aboutTitle': 'Giới thiệu',
            'aboutDescription': 'TubeTuner là extension giúp bạn tùy chỉnh trải nghiệm YouTube theo ý muốn. Ẩn các phần tử không cần thiết như thanh tiến trình, Shorts, quảng cáo, và nhiều thành phần khác để tập trung vào nội dung quan trọng.',
            'aboutFeaturesTitle': 'Tính năng chính:',
            'aboutFeature1': '✨ Ẩn/hiện các phần tử giao diện YouTube',
            'aboutFeature2': '🎨 Chế độ giao diện đen trắng',
            'aboutFeature3': '🔄 Đồng bộ cài đặt giữa các tab',
            'aboutFeature4': '💾 Sao lưu/khôi phục cài đặt',
            'aboutFeature5': '🌐 Hỗ trợ đa ngôn ngữ (VI/EN)',
            'aboutGithubLink': 'GitHub Repository'
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
            'hideExploreSection': 'Hide Explore Section',
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
            ,
            // Grayscale feature translations
            'grayscale': 'Grayscale interface',
            'enableGrayscale': 'Enable grayscale interface',
            'disableGrayscale': 'Disable grayscale interface',
            // Shop feature translations
            'shop': 'YouTube Shop',
            'hideShop': 'Hide YouTube Shop',
            // Settings management
            'settingsManagement': 'Settings Management',
            'exportSettings': 'Export Settings',
            'importSettings': 'Import Settings',
            'exportSuccess': 'Settings exported successfully!',
            'importSuccess': 'Settings imported successfully! Reloading...',
            'importError': 'Error: Invalid settings file!',
            'exporting': 'Exporting...',
            'importing': 'Importing...',
            'confirmImport': 'Are you sure you want to import new settings? This will overwrite current settings.',
            'backupCreated': 'Auto backup created',
            'invalidFileType': 'Only JSON files are accepted!',
            'fileTooLarge': 'File too large (max 5MB)!',
            'noSettingsToExport': 'No settings to export!',
            'extensionEnabled': 'Enable/Disable Extension',
            'extensionDisabledTitle': 'Extension Disabled',
            'extensionDisabledDesc': 'TubeTuner is currently disabled. Enable it to use YouTube customization features.',
            // About section translations
            'aboutTitle': 'About',
            'aboutDescription': 'TubeTuner is an extension that helps you customize your YouTube experience as you wish. Hide unnecessary elements like progress bars, Shorts, ads, and many other components to focus on important content.',
            'aboutFeaturesTitle': 'Key Features:',
            'aboutFeature1': '✨ Show/hide YouTube interface elements',
            'aboutFeature2': '🎨 Grayscale interface mode',
            'aboutFeature3': '🔄 Sync settings across tabs',
            'aboutFeature4': '💾 Backup/restore settings',
            'aboutFeature5': '🌐 Multi-language support (VI/EN)',
            'aboutGithubLink': 'GitHub Repository'
        }
    };
    
    // Update UI text based on selected language
    const t = translations[lang];

    // Header
    document.querySelector('.ext-title').textContent = t.title;
    document.querySelector('.ext-subtitle').textContent = t.subtitle;

    // Section titles
    const sectionTitles = document.querySelectorAll('.ext-section-title');
    if (sectionTitles[0]) sectionTitles[0].textContent = t.aboutTitle;
    if (sectionTitles[1]) sectionTitles[1].textContent = t.contentFeedControlsTitle;
    if (sectionTitles[2]) sectionTitles[2].textContent = t.interfaceElementsTitle;
    if (sectionTitles[3]) sectionTitles[3].textContent = t.videoControlsTitle;
    if (sectionTitles[4]) sectionTitles[4].textContent = t.otherFeaturesTitle;

    // About section content
    const aboutDescription = document.querySelector('.ext-about-description');
    if (aboutDescription) aboutDescription.textContent = t.aboutDescription;
    
    const aboutFeaturesTitle = document.querySelector('.ext-about-features-title');
    if (aboutFeaturesTitle) aboutFeaturesTitle.textContent = t.aboutFeaturesTitle;
    
    const aboutFeaturesList = document.querySelectorAll('.ext-about-features-list li');
    if (aboutFeaturesList.length >= 5) {
        aboutFeaturesList[0].textContent = t.aboutFeature1;
        aboutFeaturesList[1].textContent = t.aboutFeature2;
        aboutFeaturesList[2].textContent = t.aboutFeature3;
        aboutFeaturesList[3].textContent = t.aboutFeature4;
        aboutFeaturesList[4].textContent = t.aboutFeature5;
    }
    
    const aboutGithubLink = document.querySelector('.ext-about-link');
    if (aboutGithubLink) {
        const linkText = aboutGithubLink.childNodes[aboutGithubLink.childNodes.length - 1];
        if (linkText && linkText.nodeType === Node.TEXT_NODE) {
            linkText.textContent = t.aboutGithubLink;
        }
    }

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
        { id: 'exploreSectionSwitch', text: t.hideExploreSection },
        { id: 'moreFromYouTubeSwitch', text: t.hideMoreFromYouTube },
        { id: 'buttonsBarSwitch', text: t.hideButtonsBar },
        // Video Controls
        { id: 'progressSwitch', text: t.hideProgressBar },
        { id: 'durationSwitch', text: t.hideDuration },
        { id: 'endScreenCardsSwitch', text: t.hideEndScreenCards },
        { id: 'hideDescriptionSwitch', text: t.hideDescription },
        // Grayscale
        { id: 'grayscaleSwitch', text: t.grayscale },
        // Shop
        { id: 'shopSwitch', text: t.hideShop },
        // Extension Enabled
        { id: 'extensionEnabledSwitch', text: t.extensionEnabled },


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

    // Update settings management section
    const settingsTitle = document.querySelector('.ext-settings-title');
    const exportBtn = document.querySelector('#exportSettingsBtn span');
    const importBtn = document.querySelector('#importSettingsBtn span');

    if (settingsTitle) {
        settingsTitle.textContent = t.settingsManagement;
    }
    if (exportBtn) {
        exportBtn.textContent = t.exportSettings;
    }
    if (importBtn) {
        importBtn.textContent = t.importSettings;
    }

    // Other UI elements
    document.querySelector('#status').textContent = t.active;
    document.querySelector('.ext-info-title').textContent = t.infoTitle;
    document.querySelector('.ext-info-content').firstChild.textContent = t.infoContent;
    document.querySelectorAll('.ext-feature-item')[0].textContent = t.featureProgress;
    document.querySelectorAll('.ext-feature-item')[1].textContent = t.featureDuration;
    document.querySelectorAll('.ext-feature-item')[2].textContent = t.featureShorts;
    document.querySelector('.ext-info-content p').textContent = t.infoExtra;

    // Save language preference if needed
    if (save) {
        chrome.storage.sync.set({ language: lang });
    }

    // Ensure the rest of the UI which may use the older updateLanguageUI
    // flow is refreshed as well.
    if (typeof updateLanguageUI === 'function') {
        try { updateLanguageUI(); } catch (e) { /* ignore */ }
    }

    if (typeof updateStatus === 'function') {
        try { updateStatus(); } catch (e) { /* ignore */ }
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
        // Loading saved section states

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

                    // Section toggled
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
            // Saved section state
        });
    });
}

// Initialize switches based on saved settings
function initializeSwitches() {
    const switches = [
        { id: 'progressSwitch', setting: 'hideProgressBar', default: true },
        { id: 'durationSwitch', setting: 'hideDuration', default: true },
        { id: 'shortsSwitch', setting: 'hideShorts', default: false },
        { id: 'grayscaleSwitch', setting: 'grayscaleEnabled', default: false }
    ];

    // Get all settings at once
    chrome.storage.sync.get(['hideProgressBar', 'hideDuration', 'hideShorts', 'grayscaleEnabled'], function(data) {
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

                    // Send specific message for grayscale, otherwise request a general update
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        if (tabs[0] && tabs[0].url && tabs[0].url.includes('youtube.com')) {
                            if (switchItem.setting === 'grayscaleEnabled') {
                                chrome.tabs.sendMessage(tabs[0].id, { action: 'toggleGrayscale', enabled: switchElement.checked }).catch(() => {});
                            } else {
                                chrome.tabs.sendMessage(tabs[0].id, { action: 'updateSettings' }).catch(() => {});
                            }
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

    // Define all valid setting keys
    const validSettingKeys = [
        'extensionEnabled',
        'progressBarHidden',
        'durationHidden',
        'shortsHidden',
        'homeFeedHidden',
        'videoSidebarHidden',
        'commentsHidden',
        'notificationsBellHidden',
        'topHeaderHidden',
        'exploreSectionHidden',
        'endScreenCardsHidden',
        'moreFromYouTubeHidden',
        'hideChannelHidden',
        'buttonsBarHidden',
        'hideDescriptionHidden',
        'grayscaleEnabled',
        'shopHidden',
        'language',
        'theme'
    ];

    // Get all settings from chrome storage
    chrome.storage.sync.get(validSettingKeys, function(result) {
        if (chrome.runtime.lastError) {
            console.error('Error getting settings:', chrome.runtime.lastError);
            showNotification(
                currentLang === 'vi' ? 'Lỗi khi lấy cài đặt!' : 'Error getting settings!',
                'error'
            );
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            return;
        }

        // Filter only existing settings
        const settingsToExport = {};
        let settingsCount = 0;
        
        for (const key of validSettingKeys) {
            if (result.hasOwnProperty(key)) {
                settingsToExport[key] = result[key];
                settingsCount++;
            }
        }

        // Check if there are any settings to export
        if (settingsCount === 0) {
            showNotification(
                translations[currentLang].noSettingsToExport,
                'info'
            );
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            return;
        }

        // Create settings object with metadata
        const settingsExport = {
            metadata: {
                exportDate: new Date().toISOString(),
                extensionName: "TubeTuner",
                extensionVersion: "1.2",
                formatVersion: "1.0",
                settingsCount: settingsCount
            },
            settings: settingsToExport
        };

        // Convert to JSON string with pretty formatting
        const jsonString = JSON.stringify(settingsExport, null, 2);

        // Create blob and download
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Create download link with timestamp
        const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const a = document.createElement('a');
        a.href = url;
        a.download = `TubeTuner-settings-${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up
        URL.revokeObjectURL(url);

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

// Import Settings functionality
function importSettings(file) {
    // Show loading state
    const importBtn = document.getElementById('importSettingsBtn');
    const originalText = importBtn.innerHTML;
    importBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${translations[currentLang].importing}</span>`;
    importBtn.disabled = true;

    // Define all valid setting keys with their expected types
    const validSettings = {
        'extensionEnabled': 'boolean',
        'progressBarHidden': 'boolean',
        'durationHidden': 'boolean',
        'shortsHidden': 'boolean',
        'homeFeedHidden': 'boolean',
        'videoSidebarHidden': 'boolean',
        'commentsHidden': 'boolean',
        'notificationsBellHidden': 'boolean',
        'topHeaderHidden': 'boolean',
        'exploreSectionHidden': 'boolean',
        'endScreenCardsHidden': 'boolean',
        'moreFromYouTubeHidden': 'boolean',
        'hideChannelHidden': 'boolean',
        'buttonsBarHidden': 'boolean',
        'hideDescriptionHidden': 'boolean',
        'grayscaleEnabled': 'boolean',
        'shopHidden': 'boolean',
        'language': 'string',
        'theme': 'string'
    };

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            // Parse JSON
            const importedData = JSON.parse(e.target.result);

            // Validate file structure
            if (!importedData || typeof importedData !== 'object') {
                throw new Error(currentLang === 'vi' ? 'Định dạng file không hợp lệ' : 'Invalid file format');
            }

            // Check metadata
            if (!importedData.metadata || !importedData.settings) {
                throw new Error(currentLang === 'vi' ? 'File thiếu thông tin metadata hoặc settings' : 'File missing metadata or settings');
            }

            // Verify extension name
            if (importedData.metadata.extensionName && 
                importedData.metadata.extensionName !== "TubeTuner") {
                throw new Error(currentLang === 'vi' ? 'File không phải từ TubeTuner' : 'File is not from TubeTuner');
            }

            const settings = importedData.settings;

            // Validate and filter settings
            const settingsToImport = {};
            let validCount = 0;

            for (const [key, expectedType] of Object.entries(validSettings)) {
                if (settings.hasOwnProperty(key)) {
                    const value = settings[key];
                    const actualType = typeof value;

                    // Type validation
                    if (actualType !== expectedType) {
                        console.warn(`Skipping ${key}: expected ${expectedType}, got ${actualType}`);
                        continue;
                    }

                    // Additional validation for specific keys
                    if (key === 'language') {
                        if (!['vi', 'en'].includes(value)) {
                            console.warn(`Skipping ${key}: invalid language value '${value}'`);
                            continue;
                        }
                    } else if (key === 'theme') {
                        if (!['light', 'dark', 'auto'].includes(value)) {
                            console.warn(`Skipping ${key}: invalid theme value '${value}'`);
                            continue;
                        }
                    }

                    settingsToImport[key] = value;
                    validCount++;
                }
            }

            // Check if we have any valid settings to import
            if (validCount === 0) {
                throw new Error(currentLang === 'vi' ? 'Không tìm thấy cài đặt hợp lệ nào trong file' : 'No valid settings found in file');
            }

            // Apply imported settings
            chrome.storage.sync.set(settingsToImport, function() {
                if (chrome.runtime.lastError) {
                    console.error('Error saving settings:', chrome.runtime.lastError);
                    showNotification(
                        currentLang === 'vi' ? 'Lỗi khi lưu cài đặt!' : 'Error saving settings!',
                        'error'
                    );
                    importBtn.innerHTML = originalText;
                    importBtn.disabled = false;
                    return;
                }

                // Success message
                const successMsg = currentLang === 'vi' ?
                    `Đã nhập ${validCount} cài đặt thành công! Đang tải lại...` :
                    `Successfully imported ${validCount} settings! Reloading...`;

                showNotification(successMsg, 'success');

                // Update content scripts on active YouTube tabs
                chrome.tabs.query({url: '*://*.youtube.com/*'}, function(tabs) {
                    tabs.forEach(tab => {
                        chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {
                            // Tab may not have content script loaded yet
                        });
                    });
                });

                // Reload popup after a short delay
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });

        } catch (error) {
            console.error('Error importing settings:', error);
            
            let errorMessage = translations[currentLang].importError;
            if (error.message) {
                errorMessage = error.message;
            }
            
            showNotification(errorMessage, 'error');

            // Restore button state
            importBtn.innerHTML = originalText;
            importBtn.disabled = false;
        }
    };

    reader.onerror = function() {
        showNotification(
            currentLang === 'vi' ? 'Lỗi đọc file!' : 'Error reading file!',
            'error'
        );

        // Restore button state
        importBtn.innerHTML = originalText;
        importBtn.disabled = false;
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

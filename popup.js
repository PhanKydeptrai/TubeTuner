
const TRANSLATIONS = {
    vi: {
        title: 'TubeTuner',
        subtitle: 'Ẩn các phần tử YouTube không mong muốn',
        // Content & Feed Controls
        contentFeedControlsTitle: 'Content & Feed Controls',
        hideHomeFeed: 'Ẩn trang chủ',
        hideVideoSidebar: 'Ẩn thanh bên video',
        hideShorts: 'Ẩn Shorts',
        hideComments: 'Ẩn phần bình luận',
        hideChannel: 'Ẩn kênh',
        // Interface Elements
        interfaceElementsTitle: 'Interface Elements',
        hideTopHeader: 'Ẩn thanh điều hướng trên',
        hideNotificationsBell: 'Ẩn chuông thông báo',
        hideExploreSection: 'Ẩn phần Khám phá',
        hideMoreFromYouTube: 'Ẩn "Thêm từ YouTube"',
        hideButtonsBar: 'Ẩn thanh nút bấm',
        // Video Controls
        videoControlsTitle: 'Video Controls',
        hideProgressBar: 'Ẩn thanh tiến trình',
        hideDuration: 'Ẩn thời lượng video',
        hideEndScreenCards: 'Ẩn thẻ cuối video',
        hideDescription: 'Ẩn mô tả video',
        // General
        active: 'Đang hoạt động',
        inactive: 'Đã tắt',
        infoTitle: 'Giới thiệu',
        infoContent: 'Extension giúp bạn tập trung vào nội dung video mà không bị phân tâm bởi:',
        featureProgress: 'Các phần tử giao diện không cần thiết',
        featureDuration: 'Nội dung đề xuất và quảng cáo',
        featureShorts: 'Các tính năng gây xao nhãng',
        homeFeed: 'Trang chủ',
        infoExtra: 'Tùy chỉnh trải nghiệm YouTube theo ý muốn của bạn với 14 tùy chọn ẩn/hiện.',
        noticeTitle: 'Lưu ý quan trọng',
        noticeDesc: 'Để có trải nghiệm tốt nhất, hãy bật extension trước khi vào trang YouTube.',
        // Grayscale feature translations
        grayscale: 'Giao diện đen trắng',
        enableGrayscale: 'Bật giao diện đen trắng',
        disableGrayscale: 'Tắt giao diện đen trắng',
        // Shop feature translations
        shop: 'YouTube Shop',
        hideShop: 'Ẩn YouTube Shop',
        // Presets UI
        presetsLabel: 'Cài đặt sẵn',
        applyPreset: 'Áp dụng preset',
        confirmApplyPreset: 'Bạn có muốn áp dụng preset? Điều này sẽ ghi đè cài đặt hiện tại.',
        presetApplied: 'Preset đã được áp dụng',
        presetNone: 'Không',
        presetBalanced: 'Cân bằng',
        presetFocus: 'Tập trung',
        builtInGroup: 'Mặc định',
        customGroup: 'Tùy chỉnh',
        presetNamePlaceholder: 'Tên preset',
        savePreset: 'Lưu preset',
        deletePreset: 'Xóa preset',
        importPresets: 'Nhập preset',
        exportPresets: 'Xuất preset',
        presetSaved: 'Đã lưu preset',
        presetDeleted: 'Đã xóa preset',
        presetsImported: 'Đã nhập preset',
        // Settings management
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
        noSettingsToExport: 'Không có cài đặt nào để xuất!',
        extensionEnabled: 'Bật/Tắt Extension',
        extensionDisabledTitle: 'Extension đã tắt',
        extensionDisabledDesc: 'TubeTuner hiện đang được tắt. Bật lại để sử dụng các tính năng tùy chỉnh YouTube.',
        // About section translations
        aboutTitle: 'Giới thiệu',
        aboutDescription: 'TubeTuner là extension giúp bạn tùy chỉnh trải nghiệm YouTube theo ý muốn. Ẩn các phần tử không cần thiết như thanh tiến trình, Shorts, quảng cáo, và nhiều thành phần khác để tập trung vào nội dung quan trọng.',
        aboutFeaturesTitle: 'Tính năng chính:',
        aboutFeature1: '✨ Ẩn/hiện các phần tử giao diện YouTube',
        aboutFeature2: '🎨 Chế độ giao diện đen trắng',
        aboutFeature3: '🔄 Đồng bộ cài đặt giữa các tab',
        aboutFeature4: '💾 Sao lưu/khôi phục cài đặt',
        aboutFeature5: '🌐 Hỗ trợ đa ngôn ngữ (VI/EN)',
        aboutGithubLink: 'GitHub Repository',
        // Status
        hidingFeatures: 'Đang ẩn',
        progressBar: 'thanh tiến trình',
        duration: 'thời lượng',
        shorts: 'shorts',
        videoSidebar: 'thanh bên video',
        notificationsBell: 'chuông thông báo',
        topHeader: 'thanh điều hướng trên',
        exploreSection: 'phần khám phá',
        allDisabled: 'Đã tắt tất cả'
    },
    en: {
        title: 'TubeTuner',
        subtitle: 'Hide unwanted YouTube elements',
        // Content & Feed Controls
        contentFeedControlsTitle: 'Content & Feed Controls',
        hideHomeFeed: 'Hide Home Feed',
        hideVideoSidebar: 'Hide Video Sidebar',
        hideShorts: 'Hide Shorts',
        hideComments: 'Hide Comments Section',
        hideChannel: 'Hide Channel',
        // Interface Elements
        interfaceElementsTitle: 'Interface Elements',
        hideTopHeader: 'Hide Top Header/Navigation Bar',
        hideNotificationsBell: 'Hide Notifications Bell',
        hideExploreSection: 'Hide Explore Section',
        hideMoreFromYouTube: 'Hide "More from YouTube" Section',
        hideButtonsBar: 'Hide Buttons Bar',
        // Video Controls
        videoControlsTitle: 'Video Controls',
        hideProgressBar: 'Hide progress bar',
        hideDuration: 'Hide video duration',
        hideEndScreenCards: 'Hide End Screen Cards/Annotations',
        hideDescription: 'Hide Video Description',
        // General
        active: 'Active',
        inactive: 'Inactive',
        infoTitle: 'Introduction',
        infoContent: 'This extension helps you focus on video content without distractions from:',
        featureProgress: 'Unnecessary interface elements',
        featureDuration: 'Recommended content and ads',
        featureShorts: 'Distracting features',
        homeFeed: 'Home Feed',
        infoExtra: 'Customize your YouTube experience with 14 hide/show options.',
        noticeTitle: 'Important Notice',
        noticeDesc: 'For the best experience, please enable the extension before visiting YouTube.',
        // Grayscale feature translations
        grayscale: 'Grayscale interface',
        enableGrayscale: 'Enable grayscale interface',
        disableGrayscale: 'Disable grayscale interface',
        // Shop feature translations
        shop: 'YouTube Shop',
        hideShop: 'Hide YouTube Shop',
        // Presets UI
        presetsLabel: 'Presets',
        applyPreset: 'Apply preset',
        confirmApplyPreset: 'Apply selected preset? This will overwrite current settings.',
        presetApplied: 'Preset applied',
        presetNone: 'None',
        presetBalanced: 'Balanced',
        presetFocus: 'Focus',
        builtInGroup: 'Built-in',
        customGroup: 'Custom',
        presetNamePlaceholder: 'Preset name',
        savePreset: 'Save preset',
        deletePreset: 'Delete preset',
        importPresets: 'Import presets',
        exportPresets: 'Export presets',
        presetSaved: 'Preset saved',
        presetDeleted: 'Preset deleted',
        presetsImported: 'Presets imported',
        // Settings management
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
        extensionEnabled: 'Enable/Disable Extension',
        extensionDisabledTitle: 'Extension Disabled',
        extensionDisabledDesc: 'TubeTuner is currently disabled. Enable it to use YouTube customization features.',
        // About section translations
        aboutTitle: 'About',
        aboutDescription: 'TubeTuner is an extension that helps you customize your YouTube experience as you wish. Hide unnecessary elements like progress bars, Shorts, ads, and many other components to focus on important content.',
        aboutFeaturesTitle: 'Key Features:',
        aboutFeature1: '✨ Show/hide YouTube interface elements',
        aboutFeature2: '🎨 Grayscale interface mode',
        aboutFeature3: '🔄 Sync settings across tabs',
        aboutFeature4: '💾 Backup/restore settings',
        aboutFeature5: '🌐 Multi-language support (VI/EN)',
        aboutGithubLink: 'GitHub Repository',
        // Status
        hidingFeatures: 'Hiding',
        progressBar: 'progress bar',
        duration: 'duration',
        shorts: 'shorts',
        videoSidebar: 'video sidebar',
        notificationsBell: 'notifications bell',
        topHeader: 'top header',
        exploreSection: 'explore section',
        allDisabled: 'All features disabled'
    }
};

/**
 * Preset definitions for quick configuration
 */
const PRESET_DEFINITIONS = {
    none: {
        progressBarHidden: false,
        durationHidden: false,
        shortsHidden: false,
        homeFeedHidden: false,
        videoSidebarHidden: false,
        commentsHidden: false,
        notificationsBellHidden: false,
        topHeaderHidden: false,
        exploreSectionHidden: false,
        endScreenCardsHidden: false,
        moreFromYouTubeHidden: false,
        hideChannelHidden: false,
        buttonsBarHidden: false,
        hideDescriptionHidden: false,
        grayscaleEnabled: false,
        shopHidden: false
    },
    balanced: {
        progressBarHidden: false,
        durationHidden: false,
        shortsHidden: true,
        homeFeedHidden: false,
        videoSidebarHidden: false,
        commentsHidden: false,
        notificationsBellHidden: false,
        topHeaderHidden: false,
        exploreSectionHidden: false,
        endScreenCardsHidden: false,
        moreFromYouTubeHidden: false,
        hideChannelHidden: false,
        buttonsBarHidden: false,
        hideDescriptionHidden: false,
        grayscaleEnabled: false,
        shopHidden: true
    },
    focus: {
        progressBarHidden: true,
        durationHidden: true,
        shortsHidden: true,
        homeFeedHidden: true,
        videoSidebarHidden: true,
        commentsHidden: true,
        notificationsBellHidden: true,
        topHeaderHidden: true,
        exploreSectionHidden: true,
        endScreenCardsHidden: true,
        moreFromYouTubeHidden: true,
        hideChannelHidden: true,
        buttonsBarHidden: true,
        hideDescriptionHidden: true,
        grayscaleEnabled: true,
        shopHidden: true
    }
};

const SWITCH_CONFIG = [
    { id: 'extensionEnabledSwitch', key: 'extensionEnabled', default: true },
    { id: 'progressSwitch', key: 'progressBarHidden', default: false },
    { id: 'durationSwitch', key: 'durationHidden', default: false },
    { id: 'shortsSwitch', key: 'shortsHidden', default: false },
    { id: 'homeFeedSwitch', key: 'homeFeedHidden', default: false },
    { id: 'videoSidebarSwitch', key: 'videoSidebarHidden', default: false },
    { id: 'commentsSwitch', key: 'commentsHidden', default: false },
    { id: 'notificationsBellSwitch', key: 'notificationsBellHidden', default: false },
    { id: 'topHeaderSwitch', key: 'topHeaderHidden', default: false },
    { id: 'exploreSectionSwitch', key: 'exploreSectionHidden', default: false },
    { id: 'endScreenCardsSwitch', key: 'endScreenCardsHidden', default: false },
    { id: 'moreFromYouTubeSwitch', key: 'moreFromYouTubeHidden', default: false },
    { id: 'hideChannelSwitch', key: 'hideChannelHidden', default: false },
    { id: 'buttonsBarSwitch', key: 'buttonsBarHidden', default: false },
    { id: 'hideDescriptionSwitch', key: 'hideDescriptionHidden', default: false },
    { id: 'grayscaleSwitch', key: 'grayscaleEnabled', default: false },
    { id: 'shopSwitch', key: 'shopHidden', default: false }
];



const AppState = {
    currentLang: 'en',
    currentExtensionEnabled: true,
    switches: new Map(),
    statusElement: null
};


function t(key) {
    return TRANSLATIONS[AppState.currentLang][key] || `[${key}]`;
}

function changeLanguage(lang) {
    try {
        setLanguage(lang, true);
    } catch (e) {
        console.error('Error changing language:', e);
    }
}


function setLanguage(lang, save = true) {
    AppState.currentLang = lang;

    // Remove active class from all language buttons
    document.querySelectorAll('.ext-lang-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Add active class to selected language button
    const langBtn = document.getElementById(`lang-${lang}`);
    if (langBtn) langBtn.classList.add('active');

    // Update all UI elements based on language
    updateLanguageUI();

    if (save) {
        chrome.storage.sync.set({ language: lang });
    }
}


function verifyToggleStates() {
    const keys = Array.from(AppState.switches.keys());
    chrome.storage.sync.get(keys, function(result) {
        const mismatches = [];
        keys.forEach(key => {
            const switchEl = AppState.switches.get(key);
            if (switchEl && result[key] !== switchEl.checked) {
                mismatches.push(`${key}: stored=${result[key]}, UI=${switchEl.checked}`);
            }
        });
        if (mismatches.length > 0) {
            console.warn('⚠️ Toggle state mismatches:', mismatches);
        }
    });
}

window.verifyToggleStates = verifyToggleStates;



/**
 * Update UI based on settings object
 * @param {Object} settings -
 */
function updateUI(settings) {
    const {
        extensionEnabled = AppState.currentExtensionEnabled,
        progressBarHidden = false,
        durationHidden = false,
        shortsHidden = false,
        homeFeedHidden = false,
        videoSidebarHidden = false,
        commentsHidden = false,
        notificationsBellHidden = false,
        topHeaderHidden = false,
        exploreSectionHidden = false,
        endScreenCardsHidden = false,
        moreFromYouTubeHidden = false,
        hideChannelHidden = false,
        buttonsBarHidden = false,
        hideDescriptionHidden = false,
        grayscaleEnabled = false,
        shopHidden = false
    } = settings;

    // Update extension enabled state
    AppState.currentExtensionEnabled = extensionEnabled;
    const extensionSwitch = AppState.switches.get('extensionEnabled');
    if (extensionSwitch) {
        extensionSwitch.checked = extensionEnabled;
    }

    // Show/hide sections based on extension state
    const sectionsContainer = document.getElementById('sectionsContainer');
    const disabledNotice = document.getElementById('disabledNotice');
    if (sectionsContainer) {
        sectionsContainer.style.display = extensionEnabled ? 'block' : 'none';
    }
    if (disabledNotice) {
        disabledNotice.style.display = extensionEnabled ? 'none' : 'block';
    }

    if (!extensionEnabled) {
        return;
    }

    // Update all switches
    const switchStates = {
        progressBarHidden,
        durationHidden,
        shortsHidden,
        homeFeedHidden,
        videoSidebarHidden,
        commentsHidden,
        notificationsBellHidden,
        topHeaderHidden,
        exploreSectionHidden,
        endScreenCardsHidden,
        moreFromYouTubeHidden,
        hideChannelHidden,
        buttonsBarHidden,
        hideDescriptionHidden,
        grayscaleEnabled,
        shopHidden
    };

    SWITCH_CONFIG.forEach(config => {
        const switchEl = AppState.switches.get(config.key);
        if (switchEl && switchStates.hasOwnProperty(config.key)) {
            switchEl.checked = switchStates[config.key];
        }
    });

    // Verify state after update
    setTimeout(() => {
        SWITCH_CONFIG.forEach(config => {
            const switchEl = AppState.switches.get(config.key);
            if (switchEl && switchStates.hasOwnProperty(config.key) && switchEl.checked !== switchStates[config.key]) {
                switchEl.checked = switchStates[config.key];
            }
        });
    }, 50);

    // Update status UI
    updateStatusUI(switchStates);
}

/**
 * Update status message based on current settings
 */
function updateStatusUI(settings) {
    if (!AppState.statusElement) return;

    const enabledFeatures = [];

    if (settings.progressBarHidden) enabledFeatures.push(t('progressBar'));
    if (settings.durationHidden) enabledFeatures.push(t('duration'));
    if (settings.shortsHidden) enabledFeatures.push(t('shorts'));
    if (settings.homeFeedHidden) enabledFeatures.push(t('homeFeed'));
    if (settings.videoSidebarHidden) enabledFeatures.push(t('videoSidebar'));
    if (settings.commentsHidden) enabledFeatures.push('comments');
    if (settings.notificationsBellHidden) enabledFeatures.push(t('notificationsBell'));
    if (settings.topHeaderHidden) enabledFeatures.push(t('topHeader'));
    if (settings.exploreSectionHidden) enabledFeatures.push(t('exploreSection'));
    if (settings.shopHidden) enabledFeatures.push(t('shop'));

    const statusBadge = AppState.statusElement.querySelector('ui-badge') || document.createElement('ui-badge');
    statusBadge.setAttribute('variant', enabledFeatures.length > 0 ? 'success' : 'warning');

    if (enabledFeatures.length > 0) {
        statusBadge.textContent = `${t('hidingFeatures')}: ${enabledFeatures.join(', ')}`;
        AppState.statusElement.className = 'status enabled';
    } else {
        statusBadge.textContent = t('allDisabled');
        AppState.statusElement.className = 'status disabled';
    }

    if (!AppState.statusElement.contains(statusBadge)) {
        AppState.statusElement.innerHTML = '';
        AppState.statusElement.appendChild(statusBadge);
    }
}


function updateLanguageUI() {
    // Update title
    const titleEl = document.querySelector('.ext-title');
    const subtitleEl = document.querySelector('.ext-subtitle');
    if (titleEl) titleEl.textContent = t('title');
    if (subtitleEl) subtitleEl.textContent = t('subtitle');

    // Update section titles
    const sectionTitles = document.querySelectorAll('.ext-section-title');
    const titleMap = [
        t('aboutTitle'),
        t('contentFeedControlsTitle'),
        t('interfaceElementsTitle'),
        t('videoControlsTitle')
    ];
    sectionTitles.forEach((el, idx) => {
        if (titleMap[idx]) el.textContent = titleMap[idx];
    });

    // Update control labels
    const labelMappings = [
        { id: 'homeFeedSwitch', text: t('hideHomeFeed') },
        { id: 'videoSidebarSwitch', text: t('hideVideoSidebar') },
        { id: 'shortsSwitch', text: t('hideShorts') },
        { id: 'commentsSwitch', text: t('hideComments') },
        { id: 'hideChannelSwitch', text: t('hideChannel') },
        { id: 'topHeaderSwitch', text: t('hideTopHeader') },
        { id: 'notificationsBellSwitch', text: t('hideNotificationsBell') },
        { id: 'exploreSectionSwitch', text: t('hideExploreSection') },
        { id: 'moreFromYouTubeSwitch', text: t('hideMoreFromYouTube') },
        { id: 'buttonsBarSwitch', text: t('hideButtonsBar') },
        { id: 'progressSwitch', text: t('hideProgressBar') },
        { id: 'durationSwitch', text: t('hideDuration') },
        { id: 'endScreenCardsSwitch', text: t('hideEndScreenCards') },
        { id: 'hideDescriptionSwitch', text: t('hideDescription') },
        { id: 'grayscaleSwitch', text: t('grayscale') },
        { id: 'shopSwitch', text: t('hideShop') },
        { id: 'extensionEnabledSwitch', text: t('extensionEnabled') }
    ];

    labelMappings.forEach(({ id, text }) => {
        const switchEl = document.getElementById(id);
        if (switchEl) {
            const label = switchEl.closest('.ext-control-item')?.querySelector('.ext-control-label');
            if (label) label.textContent = text;
        }
    });

    // Update settings section
    const settingsTitle = document.querySelector('.ext-settings-title');
    const exportBtn = document.querySelector('#exportSettingsBtn span');
    const importBtn = document.querySelector('#importSettingsBtn span');
    if (settingsTitle) settingsTitle.textContent = t('settingsManagement');
    if (exportBtn) exportBtn.textContent = t('exportSettings');
    if (importBtn) importBtn.textContent = t('importSettings');

    // Update presets
    const presetsLabel = document.querySelector('.ext-presets-label');
    const applyPresetBtn = document.getElementById('applyPresetBtn');
    if (presetsLabel) presetsLabel.textContent = t('presetsLabel');
    if (applyPresetBtn) applyPresetBtn.textContent = t('applyPreset');

    const savePresetBtn = document.getElementById('savePresetBtn');
    const deletePresetBtn = document.getElementById('deletePresetBtn');
    const importPresetsBtn = document.getElementById('importPresetsBtn');
    const exportPresetsBtn = document.getElementById('exportPresetsBtn');
    if (savePresetBtn) savePresetBtn.textContent = t('savePreset');
    if (deletePresetBtn) deletePresetBtn.textContent = t('deletePreset');
    if (importPresetsBtn) importPresetsBtn.textContent = t('importPresets');
    if (exportPresetsBtn) exportPresetsBtn.textContent = t('exportPresets');

    const presetNameInput = document.getElementById('presetNameInput');
    if (presetNameInput) presetNameInput.placeholder = t('presetNamePlaceholder');

    // Update preset options
    const presetSelect = document.getElementById('presetSelect');
    if (presetSelect) {
        const noneOpt = presetSelect.querySelector('option[value="builtin:none"]') || presetSelect.querySelector('option[value="none"]');
        const balancedOpt = presetSelect.querySelector('option[value="builtin:balanced"]') || presetSelect.querySelector('option[value="balanced"]');
        const focusOpt = presetSelect.querySelector('option[value="builtin:focus"]') || presetSelect.querySelector('option[value="focus"]');
        if (noneOpt) noneOpt.textContent = t('presetNone');
        if (balancedOpt) balancedOpt.textContent = t('presetBalanced');
        if (focusOpt) focusOpt.textContent = t('presetFocus');

        const optgroups = presetSelect.querySelectorAll('optgroup');
        if (optgroups[0]) optgroups[0].label = t('builtInGroup');
        if (optgroups[1]) optgroups[1].label = t('customGroup');
    }
}


function setupEventListeners() {
    SWITCH_CONFIG.forEach(config => {
        const switchEl = document.getElementById(config.id);
        if (!switchEl) return;

        // Store reference in AppState
        AppState.switches.set(config.key, switchEl);

        switchEl.addEventListener('change', function(e) {
            const newState = e.target.checked;
            const storageObj = { [config.key]: newState };

            // Save to storage
            chrome.storage.sync.set(storageObj);

            // Handle extension enabled toggle specially
            if (config.key === 'extensionEnabled') {
                AppState.currentExtensionEnabled = newState;
                const sectionsContainer = document.getElementById('sectionsContainer');
                const disabledNotice = document.getElementById('disabledNotice');
                if (sectionsContainer) sectionsContainer.style.display = newState ? 'block' : 'none';
                if (disabledNotice) disabledNotice.style.display = newState ? 'none' : 'block';
            }

            // Sync to YouTube tabs
            handleToggleChange(config.key, newState);

            // Update status
            chrome.storage.sync.get(SWITCH_CONFIG.map(c => c.key), function(result) {
                updateStatusUI(result);
            });
        });
    });

    // Setup language buttons
    const langVi = document.getElementById('lang-vi');
    const langEn = document.getElementById('lang-en');
    if (langVi) langVi.addEventListener('click', () => changeLanguage('vi'));
    if (langEn) langEn.addEventListener('click', () => changeLanguage('en'));

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = document.documentElement.classList.toggle('dark');
            chrome.storage.sync.set({ theme: isDark ? 'dark' : 'light' });
        });
    }
}

/**
 * Handle toggle changes and sync to YouTube tabs
 */
function handleToggleChange(key, enabled) {
    // Send to current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0]?.url?.includes('youtube.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: key,
                enabled: enabled
            }).catch(() => {});
        }
    });

    // Sync to all YouTube tabs
    chrome.runtime.sendMessage({
        action: 'syncToAllTabs',
        toggleAction: key,
        enabled: enabled
    }).catch(() => {});
}


function initializeTheme() {
    chrome.storage.sync.get('theme', function(data) {
        const savedTheme = data.theme || 'auto';

        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (savedTheme === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            document.documentElement.classList.toggle('dark', prefersDark);
        }
    });
}

/**
 * Initialize language from storage
 */
function initializeLanguage() {
    chrome.storage.sync.get('language', function(data) {
        const savedLanguage = data.language || 'en';
        setLanguage(savedLanguage, false);
    });
}

/**
 * Initialize collapsible sections
 */
function initializeCollapsibleSections() {
    const sections = document.querySelectorAll('.ext-collapsible-section');

    chrome.storage.sync.get('sectionStates', function(result) {
        const savedStates = result.sectionStates || {};

        sections.forEach(section => {
            const titleElement = section.querySelector('.ext-section-title');
            if (!titleElement) return;

            const sectionId = titleElement.textContent.trim().toLowerCase()
                .replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
            section.setAttribute('data-section-id', sectionId);

            const header = section.querySelector('.ext-section-header');
            if (!header) return;

            const isOpen = savedStates[sectionId] !== undefined ? savedStates[sectionId] : (sectionId === 'content-feed-controls');

            section.classList.add('no-animation');
            if (isOpen) section.classList.add('open');

            setTimeout(() => section.classList.remove('no-animation'), 100);

            header.addEventListener('click', () => {
                const wasOpen = section.classList.contains('open');
                section.classList.toggle('open');
                saveSectionState(sectionId, !wasOpen);
            });
        });
    });
}

function saveSectionState(sectionId, isOpen) {
    chrome.storage.sync.get('sectionStates', function(result) {
        const sectionStates = result.sectionStates || {};
        sectionStates[sectionId] = isOpen;
        chrome.storage.sync.set({ sectionStates });
    });
}



const VALID_SETTING_KEYS = [
    'extensionEnabled', 'progressBarHidden', 'durationHidden', 'shortsHidden',
    'homeFeedHidden', 'videoSidebarHidden', 'commentsHidden', 'notificationsBellHidden',
    'topHeaderHidden', 'exploreSectionHidden', 'endScreenCardsHidden', 'moreFromYouTubeHidden',
    'hideChannelHidden', 'buttonsBarHidden', 'hideDescriptionHidden', 'grayscaleEnabled',
    'shopHidden', 'language', 'theme'
];


function exportSettings() {
    const exportBtn = document.getElementById('exportSettingsBtn');
    const originalText = exportBtn.innerHTML;
    exportBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${t('exporting')}</span>`;
    exportBtn.disabled = true;

    chrome.storage.sync.get(VALID_SETTING_KEYS, function(result) {
        const settingsToExport = {};
        let count = 0;

        VALID_SETTING_KEYS.forEach(key => {
            if (result.hasOwnProperty(key)) {
                settingsToExport[key] = result[key];
                count++;
            }
        });

        if (count === 0) {
            showNotification(t('noSettingsToExport'), 'info');
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
            return;
        }

        const settingsExport = {
            metadata: {
                exportDate: new Date().toISOString(),
                extensionName: 'TubeTuner',
                extensionVersion: '1.2',
                formatVersion: '1.0',
                settingsCount: count
            },
            settings: settingsToExport
        };

        const blob = new Blob([JSON.stringify(settingsExport, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
        const a = document.createElement('a');
        a.href = url;
        a.download = `TubeTuner-settings-${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showNotification(t('exportSuccess'), 'success');

        setTimeout(() => {
            exportBtn.innerHTML = originalText;
            exportBtn.disabled = false;
        }, 1000);
    });
}


function importSettings(file) {
    const importBtn = document.getElementById('importSettingsBtn');
    const originalText = importBtn.innerHTML;
    importBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg><span>${t('importing')}</span>`;
    importBtn.disabled = true;

    const reader = new FileReader();

    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);

            if (!importedData || typeof importedData !== 'object') {
                throw new Error('Invalid file format');
            }

            if (!importedData.metadata || !importedData.settings) {
                throw new Error('File missing metadata or settings');
            }

            if (importedData.metadata.extensionName && importedData.metadata.extensionName !== 'TubeTuner') {
                throw new Error('File is not from TubeTuner');
            }

            const settings = importedData.settings;
            const settingsToImport = {};
            let validCount = 0;

            VALID_SETTING_KEYS.forEach(key => {
                if (settings.hasOwnProperty(key)) {
                    const value = settings[key];
                    const expectedType = typeof value;
                    if (expectedType === 'boolean' || expectedType === 'string') {
                        settingsToImport[key] = value;
                        validCount++;
                    }
                }
            });

            if (validCount === 0) {
                throw new Error('No valid settings found in file');
            }

            chrome.storage.sync.set(settingsToImport, function() {
                showNotification(t('importSuccess'), 'success');
                chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
                    tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                });
                setTimeout(() => window.location.reload(), 1500);
            });

        } catch (error) {
            showNotification(error.message || t('importError'), 'error');
            importBtn.innerHTML = originalText;
            importBtn.disabled = false;
        }
    };

    reader.onerror = () => {
        showNotification(t('importError'), 'error');
        importBtn.innerHTML = originalText;
        importBtn.disabled = false;
    };

    reader.readAsText(file);
}


function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.ext-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `ext-notification ext-notification-${type}`;
    notification.textContent = message;

    const container = document.querySelector('.ext-container');
    if (container) {
        container.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 3000);
    }
}


function loadPresetOptions() {
    const presetSelect = document.getElementById('presetSelect');
    if (!presetSelect) return;

    chrome.storage.sync.get(['customPresets'], function(result) {
        const customs = result.customPresets || {};

        while (presetSelect.firstChild) presetSelect.removeChild(presetSelect.firstChild);

        const optgroupBuilt = document.createElement('optgroup');
        optgroupBuilt.label = t('builtInGroup');
        Object.keys(PRESET_DEFINITIONS).forEach(key => {
            const opt = document.createElement('option');
            opt.value = `builtin:${key}`;
            opt.textContent = t(`preset${key.charAt(0).toUpperCase() + key.slice(1)}`);
            optgroupBuilt.appendChild(opt);
        });
        presetSelect.appendChild(optgroupBuilt);

        const customNames = Object.keys(customs);
        if (customNames.length > 0) {
            const optgroupCustom = document.createElement('optgroup');
            optgroupCustom.label = t('customGroup');
            customNames.forEach(name => {
                const opt = document.createElement('option');
                opt.value = `custom:${name}`;
                opt.textContent = name;
                optgroupCustom.appendChild(opt);
            });
            presetSelect.appendChild(optgroupCustom);
        }

        try {
            updateLanguageUI();
        } catch (e) {}
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Initialize core settings
    initializeTheme();
    initializeLanguage();
    initializeCollapsibleSections();

    // Cache status element
    AppState.statusElement = document.getElementById('status');

    // Setup all event listeners
    setupEventListeners();

    // Load initial settings
    const allKeys = SWITCH_CONFIG.map(c => c.key).concat(['sectionStates']);
    chrome.storage.sync.get(allKeys, function(result) {
        AppState.currentExtensionEnabled = result.extensionEnabled !== false;
        updateUI(result);
    });

    // Setup export/import
    const exportBtn = document.getElementById('exportSettingsBtn');
    const importBtn = document.getElementById('importSettingsBtn');
    const importFileInput = document.getElementById('importFileInput');

    if (exportBtn) {
        exportBtn.addEventListener('click', exportSettings);
    }

    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', () => importFileInput.click());

        importFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                if (!file.name.toLowerCase().endsWith('.json')) {
                    showNotification(t('invalidFileType'), 'error');
                    e.target.value = '';
                    return;
                }

                if (file.size > 5 * 1024 * 1024) {
                    showNotification(t('fileTooLarge'), 'error');
                    e.target.value = '';
                    return;
                }

                if (confirm(t('confirmImport'))) {
                    importSettings(file);
                }
                e.target.value = '';
            }
        });
    }

    // Setup preset management
    const presetSelect = document.getElementById('presetSelect');
    const applyPresetBtn = document.getElementById('applyPresetBtn');
    const savePresetBtn = document.getElementById('savePresetBtn');
    const deletePresetBtn = document.getElementById('deletePresetBtn');
    const importPresetsBtn = document.getElementById('importPresetsBtn');
    const importPresetsFileInput = document.getElementById('importPresetsFileInput');
    const exportPresetsBtn = document.getElementById('exportPresetsBtn');
    const presetNameInput = document.getElementById('presetNameInput');

    if (presetSelect) loadPresetOptions();

    if (applyPresetBtn && presetSelect) {
        applyPresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected) return;

            if (!confirm(t('confirmApplyPreset'))) return;

            let settings = null;

            if (selected.startsWith('builtin:')) {
                const key = selected.split(':')[1];
                if (PRESET_DEFINITIONS[key]) {
                    settings = Object.assign({}, PRESET_DEFINITIONS[key], { extensionEnabled: true });
                }
            } else if (selected.startsWith('custom:')) {
                const name = selected.split(':')[1];
                chrome.storage.sync.get(['customPresets'], function(result) {
                    const customs = result.customPresets || {};
                    if (customs[name]) {
                        const customSettings = Object.assign({}, customs[name], { extensionEnabled: true });
                        chrome.storage.sync.set(customSettings, function() {
                            showNotification(t('presetApplied'), 'success');
                            updateUI(customSettings);
                            chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
                                tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                            });
                        });
                    }
                });
                return;
            }

            if (settings) {
                chrome.storage.sync.set(settings, function() {
                    showNotification(t('presetApplied'), 'success');
                    updateUI(settings);
                    chrome.tabs.query({ url: '*://*.youtube.com/*' }, function(tabs) {
                        tabs.forEach(tab => chrome.tabs.sendMessage(tab.id, { action: 'updateSettings' }).catch(() => {}));
                    });
                });
            }
        });
    }

    if (savePresetBtn) {
        savePresetBtn.addEventListener('click', function() {
            const name = presetNameInput?.value?.trim();
            if (!name) {
                alert('Please enter a name for the preset.');
                return;
            }

            const preset = {};
            SWITCH_CONFIG.forEach(config => {
                const switchEl = AppState.switches.get(config.key);
                if (switchEl) {
                    preset[config.key] = switchEl.checked;
                }
            });

            chrome.storage.sync.get(['customPresets'], function(result) {
                const customs = result.customPresets || {};
                customs[name] = preset;
                chrome.storage.sync.set({ customPresets: customs }, function() {
                    showNotification(t('presetSaved'), 'success');
                    presetNameInput.value = '';
                    loadPresetOptions();
                });
            });
        });
    }

    if (deletePresetBtn) {
        deletePresetBtn.addEventListener('click', function() {
            const selected = presetSelect.value;
            if (!selected || !selected.startsWith('custom:')) {
                alert('Select a custom preset to delete.');
                return;
            }
            const name = selected.split(':')[1];
            if (!confirm(`Delete preset "${name}"?`)) return;

            chrome.storage.sync.get(['customPresets'], function(result) {
                const customs = result.customPresets || {};
                if (customs[name]) delete customs[name];
                chrome.storage.sync.set({ customPresets: customs }, function() {
                    showNotification(t('presetDeleted'), 'success');
                    loadPresetOptions();
                });
            });
        });
    }

    if (importPresetsBtn && importPresetsFileInput) {
        importPresetsBtn.addEventListener('click', () => importPresetsFileInput.click());

        importPresetsFileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (!file.name.toLowerCase().endsWith('.json')) {
                showNotification(t('invalidFileType'), 'error');
                e.target.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = function(evt) {
                try {
                    const data = JSON.parse(evt.target.result);
                    let toMerge = {};

                    if (Array.isArray(data)) {
                        data.forEach(item => {
                            if (item && item.name && item.preset) toMerge[item.name] = item.preset;
                        });
                    } else if (typeof data === 'object') {
                        toMerge = data;
                    } else {
                        throw new Error('Invalid format');
                    }

                    chrome.storage.sync.get(['customPresets'], function(result) {
                        const customs = result.customPresets || {};
                        Object.assign(customs, toMerge);
                        chrome.storage.sync.set({ customPresets: customs }, function() {
                            showNotification(t('presetsImported'), 'success');
                            loadPresetOptions();
                        });
                    });
                } catch (err) {
                    showNotification(t('importError'), 'error');
                }
            };
            reader.readAsText(file);
            e.target.value = '';
        });
    }

    if (exportPresetsBtn) {
        exportPresetsBtn.addEventListener('click', function() {
            chrome.storage.sync.get(['customPresets'], function(result) {
                const customs = result.customPresets || {};
                const blob = new Blob([JSON.stringify(customs, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'tubetuner-presets.json';
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            });
        });
    }
});

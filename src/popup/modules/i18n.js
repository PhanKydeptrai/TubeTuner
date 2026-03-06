// Internationalization (i18n) Module
// Handles translations and language management

export const TRANSLATIONS = {
    vi: {
        title: 'TubeTuner',
        subtitle: 'Ẩn các phần tử YouTube không mong muốn',
        // Content & Feed Controls
        contentFeedControlsTitle: 'Quản lý Nội dung & Bảng tin',
        hideHomeFeed: 'Ẩn trang chủ',
        hideVideoSidebar: 'Ẩn thanh bên video',
        hideShorts: 'Ẩn Shorts',
        hideComments: 'Ẩn phần bình luận',
        hideChannel: 'Ẩn kênh',
        // Interface Elements
        interfaceElementsTitle: 'Thành Phần Giao Diện',
        hideTopHeader: 'Ẩn thanh điều hướng trên',
        hideNotificationsBell: 'Ẩn chuông thông báo',
        hideExploreSection: 'Ẩn phần Khám phá',
        hideMoreFromYouTube: 'Ẩn "Thêm từ YouTube"',
        hideButtonsBar: 'Ẩn thanh nút bấm',
        // Video Controls
        videoControlsTitle: 'Trình phát Video',
        hideVideoControls: 'Ẩn điều khiển video',
        hideProgressBar: 'Ẩn thanh tiến trình',
        hideDuration: 'Ẩn thời lượng video',
        hideEndScreenCards: 'Ẩn thẻ cuối video',
        hideDescription: 'Ẩn mô tả video',
        hideAiSummary: 'Ẩn tóm tắt AI',
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
        // Playlist feature translations
        playlist: 'playlist',
        hidePlaylist: 'Ẩn Playlist',
        hidePlaylistDesc: 'Ẩn danh sách phát trong thanh bên video',
        // Livechat feature translations
        livechat: 'livechat',
        hideLivechat: 'Ẩn livechat',
        hideRecommendation: 'Ẩn gợi ý video',
        // Presets UI
        presetsLabel: 'Cài đặt sẵn',
        applyPreset: 'Áp dụng preset',
        confirmApplyPreset: 'Bạn có muốn áp dụng preset? Điều này sẽ ghi đè cài đặt hiện tại.',
        presetApplied: 'Áp dụng thành công',
        applyingPreset: 'Đang áp dụng preset...',
        confirm: 'Xác nhận',
        cancel: 'Hủy',
        presetNone: 'Không',
        presetBalanced: 'Cân bằng',
        presetFocus: 'Tập trung',
        builtInGroup: 'Mặc định',
        customGroup: 'Tùy chỉnh',
        presetNamePlaceholder: 'Tên preset',
        savePreset: 'Lưu preset',
        updatePreset: 'Cập nhật preset',
        deletePreset: 'Xóa preset',
        importPresets: 'Nhập preset',
        exportPresets: 'Xuất preset',
        presetSaved: 'Đã lưu preset',
        presetDeleted: 'Đã xóa preset',
        presetsImported: 'Đã nhập preset',
        presetNameRequired: 'Vui lòng nhập tên cho preset',
        selectPresetToDelete: 'Vui lòng chọn một preset tùy chỉnh để xóa',
        confirmOverwritePreset: 'Preset "%s" đã tồn tại. Bạn có muốn ghi đè?',
        presetNameReserved: 'Tên này được dành riêng cho hệ thống',
        confirmDeletePreset: 'Bạn có chắc chắn muốn xóa preset',
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
        advancedSettings: 'Cài đặt nâng cao',
        // Status
        hidingFeatures: 'Đang ẩn',
        progressBar: 'thanh tiến trình',
        duration: 'thời lượng',
        shorts: 'shorts',
        videoSidebar: 'thanh bên video',
        notificationsBell: 'chuông thông báo',
        topHeader: 'thanh điều hướng trên',
        exploreSection: 'phần khám phá',
        recommendation: 'gợi ý video',
        allDisabled: 'Đã tắt tất cả',
        donateText: 'Ủng hộ phát triển TubeTuner'
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
        hideVideoControls: 'Hide video controls',
        hideProgressBar: 'Hide progress bar',
        hideDuration: 'Hide video duration',
        hideEndScreenCards: 'Hide End Screen Cards/Annotations',
        hideDescription: 'Hide Video Description',
        hideAiSummary: 'Hide AI Summary',
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
        // Playlist feature translations
        playlist: 'playlist',
        hidePlaylist: 'Hide Playlist',
        hidePlaylistDesc: 'Hide playlist panel in video sidebar',
        // Livechat feature translations
        livechat: 'livechat',
        hideLivechat: 'Hide livechat',
        hideRecommendation: 'Hide Video Suggestions',
        // Presets UI
        presetsLabel: 'Presets',
        applyPreset: 'Apply preset',
        confirmApplyPreset: 'Apply selected preset? This will overwrite current settings.',
        presetApplied: 'Applied successfully',
        applyingPreset: 'Applying preset...',
        confirm: 'Confirm',
        cancel: 'Cancel',
        presetNone: 'None',
        presetBalanced: 'Balanced',
        presetFocus: 'Focus',
        builtInGroup: 'Built-in',
        customGroup: 'Custom',
        presetNamePlaceholder: 'Preset name',
        savePreset: 'Save preset',
        updatePreset: 'Update preset',
        deletePreset: 'Delete preset',
        importPresets: 'Import presets',
        exportPresets: 'Export presets',
        presetSaved: 'Preset saved',
        presetDeleted: 'Preset deleted',
        presetsImported: 'Presets imported',
        presetNameRequired: 'Please enter a name for the preset',
        selectPresetToDelete: 'Please select a custom preset to delete',
        confirmOverwritePreset: 'Preset "%s" already exists. Overwrite?',
        presetNameReserved: 'This name is reserved by the system',
        confirmDeletePreset: 'Are you sure you want to delete preset',
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
        advancedSettings: 'Advanced Settings',
        // Status
        hidingFeatures: 'Hiding',
        progressBar: 'progress bar',
        duration: 'duration',
        shorts: 'shorts',
        videoSidebar: 'video sidebar',
        notificationsBell: 'notifications bell',
        topHeader: 'top header',
        exploreSection: 'explore section',
        recommendation: 'video suggestions',
        allDisabled: 'All features disabled',
        donateText: 'Support TubeTuner Development'
    }
};

export const I18nModule = {
    currentLang: 'en',

    t(key) {
        return TRANSLATIONS[this.currentLang][key] || `[${key}]`;
    },

    changeLanguage(lang) {
        try {
            this.setLanguage(lang, true);
        } catch (e) {
            console.error('Error changing language:', e);
        }
    },

    setLanguage(lang, save = true) {
        this.currentLang = lang;

        // Remove active class from all language buttons
        document.querySelectorAll('.ext-lang-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to selected language button
        const langBtn = document.getElementById(`lang-${lang}`);
        if (langBtn) langBtn.classList.add('active');

        // Update all UI elements based on language
        this.updateLanguageUI();

        if (save) {
            chrome.storage.local.set({ language: lang });
        }
    },

    updateLanguageUI() {
        // Update title
        const titleEl = document.querySelector('.ext-title');
        const subtitleEl = document.querySelector('.ext-subtitle');
        if (titleEl) titleEl.textContent = this.t('title');
        if (subtitleEl) subtitleEl.textContent = this.t('subtitle');

        // Update section titles
        const sectionTitles = document.querySelectorAll('.ext-section-title');
        const titleMap = [
            this.t('aboutTitle'),
            this.t('contentFeedControlsTitle'),
            this.t('interfaceElementsTitle'),
            this.t('videoControlsTitle')
        ];
        sectionTitles.forEach((el, idx) => {
            if (titleMap[idx]) el.textContent = titleMap[idx];
        });

        // Update About section
        const aboutDescription = document.getElementById('aboutDescription');
        const aboutFeaturesTitle = document.getElementById('aboutFeaturesTitle');
        const aboutFeatures = ['aboutFeature1', 'aboutFeature2', 'aboutFeature3', 'aboutFeature4', 'aboutFeature5'];
        const aboutGithubLinkText = document.getElementById('aboutGithubLinkText');

        if (aboutDescription) aboutDescription.textContent = this.t('aboutDescription');
        if (aboutFeaturesTitle) aboutFeaturesTitle.textContent = this.t('aboutFeaturesTitle');

        aboutFeatures.forEach((featureId) => {
            const featureEl = document.getElementById(featureId);
            if (featureEl) {
                const translationKey = featureId;
                featureEl.textContent = this.t(translationKey);
            }
        });

        if (aboutGithubLinkText) aboutGithubLinkText.textContent = this.t('aboutGithubLink');

        // Update extension disabled notice
        const extensionDisabledTitle = document.getElementById('extensionDisabledTitle');
        const extensionDisabledDesc = document.getElementById('extensionDisabledDesc');
        if (extensionDisabledTitle) extensionDisabledTitle.textContent = this.t('extensionDisabledTitle');
        if (extensionDisabledDesc) extensionDisabledDesc.textContent = this.t('extensionDisabledDesc');

        // Update Advanced Settings button
        const openSettingsText = document.getElementById('openSettingsText');
        if (openSettingsText) openSettingsText.textContent = this.t('advancedSettings');

        // Update Donate footer text
        const donateText = document.getElementById('donateText');
        if (donateText) donateText.textContent = this.t('donateText');

        // Update control labels
        const labelMappings = [
            { id: 'homeFeedSwitch', text: this.t('hideHomeFeed') },
            { id: 'videoSidebarSwitch', text: this.t('hideVideoSidebar') },
            { id: 'shortsSwitch', text: this.t('hideShorts') },
            { id: 'commentsSwitch', text: this.t('hideComments') },
            { id: 'hideChannelSwitch', text: this.t('hideChannel') },
            { id: 'topHeaderSwitch', text: this.t('hideTopHeader') },
            { id: 'notificationsBellSwitch', text: this.t('hideNotificationsBell') },
            { id: 'exploreSectionSwitch', text: this.t('hideExploreSection') },
            { id: 'moreFromYouTubeSwitch', text: this.t('hideMoreFromYouTube') },
            { id: 'buttonsBarSwitch', text: this.t('hideButtonsBar') },
            { id: 'progressSwitch', text: this.t('hideProgressBar') },
            { id: 'durationSwitch', text: this.t('hideDuration') },
            { id: 'videoControlsSwitch', text: this.t('hideVideoControls') },
            { id: 'endScreenCardsSwitch', text: this.t('hideEndScreenCards') },
            { id: 'hideDescriptionSwitch', text: this.t('hideDescription') },
            { id: 'grayscaleSwitch', text: this.t('grayscale') },
            { id: 'shopSwitch', text: this.t('hideShop') },
            { id: 'playlistSwitch', text: this.t('hidePlaylist') },
            { id: 'livechatSwitch', text: this.t('hideLivechat') },
            { id: 'recommendationSwitch', text: this.t('hideRecommendation') },
            { id: 'aiSummarySwitch', text: this.t('hideAiSummary') },
            { id: 'extensionEnabledSwitch', text: this.t('extensionEnabled') }
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
        if (settingsTitle) settingsTitle.textContent = this.t('settingsManagement');
        if (exportBtn) exportBtn.textContent = this.t('exportSettings');
        if (importBtn) importBtn.textContent = this.t('importSettings');

        // Update presets
        const presetsLabel = document.querySelector('.ext-presets-label');
        const applyPresetBtn = document.getElementById('applyPresetBtn');
        if (presetsLabel) presetsLabel.textContent = this.t('presetsLabel');
        if (applyPresetBtn) applyPresetBtn.textContent = this.t('applyPreset');

        const savePresetBtn = document.getElementById('savePresetBtn');
        const deletePresetBtn = document.getElementById('deletePresetBtn');
        const importPresetsBtn = document.getElementById('importPresetsBtn');
        const exportPresetsBtn = document.getElementById('exportPresetsBtn');
        // Only reset savePresetBtn text if it's not in "update" mode
        if (savePresetBtn && !savePresetBtn.dataset.updateMode) savePresetBtn.textContent = this.t('savePreset');
        if (deletePresetBtn) deletePresetBtn.textContent = this.t('deletePreset');
        if (importPresetsBtn) importPresetsBtn.textContent = this.t('importPresets');
        if (exportPresetsBtn) exportPresetsBtn.textContent = this.t('exportPresets');

        const presetNameInput = document.getElementById('presetNameInput');
        if (presetNameInput) presetNameInput.placeholder = this.t('presetNamePlaceholder');

        // Update preset options
        const presetSelect = document.getElementById('presetSelect');
        if (presetSelect) {
            const noneOpt = presetSelect.querySelector('option[value="builtin:none"]') || presetSelect.querySelector('option[value="none"]');
            const balancedOpt = presetSelect.querySelector('option[value="builtin:balanced"]') || presetSelect.querySelector('option[value="balanced"]');
            const focusOpt = presetSelect.querySelector('option[value="builtin:focus"]') || presetSelect.querySelector('option[value="focus"]');
            if (noneOpt) noneOpt.textContent = this.t('presetNone');
            if (balancedOpt) balancedOpt.textContent = this.t('presetBalanced');
            if (focusOpt) focusOpt.textContent = this.t('presetFocus');

            const optgroups = presetSelect.querySelectorAll('optgroup');
            if (optgroups[0]) optgroups[0].label = this.t('builtInGroup');
            if (optgroups[1]) optgroups[1].label = this.t('customGroup');
        }
    },

    initializeLanguage(savedLanguage) {
        savedLanguage = savedLanguage || 'en';
        this.setLanguage(savedLanguage, false);
    }
};

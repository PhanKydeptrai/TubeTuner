// YouTube Controller Extension Interface JS
document.addEventListener('DOMContentLoaded', function() {
  // Initialize collapsible sections
  initCollapsibleSections();
  
  // Initialize theme toggle
  initThemeToggle();
  
  // Initialize language button
  initLanguageButton();
  
  // Initialize switches with saved state
  initSwitches();
});

// Collapsible Sections
function initCollapsibleSections() {
  const sections = document.querySelectorAll('.collapsible-section');
  
  sections.forEach(section => {
    const header = section.querySelector('.section-header');
    const content = section.querySelector('.section-content');
    
    // Set initial state (all sections collapsed)
    content.style.display = 'none';
    
    header.addEventListener('click', () => {
      const isExpanded = section.classList.contains('expanded');
      
      // Toggle current section
      section.classList.toggle('expanded');
      content.style.display = isExpanded ? 'none' : 'block';
    });
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  let isDarkMode = false;
  
  // Check for saved theme preference or system preference
  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    isDarkMode = true;
  }
  
  // Toggle theme on click
  themeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // If this is a browser extension, sync with chrome.storage
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ theme: isDarkMode ? 'dark' : 'light' });
    }
  });
  
  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      isDarkMode = e.matches;
      document.documentElement.classList.toggle('dark', isDarkMode);
    }
  });
}

// Language Button
function initLanguageButton() {
  const langButton = document.querySelector('.lang-button');
  const translations = {
    'EN': {
      'title': 'YouTube Controller',
      'subtitle': 'Customize your YouTube experience',
      'notice-title': 'Important Notice',
      'notice-description': 'For the best experience, please enable the extension before visiting YouTube.',
      'section-content': 'Content & Feed',
      'section-interface': 'Interface Elements',
      'section-video': 'Video Controls',
      'section-other': 'Other Features',
      // Content & Feed
      'control-home-feed': 'Hide Home Feed',
      'control-sidebar': 'Hide Video Sidebar',
      'control-recommended': 'Hide Recommended',
      'control-shorts': 'Hide Shorts',
      'control-comments': 'Hide Comments',
      'control-playlist': 'Hide Playlist',
      'control-mixes': 'Hide Mixes',
      // Interface Elements
      'control-header': 'Hide Top Header',
      'control-notifications': 'Hide Notifications',
      'control-explore': 'Hide Explore, Trending',
      'control-subscriptions': 'Hide Subscriptions',
      'control-more-yt': 'Hide More from YouTube',
      'control-profile-photos': 'Hide Profile Photos',
      // Video Controls
      'control-live-chat': 'Hide Live Chat',
      'control-end-screen-feed': 'Hide End Screen Feed',
      'control-end-screen-cards': 'Hide End Screen Cards',
      'control-video-info': 'Hide Video Info',
      'control-progress': 'Hide Progress Bar',
      'control-duration': 'Hide Video Duration',
      'control-autoplay': 'Disable Autoplay',
      'control-annotations': 'Disable Annotations',
      // Other Features
      'control-fundraiser': 'Hide Fundraiser',
      'control-merch': 'Hide Merch, Tickets, Offers',
      'control-inapt-search': 'Hide Inapt Search Results',
      'control-auto': 'Auto-enable on YouTube',
      'control-icon': 'Show Extension Icon'
    },
    'VI': {
      'title': 'YouTube Controller',
      'subtitle': 'Tùy chỉnh trải nghiệm YouTube của bạn',
      'notice-title': 'Thông báo quan trọng',
      'notice-description': 'Để có trải nghiệm tốt nhất, vui lòng bật tiện ích trước khi truy cập YouTube.',
      'section-content': 'Nội dung & Nguồn cấp',
      'section-interface': 'Giao diện',
      'section-video': 'Điều khiển video',
      'section-other': 'Tính năng khác',
      // Content & Feed
      'control-home-feed': 'Ẩn Nguồn cấp Trang chủ',
      'control-sidebar': 'Ẩn Thanh bên video',
      'control-recommended': 'Ẩn Đề xuất',
      'control-shorts': 'Ẩn Shorts',
      'control-comments': 'Ẩn Bình luận',
      'control-playlist': 'Ẩn Danh sách phát',
      'control-mixes': 'Ẩn Trộn',
      // Interface Elements
      'control-header': 'Ẩn Tiêu đề trên cùng',
      'control-notifications': 'Ẩn Thông báo',
      'control-explore': 'Ẩn Khám phá, Xu hướng',
      'control-subscriptions': 'Ẩn Đăng ký',
      'control-more-yt': 'Ẩn Thêm từ YouTube',
      'control-profile-photos': 'Ẩn Ảnh hồ sơ',
      // Video Controls
      'control-live-chat': 'Ẩn Trò chuyện trực tiếp',
      'control-end-screen-feed': 'Ẩn Nguồn cấp màn hình kết thúc',
      'control-end-screen-cards': 'Ẩn Thẻ màn hình kết thúc',
      'control-video-info': 'Ẩn Thông tin video',
      'control-progress': 'Ẩn Thanh tiến trình',
      'control-duration': 'Ẩn Thời lượng video',
      'control-autoplay': 'Tắt Tự động phát',
      'control-annotations': 'Tắt Chú thích',
      // Other Features
      'control-fundraiser': 'Ẩn Gây quỹ',
      'control-merch': 'Ẩn Hàng hóa, Vé, Ưu đãi',
      'control-inapt-search': 'Ẩn Kết quả tìm kiếm không phù hợp',
      'control-auto': 'Tự động bật trên YouTube',
      'control-icon': 'Hiển thị biểu tượng tiện ích'
    }
  };
  
  // Get saved language preference or default to English
  let currentLang = 'EN';
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get('language', function(result) {
      if (result.language) {
        currentLang = result.language;
        updateLanguage(currentLang);
        langButton.textContent = currentLang;
      }
    });
  }
  
  // Toggle language on click
  langButton.addEventListener('click', () => {
    currentLang = currentLang === 'EN' ? 'VI' : 'EN';
    langButton.textContent = currentLang;
    
    // Save language preference
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.sync.set({ language: currentLang });
    }
    
    updateLanguage(currentLang);
  });
  
  function updateLanguage(lang) {
    // Update all text elements with translations
    document.querySelector('.title').textContent = translations[lang]['title'];
    document.querySelector('.subtitle').textContent = translations[lang]['subtitle'];
    document.querySelector('.notice-title').textContent = translations[lang]['notice-title'];
    document.querySelector('.notice-description').textContent = translations[lang]['notice-description'];
    
    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles[0].textContent = translations[lang]['section-content'];
    sectionTitles[1].textContent = translations[lang]['section-interface'];
    sectionTitles[2].textContent = translations[lang]['section-video'];
    sectionTitles[3].textContent = translations[lang]['section-other'];
    
    // Update control labels - Content & Feed
    document.querySelector('label[for="homeFeedSwitch"]').previousElementSibling.textContent = translations[lang]['control-home-feed'];
    document.querySelector('label[for="sidebarSwitch"]').previousElementSibling.textContent = translations[lang]['control-sidebar'];
    document.querySelector('label[for="recommendedSwitch"]').previousElementSibling.textContent = translations[lang]['control-recommended'];
    document.querySelector('label[for="shortsSwitch"]').previousElementSibling.textContent = translations[lang]['control-shorts'];
    document.querySelector('label[for="commentsSwitch"]').previousElementSibling.textContent = translations[lang]['control-comments'];
    document.querySelector('label[for="playlistSwitch"]').previousElementSibling.textContent = translations[lang]['control-playlist'];
    document.querySelector('label[for="mixesSwitch"]').previousElementSibling.textContent = translations[lang]['control-mixes'];
    
    // Update control labels - Interface Elements
    document.querySelector('label[for="headerSwitch"]').previousElementSibling.textContent = translations[lang]['control-header'];
    document.querySelector('label[for="notificationsSwitch"]').previousElementSibling.textContent = translations[lang]['control-notifications'];
    document.querySelector('label[for="exploreSwitch"]').previousElementSibling.textContent = translations[lang]['control-explore'];
    document.querySelector('label[for="subscriptionsSwitch"]').previousElementSibling.textContent = translations[lang]['control-subscriptions'];
    document.querySelector('label[for="moreFromYTSwitch"]').previousElementSibling.textContent = translations[lang]['control-more-yt'];
    document.querySelector('label[for="profilePhotosSwitch"]').previousElementSibling.textContent = translations[lang]['control-profile-photos'];
    
    // Update control labels - Video Controls
    document.querySelector('label[for="liveChatSwitch"]').previousElementSibling.textContent = translations[lang]['control-live-chat'];
    document.querySelector('label[for="endScreenFeedSwitch"]').previousElementSibling.textContent = translations[lang]['control-end-screen-feed'];
    document.querySelector('label[for="endScreenCardsSwitch"]').previousElementSibling.textContent = translations[lang]['control-end-screen-cards'];
    document.querySelector('label[for="videoInfoSwitch"]').previousElementSibling.textContent = translations[lang]['control-video-info'];
    document.querySelector('label[for="progressSwitch"]').previousElementSibling.textContent = translations[lang]['control-progress'];
    document.querySelector('label[for="durationSwitch"]').previousElementSibling.textContent = translations[lang]['control-duration'];
    document.querySelector('label[for="autoplaySwitch"]').previousElementSibling.textContent = translations[lang]['control-autoplay'];
    document.querySelector('label[for="annotationsSwitch"]').previousElementSibling.textContent = translations[lang]['control-annotations'];
    
    // Update control labels - Other Features
    document.querySelector('label[for="fundraiserSwitch"]').previousElementSibling.textContent = translations[lang]['control-fundraiser'];
    document.querySelector('label[for="merchSwitch"]').previousElementSibling.textContent = translations[lang]['control-merch'];
    document.querySelector('label[for="inaptSearchSwitch"]').previousElementSibling.textContent = translations[lang]['control-inapt-search'];
    document.querySelector('label[for="autoEnableSwitch"]').previousElementSibling.textContent = translations[lang]['control-auto'];
    document.querySelector('label[for="showIconSwitch"]').previousElementSibling.textContent = translations[lang]['control-icon'];
  }
}

// Initialize switches
function initSwitches() {
  // Content & Feed switches
  const homeFeedSwitch = document.getElementById('homeFeedSwitch');
  const sidebarSwitch = document.getElementById('sidebarSwitch');
  const recommendedSwitch = document.getElementById('recommendedSwitch');
  const shortsSwitch = document.getElementById('shortsSwitch');
  const commentsSwitch = document.getElementById('commentsSwitch');
  const playlistSwitch = document.getElementById('playlistSwitch');
  const mixesSwitch = document.getElementById('mixesSwitch');
  
  // Interface Elements switches
  const headerSwitch = document.getElementById('headerSwitch');
  const notificationsSwitch = document.getElementById('notificationsSwitch');
  const exploreSwitch = document.getElementById('exploreSwitch');
  const subscriptionsSwitch = document.getElementById('subscriptionsSwitch');
  const moreFromYTSwitch = document.getElementById('moreFromYTSwitch');
  const profilePhotosSwitch = document.getElementById('profilePhotosSwitch');
  
  // Video Controls switches
  const liveChatSwitch = document.getElementById('liveChatSwitch');
  const endScreenFeedSwitch = document.getElementById('endScreenFeedSwitch');
  const endScreenCardsSwitch = document.getElementById('endScreenCardsSwitch');
  const videoInfoSwitch = document.getElementById('videoInfoSwitch');
  const progressSwitch = document.getElementById('progressSwitch');
  const durationSwitch = document.getElementById('durationSwitch');
  const autoplaySwitch = document.getElementById('autoplaySwitch');
  const annotationsSwitch = document.getElementById('annotationsSwitch');
  
  // Other Features switches
  const fundraiserSwitch = document.getElementById('fundraiserSwitch');
  const merchSwitch = document.getElementById('merchSwitch');
  const inaptSearchSwitch = document.getElementById('inaptSearchSwitch');
  const autoEnableSwitch = document.getElementById('autoEnableSwitch');
  const showIconSwitch = document.getElementById('showIconSwitch');
  
  // Load saved settings if available
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get([
      // Content & Feed
      'homeFeedHidden',
      'sidebarHidden',
      'recommendedHidden',
      'shortsHidden',
      'commentsHidden',
      'playlistHidden',
      'mixesHidden',
      
      // Interface Elements
      'headerHidden',
      'notificationsHidden',
      'exploreHidden',
      'subscriptionsHidden',
      'moreFromYTHidden',
      'profilePhotosHidden',
      
      // Video Controls
      'liveChatHidden',
      'endScreenFeedHidden',
      'endScreenCardsHidden',
      'videoInfoHidden',
      'progressBarHidden',
      'durationHidden',
      'autoplayDisabled',
      'annotationsDisabled',
      
      // Other Features
      'fundraiserHidden',
      'merchHidden',
      'inaptSearchHidden',
      'autoEnable',
      'showIcon'
    ], function(result) {
      // Content & Feed
      homeFeedSwitch.checked = result.homeFeedHidden === true;
      sidebarSwitch.checked = result.sidebarHidden === true;
      recommendedSwitch.checked = result.recommendedHidden === true;
      shortsSwitch.checked = result.shortsHidden === true;
      commentsSwitch.checked = result.commentsHidden === true;
      playlistSwitch.checked = result.playlistHidden === true;
      mixesSwitch.checked = result.mixesHidden === true;
      
      // Interface Elements
      headerSwitch.checked = result.headerHidden === true;
      notificationsSwitch.checked = result.notificationsHidden === true;
      exploreSwitch.checked = result.exploreHidden === true;
      subscriptionsSwitch.checked = result.subscriptionsHidden === true;
      moreFromYTSwitch.checked = result.moreFromYTHidden === true;
      profilePhotosSwitch.checked = result.profilePhotosHidden === true;
      
      // Video Controls
      liveChatSwitch.checked = result.liveChatHidden === true;
      endScreenFeedSwitch.checked = result.endScreenFeedHidden === true;
      endScreenCardsSwitch.checked = result.endScreenCardsHidden === true;
      videoInfoSwitch.checked = result.videoInfoHidden === true;
      progressSwitch.checked = result.progressBarHidden !== false; // Default true
      durationSwitch.checked = result.durationHidden !== false; // Default true
      autoplaySwitch.checked = result.autoplayDisabled === true;
      annotationsSwitch.checked = result.annotationsDisabled === true;
      
      // Other Features
      fundraiserSwitch.checked = result.fundraiserHidden === true;
      merchSwitch.checked = result.merchHidden === true;
      inaptSearchSwitch.checked = result.inaptSearchHidden === true;
      autoEnableSwitch.checked = result.autoEnable !== false; // Default true
      showIconSwitch.checked = result.showIcon !== false; // Default true
    });
  }
  
  // Add event listeners to all switches
  // Content & Feed
  addSwitchListener(homeFeedSwitch, 'homeFeedHidden');
  addSwitchListener(sidebarSwitch, 'sidebarHidden');
  addSwitchListener(recommendedSwitch, 'recommendedHidden');
  addSwitchListener(shortsSwitch, 'shortsHidden');
  addSwitchListener(commentsSwitch, 'commentsHidden');
  addSwitchListener(playlistSwitch, 'playlistHidden');
  addSwitchListener(mixesSwitch, 'mixesHidden');
  
  // Interface Elements
  addSwitchListener(headerSwitch, 'headerHidden');
  addSwitchListener(notificationsSwitch, 'notificationsHidden');
  addSwitchListener(exploreSwitch, 'exploreHidden');
  addSwitchListener(subscriptionsSwitch, 'subscriptionsHidden');
  addSwitchListener(moreFromYTSwitch, 'moreFromYTHidden');
  addSwitchListener(profilePhotosSwitch, 'profilePhotosHidden');
  
  // Video Controls
  addSwitchListener(liveChatSwitch, 'liveChatHidden');
  addSwitchListener(endScreenFeedSwitch, 'endScreenFeedHidden');
  addSwitchListener(endScreenCardsSwitch, 'endScreenCardsHidden');
  addSwitchListener(videoInfoSwitch, 'videoInfoHidden');
  addSwitchListener(progressSwitch, 'progressBarHidden');
  addSwitchListener(durationSwitch, 'durationHidden');
  addSwitchListener(autoplaySwitch, 'autoplayDisabled');
  addSwitchListener(annotationsSwitch, 'annotationsDisabled');
  
  // Other Features
  addSwitchListener(fundraiserSwitch, 'fundraiserHidden');
  addSwitchListener(merchSwitch, 'merchHidden');
  addSwitchListener(inaptSearchSwitch, 'inaptSearchHidden');
  addSwitchListener(autoEnableSwitch, 'autoEnable');
  addSwitchListener(showIconSwitch, 'showIcon');
  
  // Helper function to add event listener to switches
  function addSwitchListener(switchElement, storageKey) {
    switchElement.addEventListener('change', function() {
      saveSettings(storageKey, this.checked);
    });
  }
  
  // Save settings to storage
  function saveSettings(key, value) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      let data = {};
      data[key] = value;
      chrome.storage.sync.set(data);
    }
  }
} 
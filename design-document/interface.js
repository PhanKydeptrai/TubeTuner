// YouTube Controller Extension Interface JS
document.addEventListener('DOMContentLoaded', function() {
  // Initialize collapsible sections
  initCollapsibleSections();
  
  // Initialize theme toggle
  initThemeToggle();
  
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
      
      // Close all sections
      sections.forEach(s => {
        s.classList.remove('expanded');
        s.querySelector('.section-content').style.display = 'none';
      });
      
      // Toggle current section if it wasn't expanded
      if (!isExpanded) {
        section.classList.add('expanded');
        content.style.display = 'block';
      }
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
}

// Initialize switches
function initSwitches() {
  // Get all switches
  const switchElements = document.querySelectorAll('.switch-input');
  const switchSettings = {};
  
  // Create a mapping of switch IDs to storage keys
  const settingsMap = {
    // Content & Feed
    'homeFeedSwitch': 'homeFeedHidden',
    'videoSidebarSwitch': 'videoSidebarHidden',
    'recommendationsSwitch': 'recommendationsHidden',
    'shortsSwitch': 'shortsHidden',
    'commentsSwitch': 'commentsHidden',
    'playlistSwitch': 'playlistHidden',
    'mixesSwitch': 'mixesHidden',
    
    // Interface Elements
    'topHeaderSwitch': 'topHeaderHidden',
    'notificationsSwitch': 'notificationsHidden',
    'exploreSwitch': 'exploreHidden',
    'subscriptionsSwitch': 'subscriptionsHidden',
    'moreFromYTSwitch': 'moreFromYTHidden',
    'profilePhotosSwitch': 'profilePhotosHidden',
    
    // Video Controls
    'liveChatSwitch': 'liveChatHidden',
    'endScreenFeedSwitch': 'endScreenFeedHidden',
    'endCardsSwitch': 'endCardsHidden',
    'videoInfoSwitch': 'videoInfoHidden',
    'progressSwitch': 'progressBarHidden',
    'durationSwitch': 'durationHidden',
    'disableAutoplaySwitch': 'autoplayDisabled',
    'disableAnnotationsSwitch': 'annotationsDisabled',
    
    // Other Features
    'fundraiserSwitch': 'fundraiserHidden',
    'merchSwitch': 'merchHidden',
    'inaptSearchSwitch': 'inaptSearchHidden',
    'autoEnableSwitch': 'autoEnable',
    'showIconSwitch': 'showIcon',
    'keyboardShortcutsSwitch': 'keyboardShortcuts'
  };
  
  // Default values for settings (true means enabled/checked)
  const defaultValues = {
    // Most hiding features default to false (not hiding)
    'homeFeedHidden': false,
    'videoSidebarHidden': false,
    'recommendationsHidden': false,
    'shortsHidden': false,
    'commentsHidden': false,
    'playlistHidden': false,
    'mixesHidden': false,
    'topHeaderHidden': false,
    'notificationsHidden': false,
    'exploreHidden': false,
    'subscriptionsHidden': false,
    'moreFromYTHidden': false,
    'profilePhotosHidden': false,
    'liveChatHidden': false,
    'endScreenFeedHidden': false,
    'endCardsHidden': false,
    'videoInfoHidden': false,
    'fundraiserHidden': false,
    'merchHidden': false,
    'inaptSearchHidden': false,
    
    // These features default to true (enabled)
    'progressBarHidden': true,
    'durationHidden': true,
    'autoEnable': true,
    'showIcon': true,
    
    // These features default to false (disabled)
    'autoplayDisabled': false,
    'annotationsDisabled': false,
    'keyboardShortcuts': false
  };
  
  // Load saved settings if available
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(Object.values(settingsMap), function(result) {
      // Apply saved settings or defaults to each switch
      switchElements.forEach(switchEl => {
        const settingKey = settingsMap[switchEl.id];
        if (settingKey) {
          // If the setting is about disabling something, the logic is inverted
          if (settingKey.includes('Disabled')) {
            switchEl.checked = result[settingKey] !== undefined ? result[settingKey] : defaultValues[settingKey];
          } else {
            switchEl.checked = result[settingKey] !== undefined ? result[settingKey] : defaultValues[settingKey];
          }
        }
      });
    });
  } else {
    // For local testing without chrome.storage
    switchElements.forEach(switchEl => {
      const settingKey = settingsMap[switchEl.id];
      if (settingKey) {
        switchEl.checked = defaultValues[settingKey];
      }
    });
  }
  
  // Add event listeners to all switches
  switchElements.forEach(switchEl => {
    switchEl.addEventListener('change', function() {
      const settingKey = settingsMap[this.id];
      if (settingKey) {
        saveSettings(settingKey, this.checked);
      }
    });
  });
  
  function saveSettings(key, value) {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      let data = {};
      data[key] = value;
      chrome.storage.sync.set(data);
    }
  }
}

// Language handling - just for UI, not functional in this demo
document.querySelector('.lang-button').addEventListener('click', function() {
  // In a real extension, this would toggle between languages
  if (this.textContent === 'EN') {
    this.textContent = 'VI';
  } else {
    this.textContent = 'EN';
  }
}); 
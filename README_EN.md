# YouTube Hider - Customize YouTube Interface

English | [Tiếng Việt](README.md)

A comprehensive Chrome extension to customize your YouTube interface according to your preferences. Hide distracting elements and focus on video content with over 20 different hide/show options.

## Main Features

### 🎬 Content & Feed Controls
✅ **Hide video progress bar** - Remove the progress bar when watching videos <br>
✅ **Hide video duration** - Hide current time/total duration information <br>
✅ **Hide Shorts** - Completely hide Shorts videos and Shorts section on YouTube <br>
✅ **Hide Home Feed** - Hide YouTube homepage to avoid distractions <br>
✅ **Hide Video Sidebar** - Hide recommended video list on the side <br>

### 🎛️ Interface Elements
✅ **Hide Comments** - Hide video comments section <br>
✅ **Hide Notifications Bell** - Hide notification bell <br>
✅ **Hide Top Header** - Hide top header bar <br>
✅ **Hide Explore & Trending** - Hide Explore and Trending tabs <br>
✅ **Hide More from YouTube** - Hide "More from YouTube" section <br>

### 🎥 Video Controls
✅ **Hide End Screen Cards** - Hide end screen cards <br>
✅ **Hide Video Controls** - Hide video control buttons <br>

### 🔧 Other Features
✅ **Hide Fundraiser Banners** - Hide fundraising banners <br>
✅ **Hide Merchandise/Tickets** - Hide merchandise/ticket ads <br>
✅ **Export/Import Settings** - Backup and share configurations <br>
✅ **Modern UI** - Beautiful interface with 4 collapsible sections <br>
✅ **Dark mode** - Support for dark mode, automatically follows system <br>
✅ **Multi-language** - Support for Vietnamese and English <br>
✅ **Independent toggles** - Separate toggle for each feature <br>
✅ **No performance impact** - Lightweight and optimized extension <br>

## 🌟 Modern Interface with 4 Collapsible Sections 🌟

> **New!** Extension interface is organized into 4 main sections:
>
> 1. **Content & Feed Controls** - Control content and feeds
> 2. **Interface Elements** - Interface elements
> 3. **Video Controls** - Video controls
> 4. **Other Features** - Other features
>
> Each section can be collapsed/expanded and remembers your state!
>
> **Export/Import Settings Feature:** Backup your configuration as JSON files to share or restore later.

## Installation

1. **Open Chrome and go to Extensions page:**
   - Type `chrome://extensions/` in the address bar
   - Or go to Menu → More tools → Extensions

2. **Enable Developer mode:**
   - Switch on the "Developer mode" toggle in the top right corner

3. **Load extension:**
   - Click "Load unpacked"
   - Select this `YoutubeDisableProgessBar` folder
   - The extension will be installed and appear in the list

## How to Use

1. **Open YouTube** and play any video
2. **Click on the extension icon** in the toolbar
3. **Explore 4 main sections**:
   - **Content & Feed Controls**: Hide/show progress bar, duration, Shorts, Home Feed, Video Sidebar
   - **Interface Elements**: Hide/show Comments, Notifications Bell, Top Header, Explore & Trending
   - **Video Controls**: Hide/show End Screen Cards, Video Controls
   - **Other Features**: Hide/show Fundraiser Banners, Merchandise, and other features
4. **Toggle switches** to enable/disable each feature individually
5. **Toggle theme**: Click the sun/moon button at the top to switch Light/Dark mode
6. **Export/Import Settings**: Use buttons in "Other Features" section to backup/restore configurations
7. Extension will automatically apply changes and remember section states

## Extension Status

- 🟢 **Hiding: progress bar** - Only the progress bar is hidden
- 🟢 **Hiding: duration** - Only the video duration is hidden
- 🟢 **Hiding: shorts** - Only the Shorts section is hidden
- 🟢 **Hiding: home feed** - Only the home page is hidden
- 🟢 **Hiding: video sidebar** - Only the video sidebar is hidden
- 🟢 **Hiding: comments** - Only the comments section is hidden
- 🟢 **Hiding: notifications bell** - Only the notification bell is hidden
- 🟢 **Hiding: top header** - Only the top header is hidden
- 🟢 **Hiding: explore & trending** - Only Explore & Trending tabs are hidden
- 🟢 **Hiding: multiple features** - Combination of multiple hidden features
- 🟡 **All disabled** - Normal display

## Notes

- The extension only works on `youtube.com`
- YouTube keyboard shortcuts still work normally (Space, M, F, ←, →, ↑, ↓)
- Settings are automatically saved and applied to all YouTube tabs
- Each feature can be toggled independently as needed
- Section collapsed/expanded states are remembered
- Theme preferences (light/dark) are saved and applied for every time you open the extension
- Exported settings files are in JSON format and can be shared with others
- If you encounter issues, try refreshing the YouTube page or disabling/enabling the extension

## File Structure

```
YoutubeDisableProgessBar/
├── manifest.json         # Extension configuration
├── content.js            # Script running on YouTube page
├── popup.html            # Popup interface
├── popup.js              # Popup logic
├── styles.css            # CSS to hide YouTube elements
├── interface.css         # CSS for popup interface

├── icons/                # Folder containing icons (complete set)
│   ├── icon16.png        # Icon 16x16px
│   ├── icon32.png        # Icon 32x32px  
│   ├── icon48.png        # Icon 48x48px
│   └── icon128.png       # Icon 128x128px
└── README.md             # This readme file
```

## Troubleshooting

**Extension not working:**
- Check if Developer mode is enabled
- Reload the extension in chrome://extensions/
- Refresh the YouTube page

**Hidden features still showing:**
- Click the extension icon and check toggle status in each section
- Make sure the corresponding feature is enabled
- Refresh the page and try again
- Check the Console for any errors

**Sections not collapsing/expanding:**
- Check if localStorage is being cleared
- Try clearing browser cache
- Reload the extension and try again

**Export/Import settings not working:**
- Ensure file has valid JSON format
- Check file size (maximum 5MB)
- Check Console for JavaScript errors

## Future Development

This extension can be expanded with features like:
- Custom shortcut keys for each feature
- Whitelist/blacklist channels
- Additional color themes
- Hide thumbnail duration on the homepage
- Timer to automatically enable/disable based on time
- Sync settings with Chrome account
- Option to hide other parts of YouTube
- Named configuration profiles
- Share profiles via URL or QR code

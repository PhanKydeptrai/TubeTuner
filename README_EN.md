# YouTube Progress Bar & Duration Hider Extension

English | [Tiếng Việt](README.md)

A simple Chrome extension to hide the progress bar, video duration, and/or Shorts section on YouTube while watching videos, while preserving all other control functions.

## Features

✅ **Hide video progress bar** - Remove the progress bar when watching videos <br>
✅ **Hide video duration** - Hide current time/total duration information <br>
✅ **Hide Shorts** - Completely hide Shorts videos and Shorts section on YouTube <br>
✅ **Preserve volume controls** - Still able to adjust volume normally <br>
✅ **Preserve control buttons** - Play/pause, fullscreen, settings, subtitles... <br>
✅ **Independent toggles** - Separate toggles for progress bar, duration, and Shorts <br>
✅ **Modern UI** - shadcn-style interface, beautiful and easy to use <br>
✅ **Dark mode** - Support for dark mode, automatically follows system or manual selection <br>
✅ **Auto apply** - Works with all YouTube videos <br>
✅ **No performance impact** - Lightweight and optimized extension <br>

## 🌟 New Feature: Dark Mode & Modern UI 🌟

> **New!** The extension now has a modern interface with Dark Mode!
> 
> New features include:
> - Modern user interface in shadcn style
> - Dark Mode that automatically follows system or can be customized
> - Easy light/dark theme toggle button
> - Modern UI components (Switch, Card, Badge)
> - Persistent user theme preferences
>
> Just click the theme toggle button in the top right corner of the popup!

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
3. **Toggle switches** to enable/disable features:
   - **Hide progress bar**: Show/hide the progress bar
   - **Hide video duration**: Show/hide time information
   - **Hide Shorts**: Show/hide Shorts videos and section
4. **Toggle theme**:
   - Click the sun/moon button in the top right corner to switch between Light and Dark mode
5. The extension will automatically apply changes

## Extension Status

- 🟢 **Hiding: progress bar** - Only the progress bar is hidden
- 🟢 **Hiding: duration** - Only the video duration is hidden
- 🟢 **Hiding: shorts** - Only the Shorts section is hidden
- 🟢 **Hiding: multiple features** - Combination of multiple hidden features
- 🟡 **All disabled** - Normal display

## Notes

- The extension only works on `youtube.com`
- YouTube keyboard shortcuts still work normally (Space, M, F, ←, →, ↑, ↓)
- Settings are automatically saved and applied to all YouTube tabs
- Each feature can be toggled independently as needed
- If you encounter issues, try refreshing the YouTube page or disabling/enabling the extension
- Theme preferences (light/dark) are saved and applied for every time you open the extension

## File Structure

```
YoutubeDisableProgessBar/
├── manifest.json         # Extension configuration
├── content.js            # Script running on YouTube page
├── popup.html            # Popup interface
├── popup.js              # Popup logic
├── styles.css            # CSS to hide progress bar, duration, and shorts
├── components/           # Folder containing UI components
│   └── ui/               # Modern UI components
│       ├── badge.js      # Badge component
│       ├── card.js       # Card component
│       ├── switch.js     # Switch component
│       └── theme-toggle.js # Theme Toggle component
├── src/                  # Source directory
│   └── input.css         # Input CSS for Tailwind
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── build.js              # Build script
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

**Progress bar, duration, or Shorts still showing:**
- Click the extension icon and check the status of the toggles
- Make sure the corresponding feature is enabled
- Refresh the page and try again
- Check the Console for any errors

**Dark mode not working correctly:**
- Check if localStorage is being cleared
- Try clearing browser cache
- Reload the extension and try again

**Language buttons not working:**
- Check for JavaScript errors in the Console
- Reload the extension and try again

## Future Development

This extension can be expanded with features like:
- Hide/show other controls (like like/dislike buttons, comments)
- Custom shortcut keys
- Whitelist/blacklist channels
- Additional color themes
- Hide thumbnail duration on the homepage
- Timer to automatically enable/disable based on time
- Sync settings with Chrome account
- Option to hide other parts of YouTube (like Trending, Subscriptions)

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
✅ **Auto refresh** - Automatically refresh the page to apply changes immediately <br>
✅ **Auto apply** - Works with all YouTube videos <br>
✅ **No performance impact** - Lightweight and optimized extension <br>

## 🌟 New Feature: Hide Shorts 🌟

> **New!** Now you can completely hide Shorts videos and the Shorts section on YouTube!
> 
> This feature helps you:
> - Remove the Shorts section from the YouTube homepage
> - Hide the Shorts button in the navigation bar
> - Hide Shorts videos in channel pages and search results
> - Focus on regular video content
>
> Just toggle "Hide Shorts" in the extension popup!

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
   - **Hide Shorts** *(NEW)*: Show/hide Shorts videos and section
   - **Auto refresh**: Automatically refresh the page when changes are made
4. The extension will automatically apply changes (if auto-refresh is enabled)

## Extension Status

- 🟢 **Hiding: progress bar** - Only the progress bar is hidden
- 🟢 **Hiding: duration** - Only the video duration is hidden
- 🟢 **Hiding: shorts** - Only the Shorts section is hidden *(New feature!)*
- 🟢 **Hiding: multiple features** - Combination of multiple hidden features
- 🟡 **All disabled** - Normal display

## Notes

- The extension only works on `youtube.com`
- YouTube keyboard shortcuts still work normally (Space, M, F, ←, →, ↑, ↓)
- Settings are automatically saved and applied to all YouTube tabs
- Each feature can be toggled independently as needed
- Auto refresh helps apply changes immediately
- If you encounter issues, try refreshing the YouTube page or disabling/enabling the extension

## File Structure

```
YoutubeDisableProgessBar/
├── manifest.json      # Extension configuration
├── content.js         # Script running on YouTube page
├── popup.html         # Popup interface
├── popup.js           # Popup logic
├── styles.css         # CSS to hide progress bar, duration, and shorts
├── icons/             # Folder containing icons (complete set)
│   ├── icon16.png     # Icon 16x16px
│   ├── icon32.png     # Icon 32x32px  
│   ├── icon48.png     # Icon 48x48px
│   └── icon128.png    # Icon 128x128px
├── ICONS.md           # Guide for creating high-quality icons
├── DEBUG.md           # Testing and debugging guide
└── README.md          # This readme file
```

## Troubleshooting

**Extension not working:**
- Check if Developer mode is enabled
- Reload the extension in chrome://extensions/
- Refresh the YouTube page

**Progress bar, duration, or Shorts still showing:**
- Click the extension icon and check the status of the toggles
- Make sure the corresponding feature is enabled
- Try enabling auto-refresh and toggle again
- Check the Console for any errors

**Auto-refresh not working:**
- Check the "tabs" permission in manifest.json
- Reload the extension and try again

**Shorts not completely hidden:**
- YouTube frequently updates its interface, so some new Shorts elements might not be hidden
- Refresh the page and check again
- If Shorts are still visible, report it to update the CSS

## Future Development

This extension can be expanded with features like:
- Hide/show other controls (like like/dislike buttons, comments)
- Custom shortcut keys
- Whitelist/blacklist channels
- Dark mode for popup
- Hide thumbnail duration on the homepage
- Timer to automatically enable/disable based on time
- Sync settings with Chrome account
- Option to hide other parts of YouTube (like Trending, Subscriptions) 

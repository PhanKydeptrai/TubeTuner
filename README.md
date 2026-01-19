<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![GNU GPL v3][license-shield]][license-url]

<!-- PROJECT LOGO -->
<h1 align="center">

![](src/images/banners/banner.png)
<br/>
TubeTuner

</h1>

<h3 align="center">Customize the YouTube interface to eliminate distractions and create a focused, personalized viewing experience</h3>

<p align="center">
    <a href="https://github.com/PhanKydeptrai/TubeTuner"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/PhanKydeptrai/TubeTuner">View Demo</a>
    ·
    <a href="https://github.com/PhanKydeptrai/TubeTuner/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/PhanKydeptrai/TubeTuner/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#get-this-extension">✨ Get this extension</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

TubeTuner is a comprehensive Chrome extension to customize your YouTube interface according to your preferences. Hide distracting elements and focus on video content with 16 different hide/show options, plus utility features like presets and export/import for backups.

### Main Features

#### 🎬 Content & Feed Controls
✅ **Hide Home Feed** - Hide YouTube homepage to avoid distractions <br>
✅ **Hide Video Sidebar** - Hide recommended video list on the side <br>
✅ **Hide Comments** - Hide video comments section <br>
✅ **Hide Shorts** - Completely hide Shorts videos and Shorts section on YouTube <br>
✅ **Hide Channel** - Hide channel information <br>

#### 🎛️ Interface Elements
✅ **Hide Top Header** - Hide top header bar <br>
✅ **Hide Notifications Bell** - Hide notification bell <br>
✅ **Hide Explore & Trending** - Hide Explore and Trending tabs <br>
✅ **Hide More from YouTube** - Hide "More from YouTube" section <br>
✅ **Hide Shop** - Hide YouTube Shop section <br>
✅ **Hide Buttons Bar** - Hide buttons bar <br>

#### 🎥 Video Controls
✅ **Hide video progress bar** - Remove the progress bar when watching videos <br>
✅ **Hide video duration** - Hide current time/total duration information <br>
✅ **Hide End Screen Cards** - Hide end screen cards <br>
✅ **Hide Description** - Hide video description <br>

#### 🔧 Other Features
✅ **Export/Import Settings** - Export settings to a file for backups and import to restore or share configurations <br>
✅ **Modern UI** - Beautiful interface with 3 collapsible sections <br>
✅ **Dark mode** - Support for dark mode, automatically follows system <br>
✅ **Multi-language** - Support for Vietnamese and English <br>
✅ **Independent toggles** - Separate toggle for each feature <br>
✅ **No performance impact** - Lightweight and optimized extension <br>
✅ **Presets** - Apply pre-made presets (None, Balanced, Focus) or create custom presets to quickly switch multiple settings. <br>
✅ **Grayscale** - Apply a grayscale filter to the YouTube UI <br>
✅ **Enable/Disable Extension** - Quickly enable or disable the extension from the popup

### New Features

- ✅ **Grayscale** — Apply a grayscale filter to the YouTube UI
- ✅ **Enable/Disable Extension** — Turn the extension on or off from the popup
- ✅ **Hide YouTube Shop** — Hide the Shop section on YouTube
- ✅ **Preset options** — Use built-in presets or create and save custom presets
- ✅ **Export to file (Backup)** — Export settings to a local file for backup and restore

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![JavaScript][JavaScript-shield]][JavaScript-url]
* [![HTML5][HTML5-shield]][HTML5-url]
* [![CSS3][CSS3-shield]][CSS3-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/PhanKydeptrai/TubeTuner.git
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Build the extension:**
   - For Chrome:
     ```sh
     npm run build:chrome
     ```
   - For Firefox:
     ```sh
     npm run build:firefox
     ```
4. **Load extension in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `dist/chrome` folder

5. **Load extension in Firefox:**
   - Open `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on..."
   - Select any file in the `dist/firefox` folder (e.g., `manifest.json`)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GET THIS EXTENSION -->
## ✨ Get this extension

| Browser       | Link |
|---------------|------|
| Chrome        | [Download](https://chromewebstore.google.com/detail/tubetuner/ekllndjjhcpljlfhfblfcagbdjnjkbco) |
| Firefox       | [Download](https://addons.mozilla.org/vi/firefox/addon/tubetuner/) |

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

1. **Open YouTube** and play any video
2. **Click on the extension icon** in the toolbar
3. **Explore 3 main sections**:
   - **Content & Feed Controls**: Hide/show Home Feed, Video Sidebar, Comments, Shorts, Channel
   - **Interface Elements**: Hide/show Top Header, Notifications Bell, Explore & Trending, More from YouTube, Buttons Bar, Shop
   - **Video Controls**: Hide/show Progress Bar, Duration, End Screen Cards, Description
4. **Toggle switches** to enable/disable each feature individually
5. **Toggle theme**: Click the sun/moon button at the top to switch Light/Dark mode
6. **Export/Import Settings**: Use buttons in settings section to backup/restore configurations
7. Extension will automatically apply changes and remember section states
8. **Presets**: Choose a predefined preset (None, Balanced, Focus) in the settings to apply multiple hide/show options at once.

9. **Custom Presets**: Create your own named presets by configuring the toggles and clicking "Save preset". Use "Import preset (.json)" to load presets from a JSON file (merges with existing custom presets), or "Export preset" to download your custom presets as JSON. Delete a custom preset by selecting it and clicking "Delete preset".

### Manual QA (Presets)

1. Open the popup and toggle some settings. Click "Save preset" with a name.
2. Ensure the new preset appears in the Presets dropdown under "Custom".
3. Select the custom preset and click "Apply" — the UI should update accordingly.
4. Use "Export preset" to download your custom presets and verify the JSON contains your saved presets.
5. Remove a preset by selecting it and clicking "Delete preset".
6. Use "Import preset (.json)" with a valid JSON file to merge presets and verify they appear in the list.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the GNU General Public License v3. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Phan Ky - phanky.dev@proton.me

Project Link: [https://github.com/PhanKydeptrai/TubeTuner](https://github.com/PhanKydeptrai/TubeTuner)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[contributors-url]: https://github.com/PhanKydeptrai/TubeTuner/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[forks-url]: https://github.com/PhanKydeptrai/TubeTuner/network/members
[stars-shield]: https://img.shields.io/github/stars/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[stars-url]: https://github.com/PhanKydeptrai/TubeTuner/stargazers
[issues-shield]: https://img.shields.io/github/issues/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[issues-url]: https://github.com/PhanKydeptrai/TubeTuner/issues
[license-shield]: https://img.shields.io/github/license/PhanKydeptrai/TubeTuner.svg?style=for-the-badge
[license-url]: https://github.com/PhanKydeptrai/TubeTuner/blob/master/LICENSE
[JavaScript-shield]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[HTML5-shield]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5
[CSS3-shield]: https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS

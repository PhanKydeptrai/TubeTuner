// TubeTuner - Grayscale Feature
(function() {
    'use strict';

    // Function to toggle Grayscale (black & white) mode
    function toggleGrayscale(enabled) {
        settings.grayscaleEnabled = enabled;

        const styleId = 'tubetuner-grayscale-style';

        if (enabled) {
            document.body.classList.add('youtube-grayscale-enabled');

            // Inject style to apply grayscale only to specific elements without affecting layout
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    /* Apply grayscale only to video elements */
                    video,
                    .html5-video-player,
                    .video-stream {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to thumbnail images only */
                    yt-image img,
                    yt-img-shadow img,
                    .yt-core-image,
                    ytd-thumbnail img,
                    ytd-video-renderer img,
                    ytd-compact-video-renderer img,
                    ytd-grid-video-renderer img,
                    ytd-rich-item-renderer img,
                    ytd-reel-item-renderer img,
                    ytd-shorts img,
                    ytd-shorts-shelf-renderer img,
                    ytd-reel-shelf-renderer img,
                    ytd-shorts-compact-video-renderer img,
                    ytd-shorts-video-renderer img {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to specific content text that won't affect layout */
                    ytd-video-meta-block yt-formatted-string,
                    .ytd-video-meta-block .ytd-video-meta-block-info,
                    ytd-channel-renderer yt-formatted-string,
                    ytd-shelf-renderer yt-formatted-string,
                    ytd-rich-section-renderer yt-formatted-string,
                    yt-formatted-string,
                    ytd-rich-grid-media yt-formatted-string,
                    ytd-compact-video-renderer yt-formatted-string,
                    .yt-core-attributed-string,
                    .yt-core-attributed-string *,
                    #video-title,
                    #video-title *,
                    .ytd-video-renderer #video-title,
                    .ytd-compact-video-renderer #video-title,
                    .ytd-grid-video-renderer #video-title {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to YouTube logo */
                    #logo,
                    #logo *,
                    yt-icon,
                    yt-icon *,
                    .logo,
                    .yt-logo,
                    #masthead-logo,
                    yt-icon-shape,
                    .yt-spec-icon-shape,
                    #masthead #logo,
                    #masthead .logo,
                    a[href="/"] img,
                    a[href="/"] svg,
                    .yt-spec-button-shape-next yt-icon,
                    .yt-spec-button-shape-next yt-icon-shape {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to badges including Live badges */
                    .badge,
                    .yt-badge-shape,
                    .badge-style-type-simple,
                    .yt-thumbnail-overlay-badge-view-model,
                    .badge-shape,
                    .yt-badge {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }

                    /* Apply to right panel (secondary) on watch pages */
                    #secondary,
                    #secondary * {
                        -webkit-filter: grayscale(100%) !important;
                        filter: grayscale(100%) !important;
                    }
                `;
                document.head.appendChild(style);
            }
        } else {
            document.body.classList.remove('youtube-grayscale-enabled');

            const existing = document.getElementById(styleId);
            if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
        }
    }

    // Expose to global scope for content.js
    window.toggleGrayscale = toggleGrayscale;
})();
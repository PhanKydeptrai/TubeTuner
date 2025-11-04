// TubeTuner - More from YouTube Feature
(function() {
    'use strict';

    // Function to toggle More from YouTube Section
    function toggleMoreFromYouTube(hide) {
        settings.moreFromYouTubeHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-more-from-youtube-hidden');
            applyMoreFromYouTubeFixes();
        } else {
            document.body.classList.remove('youtube-more-from-youtube-hidden');
            restoreMoreFromYouTube();
        }
    }

    // Function to apply fixes for hiding More from YouTube
    function applyMoreFromYouTubeFixes() {
        if (!settings.moreFromYouTubeHidden) return;

        console.log('[TubeTuner] Applying More from YouTube hiding');

        const hideMoreFromYouTubeSection = () => {
            // Target guide sections that contain "More from YouTube" text
            const guideSections = document.querySelectorAll('ytd-guide-section-renderer');

            guideSections.forEach(section => {
                if (section.classList.contains('youtube-more-from-hidden')) return;

                const sectionText = section.textContent.toLowerCase();
                if (sectionText.includes('more from youtube') ||
                    sectionText.includes('thêm từ youtube') ||
                    sectionText.includes('youtube apps') ||
                    sectionText.includes('get youtube') ||
                    sectionText.includes('youtube premium')) {

                    console.log('[TubeTuner] Hiding More from YouTube section');
                    section.classList.add('youtube-more-from-hidden');
                }
            });

            // Also target guide entries
            const guideEntries = document.querySelectorAll('ytd-guide-entry-renderer');

            guideEntries.forEach(entry => {
                if (entry.classList.contains('youtube-more-from-hidden')) return;

                const entryText = entry.textContent.toLowerCase();
                if (entryText.includes('more from youtube') ||
                    entryText.includes('thêm từ youtube') ||
                    entryText.includes('youtube apps') ||
                    entryText.includes('get youtube') ||
                    entryText.includes('youtube premium')) {

                    console.log('[TubeTuner] Hiding More from YouTube entry');
                    entry.classList.add('youtube-more-from-hidden');
                }
            });

            // Target any shelf or section with the text
            const shelves = document.querySelectorAll('ytd-rich-shelf-renderer, ytd-shelf-renderer');

            shelves.forEach(shelf => {
                if (shelf.classList.contains('youtube-more-from-hidden')) return;

                const shelfText = shelf.textContent.toLowerCase();
                if (shelfText.includes('more from youtube') ||
                    shelfText.includes('thêm từ youtube')) {

                    console.log('[TubeTuner] Hiding More from YouTube shelf');
                    shelf.classList.add('youtube-more-from-hidden');
                }
            });
        };

        // Run immediately
        hideMoreFromYouTubeSection();

        // Run again after delays for dynamic content
        setTimeout(hideMoreFromYouTubeSection, 1000);
        setTimeout(hideMoreFromYouTubeSection, 3000);

        // Set up observer for dynamic content
        if (!window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver = new MutationObserver((mutations) => {
                if (settings.moreFromYouTubeHidden) {
                    let shouldCheck = false;
                    mutations.forEach(mutation => {
                        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            shouldCheck = true;
                        }
                    });

                    if (shouldCheck) {
                        console.log('[TubeTuner] DOM changes detected, re-checking More from YouTube');
                        clearTimeout(window.moreFromYouTubeTimeout);
                        window.moreFromYouTubeTimeout = setTimeout(hideMoreFromYouTubeSection, 500);
                    }
                }
            });

            window.moreFromYouTubeObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Function to restore More from YouTube elements
    function restoreMoreFromYouTube() {
        console.log('[TubeTuner] Restoring More from YouTube elements');

        // Remove hiding class
        document.querySelectorAll('.youtube-more-from-hidden').forEach(element => {
            element.classList.remove('youtube-more-from-hidden');
        });

        // Disconnect observer
        if (window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver.disconnect();
            window.moreFromYouTubeObserver = null;
        }

        // Clear timeout
        if (window.moreFromYouTubeTimeout) {
            clearTimeout(window.moreFromYouTubeTimeout);
            window.moreFromYouTubeTimeout = null;
        }
    }

    // Expose functions to global scope
    window.toggleMoreFromYouTube = toggleMoreFromYouTube;
    window.applyMoreFromYouTubeFixes = applyMoreFromYouTubeFixes;
    window.restoreMoreFromYouTube = restoreMoreFromYouTube;
})();
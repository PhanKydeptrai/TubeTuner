// TubeTuner - Home Feed Feature
(function() {
    'use strict';

    // Function to toggle Home Feed
    function toggleHomeFeed(hide) {
        // debug: toggle home feed
        settings.homeFeedHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-home-feed-hidden');
            document.body.setAttribute('data-home-feed-hidden', 'true');
            // added class youtube-home-feed-hidden
            applyHomeFeedFixes();
        } else {
            document.body.classList.remove('youtube-home-feed-hidden');
            document.body.removeAttribute('data-home-feed-hidden');
            // removed class youtube-home-feed-hidden
            restoreHomeFeed();
        }
    }

    // Placeholder functions (may be implemented later)
    function applyHomeFeedFixes() {
        // Implementation for additional fixes if needed
    }

    function restoreHomeFeed() {
        // Implementation for restoration if needed
    }

    // Expose to global scope for content.js
    window.toggleHomeFeed = toggleHomeFeed;
})();
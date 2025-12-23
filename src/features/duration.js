// TubeTuner - Duration Feature
(function() {
    'use strict';

    // Function to toggle video duration
    function toggleDuration(hide) {
        // debug: toggle duration
        settings.durationHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-duration-hidden');
            // added class youtube-duration-hidden
        } else {
            document.body.classList.remove('youtube-duration-hidden');
            // removed class youtube-duration-hidden
        }
    }

    // Expose to global scope for content.js
    window.toggleDuration = toggleDuration;
})();
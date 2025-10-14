// TubeTuner - Progress Bar Feature
(function() {
    'use strict';

    // Function to toggle the progress bar
    function toggleProgressBar(hide) {
        // debug: toggle progress bar
        settings.progressBarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-progress-hidden');
            // added class youtube-progress-hidden
        } else {
            document.body.classList.remove('youtube-progress-hidden');
            // removed class youtube-progress-hidden
        }
    }

    // Expose to global scope for content.js
    window.toggleProgressBar = toggleProgressBar;
})();
// TubeTuner - Hide Description Feature
(function() {
    'use strict';

    // Function to toggle Hide Description
    function toggleHideDescription(hide) {
        // debug: toggle hide description
        settings.hideDescriptionHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-hide-description-hidden');
            // added class youtube-hide-description-hidden
            applyHideDescriptionFixes();
        } else {
            document.body.classList.remove('youtube-hide-description-hidden');
            // removed class youtube-hide-description-hidden
            restoreHideDescription();
        }
    }

    // Function to apply additional fixes for Hide Description hiding
    function applyHideDescriptionFixes() {
        if (!settings.hideDescriptionHidden) return;

        // applying hide description fixes

        let hiddenCount = 0;

        // Hide video description
        const descriptionSelectors = [
            'ytd-video-secondary-info-renderer',
            '#description',
            '#meta-contents',
            'ytd-expandable-video-description-body-renderer',
            '#description-inner',
            '#expand'
        ];

        descriptionSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('hide-description-element', 'true');
                hiddenCount++;
            });
        });

        // marked description elements for hiding: %d
    }

    // Restore Hide Description
    function restoreHideDescription() {
        // restoring description elements

        // Remove hiding markers
        document.querySelectorAll('[hide-description-element="true"]').forEach(element => {
            element.removeAttribute('hide-description-element');
        });

        // description elements restored
    }

    // Expose to global scope for content.js
    window.toggleHideDescription = toggleHideDescription;
    window.applyHideDescriptionFixes = applyHideDescriptionFixes;
    window.restoreHideDescription = restoreHideDescription;
})();
// TubeTuner - Buttons Bar Feature
(function() {
    'use strict';

    // Function to toggle Buttons Bar
    function toggleButtonsBar(hide) {
        // debug: toggle buttons bar
        settings.buttonsBarHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-buttons-bar-hidden');
            // added class youtube-buttons-bar-hidden
            applyButtonsBarFixes();
        } else {
            document.body.classList.remove('youtube-buttons-bar-hidden');
            // removed class youtube-buttons-bar
            restoreButtonsBar();
        }
    }

    // Function to apply additional fixes for Buttons Bar hiding
    function applyButtonsBarFixes() {
        if (!settings.buttonsBarHidden) return;

        // applying buttons bar fixes

        let hiddenCount = 0;

        // Hide specific ytd-menu-renderer in watch metadata
        const buttonsBarSelectors = [
            'ytd-menu-renderer.style-scope.ytd-watch-metadata'
        ];

        buttonsBarSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('buttons-bar-element', 'true');
                hiddenCount++;
            });
        });

        // marked buttons bar elements for hiding: %d
    }

    // Restore Buttons Bar
    function restoreButtonsBar() {
        // restoring buttons bar elements

        // Remove hiding markers
        document.querySelectorAll('[buttons-bar-element="true"]').forEach(element => {
            element.removeAttribute('buttons-bar-element');
        });

        // buttons bar elements restored
    }

    // Expose to global scope for content.js
    window.toggleButtonsBar = toggleButtonsBar;
    window.applyButtonsBarFixes = applyButtonsBarFixes;
    window.restoreButtonsBar = restoreButtonsBar;
})();
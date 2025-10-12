// TubeTuner - Top Header Feature
(function() {
    'use strict';

    // Function to toggle Top Header/Navigation Bar
    function toggleTopHeader(hide) {
        // debug: toggle top header
        settings.topHeaderHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-top-header-hidden');
            document.body.setAttribute('data-top-header-hidden', 'true');
            // added class youtube-top-header-hidden
            applyTopHeaderFixes();
        } else {
            document.body.classList.remove('youtube-top-header-hidden');
            document.body.removeAttribute('data-top-header-hidden');
            // removed class youtube-top-header-hidden
            restoreTopHeader();
        }
    }

    // Function to apply additional fixes for Top Header hiding
    function applyTopHeaderFixes() {
        if (!settings.topHeaderHidden) return;

        // applying top header fixes

        let hiddenCount = 0;

        // Mark the top navigation bar elements
        const headerSelectors = [
            'ytd-masthead#masthead',
            '#masthead-container',
            'header#header.ytd-app',
            'div#masthead'
        ];

        headerSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('top-header-element', 'true');
                hiddenCount++;
            });
        });

        // marked top header elements for hiding: %d
    }

    // Function to restore the top navigation bar
    function restoreTopHeader() {
        // restoring top header

        // Remove the marking attribute
        document.querySelectorAll('[top-header-element="true"]').forEach(element => {
            element.removeAttribute('top-header-element');
        });

        // top header restored
    }

    // Expose to global scope for content.js
    window.toggleTopHeader = toggleTopHeader;
    window.applyTopHeaderFixes = applyTopHeaderFixes;
    window.restoreTopHeader = restoreTopHeader;
})();
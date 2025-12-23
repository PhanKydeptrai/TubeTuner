// TubeTuner - Hide Channel Feature
(function() {
    'use strict';

    // Function to toggle Hide Channel
    function toggleHideChannel(hide) {
        // debug: toggle hide channel
        settings.hideChannelHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-hide-channel-hidden');
            // added class youtube-hide-channel-hidden
            applyHideChannelFixes();
        } else {
            document.body.classList.remove('youtube-hide-channel-hidden');
            // removed class youtube-hide-channel-hidden
            restoreHideChannel();
        }
    }

    // Function to apply additional fixes for Hide Channel hiding
    function applyHideChannelFixes() {
        if (!settings.hideChannelHidden) return;

        // applying hide channel fixes

        let hiddenCount = 0;

        // Hide channel name, avatar, and subscribe button in video pages
        const channelSelectors = [
            'ytd-channel-name',
            '#owner-container',
            '#channel-name',
            'ytd-video-owner-renderer',
            '#upload-info #owner-container',
            '#meta #owner',
            'ytd-video-secondary-info-renderer #owner',
            'ytd-subscribe-button-renderer',
            '#subscribe-button',
            'ytd-button-renderer#subscribe-button',
            'paper-button#subscribe-button',
            'yt-button-shape#subscribe-button'
        ];

        channelSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('hide-channel-element', 'true');
                hiddenCount++;
            });
        });

        // marked channel elements for hiding: %d
    }

    // Restore Hide Channel
    function restoreHideChannel() {
        // restoring channel elements

        // Remove hiding markers
        document.querySelectorAll('[hide-channel-element="true"]').forEach(element => {
            element.removeAttribute('hide-channel-element');
        });

        // channel elements restored
    }

    // Expose to global scope for content.js
    window.toggleHideChannel = toggleHideChannel;
    window.applyHideChannelFixes = applyHideChannelFixes;
    window.restoreHideChannel = restoreHideChannel;
})();
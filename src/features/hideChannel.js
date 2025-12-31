// TubeTuner - Hide Channel Feature

// Function to toggle Hide Channel
export function toggleHideChannel(hide) {
    if (hide) {
        document.body.classList.add('youtube-hide-channel-hidden');
        applyHideChannelFixes();
    } else {
        document.body.classList.remove('youtube-hide-channel-hidden');
        restoreHideChannel();
    }
}

// Function to apply additional fixes for Hide Channel hiding
function applyHideChannelFixes() {
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
}

// Restore Hide Channel
function restoreHideChannel() {
    // Remove hiding markers
    document.querySelectorAll('[hide-channel-element="true"]').forEach(element => {
        element.removeAttribute('hide-channel-element');
    });
}

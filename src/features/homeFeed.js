// TubeTuner - Home Feed Feature

// Function to toggle Home Feed
export function toggleHomeFeed(hide) {
    // debug: toggle home feed
    // settings.homeFeedHidden = hide; // Removed global dependency

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

// TubeTuner - Home Feed Feature

// Function to toggle Home Feed
export function toggleHomeFeed(hide) {
    // debug: toggle home feed
    // settings.homeFeedHidden = hide; // Removed global dependency

    if (hide) {
        document.body.classList.add('youtube-home-feed-hidden');
        document.body.setAttribute('data-home-feed-hidden', 'true');
    } else {
        document.body.classList.remove('youtube-home-feed-hidden');
        document.body.removeAttribute('data-home-feed-hidden');
    }
}

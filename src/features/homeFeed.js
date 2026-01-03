// TubeTuner - Home Feed Feature

// Function to toggle Home Feed
export function toggleHomeFeed(hide) {
    // debug: toggle home feed
    // settings.homeFeedHidden = hide; // Removed global dependency

    if (hide) {
        document.documentElement.classList.add('youtube-home-feed-hidden');
        document.documentElement.setAttribute('data-home-feed-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-home-feed-hidden');
        document.documentElement.removeAttribute('data-home-feed-hidden');
    }
}

export function toggleHomeFeed(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-home-feed-hidden');
        document.documentElement.setAttribute('data-home-feed-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-home-feed-hidden');
        document.documentElement.removeAttribute('data-home-feed-hidden');
    }
}

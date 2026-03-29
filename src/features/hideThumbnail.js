// TubeTuner - Hide Thumbnail Feature

// Function to toggle Hide Thumbnail
export function toggleHideThumbnail(hide) {

    if (hide) {
        document.documentElement.classList.add('youtube-hide-thumbnail-hidden');
        document.documentElement.setAttribute('data-hide-thumbnail-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-hide-thumbnail-hidden');
        document.documentElement.removeAttribute('data-hide-thumbnail-hidden');
    }
}

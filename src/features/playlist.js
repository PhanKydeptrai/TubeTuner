// TubeTuner - Playlist Feature

// Function to toggle Playlist Panel
export function togglePlaylist(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-playlist-hidden');
        document.documentElement.setAttribute('data-playlist-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-playlist-hidden');
        document.documentElement.removeAttribute('data-playlist-hidden');
    }
}

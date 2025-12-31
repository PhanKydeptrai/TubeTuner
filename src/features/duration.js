// TubeTuner - Duration Feature

// Function to toggle video duration
export function toggleDuration(hide) {
    // debug: toggle duration
    // settings.durationHidden = hide; // Removed global dependency

    if (hide) {
        document.body.classList.add('youtube-duration-hidden');
        // added class youtube-duration-hidden
    } else {
        document.body.classList.remove('youtube-duration-hidden');
        // removed class youtube-duration-hidden
    }
}

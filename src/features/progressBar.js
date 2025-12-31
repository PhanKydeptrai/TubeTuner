// TubeTuner - Progress Bar Feature

// Function to toggle the progress bar
export function toggleProgressBar(hide) {
    // debug: toggle progress bar
    // settings.progressBarHidden = hide; // Removed global dependency

    if (hide) {
        document.body.classList.add('youtube-progress-hidden');
        // added class youtube-progress-hidden
    } else {
        document.body.classList.remove('youtube-progress-hidden');
        // removed class youtube-progress-hidden
    }
}

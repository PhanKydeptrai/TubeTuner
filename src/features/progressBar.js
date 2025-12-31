// TubeTuner - Progress Bar Feature

// Function to toggle the progress bar
export function toggleProgressBar(hide) {
    if (hide) {
        document.body.classList.add('youtube-progress-hidden');
    } else {
        document.body.classList.remove('youtube-progress-hidden');
    }
}

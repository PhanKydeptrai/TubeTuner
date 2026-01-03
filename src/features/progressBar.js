// TubeTuner - Progress Bar Feature

// Function to toggle the progress bar
export function toggleProgressBar(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-progress-hidden');
    } else {
        document.documentElement.classList.remove('youtube-progress-hidden');
    }
}

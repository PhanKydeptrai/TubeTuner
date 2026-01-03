// TubeTuner - Duration Feature

// Function to toggle video duration
export function toggleDuration(hide) {

    if (hide) {
        document.documentElement.classList.add('youtube-duration-hidden');
    } else {
        document.documentElement.classList.remove('youtube-duration-hidden');
    }
}

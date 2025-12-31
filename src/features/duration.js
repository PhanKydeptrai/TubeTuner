// TubeTuner - Duration Feature

// Function to toggle video duration
export function toggleDuration(hide) {

    if (hide) {
        document.body.classList.add('youtube-duration-hidden');
    } else {
        document.body.classList.remove('youtube-duration-hidden');
    }
}

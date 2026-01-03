// TubeTuner - Comments Feature

// Function to toggle Comments Section
export function toggleComments(hide) {

    if (hide) {
        document.documentElement.classList.add('youtube-comments-hidden');
        document.documentElement.setAttribute('data-comments-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-comments-hidden');
        document.documentElement.removeAttribute('data-comments-hidden');
    }
}

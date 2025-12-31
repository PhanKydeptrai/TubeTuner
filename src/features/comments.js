// TubeTuner - Comments Feature

// Function to toggle Comments Section
export function toggleComments(hide) {

    if (hide) {
        document.body.classList.add('youtube-comments-hidden');
        document.body.setAttribute('data-comments-hidden', 'true');
    } else {
        document.body.classList.remove('youtube-comments-hidden');
        document.body.removeAttribute('data-comments-hidden');
    }
}

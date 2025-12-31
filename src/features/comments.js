// TubeTuner - Comments Feature

// Function to toggle Comments Section
export function toggleComments(hide) {
    // debug: toggle comments section
    // settings.commentsHidden = hide; // Removed global dependency

    if (hide) {
        document.body.classList.add('youtube-comments-hidden');
        document.body.setAttribute('data-comments-hidden', 'true');
        // added class youtube-comments-hidden
        applyCommentsFixes();
    } else {
        document.body.classList.remove('youtube-comments-hidden');
        document.body.removeAttribute('data-comments-hidden');
        // removed class youtube-comments-hidden
        restoreComments();
    }
}

// Placeholder functions (may be implemented later)
function applyCommentsFixes() {
    // Implementation for additional fixes if needed
}

function restoreComments() {
    // Implementation for restoration if needed
}

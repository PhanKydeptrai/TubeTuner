// TubeTuner - Hide Description Feature

// Function to toggle Hide Description
export function toggleHideDescription(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-hide-description-hidden');
        applyHideDescriptionFixes();
    } else {
        document.documentElement.classList.remove('youtube-hide-description-hidden');
        restoreHideDescription();
    }
}

// Function to apply additional fixes for Hide Description hiding
function applyHideDescriptionFixes() {
    let hiddenCount = 0;

    // Hide video description
    const descriptionSelectors = [
        'ytd-video-secondary-info-renderer',
        '#description',
        '#meta-contents',
        'ytd-expandable-video-description-body-renderer',
        '#description-inner',
        '#expand'
    ];

    descriptionSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('hide-description-element', 'true');
            hiddenCount++;
        });
    });
}

// Restore Hide Description
function restoreHideDescription() {
    // Remove hiding markers
    document.querySelectorAll('[hide-description-element="true"]').forEach(element => {
        element.removeAttribute('hide-description-element');
    });
}

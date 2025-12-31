// TubeTuner - Top Header Feature

// Function to toggle Top Header/Navigation Bar
export function toggleTopHeader(hide) {
    if (hide) {
        document.body.classList.add('youtube-top-header-hidden');
        document.body.setAttribute('data-top-header-hidden', 'true');
        applyTopHeaderFixes();
    } else {
        document.body.classList.remove('youtube-top-header-hidden');
        document.body.removeAttribute('data-top-header-hidden');
        restoreTopHeader();
    }
}

// Function to apply additional fixes for Top Header hiding
function applyTopHeaderFixes() {
    let hiddenCount = 0;

    // Mark the top navigation bar elements
    const headerSelectors = [
        'ytd-masthead#masthead',
        '#masthead-container',
        'header#header.ytd-app',
        'div#masthead'
    ];

    headerSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('top-header-element', 'true');
            hiddenCount++;
        });
    });
}

// Function to restore the top navigation bar
function restoreTopHeader() {
    // Remove the marking attribute
    document.querySelectorAll('[top-header-element="true"]').forEach(element => {
        element.removeAttribute('top-header-element');
    });
}

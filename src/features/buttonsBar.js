export function toggleButtonsBar(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-buttons-bar-hidden');
        applyButtonsBarFixes();
    } else {
        document.documentElement.classList.remove('youtube-buttons-bar-hidden');
        restoreButtonsBar();
    }
}

function applyButtonsBarFixes() {
    let hiddenCount = 0;

    // Hide specific ytd-menu-renderer in watch metadata
    const buttonsBarSelectors = [
        'ytd-menu-renderer.style-scope.ytd-watch-metadata'
    ];

    buttonsBarSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('buttons-bar-element', 'true');
            hiddenCount++;
        });
    });
}

function restoreButtonsBar() {
    document.querySelectorAll('[buttons-bar-element="true"]').forEach(element => {
        element.removeAttribute('buttons-bar-element');
    });
}

// TubeTuner - Notifications Bell Feature

// Function to toggle Notifications Bell
export function toggleNotificationsBell(hide) {
    // debug: toggle notifications bell
    // settings.notificationsBellHidden = hide;

    if (hide) {
        document.body.classList.add('youtube-notifications-bell-hidden');
        document.body.setAttribute('data-notifications-bell-hidden', 'true');
        // added class youtube-notifications-bell-hidden
        applyNotificationsBellFixes();
    } else {
        document.body.classList.remove('youtube-notifications-bell-hidden');
        document.body.removeAttribute('data-notifications-bell-hidden');
        // removed class youtube-notifications-bell-hidden
        restoreNotificationsBell();
    }
}

// Function to apply additional fixes for Notifications Bell hiding
function applyNotificationsBellFixes() {
    // if (!settings.notificationsBellHidden) return;

    // applying notifications bell hiding fixes

    // Mark notifications bell elements for CSS targeting
    const notificationsBellSelectors = [
        'ytd-notification-topbar-button-renderer',
        '#notification-button',
        'button[aria-label*="Notifications"]',
        'button[aria-label*="notifications"]',
        'yt-icon-button[aria-label*="Notifications"]',
        'yt-icon-button[aria-label*="notifications"]'
    ];

    let hiddenCount = 0;
    notificationsBellSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(element => {
            element.setAttribute('notifications-bell-element', 'true');
            hiddenCount++;
        });
    });

    // marked notifications bell elements for hiding: %d
}

// Function to restore notifications bell
function restoreNotificationsBell() {
    // restoring notifications bell

    // Remove marking attributes
    document.querySelectorAll('[notifications-bell-element="true"]').forEach(element => {
        element.removeAttribute('notifications-bell-element');
    });

    // notifications bell restored
}

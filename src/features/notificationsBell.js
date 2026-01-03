// TubeTuner - Notifications Bell Feature

// Function to toggle Notifications Bell
export function toggleNotificationsBell(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-notifications-bell-hidden');
        document.documentElement.setAttribute('data-notifications-bell-hidden', 'true');
        applyNotificationsBellFixes();
    } else {
        document.documentElement.classList.remove('youtube-notifications-bell-hidden');
        document.documentElement.removeAttribute('data-notifications-bell-hidden');
        restoreNotificationsBell();
    }
}

// Function to apply additional fixes for Notifications Bell hiding
function applyNotificationsBellFixes() {
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
}

// Function to restore notifications bell
function restoreNotificationsBell() {
    // Remove marking attributes
    document.querySelectorAll('[notifications-bell-element="true"]').forEach(element => {
        element.removeAttribute('notifications-bell-element');
    });
}

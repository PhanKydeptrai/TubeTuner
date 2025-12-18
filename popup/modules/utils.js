// Utility Functions Module
// Common utility functions

function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.ext-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `ext-notification ext-notification-${type}`;
    notification.textContent = message;

    const container = document.querySelector('.ext-container');
    if (container) {
        container.appendChild(notification);
        setTimeout(() => {
            if (notification.parentNode) notification.remove();
        }, 3000);
    }
}

function verifyToggleStates() {
    const keys = Array.from(AppState.switches.keys());
    chrome.storage.sync.get(keys, function(result) {
        const mismatches = [];
        keys.forEach(key => {
            const switchEl = AppState.switches.get(key);
            if (switchEl && result[key] !== switchEl.checked) {
                mismatches.push(`${key}: stored=${result[key]}, UI=${switchEl.checked}`);
            }
        });
        if (mismatches.length > 0) {
            console.warn('⚠️ Toggle state mismatches:', mismatches);
        }
    });
}

window.verifyToggleStates = verifyToggleStates;

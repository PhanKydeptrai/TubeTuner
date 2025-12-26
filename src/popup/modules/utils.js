// Utility Functions Module
// Common utility functions

export function showNotification(message, type = 'info') {
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

export function showConfirmDialog(message, onConfirm, onCancel) {
    const existingDialog = document.querySelector('.ext-confirm-dialog-overlay');
    if (existingDialog) existingDialog.remove();

    const overlay = document.createElement('div');
    overlay.className = 'ext-confirm-dialog-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'ext-confirm-dialog';
    
    dialog.innerHTML = `
        <div class="ext-confirm-dialog-content">
            <p class="ext-confirm-dialog-message">${message}</p>
            <div class="ext-confirm-dialog-buttons">
                <button class="ext-confirm-btn-cancel">${I18nModule?.t?.('cancel') || 'Cancel'}</button>
                <button class="ext-confirm-btn-confirm">${I18nModule?.t?.('confirm') || 'Confirm'}</button>
            </div>
        </div>
    `;

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    const cancelBtn = dialog.querySelector('.ext-confirm-btn-cancel');
    const confirmBtn = dialog.querySelector('.ext-confirm-btn-confirm');

    const cleanup = () => {
        if (overlay.parentNode) overlay.remove();
    };

    cancelBtn.addEventListener('click', () => {
        cleanup();
        if (onCancel) onCancel();
    });

    confirmBtn.addEventListener('click', () => {
        cleanup();
        if (onConfirm) onConfirm();
    });

    // Close on escape key
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            cleanup();
            document.removeEventListener('keydown', handleEscape);
            if (onCancel) onCancel();
        }
    };
    document.addEventListener('keydown', handleEscape);

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            cleanup();
            document.removeEventListener('keydown', handleEscape);
            if (onCancel) onCancel();
        }
    });

    // Focus confirm button for better UX
    confirmBtn.focus();
}

export function verifyToggleStates() {
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

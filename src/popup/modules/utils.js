// Utility Functions Module
// Common utility functions

import { I18nModule } from './i18n.js';
import { AppState } from './state.js';

export function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.ext-notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `ext-notification ext-notification-${type}`;
    notification.textContent = message;

    const container = document.querySelector('.ext-container') || document.body;
    container.appendChild(notification);
    setTimeout(() => {
        if (notification.parentNode) notification.remove();
    }, 3000);
}

export function showConfirmDialog(message, onConfirm, onCancel) {
    const existingDialog = document.querySelector('.ext-confirm-dialog-overlay');
    if (existingDialog) existingDialog.remove();

    const overlay = document.createElement('div');
    overlay.className = 'ext-confirm-dialog-overlay';

    const dialog = document.createElement('div');
    dialog.className = 'ext-confirm-dialog';
    const content = document.createElement('div');
    content.className = 'ext-confirm-dialog-content';
    const messageP = document.createElement('p');
    messageP.className = 'ext-confirm-dialog-message';
    messageP.textContent = message;
    const buttonsDiv = document.createElement('div');
    buttonsDiv.className = 'ext-confirm-dialog-buttons';
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'ext-confirm-btn-cancel';
    cancelBtn.textContent = I18nModule?.t?.('cancel') || 'Cancel';
    const confirmBtn = document.createElement('button');
    confirmBtn.className = 'ext-confirm-btn-confirm';
    confirmBtn.textContent = I18nModule?.t?.('confirm') || 'Confirm';
    buttonsDiv.appendChild(cancelBtn);
    buttonsDiv.appendChild(confirmBtn);
    content.appendChild(messageP);
    content.appendChild(buttonsDiv);
    dialog.appendChild(content);

    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

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
    chrome.storage.local.get(keys, function (result) {
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

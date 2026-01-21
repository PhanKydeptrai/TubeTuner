// TubeTuner - Livechat Feature

// Function to toggle Livechat
export function toggleLivechat(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-livechat-hidden');
        applyLivechatFixes(true);
    } else {
        document.documentElement.classList.remove('youtube-livechat-hidden');
        restoreLivechat();
    }
}

// Function to restore Livechat when the feature is turned off
function restoreLivechat() {
    // Remove livechat-hidden attribute from elements
    document.querySelectorAll('[livechat-hidden]').forEach(element => {
        element.removeAttribute('livechat-hidden');
    });

    // Disconnect observer if exists
    if (window.livechatObserver) {
        window.livechatObserver.disconnect();
        delete window.livechatObserver;
    }
}

// Function to apply fixes for Livechat hiding
function applyLivechatFixes(isHidden) {
    if (!isHidden) return;

    const markLivechatElements = () => {
        // Mark the main livechat container
        const livechatContainer = document.querySelector('#chat-container');
        if (livechatContainer) {
            livechatContainer.setAttribute('livechat-hidden', 'true');
        }

        // Also mark the iframe as fallback
        const chatFrame = document.querySelector('#chatframe');
        if (chatFrame) {
            chatFrame.setAttribute('livechat-hidden', 'true');
        }
    };

    // Run immediately
    markLivechatElements();

    // Create MutationObserver to monitor for new livechat elements
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.id === 'chat-container') {
                        shouldUpdate = true;
                    }
                });
            }
        });

        if (shouldUpdate) {
            markLivechatElements();
        }
    });

    // Configure and start observer
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Store observer for cleanup
    window.livechatObserver = observer;
}
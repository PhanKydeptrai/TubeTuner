// TubeTuner - End Screen Cards Feature

// Function to toggle End Screen Cards/Annotations
export function toggleEndScreenCards(hide) {
    if (hide) {
        document.body.classList.add('youtube-end-screen-cards-hidden');
        document.body.setAttribute('data-end-screen-cards-hidden', 'true');
        applyEndScreenCardsFixes();
    } else {
        document.body.classList.remove('youtube-end-screen-cards-hidden');
        document.body.removeAttribute('data-end-screen-cards-hidden');
        restoreEndScreenCards();
    }
}

// Function to apply additional fixes for End Screen Cards hiding
function applyEndScreenCardsFixes() {

    const markEndScreenElements = () => {
        let hiddenCount = 0;

        // 1. END SCREEN ELEMENTS - Mark YouTube end screen elements
        const endScreenSelectors = [
            '.ytp-ce-element',
            '.ytp-ce-video',
            '.ytp-ce-playlist',
            '.ytp-ce-channel',
            '.ytp-ce-website',
            '.ytp-endscreen-content',
            '.ytp-ce-covering-overlay',
            '.ytp-ce-expanding-overlay'
        ];

        endScreenSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.hasAttribute('end-screen-element')) {
                    element.setAttribute('end-screen-element', 'true');
                    hiddenCount++;
                }
            });
        });

        // 2. CARD ELEMENTS - Mark YouTube card and annotation elements
        const cardSelectors = [
            '.ytp-cards-teaser',
            '.ytp-cards-button',
            '.iv-card',
            '.annotation',
            '.ytp-cards-button-icon',
            '.ytp-cards-teaser-box'
        ];

        cardSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.hasAttribute('card-element')) {
                    element.setAttribute('card-element', 'true');
                    hiddenCount++;
                }
            });
        });
    };

    // Run immediately and set up MutationObserver to monitor DOM changes
    markEndScreenElements();

    // Set up observer to catch dynamically added end screen elements
    const endScreenObserver = new MutationObserver((mutations) => {
        let shouldReapply = false;
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if added node contains end screen elements
                        if (node.matches && (
                            node.matches('.ytp-ce-element, .ytp-ce-video, .ytp-ce-playlist, .ytp-ce-channel, .ytp-ce-website, .ytp-endscreen-content, .ytp-cards-teaser, .ytp-cards-button, .iv-card, .annotation') ||
                            node.querySelector('.ytp-ce-element, .ytp-ce-video, .ytp-ce-playlist, .ytp-ce-channel, .ytp-ce-website, .ytp-endscreen-content, .ytp-cards-teaser, .ytp-cards-button, .iv-card, .annotation')
                        )) {
                            shouldReapply = true;
                        }
                    }
                });
            }
        });

        if (shouldReapply) {
            setTimeout(markEndScreenElements, 100);
        }
    });

    endScreenObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Restore End Screen Cards
function restoreEndScreenCards() {
    // Remove all custom attributes
    document.querySelectorAll('[end-screen-element]').forEach(element => {
        element.removeAttribute('end-screen-element');
    });

    document.querySelectorAll('[card-element]').forEach(element => {
        element.removeAttribute('card-element');
    });
}

// TubeTuner - Shorts Feature

// Function to toggle Shorts
export function toggleShorts(hide) {
    if (hide) {
        document.body.classList.add('youtube-shorts-hidden');
        applyShortsFixes(true);
    } else {
        document.body.classList.remove('youtube-shorts-hidden');
        restoreShorts();
    }
}

// Function to restore Shorts when the feature is turned off
function restoreShorts() {
    // restoring Shorts visibility

    // Remove all JavaScript-added attributes
    const attributesToRemove = [
        'shorts-hidden',
        'shorts-section',
        'is-short',
        'shorts-video',
        'shorts-link',
        'shorts-element',
        'shorts-component',
        'shorts-tab'
    ];

    attributesToRemove.forEach(attr => {
        document.querySelectorAll(`[${attr}]`).forEach(element => {
            element.removeAttribute(attr);
        });
    });

    // Shorts visibility restored
}

// Function to apply additional fixes for Shorts hiding
function applyShortsFixes(isHidden) {
    if (!isHidden) return;

    const markShortsElements = () => {
        let hiddenCount = 0;

        // 1. SIDEBAR - Mark guide entries containing Shorts (let CSS handle hiding)
        document.querySelectorAll('ytd-guide-entry-renderer, ytd-mini-guide-entry-renderer').forEach(entry => {
            const link = entry.querySelector('a[href="/shorts"], a[href*="/shorts"], a[title*="Shorts"], a[title*="shorts"]');
            if (link) {
                entry.setAttribute('shorts-hidden', 'true');
                hiddenCount++;
            }
        });

        // 2. SECTIONS - Mark sections with "Shorts" in title (let CSS handle hiding)
        document.querySelectorAll('ytd-rich-section-renderer, ytd-shelf-renderer').forEach(section => {
            const titleSelectors = [
                '#title-text',
                '.ytd-shelf-renderer #title-text',
                'h2',
                '.title',
                '[role="heading"]'
            ];

            for (const selector of titleSelectors) {
                const headerText = section.querySelector(selector);
                if (headerText && headerText.textContent) {
                    const text = headerText.textContent.toLowerCase();
                    if (text.includes('shorts') || text.includes('short')) {
                        section.setAttribute('shorts-section', 'true');
                        hiddenCount++;
                        break;
                    }
                }
            }
        });

        // 3. INDIVIDUAL VIDEOS - Mark all Shorts videos (let CSS handle hiding)
        document.querySelectorAll('a[href*="/shorts/"]').forEach(link => {
            // Mark the link itself
            link.setAttribute('shorts-link', 'true');

            // Find and mark all possible containers
            const containerSelectors = [
                'ytd-grid-video-renderer',
                'ytd-compact-video-renderer',
                'ytd-video-renderer',
                'ytd-rich-item-renderer',
                'ytd-rich-grid-media',
                'ytd-thumbnail',
                'ytd-playlist-panel-video-renderer'
            ];

            containerSelectors.forEach(selector => {
                const container = link.closest(selector);
                if (container) {
                    container.setAttribute('is-short', 'true');
                    container.setAttribute('shorts-video', 'true');
                    hiddenCount++;
                }
            });
        });

        // 4. ATTRIBUTE-BASED HIDING - Only specific YouTube Shorts elements
        const specificShortsSelectors = [
            'ytd-guide-entry-renderer[aria-label*="Shorts"]',
            'ytd-mini-guide-entry-renderer[aria-label*="Shorts"]',
            'ytd-guide-entry-renderer[title*="Shorts"]',
            'ytd-mini-guide-entry-renderer[title*="Shorts"]',
            'tp-yt-paper-tab[aria-label*="Shorts"]',
            'yt-tab-shape[aria-label*="Shorts"]'
        ];

        specificShortsSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                // Only mark, don't directly hide - let CSS handle it
                element.setAttribute('shorts-element', 'true');
                hiddenCount++;
            });
        });

        // 5. CHANNEL TABS - Mark Shorts tabs (let CSS handle hiding)
        document.querySelectorAll('tp-yt-paper-tab[tab-id="shorts"], yt-tab-shape').forEach(tab => {
            const tabTitle = tab.getAttribute('tab-title') || tab.textContent || '';
            if (tabTitle.toLowerCase().includes('shorts') || tabTitle.toLowerCase().includes('short')) {
                tab.setAttribute('shorts-tab', 'true');
                hiddenCount++;
            }
        });

        // 6. SPECIFIC SHORTS COMPONENTS - Only YouTube Shorts specific elements
        const shortsComponentSelectors = [
            'ytd-shorts',
            'ytd-shorts-shelf-renderer',
            'ytd-reel-shelf-renderer',
            'ytd-shorts-compact-video-renderer',
            'ytd-shorts-video-renderer',
            'ytd-reel-item-renderer',
            'ytm-shorts-lockup-view-model',
            'ytm-reel-item-renderer',
            'ytm-shorts-shelf-renderer'
        ];

        shortsComponentSelectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.setAttribute('shorts-component', 'true');
                hiddenCount++;
            });
        });

        // total hidden count available for diagnostics if needed
    };

    // Run immediately and set up MutationObserver to monitor DOM changes
    markShortsElements();

    // Create an efficient observer to monitor DOM changes
    let observerTimeout;
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;

        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length > 0) {
                // Check if any added nodes contain Shorts-related content
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        const element = node;
                        if (element.querySelector &&
                            (element.querySelector('a[href*="/shorts/"]') ||
                                element.textContent?.toLowerCase().includes('shorts'))) {
                            shouldUpdate = true;
                        }
                    }
                });
            }
        });

        if (shouldUpdate) {
            // Debounce the updates to avoid excessive processing
            clearTimeout(observerTimeout);
            observerTimeout = setTimeout(() => {
                markShortsElements();
            }, 500);
        }
    });

    // Configure and start observer
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Store observer for cleanup if needed
    window.shortsObserver = observer;
}

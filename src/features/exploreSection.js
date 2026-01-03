// TubeTuner - Explore Section Feature

// Module scoped observer
let exploreSectionObserver = null;

// Function to toggle Explore Section
export function toggleExploreSection(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-explore-section-hidden');
        document.documentElement.setAttribute('data-explore-section-hidden', 'true');
        applyExploreSectionFixes();
    } else {
        document.documentElement.classList.remove('youtube-explore-section-hidden');
        document.documentElement.removeAttribute('data-explore-section-hidden');
        restoreExploreSection();
    }
}

// Function to apply additional fixes for Explore Section hiding
function applyExploreSectionFixes() {

    const hideExploreSections = () => {
        // Find and hide the Explore section renderer
        const exploreSections = document.querySelectorAll('ytd-guide-section-renderer');

        exploreSections.forEach(section => {
            const titleElement = section.querySelector('yt-formatted-string#guide-section-title');
            if (titleElement && (titleElement.textContent.trim() === 'Explore' || titleElement.textContent.trim() === 'Khám phá')) {
                section.setAttribute('hidden', 'true');
            }
        });
    };

    hideExploreSections();

    if (!exploreSectionObserver) {
        exploreSectionObserver = new MutationObserver((mutations) => {
            let shouldReapply = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if added node is or contains guide section renderers
                            if (node.matches && (
                                node.matches('ytd-guide-section-renderer') ||
                                node.querySelector('ytd-guide-section-renderer')
                            )) {
                                shouldReapply = true;
                            }
                        }
                    });
                }
            });

            if (shouldReapply) {
                setTimeout(hideExploreSections, 100);
            }
        });

        exploreSectionObserver.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
}

// Function to restore Explore Section
function restoreExploreSection() {
    // Remove hidden attributes from Explore section renderers
    document.querySelectorAll('ytd-guide-section-renderer[hidden="true"]').forEach(element => {
        element.removeAttribute('hidden');
    });

    if (exploreSectionObserver) {
        exploreSectionObserver.disconnect();
        exploreSectionObserver = null;
    }
}

// TubeTuner - Explore Section Feature
(function() {
    'use strict';

    // Function to toggle Explore Section
    function toggleExploreSection(hide) {
        // debug: toggle explore section
        settings.exploreSectionHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-explore-section-hidden');
            document.body.setAttribute('data-explore-section-hidden', 'true');
            // added class youtube-explore-section-hidden
            applyExploreSectionFixes();
        } else {
            document.body.classList.remove('youtube-explore-section-hidden');
            document.body.removeAttribute('data-explore-section-hidden');
            // removed class youtube-explore-section-hidden
            restoreExploreSection();
        }
    }

    // Function to apply additional fixes for Explore Section hiding
    function applyExploreSectionFixes() {
        if (!settings.exploreSectionHidden) return;

        // applying Explore Section hiding

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

        // Run immediately
        hideExploreSections();

        // Set up MutationObserver to monitor DOM changes for new guide sections
        if (!window.exploreSectionObserver) {
            window.exploreSectionObserver = new MutationObserver((mutations) => {
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
                    // new guide sections detected, reapplying fixes
                    setTimeout(hideExploreSections, 100);
                }
            });

            window.exploreSectionObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }

    // Function to restore Explore Section
    function restoreExploreSection() {
        // restoring Explore Section

        // Remove hidden attributes from Explore section renderers
        document.querySelectorAll('ytd-guide-section-renderer[hidden="true"]').forEach(element => {
            element.removeAttribute('hidden');
        });

        // Disconnect observer if it exists
        if (window.exploreSectionObserver) {
            window.exploreSectionObserver.disconnect();
            window.exploreSectionObserver = null;
        }

        // Explore Section restored
    }

    // Expose to global scope for content.js
    window.toggleExploreSection = toggleExploreSection;
    window.applyExploreSectionFixes = applyExploreSectionFixes;
    window.restoreExploreSection = restoreExploreSection;
})();
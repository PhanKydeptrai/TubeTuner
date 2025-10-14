// TubeTuner - More from YouTube Feature
(function() {
    'use strict';

    // Function to toggle More from YouTube Section
    function toggleMoreFromYouTube(hide) {
        // debug: toggle more from YouTube
        settings.moreFromYouTubeHidden = hide;

        if (hide) {
            document.body.classList.add('youtube-more-from-youtube-hidden');
            // added class youtube-more-from-youtube-hidden
            applyMoreFromYouTubeFixes();
        } else {
            document.body.classList.remove('youtube-more-from-youtube-hidden');
            // removed class youtube-more-from-youtube-hidden
            restoreMoreFromYouTube();
        }
    }

    // Function to apply additional fixes for More from YouTube hiding
    function applyMoreFromYouTubeFixes() {
        if (!settings.moreFromYouTubeHidden) return;

        console.log('[TubeTuner] Applying More from YouTube hiding fixes');

        const hideMoreFromYouTubeSection = () => {
            let hiddenCount = 0;

            // Target the specific ytd-guide-section-renderer elements in sidebar
            const guideSections = document.querySelectorAll('ytd-guide-section-renderer.style-scope.ytd-guide-renderer[modern-typography][guide-persistent-and-visible]');

            console.log('[TubeTuner] Found', guideSections.length, 'guide section renderers');

            // Also check individual guide entries that might contain "More from YouTube"
            const guideEntries = document.querySelectorAll('ytd-guide-entry-renderer');
            console.log('[TubeTuner] Found', guideEntries.length, 'guide entry renderers');

            guideEntries.forEach((entry, index) => {
                if (entry.classList.contains('youtube-more-from-hidden') || entry.hasAttribute('data-more-from-processed')) {
                    return;
                }

                const entryText = entry.textContent.toLowerCase();
                console.log('[TubeTuner] Guide entry', index + 1, 'text:', entryText);

                if (entryText.includes('more from youtube') || entryText.includes('thêm từ youtube')) {
                    console.log('[TubeTuner] Found More from YouTube in guide entry, hiding it');
                    entry.classList.add('youtube-more-from-hidden');
                    entry.setAttribute('data-more-from-processed', 'true');
                    hiddenCount++;
                }
            });

            guideSections.forEach((section, index) => {
                // Skip if already processed
                if (section.classList.contains('youtube-more-from-hidden') || section.hasAttribute('data-more-from-processed')) {
                    return;
                }

                // Mark as processed to avoid reprocessing
                section.setAttribute('data-more-from-processed', 'true');

                // Get the text content of the section
                const sectionText = section.textContent.toLowerCase();
                console.log('[TubeTuner] Guide section', index + 1, 'text:', sectionText.substring(0, 100) + '...');

                // Check for "More from YouTube" patterns - more specific matching
                const isMoreFromYouTubeSection = (
                    sectionText.includes('more from youtube') ||
                    sectionText.includes('thêm từ youtube')
                );

                if (isMoreFromYouTubeSection) {
                    console.log('[TubeTuner] Found More from YouTube section, hiding it');
                    section.classList.add('youtube-more-from-hidden');
                    hiddenCount++;
                }
            });

            // Also check for any other elements that might contain "More from YouTube"
            const allElements = document.querySelectorAll('ytd-shelf-renderer, ytd-horizontal-card-list-renderer, ytd-rich-shelf-renderer, ytd-rich-grid-renderer, ytd-expanded-shelf-contents-renderer');

            console.log('[TubeTuner] Found', allElements.length, 'additional elements to check');

            allElements.forEach((element, index) => {
                if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) {
                    return;
                }

                element.setAttribute('data-more-from-processed', 'true');
                const elementText = element.textContent.toLowerCase();

                console.log('[TubeTuner] Additional element', index + 1, 'text:', elementText.substring(0, 100) + '...');

                if (elementText.includes('more from youtube') || elementText.includes('thêm từ youtube')) {
                    console.log('[TubeTuner] Found More from YouTube in additional element, hiding it');
                    element.classList.add('youtube-more-from-hidden');
                    hiddenCount++;
                }
            });

            // Search for elements that might be "More from YouTube" sections by their structure
            // Look for sections that contain links or buttons related to YouTube features
            const potentialSections = document.querySelectorAll('ytd-guide-section-renderer, ytd-rich-shelf-renderer, ytd-shelf-renderer, [class*="shelf"], [class*="section"]');
            console.log('[TubeTuner Debug] Found', potentialSections.length, 'potential sections to analyze');

            potentialSections.forEach((section, index) => {
                if (section.classList.contains('youtube-more-from-hidden') || section.hasAttribute('data-more-from-processed')) {
                    return;
                }

                // Check if this section contains YouTube-related links or has specific attributes
                const links = section.querySelectorAll('a[href*="/"], yt-formatted-string, #title-text');
                let hasYouTubeContent = false;
                let sectionTitle = '';

                links.forEach(link => {
                    const linkText = link.textContent.toLowerCase();
                    const href = link.getAttribute('href') || '';

                    if (linkText.includes('youtube') || href.includes('/youtube') || href.includes('youtube.com')) {
                        hasYouTubeContent = true;
                        sectionTitle = linkText;
                    }
                });

                // Also check the section's own text content
                const sectionText = section.textContent.toLowerCase();
                if (sectionText.includes('more from youtube') || sectionText.includes('thêm từ youtube')) {
                    hasYouTubeContent = true;
                    sectionTitle = sectionText.split('more from youtube')[0].trim() || sectionText.split('thêm từ youtube')[0].trim();
                }

                if (hasYouTubeContent && (sectionTitle.includes('more from') || sectionTitle.includes('thêm từ'))) {
                    console.log('[TubeTuner] Found potential More from YouTube section:', sectionTitle);
                    section.classList.add('youtube-more-from-hidden');
                    section.setAttribute('data-more-from-processed', 'true');
                    hiddenCount++;
                }
            });

            // Additional broad search for any element containing "More from YouTube"
            if (hiddenCount === 0) {
                console.log('[TubeTuner] No elements hidden yet, doing broad search...');
                const allTextElements = document.querySelectorAll('*');
                let broadHiddenCount = 0;

                for (let i = 0; i < allTextElements.length && broadHiddenCount < 10; i++) {
                    const element = allTextElements[i];
                    if (element.children.length > 0) continue; // Skip elements with children
                    if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) continue;

                    const text = element.textContent.toLowerCase();
                    if ((text.includes('more from youtube') || text.includes('thêm từ youtube')) && text.length < 200) {
                        console.log('[TubeTuner] Broad search found:', text, 'in element:', element.tagName, element.className);

                        // Find parent container to hide
                        let parentToHide = element;
                        for (let depth = 0; depth < 5 && parentToHide; depth++) {
                            if (parentToHide.offsetHeight > 50 && parentToHide.offsetWidth > 100) {
                                parentToHide.classList.add('youtube-more-from-hidden');
                                parentToHide.setAttribute('data-more-from-processed', 'true');
                                broadHiddenCount++;
                                console.log('[TubeTuner] Hidden parent element at depth', depth);
                                break;
                            }
                            parentToHide = parentToHide.parentElement;
                        }
                    }
                }
                console.log('[TubeTuner] Broad search hidden', broadHiddenCount, 'additional elements');
            }

            // Simple and direct search for any element containing "More from YouTube"
            const allPageElements = document.querySelectorAll('*');
            let simpleHiddenCount = 0;

            for (let i = 0; i < allPageElements.length && simpleHiddenCount < 5; i++) {
                const element = allPageElements[i];
                if (element.classList.contains('youtube-more-from-hidden') || element.hasAttribute('data-more-from-processed')) {
                    continue;
                }

                const text = element.textContent.toLowerCase();

                // Direct match for "More from YouTube" or "Thêm từ YouTube"
                if ((text.includes('more from youtube') || text.includes('thêm từ youtube')) && text.length < 300) {
                    console.log('[TubeTuner] Simple search found element with text:', text.substring(0, 150) + '...');

                    // Try to find a suitable parent to hide
                    let targetElement = element;

                    // Look for a parent that seems like a section or card
                    for (let depth = 0; depth < 8 && targetElement; depth++) {
                        const tagName = targetElement.tagName.toLowerCase();
                        const className = targetElement.className.toLowerCase();

                        // Good candidates to hide: sections, shelves, cards, etc.
                        if (tagName === 'ytd-rich-shelf-renderer' ||
                            tagName === 'ytd-shelf-renderer' ||
                            tagName === 'ytd-guide-section-renderer' ||
                            tagName === 'ytd-guide-entry-renderer' ||
                            className.includes('shelf') ||
                            className.includes('section') ||
                            (targetElement.offsetHeight > 100 && targetElement.offsetWidth > 200)) {

                            console.log('[TubeTuner] Hiding element at depth', depth, ':', tagName, className);
                            targetElement.classList.add('youtube-more-from-hidden');
                            targetElement.setAttribute('data-more-from-processed', 'true');
                            simpleHiddenCount++;
                            break;
                        }

                        targetElement = targetElement.parentElement;
                    }
                }
            }

            console.log('[TubeTuner] Simple search hidden', simpleHiddenCount, 'additional elements');
        };

        // Run immediately
        hideMoreFromYouTubeSection();

        // Run again after a short delay to catch dynamically loaded content
        setTimeout(hideMoreFromYouTubeSection, 1000);
        setTimeout(hideMoreFromYouTubeSection, 3000);

        // Set up observer to catch new elements
        if (!window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver = new MutationObserver((mutations) => {
                if (settings.moreFromYouTubeHidden) {
                    // Check if any significant DOM changes occurred
                    let hasSignificantChanges = false;
                    mutations.forEach(mutation => {
                        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                            hasSignificantChanges = true;
                        }
                    });

                    if (hasSignificantChanges) {
                        console.log('[TubeTuner] Significant DOM changes detected, re-checking for More from YouTube');
                        clearTimeout(window.moreFromYouTubeTimeout);
                        window.moreFromYouTubeTimeout = setTimeout(hideMoreFromYouTubeSection, 500);
                    }
                }
            });

            window.moreFromYouTubeObserver.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: false
            });
        }

        // More from YouTube hiding applied
    }

    // Restore More from YouTube
    function restoreMoreFromYouTube() {
        // restoring more from YouTube elements

        // Remove hiding class from all elements
        document.querySelectorAll('.youtube-more-from-hidden').forEach(element => {
            element.classList.remove('youtube-more-from-hidden');
        });

        // Remove processed markers
        document.querySelectorAll('[data-more-from-processed]').forEach(element => {
            element.removeAttribute('data-more-from-processed');
        });

        // Disconnect observer if it exists
        if (window.moreFromYouTubeObserver) {
            window.moreFromYouTubeObserver.disconnect();
            window.moreFromYouTubeObserver = null;
        }

        // Clear timeout if it exists
        if (window.moreFromYouTubeTimeout) {
            clearTimeout(window.moreFromYouTubeTimeout);
            window.moreFromYouTubeTimeout = null;
        }

        // more from YouTube elements restored
    }

    // Expose to global scope for content.js
    window.toggleMoreFromYouTube = toggleMoreFromYouTube;
    window.applyMoreFromYouTubeFixes = applyMoreFromYouTubeFixes;
    window.restoreMoreFromYouTube = restoreMoreFromYouTube;
})();
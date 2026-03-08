// TubeTuner - Grayscale Feature

// Function to toggle Grayscale (black & white) mode
export function toggleGrayscale(enabled) {

    const styleId = 'tubetuner-grayscale-style';

    if (enabled) {
        document.documentElement.classList.add('youtube-grayscale-enabled');

        // Inject style to apply grayscale only to specific elements without affecting layout
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                html {
                    -webkit-filter: grayscale(100%) !important;
                    filter: grayscale(100%) !important;
                }
            `;
            document.head.appendChild(style);
        }
    } else {
        document.documentElement.classList.remove('youtube-grayscale-enabled');

        const existing = document.getElementById(styleId);
        if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
    }
}

// TubeTuner - Hide AI Summary Feature

// Function to toggle AI Summary (ytd-expandable-metadata-renderer)
export function toggleAiSummary(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-ai-summary-hidden');
    } else {
        document.documentElement.classList.remove('youtube-ai-summary-hidden');
    }
}

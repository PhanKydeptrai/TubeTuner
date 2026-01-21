// TubeTuner - Recommendation Feature

// Function to toggle Recommendation
export function toggleRecommendation(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-recommendation-hidden');
        document.documentElement.setAttribute('data-recommendation-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-recommendation-hidden');
        document.documentElement.removeAttribute('data-recommendation-hidden');
    }
}

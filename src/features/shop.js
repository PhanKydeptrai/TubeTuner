// TubeTuner - Shop Feature

// Function to toggle Shop
export function toggleShop(hide) {
    if (hide) {
        document.documentElement.classList.add('youtube-shop-hidden');
    } else {
        document.documentElement.classList.remove('youtube-shop-hidden');
    }
}

// TubeTuner - Shop Feature

// Function to toggle Shop
export function toggleShop(hide) {
    if (hide) {
        document.body.classList.add('youtube-shop-hidden');
    } else {
        document.body.classList.remove('youtube-shop-hidden');
    }
}

// TubeTuner - Shop Feature

// Function to toggle Shop
export function toggleShop(hide) {
    // debug: toggle shop
    // settings.shopHidden = hide;

    if (hide) {
        document.body.classList.add('youtube-shop-hidden');
        // added class youtube-shop-hidden
    } else {
        document.body.classList.remove('youtube-shop-hidden');
        // removed class youtube-shop-hidden
    }
}

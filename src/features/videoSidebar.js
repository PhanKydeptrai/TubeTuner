// TubeTuner - Video Sidebar Feature

// Function to toggle Video Sidebar
export function toggleVideoSidebar(hide) {
    // debug: toggle video sidebar
    // settings.videoSidebarHidden = hide;

    if (hide) {
        document.body.classList.add('youtube-video-sidebar-hidden');
        document.body.setAttribute('data-video-sidebar-hidden', 'true');
        // added class youtube-video-sidebar-hidden
        applyVideoSidebarFixes();
    } else {
        document.body.classList.remove('youtube-video-sidebar-hidden');
        document.body.removeAttribute('data-video-sidebar-hidden');
        // removed class youtube-video-sidebar-hidden
        restoreVideoSidebar();
    }
}

// Placeholder functions (may be implemented later)
function applyVideoSidebarFixes() {
    // Implementation for additional fixes if needed
}

function restoreVideoSidebar() {
    // Implementation for restoration if needed
}

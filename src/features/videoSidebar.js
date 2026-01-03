// TubeTuner - Video Sidebar Feature

// Function to toggle Video Sidebar
export function toggleVideoSidebar(hide) {
    // debug: toggle video sidebar
    // settings.videoSidebarHidden = hide;

    if (hide) {
        document.documentElement.classList.add('youtube-video-sidebar-hidden');
        document.documentElement.setAttribute('data-video-sidebar-hidden', 'true');
    } else {
        document.documentElement.classList.remove('youtube-video-sidebar-hidden');
        document.documentElement.removeAttribute('data-video-sidebar-hidden');
    }
}

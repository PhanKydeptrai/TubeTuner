// TubeTuner - Video Sidebar Feature

// Function to toggle Video Sidebar
export function toggleVideoSidebar(hide) {
    // debug: toggle video sidebar
    // settings.videoSidebarHidden = hide;

    if (hide) {
        document.body.classList.add('youtube-video-sidebar-hidden');
        document.body.setAttribute('data-video-sidebar-hidden', 'true');
    } else {
        document.body.classList.remove('youtube-video-sidebar-hidden');
        document.body.removeAttribute('data-video-sidebar-hidden');
    }
}

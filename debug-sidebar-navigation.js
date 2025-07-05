// Debug script để kiểm tra tại sao sidebar navigation bị ẩn
console.log('🔍 Debugging Sidebar Navigation Visibility...');

function debugSidebarNavigation() {
    console.log('\n=== SIDEBAR NAVIGATION DEBUG ===');
    
    // Check if home feed hiding is active
    const isHomeFeedHidden = document.body.classList.contains('youtube-home-feed-hidden');
    console.log('🏠 Home Feed Hidden:', isHomeFeedHidden);
    
    // Find all possible sidebar navigation elements
    const sectionsContainer = document.querySelector('div#sections.style-scope.ytd-guide-renderer');
    const navigationSection = document.querySelector('div#sections.style-scope.ytd-guide-renderer > ytd-guide-section-renderer.style-scope.ytd-guide-renderer[modern-typography][guide-persistent-and-visible]');
    const alternativeNavigationSection = document.querySelector('div#sections.style-scope.ytd-guide-renderer > ytd-guide-section-renderer.style-scope.ytd-guide-renderer');
    const guideRenderer = document.querySelector('ytd-guide-renderer');
    const guide = document.querySelector('#guide');
    
    console.log('\n📍 ELEMENT EXISTENCE:');
    console.log('   #guide:', !!guide);
    console.log('   ytd-guide-renderer:', !!guideRenderer);
    console.log('   div#sections:', !!sectionsContainer);
    console.log('   navigation section (with attributes):', !!navigationSection);
    console.log('   navigation section (alternative):', !!alternativeNavigationSection);
    
    // Check computed styles for each element
    if (guide) {
        const guideStyle = window.getComputedStyle(guide);
        console.log('\n🎨 #guide STYLES:');
        console.log('   display:', guideStyle.display);
        console.log('   visibility:', guideStyle.visibility);
        console.log('   opacity:', guideStyle.opacity);
        console.log('   width:', guideStyle.width);
        console.log('   height:', guideStyle.height);
    }
    
    if (guideRenderer) {
        const rendererStyle = window.getComputedStyle(guideRenderer);
        console.log('\n🎨 ytd-guide-renderer STYLES:');
        console.log('   display:', rendererStyle.display);
        console.log('   visibility:', rendererStyle.visibility);
        console.log('   opacity:', rendererStyle.opacity);
        console.log('   width:', rendererStyle.width);
        console.log('   height:', rendererStyle.height);
    }
    
    if (sectionsContainer) {
        const sectionsStyle = window.getComputedStyle(sectionsContainer);
        console.log('\n🎨 div#sections STYLES:');
        console.log('   display:', sectionsStyle.display);
        console.log('   visibility:', sectionsStyle.visibility);
        console.log('   opacity:', sectionsStyle.opacity);
        console.log('   width:', sectionsStyle.width);
        console.log('   height:', sectionsStyle.height);
        console.log('   overflow:', sectionsStyle.overflow);
        console.log('   position:', sectionsStyle.position);
        console.log('   z-index:', sectionsStyle.zIndex);
    }
    
    const targetNavSection = navigationSection || alternativeNavigationSection;
    if (targetNavSection) {
        const navStyle = window.getComputedStyle(targetNavSection);
        console.log('\n🎨 ytd-guide-section-renderer STYLES:');
        console.log('   display:', navStyle.display);
        console.log('   visibility:', navStyle.visibility);
        console.log('   opacity:', navStyle.opacity);
        console.log('   width:', navStyle.width);
        console.log('   height:', navStyle.height);
        console.log('   overflow:', navStyle.overflow);
        console.log('   position:', navStyle.position);
        console.log('   z-index:', navStyle.zIndex);
        
        // Check for navigation entries
        const navEntries = targetNavSection.querySelectorAll('ytd-guide-entry-renderer');
        console.log('\n📋 NAVIGATION ENTRIES:');
        console.log('   Total entries found:', navEntries.length);
        
        navEntries.forEach((entry, index) => {
            const entryStyle = window.getComputedStyle(entry);
            const link = entry.querySelector('a');
            const title = link ? link.textContent.trim() : 'No title';
            console.log(`   Entry ${index + 1} (${title}):`, {
                display: entryStyle.display,
                visibility: entryStyle.visibility,
                opacity: entryStyle.opacity
            });
        });
    }
    
    // Check for conflicting CSS rules
    console.log('\n🔍 CHECKING FOR CONFLICTING CSS RULES:');
    
    // Check if any elements have home-feed-content attribute
    if (sectionsContainer) {
        const hasHomeFeedContent = sectionsContainer.hasAttribute('home-feed-content');
        const hasHomeFeedSection = sectionsContainer.hasAttribute('home-feed-section');
        const hasHomeFeedHidden = sectionsContainer.hasAttribute('home-feed-hidden');
        
        console.log('   sections has home-feed-content:', hasHomeFeedContent);
        console.log('   sections has home-feed-section:', hasHomeFeedSection);
        console.log('   sections has home-feed-hidden:', hasHomeFeedHidden);
        
        if (hasHomeFeedContent || hasHomeFeedSection || hasHomeFeedHidden) {
            console.log('   ⚠️ WARNING: Sidebar navigation has been marked as home feed content!');
        }
    }
    
    // Check parent elements
    if (sectionsContainer) {
        let parent = sectionsContainer.parentElement;
        let level = 1;
        console.log('\n🌳 PARENT ELEMENT CHAIN:');
        
        while (parent && level <= 5) {
            const parentStyle = window.getComputedStyle(parent);
            console.log(`   Level ${level} (${parent.tagName}):`, {
                display: parentStyle.display,
                visibility: parentStyle.visibility,
                opacity: parentStyle.opacity,
                id: parent.id || 'no-id',
                classes: parent.className || 'no-classes'
            });
            parent = parent.parentElement;
            level++;
        }
    }
    
    console.log('\n=== END DEBUG ===');
}

// Function to force show sidebar navigation
function forceShowSidebarNavigation() {
    console.log('\n🔧 FORCING SIDEBAR NAVIGATION TO SHOW...');
    
    const sectionsContainer = document.querySelector('div#sections.style-scope.ytd-guide-renderer');
    const navigationSection = document.querySelector('div#sections.style-scope.ytd-guide-renderer > ytd-guide-section-renderer.style-scope.ytd-guide-renderer');
    const guideRenderer = document.querySelector('ytd-guide-renderer');
    const guide = document.querySelector('#guide');
    
    const elementsToShow = [guide, guideRenderer, sectionsContainer, navigationSection].filter(Boolean);
    
    elementsToShow.forEach(element => {
        if (element) {
            element.style.display = 'block';
            element.style.visibility = 'visible';
            element.style.opacity = '1';
            element.style.height = 'auto';
            element.style.width = 'auto';
            element.style.overflow = 'visible';
            element.style.maxHeight = 'none';
            element.style.maxWidth = 'none';
            element.style.position = 'relative';
            element.style.zIndex = '1';
            element.style.transform = 'none';
            element.style.clip = 'auto';
            element.style.clipPath = 'none';
            
            console.log('   ✅ Forced visibility for:', element.tagName, element.id || element.className);
        }
    });
    
    console.log('🔧 Force show completed. Check if sidebar navigation is now visible.');
}

// Export functions
window.debugSidebarNavigation = debugSidebarNavigation;
window.forceShowSidebarNavigation = forceShowSidebarNavigation;

console.log('✅ Debug script loaded. Run debugSidebarNavigation() to analyze the issue.');
console.log('💡 Run forceShowSidebarNavigation() to try forcing the sidebar to show.');

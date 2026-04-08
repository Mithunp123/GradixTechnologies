// Clutch Logo Theme Switcher - IMMEDIATE FIX for ALL clutch logos
// Add this script to your HTML page to make ALL clutch logos switch colors automatically

(function() {
    'use strict';
    
    function updateClutchLogos() {
        // Find ALL clutch images
        const clutchImages = document.querySelectorAll('img[src*="clutch"]');
        
        if (clutchImages.length === 0) {
            console.log('No Clutch logos found');
            return;
        }
        
        console.log(`Found ${clutchImages.length} Clutch logo(s)`);
        
        // Check if we're in dark theme
        const isDark = 
            // Check CSS classes
            document.documentElement.classList.contains('dark') ||
            document.body.classList.contains('dark') ||
            // Check data attributes  
            document.documentElement.getAttribute('data-theme') === 'dark' ||
            document.body.getAttribute('data-theme') === 'dark' ||
            // Check system preference
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        console.log('Dark theme detected:', isDark);
        
        // Update each clutch image
        clutchImages.forEach((img, index) => {
            const currentSrc = img.src;
            console.log(`Logo ${index + 1} current src:`, currentSrc);
            
            if (isDark) {
                // Dark theme - use white version
                if (currentSrc.includes('static/images/theme/home/reviews/clutch')) {
                    img.src = 'static/images/theme/home/reviews/clutch-dark.svg';
                } else if (currentSrc.includes('static/images/2025/11/clutch')) {
                    img.src = 'static/images/2025/11/clutch-dark.svg';
                }
                console.log(`Logo ${index + 1} switched to WHITE (dark theme)`);
            } else {
                // Light theme - use black version
                if (currentSrc.includes('static/images/theme/home/reviews/clutch')) {
                    img.src = 'static/images/theme/home/reviews/clutch-light.svg';
                } else if (currentSrc.includes('static/images/2025/11/clutch')) {
                    img.src = 'static/images/2025/11/clutch-light.svg';
                }
                console.log(`Logo ${index + 1} switched to BLACK (light theme)`);
            }
        });
    }
    
    // Run immediately when script loads
    updateClutchLogos();
    
    // Run when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateClutchLogos);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateClutchLogos);
    }
    
    // Watch for class changes on html/body (for manual theme switching)
    if (window.MutationObserver) {
        const observer = new MutationObserver(updateClutchLogos);
        observer.observe(document.documentElement, { 
            attributes: true, 
            attributeFilter: ['class', 'data-theme'] 
        });
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['class', 'data-theme'] 
        });
    }
    
    // Force update every 3 seconds as fallback
    setInterval(updateClutchLogos, 3000);
    
    console.log('✅ Clutch logo theme switcher activated for ALL locations!');
})();
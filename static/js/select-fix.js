// Fix for zigzag pattern in select elements
document.addEventListener('DOMContentLoaded', function() {
    function fixSelectElement() {
        const selectElements = document.querySelectorAll('select.form-select[name="projectBudget"]');
        
        selectElements.forEach(function(select) {
            // Apply direct styles to fix zigzag
            select.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
            select.style.fontSize = '16px';
            select.style.fontWeight = '400';
            select.style.letterSpacing = '0';
            select.style.wordSpacing = '0';
            select.style.textDecoration = 'none';
            select.style.textTransform = 'none';
            select.style.fontFeatureSettings = '"kern" 1, "liga" 0';
            select.style.fontVariantLigatures = 'none';
            select.style.webkitFontFeatureSettings = '"kern" 1, "liga" 0';
            select.style.webkitFontVariantLigatures = 'none';
            select.style.textRendering = 'optimizeLegibility';
            select.style.webkitFontSmoothing = 'antialiased';
            select.style.mozOsxFontSmoothing = 'grayscale';
            
            // Force background and color
            select.style.background = 'rgba(255, 255, 255, 0.05)';
            select.style.backgroundImage = 'none';
            select.style.color = 'rgba(255, 255, 255, 0.8)';
            select.style.border = '2px solid rgba(255, 255, 255, 0.1)';
            select.style.borderRadius = '12px';
            select.style.padding = '16px 20px';
        });
    }
    
    // Run immediately
    fixSelectElement();
    
    // Run when modal opens
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length > 0) {
                fixSelectElement();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // Also run on modal events
    document.addEventListener('click', function(e) {
        if (e.target.matches('[data-modal-target="modalContactUs"]')) {
            setTimeout(fixSelectElement, 100);
        }
    });
});
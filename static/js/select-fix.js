// Professional Form Enhancement Script
(function() {
    'use strict';
    
    function fixSelectElements() {
        // Target all select elements that might have issues
        const selectors = [
            'select.form-select',
            'select.modern-select',
            '.choices__inner',
            '.choices__input',
            '.choices__item'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                // Remove problematic font features
                element.style.fontFeatureSettings = 'normal';
                element.style.fontVariantLigatures = 'none';
                element.style.textRendering = 'optimizeSpeed';
                element.style.webkitFontSmoothing = 'antialiased';
                element.style.mozOsxFontSmoothing = 'grayscale';
                
                // Ensure proper font family
                if (element.tagName === 'SELECT') {
                    element.style.fontFamily = 'inherit';
                    element.style.fontWeight = '400';
                }
            });
        });
    }
    
    function ensureSingleContactForm() {
        // Remove any duplicate contact forms
        const forms = document.querySelectorAll('.modern-contact-form');
        if (forms.length > 1) {
            for (let i = 1; i < forms.length; i++) {
                const parentWrapper = forms[i].closest('.modern-contact__form-wrapper');
                if (parentWrapper) {
                    parentWrapper.remove();
                } else {
                    forms[i].remove();
                }
            }
        }
    }
    
    function enhanceFormAccessibility() {
        // Add proper labels and ARIA attributes
        const inputs = document.querySelectorAll('.modern-input, .modern-textarea, .modern-select');
        inputs.forEach(input => {
            if (input.placeholder && !input.getAttribute('aria-label')) {
                input.setAttribute('aria-label', input.placeholder);
            }
        });
        
        // Enhance submit button
        const submitBtn = document.querySelector('.modern-submit-btn');
        if (submitBtn && !submitBtn.getAttribute('aria-describedby')) {
            submitBtn.setAttribute('aria-describedby', 'form-submit-description');
            
            // Add hidden description
            if (!document.getElementById('form-submit-description')) {
                const desc = document.createElement('span');
                desc.id = 'form-submit-description';
                desc.className = 'sr-only';
                desc.textContent = 'Submit your project inquiry. We will respond within 24 hours.';
                submitBtn.appendChild(desc);
            }
        }
    }
    
    function init() {
        fixSelectElements();
        ensureSingleContactForm();
        enhanceFormAccessibility();
    }
    
    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Watch for dynamic content changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                init();
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('Professional form enhancement script loaded');
})();
// Services Dropdown Toggle Functionality
// ONLY FOR 2ND AND 3RD CARDS - NOT THE FIRST ONE
document.addEventListener('DOMContentLoaded', function() {
    // Get all service cards with dropdown functionality
    const serviceCards = document.querySelectorAll('[data-service-card]');
    
    serviceCards.forEach(function(card, index) {
        const header = card.querySelector('.ext-service-card__header');
        const body = card.querySelector('.ext-service-card__body');
        const chevronIcon = card.querySelector('.icon-chevron-down');
        
        // ONLY apply dropdown functionality to 2nd and 3rd cards (index 1 and 2)
        if (index === 0) {
            // First card (index 0) - always visible, no dropdown functionality
            card.classList.add('expanded'); // Keep it expanded always
            if (header) {
                header.style.cursor = 'default'; // No pointer cursor
                header.removeAttribute('tabindex'); // Not focusable
            }
            console.log('First card: Always visible, no dropdown');
            return; // Skip dropdown functionality for first card
        }
        
        if (header && body) {
            // Initialize as collapsed for 2nd and 3rd cards
            card.classList.remove('expanded');
            
            // Add click event listener to header (only for 2nd and 3rd cards)
            header.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Toggle the expanded class
                const isExpanded = card.classList.contains('expanded');
                
                if (isExpanded) {
                    // Collapse the card
                    card.classList.remove('expanded');
                    console.log('Collapsed service card', index + 1);
                } else {
                    // Expand the card
                    card.classList.add('expanded');
                    console.log('Expanded service card', index + 1);
                }
            });
            
            // Add keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
            
            // Make header focusable for accessibility
            if (!header.hasAttribute('tabindex')) {
                header.setAttribute('tabindex', '0');
            }
            
            // Add ARIA attributes for accessibility
            header.setAttribute('role', 'button');
            header.setAttribute('aria-expanded', 'false');
            
            // Update ARIA when toggling
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        const isExpanded = card.classList.contains('expanded');
                        header.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
                    }
                });
            });
            
            observer.observe(card, {
                attributes: true,
                attributeFilter: ['class']
            });
        }
    });
    
    console.log('Services dropdown functionality initialized for', serviceCards.length, 'cards (first card always visible)');
});
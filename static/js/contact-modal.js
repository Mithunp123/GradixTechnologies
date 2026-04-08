(function() {
    'use strict';

    const modal = document.getElementById('modalContactUs');
    if (!modal) return;

    const closeBtns = modal.querySelectorAll('[data-modal-close]');
    const triggerBtns = document.querySelectorAll('[data-modal-target="modalContactUs"]');
    
    // Timer settings
    const INACTIVITY_TIME = 60000; // 60 seconds
    let inactivityTimer;
    let modalShown = false;

    function openModal(isManual = false) {
        // Prevent multiple simultaneous opens
        if (modal.classList.contains('is-open')) return;
        
        // If not manual, check if we should auto-show
        if (!isManual) {
            if (modalShown) return; // Only auto-show once
            
            // Don't auto-show if user has already scrolled to the contact section
            const inlineFormSection = document.getElementById('contacts');
            if (inlineFormSection) {
                const rect = inlineFormSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    resetTimer();
                    return;
                }
            }
        }

        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (!isManual) modalShown = true;
        clearTimeout(inactivityTimer);
    }

    function closeModal() {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
        // We don't reset modalShown here because we only want to auto-trigger once per session
        // But manual trigger will still work because it passes isManual = true
    }

    // Toggle logic for manual triggers - Use delegation for reliability
    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('[data-modal-target="modalContactUs"]');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            openModal(true);
        }
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    });

    // Close on backdrop click
    const backdrop = modal.querySelector('.custom-modal__backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
    }

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModal();
        }
    });

    // Inactivity Detection
    function resetTimer() {
        if (modalShown) return;
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(openModal, INACTIVITY_TIME);
    }

    // Reset timer on user activity
    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
        document.addEventListener(event, resetTimer, { passive: true });
    });

    // Start timer on load
    resetTimer();

    // Form submission handling
    const forms = document.querySelectorAll('#contactFormInline, #contactFormModal');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="btn__text">Sending...</span>';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<span class="btn__text">Sent Successfully ✓</span>';
                btn.style.backgroundColor = '#10b981'; // Green success
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                    if (form.id === 'contactFormModal') {
                        closeModal();
                    }
                }, 3000);
            }, 1500);
        });
    });

    console.log('Contact Modal System initialized. Inactivity trigger set to ' + (INACTIVITY_TIME / 1000) + 's');
})();

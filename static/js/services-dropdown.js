// Services Dropdown Toggle Functionality
// First card always open. Second/third open on click only.
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = Array.from(document.querySelectorAll('[data-service-card]'));
    if (serviceCards.length < 3) return;

    const firstCard = serviceCards[0];
    const toggleCards = serviceCards.slice(1);

    function setCardState(card, expanded) {
        const header = card.querySelector('.ext-service-card__header');
        card.classList.toggle('expanded', expanded);
        if (header) {
            header.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
    }

    // First card: always open
    const firstHeader = firstCard.querySelector('.ext-service-card__header');
    setCardState(firstCard, true);
    if (firstHeader) {
        firstHeader.style.cursor = 'default';
        firstHeader.removeAttribute('tabindex');
        firstHeader.setAttribute('aria-disabled', 'true');
        firstHeader.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
    }

    // Second/third cards: collapsed by default
    toggleCards.forEach(function (card) {
        const header = card.querySelector('.ext-service-card__header');
        if (!header) return;

        setCardState(card, false);
        header.setAttribute('role', 'button');
        header.setAttribute('tabindex', '0');

        const onToggle = function (e) {
            e.preventDefault();
            e.stopPropagation();

            const shouldOpen = !card.classList.contains('expanded');

            // Keep first always open
            setCardState(firstCard, true);
            // Toggle only clicked card (2nd/3rd operate independently)
            setCardState(card, shouldOpen);

            // Keep internal active state aligned with visual state
            if (shouldOpen) {
                card.classList.add('_active');
            } else {
                card.classList.remove('_active');
                header.blur();
            }
        };

        header.addEventListener('click', onToggle);
        header.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') onToggle(e);
        });
    });
});

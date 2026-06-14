const nav = document.querySelector('.nav');

// Future enhancements: mobile menu toggle, animations, dynamic project loading.
// Placeholder script file to keep the portfolio ready for incremental updates.

if (nav) {
    nav.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            window.scrollTo({ top: document.querySelector(event.target.getAttribute('href')).offsetTop - 70, behavior: 'smooth' });
            event.preventDefault();
        }
    });
}

// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // 1. Dark Mode Toggle
    // ============================
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    /**
     * Sets the theme based on the provided parameter.
     * @param {string} theme - The theme to set ('dark' or 'light').
     */
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        localStorage.setItem('theme', theme);
    }

    /**
     * Initializes the theme based on user preference or system settings.
     */
    function initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
            setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
        }
    }

    // Initialize theme on page load
    initializeTheme();

    // Toggle theme on button click
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // ============================
    // 2. Smooth Scrolling for Internal Links
    // ============================
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============================
    // 3. Active Link Highlighting
    // ============================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjust based on header height
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Check if link href matches the current section id or page
            if (link.getAttribute('href') === `#${current}` || link.getAttribute('href') === `${current}.html`) {
                link.classList.add('active');
            }
        });
    });

    // ============================
    // 4. Back to Top Button
    // ============================
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show or hide the button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });

        // Scroll smoothly to the top when the button is clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================
    // 5. Fetch and Render Markdown Notes (For notes.html)
    // ============================
    const notesContent = document.getElementById('notes-content');

    /**
     * Fetches a Markdown file and renders it as HTML.
     * @param {string} fileName - The name of the Markdown file to fetch.
     */
    async function loadPhysicsNotes(fileName = 'Resumen-Control-3.md') {
        if (!notesContent) return; // Exit if the element doesn't exist

        try {
            const response = await fetch(fileName);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            const htmlContent = marked(markdown);
            notesContent.innerHTML = htmlContent;

            // If MathJax is loaded, re-render the equations
            if (typeof MathJax !== 'undefined') {
                MathJax.Hub.Queue(["Typeset", MathJax.Hub, notesContent]);
            }
        } catch (error) {
            console.error('Error loading or processing Markdown:', error);
            notesContent.innerHTML = `<p>Error loading notes: ${error.message}</p>`;
        }
    }

    // Determine the current page and load notes if on notes.html
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === 'notes.html') {
        loadPhysicsNotes();
    }

    // ============================
    // 6. Initialize Current Year in Footer
    // ============================
    const currentYearSpan = document.getElementById('current-year');

    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }

    // ============================
    // 7. Optional: Handle Additional Features
    // ============================
    // If you have additional features like file uploads or dynamic document lists,
    // ensure to check for the existence of their corresponding elements before initializing.
});

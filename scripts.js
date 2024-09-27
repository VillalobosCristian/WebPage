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
    // 5. Fetch and Display Notes List (For notes.html)
    // ============================
    const notesList = document.getElementById('notes-list');
    const notesContent = document.getElementById('notes-content');

    /**
     * Fetches the list of notes from notes.json and populates the notes list.
     */
    async function loadNotesList() {
        if (!notesList) return; // Exit if the element doesn't exist

        try {
            const response = await fetch('notes.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const notes = await response.json();
            populateNotesList(notes);
        } catch (error) {
            console.error('Error loading notes list:', error);
            notesList.innerHTML = '<li class="list-group-item">Error loading notes list.</li>';
        }
    }

    /**
     * Populates the notes list with fetched notes.
     * @param {Array} notes - An array of note objects.
     */
    function populateNotesList(notes) {
        if (!Array.isArray(notes) || notes.length === 0) {
            notesList.innerHTML = '<li class="list-group-item">No notes available.</li>';
            return;
        }

        notesList.innerHTML = ''; // Clear existing list

        notes.forEach(note => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'note-item');
            listItem.textContent = note.title;
            listItem.setAttribute('data-file', note.filename);
            listItem.setAttribute('tabindex', '0'); // Make focusable for accessibility

            // Add click event to load the note
            listItem.addEventListener('click', () => {
                loadNoteContent(note.filename);
                setActiveNote(listItem);
            });

            // Add keypress event for accessibility (Enter key)
            listItem.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    loadNoteContent(note.filename);
                    setActiveNote(listItem);
                }
            });

            notesList.appendChild(listItem);
        });
    }

    /**
     * Sets the clicked note as active and removes active class from others.
     * @param {HTMLElement} activeItem - The list item to set as active.
     */
    function setActiveNote(activeItem) {
        const allNotes = document.querySelectorAll('.note-item');
        allNotes.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    /**
     * Fetches a Markdown file and renders it as HTML.
     * @param {string} fileName - The name of the Markdown file to fetch.
     */
    async function loadNoteContent(fileName) {
        if (!notesContent) return; // Exit if the element doesn't exist

        try {
            const response = await fetch(`notes/${fileName}`);
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

    // Load notes list if on notes.html
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage === 'notes.html') {
        loadNotesList();
    }

    // ============================
    // 6. Fetch and Display Publications (For publications.html)
    // ============================
    const publicationsList = document.getElementById('publications-list');

    /**
     * Fetches the list of publications from publications.json and populates the publications list.
     */
    async function loadPublicationsList() {
        if (!publicationsList) return; // Exit if the element doesn't exist

        try {
            const response = await fetch('publications.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const publications = await response.json();
            populatePublicationsList(publications);
        } catch (error) {
            console.error('Error loading publications list:', error);
            publicationsList.innerHTML = '<p>Error loading publications list.</p>';
        }
    }

    /**
     * Populates the publications list with fetched publications.
     * @param {Array} publications - An array of publication objects.
     */
    function populatePublicationsList(publications) {
        if (!Array.isArray(publications) || publications.length === 0) {
            publicationsList.innerHTML = '<p>No publications available.</p>';
            return;
        }

        publicationsList.innerHTML = ''; // Clear existing list

        publications.forEach(pub => {
            const pubCard = document.createElement('div');
            pubCard.classList.add('card', 'mb-3');

            const pubBody = document.createElement('div');
            pubBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.classList.add('card-title');
            title.textContent = pub.title;

            const journalInfo = document.createElement('h6');
            journalInfo.classList.add('card-subtitle', 'mb-2', 'text-muted');
            journalInfo.textContent = `${pub.journal}, ${pub.year}, Vol. ${pub.volume}, No. ${pub.issue}, pp. ${pub.pages}`;

            const authors = document.createElement('p');
            authors.classList.add('card-text');
            authors.innerHTML = `<strong>Authors:</strong> ${pub.authors}`;

            const abstract = document.createElement('p');
            abstract.classList.add('card-text');
            abstract.textContent = pub.abstract;

            const linksDiv = document.createElement('div');
            linksDiv.classList.add('card-links');

            // Link to Journal Abstract
            const abstractLink = document.createElement('a');
            abstractLink.href = pub.link;
            abstractLink.target = '_blank';
            abstractLink.rel = 'noopener noreferrer';
            abstractLink.classList.add('card-link');
            abstractLink.textContent = 'View Abstract';

            // Link to PDF
            const pdfLink = document.createElement('a');
            pdfLink.href = `papers/${pub.pdf}`;
            pdfLink.target = '_blank';
            pdfLink.rel = 'noopener noreferrer';
            pdfLink.classList.add('card-link');
            pdfLink.textContent = 'Download PDF';

            linksDiv.appendChild(abstractLink);
            linksDiv.appendChild(pdfLink);

            // Assemble Card
            pubBody.appendChild(title);
            pubBody.appendChild(journalInfo);
            pubBody.appendChild(authors);
            pubBody.appendChild(abstract);
            pubBody.appendChild(linksDiv);

            pubCard.appendChild(pubBody);
            publicationsList.appendChild(pubCard);
        });
    }

    // Load publications list if on publications.html
    if (currentPage === 'publications.html') {
        loadPublicationsList();
    }

    // ============================
    // 7. Initialize Current Year in Footer
    // ============================
    const currentYearSpan = document.getElementById('current-year');

    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }

    // ============================
    // 8. Contact Form Handling (Optional)
    // ============================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            formFeedback.textContent = 'Sending...';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Replace with your form handling endpoint or use a service like Formspree
                const response = await fetch('https://formspree.io/f/{your-form-id}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    formFeedback.textContent = 'Message sent successfully!';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formFeedback.textContent = 'There was an error sending your message.';
            }
        });
    }
});

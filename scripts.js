// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // ============================
    // 1. Smooth Scrolling for Internal Links
    // ============================
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            } else {
                console.warn(`Target element not found for ${anchor.getAttribute('href')}`);
            }
        });
    });

    // ============================
    // 2. Active Link Highlighting
    // ============================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    /**
     * Debounce function to limit the rate at which a function can fire.
     * @param {Function} func - The function to debounce.
     * @param {number} wait - The delay in milliseconds.
     * @returns {Function} - The debounced function.
     */
    const debounce = (func, wait = 20) => {
        let timeout;
        return function () {
            const context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    };

    window.addEventListener(
        'scroll',
        debounce(() => {
            let current = '';

            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 150; // Adjust based on header height
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach((link) => {
                link.classList.remove('active');
                // Check if link href matches the current section id or page
                if (
                    link.getAttribute('href') === `#${current}` ||
                    link.getAttribute('href') === `${current}.html`
                ) {
                    link.classList.add('active');
                }
            });
        }, 100)
    );

    // ============================
    // 3. Back to Top Button
    // ============================
    const backToTopButton = document.getElementById('back-to-top');

    if (backToTopButton) {
        // Show or hide the button based on scroll position
        window.addEventListener(
            'scroll',
            debounce(() => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                    backToTopButton.classList.remove('hidden');
                } else {
                    backToTopButton.classList.add('hidden');
                    backToTopButton.classList.remove('visible');
                }
            }, 100)
        );

        // Scroll smoothly to the top when the button is clicked
        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ============================
    // 4. Fetch and Display Publications (For publications.html)
    // ============================
    const publicationsList = document.getElementById('publications-list');
    const publicationsLoading = document.getElementById('publications-loading');

    /**
     * Fetches the list of publications from publications.json and populates the publications list.
     */
    const loadPublicationsList = async () => {
        if (!publicationsList) return; // Exit if the element doesn't exist

        try {
            const response = await fetch('publications.json'); // Ensure this path is correct
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const publications = await response.json();
            populatePublicationsList(publications);
        } catch (error) {
            console.error('Error loading publications list:', error);
            publicationsList.innerHTML =
                '<p class="text-danger">Error loading publications list.</p>';
        } finally {
            if (publicationsLoading) {
                publicationsLoading.style.display = 'none';
            }
        }
    };

    /**
     * Populates the publications list with fetched publications.
     * @param {Array} publications - An array of publication objects.
     */
    const populatePublicationsList = (publications) => {
        if (!Array.isArray(publications) || publications.length === 0) {
            publicationsList.innerHTML =
                '<p class="text-muted">No publications available.</p>';
            return;
        }

        publicationsList.innerHTML = ''; // Clear existing list

        publications.forEach((pub) => {
            const pubCard = document.createElement('div');
            pubCard.classList.add('col-md-6', 'mb-4'); // Adjust column width as needed

            pubCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${pub.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${pub.journal} (${pub.year}), Vol. ${pub.volume}, No. ${pub.issue}, pp. ${pub.pages}</h6>
                        <p class="card-text"><strong>Authors:</strong> ${pub.authors}</p>
                        <p class="card-text"><strong>DOI:</strong> <a href="https://doi.org/${pub.doi}" target="_blank" rel="noopener noreferrer">${pub.doi}</a></p>
                        <p class="card-text"><strong>Abstract:</strong> ${pub.abstract}</p>
                        <div class="mt-auto">
                            <a href="papers/${encodeURIComponent(pub.pdf)}" class="btn btn-primary me-2" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-file-download me-1"></i> Download PDF
                            </a>
                            <a href="https://doi.org/${pub.doi}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                <i class="fas fa-external-link-alt me-1"></i> View Abstract
                            </a>
                        </div>
                    </div>
                </div>
            `;
            publicationsList.appendChild(pubCard);
        });
    };

    // Load publications list if on publications.html
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'publications.html') {
        loadPublicationsList();
    }

    // ============================
    // 5. Fetch and Display Notes List (For notes.html)
    // ============================
    const notesList = document.getElementById('notes-list');
    const notesContent = document.getElementById('notes-content');

    /**
     * Fetches the list of notes from notes.json and populates the notes list.
     */
    const loadNotesList = async () => {
        if (!notesList) return; // Exit if the element doesn't exist

        try {
            const response = await fetch('notes.json'); // Ensure this path is correct
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const notes = await response.json();
            populateNotesList(notes);
        } catch (error) {
            console.error('Error loading notes list:', error);
            notesList.innerHTML =
                '<li class="list-group-item">Error loading notes list.</li>';
        }
    };

    /**
     * Populates the notes list with fetched notes.
     * @param {Array} notes - An array of note objects.
     */
    const populateNotesList = (notes) => {
        if (!Array.isArray(notes) || notes.length === 0) {
            notesList.innerHTML =
                '<li class="list-group-item">No notes available.</li>';
            return;
        }

        notesList.innerHTML = ''; // Clear existing list

        notes.forEach((note) => {
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
    };

    /**
     * Sets the clicked note as active and removes active class from others.
     * @param {HTMLElement} activeItem - The list item to set as active.
     */
    const setActiveNote = (activeItem) => {
        const allNotes = document.querySelectorAll('.note-item');
        allNotes.forEach((item) => item.classList.remove('active'));
        activeItem.classList.add('active');
    };

    /**
     * Fetches a Markdown file and renders it as HTML.
     * @param {string} fileName - The name of the Markdown file to fetch.
     */
    const loadNoteContent = async (fileName) => {
        if (!notesContent) return; // Exit if the element doesn't exist

        try {
            const response = await fetch(`notes/${fileName}`); // Ensure this path is correct
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const markdown = await response.text();
            const htmlContent = marked.parse(markdown);
            const sanitizedContent = DOMPurify.sanitize(htmlContent);
            notesContent.innerHTML = sanitizedContent;

            // If MathJax is loaded, re-render the equations
            if (typeof MathJax !== 'undefined') {
                MathJax.Hub.Queue(['Typeset', MathJax.Hub, notesContent]);
            }
        } catch (error) {
            console.error('Error loading or processing Markdown:', error);
            notesContent.innerHTML = `<p>Error loading notes: ${error.message}</p>`;
        }
    };

    // Load notes list if on notes.html
    if (currentPage === 'notes.html') {
        loadNotesList();
    }

    // ============================
    // 6. Contact Form Handling
    // ============================
    const contactForm = document.getElementById('contact-form');
    const formFeedback = document.getElementById('form-feedback');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic validation
            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const subject = contactForm.querySelector('input[name="subject"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.textContent = 'Please fill in all required fields.';
                formFeedback.style.color = 'var(--accent-color)';
                formFeedback.style.display = 'block';
                return;
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formFeedback.textContent = 'Please enter a valid email address.';
                formFeedback.style.color = 'var(--accent-color)';
                formFeedback.style.display = 'block';
                return;
            }

            // Proceed with form submission
            formFeedback.textContent = 'Sending...';
            formFeedback.style.display = 'block';
            formFeedback.style.color = 'var(--secondary-color)';

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            try {
                // Replace with your form handling endpoint or use a service like Formspree
                const response = await fetch('https://formspree.io/f/{your-form-id}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    formFeedback.textContent = 'Message sent successfully!';
                    formFeedback.style.color = 'var(--secondary-color)';
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                formFeedback.textContent = 'There was an error sending your message.';
                formFeedback.style.color = 'var(--accent-color)';
            }
        });
    }

    // ============================
    // 7. Initialize Current Year in Footer
    // ============================
    const currentYearSpan = document.getElementById('current-year');

    if (currentYearSpan) {
        const currentYear = new Date().getFullYear();
        currentYearSpan.textContent = currentYear;
    }
});

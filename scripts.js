// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const uploadForm = document.getElementById('upload-form');
    const documentList = document.getElementById('document-list');
    const backToTopButton = document.getElementById('back-to-top');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const formFeedback = document.getElementById('form-feedback');
    const currentYearSpan = document.getElementById('current-year');
    const navLinks = document.querySelectorAll('nav ul li a');
    const curriculumIndexLinks = document.querySelectorAll('#curriculum-index a');
    const notesContent = document.getElementById('notes-content');

    // Update current year in footer
    const currentYear = new Date().getFullYear();
    if (currentYearSpan) {
        currentYearSpan.textContent = currentYear;
    }

    // Function to fetch and display documents from the server
    const fetchDocuments = async () => {
        try {
            const response = await fetch('/api/documents'); // Replace with your actual API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const documents = await response.json();

            // Clear existing list
            documentList.innerHTML = '';

            // Populate document list
            documents.forEach(doc => {
                const documentItem = document.createElement('div');
                documentItem.classList.add('document-item');
                documentItem.tabIndex = 0; // Make focusable for accessibility

                const title = document.createElement('h3');
                title.textContent = doc.type === 'tex' ? `LaTeX Document: ${doc.name}` : `Markdown File: ${doc.name}`;

                const uploaderInfo = document.createElement('p');
                uploaderInfo.textContent = `Uploaded by: ${doc.uploader}`;

                const modifiedInfo = document.createElement('p');
                const lastModified = new Date(doc.lastModified).toLocaleDateString();
                modifiedInfo.textContent = `Last modified: ${lastModified}`;

                documentItem.appendChild(title);
                documentItem.appendChild(uploaderInfo);
                documentItem.appendChild(modifiedInfo);

                // Optional: Add click event to view/download the document
                documentItem.addEventListener('click', () => {
                    window.location.href = `/documents/${doc.id}`; // Replace with your actual document URL
                });

                documentList.appendChild(documentItem);
            });
        } catch (error) {
            console.error('Error fetching documents:', error);
            documentList.innerHTML = '<p>Error loading documents. Please try again later.</p>';
        }
    };

    // Initial fetch of documents
    fetchDocuments();

    // Handle form submission for uploading documents
    uploadForm && uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];

        if (!file) {
            formFeedback.textContent = 'Please select a file to upload.';
            formFeedback.className = 'form-message error';
            fileInput.classList.add('error');
            return;
        }

        // Reset feedback
        formFeedback.textContent = '';
        formFeedback.className = 'form-message';
        fileInput.classList.remove('error');

        const formData = new FormData();
        formData.append('file-upload', file);

        try {
            const response = await fetch('/api/upload', { // Replace with your actual API endpoint
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                const result = await response.json();
                formFeedback.textContent = 'File uploaded successfully!';
                formFeedback.className = 'form-message success';
                fileInput.classList.add('success');
                uploadForm.reset();
                fetchDocuments(); // Refresh the document list
            } else {
                const errorData = await response.json();
                formFeedback.textContent = errorData.message || 'Failed to upload file.';
                formFeedback.className = 'form-message error';
                fileInput.classList.add('error');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            formFeedback.textContent = 'An error occurred while uploading the file.';
            formFeedback.className = 'form-message error';
            fileInput.classList.add('error');
        }
    });

    // Back to Top Button Functionality
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton && backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Dark Mode Toggle Functionality
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

    // Check for saved theme preference on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no preference, use system preference
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
    }

    darkModeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

    // Active Link Highlighting in Horizontal Index
    const sections = document.querySelectorAll('section');
    const curriculumIndexLinks = document.querySelectorAll('#curriculum-index a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjust based on header height
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        curriculumIndexLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Fetch and Render Physics Notes in curriculum.html
    if (notesContent) {
        async function loadPhysicsNotes() {
            try {
                const response = await fetch('Resumen Control 3.md'); // Path to your Markdown file
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const markdown = await response.text();
                const htmlContent = marked(markdown);
                notesContent.innerHTML = htmlContent;
                if (typeof MathJax !== 'undefined') {
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub, notesContent]);
                }
            } catch (error) {
                console.error('Error loading or processing Markdown:', error);
                notesContent.innerHTML = `<p>Error loading notes: ${error.message}</p>`;
            }
        }

        // Call the function to load notes
        loadPhysicsNotes();
    }
});

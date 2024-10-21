// scripts.js

document.addEventListener('DOMContentLoaded', () => {
    const notesList = document.getElementById('notes-list');
    const notesContent = document.getElementById('notes-content');
    const backToTopButton = document.getElementById('back-to-top');

    // Define your notes here
    const notes = [
        {
            "title": "Fluid Dynamics",
            "filename": "Fluid-Dynamics.md"
        },
        {
            "title": "Resumen Control 3",
            "filename": "Resumen-Control-3.md"
        },
        {
            "title": "Flow Induced by Bacteria",
            "filename": "Bact_flow.md"
        }
    ];

    // Populate the notes list
    notes.forEach((note, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = note.title;
        listItem.classList.add('list-group-item', 'note-list-item');
        listItem.addEventListener('click', () => {
            loadNoteContent(note.filename);
            setActiveNoteListItem(listItem);
        });
        notesList.appendChild(listItem);

        // Optionally load the first note on page load
        if (index === 0) {
            loadNoteContent(note.filename);
            setActiveNoteListItem(listItem);
        }
    });

    // Function to set the active note
    function setActiveNoteListItem(activeItem) {
        const listItems = notesList.querySelectorAll('.note-list-item');
        listItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    // Function to load note content
    async function loadNoteContent(fileName) {
        try {
            const response = await fetch(`notes/${fileName}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.statusText}`);
            }
            const markdown = await response.text();
            const htmlContent = marked.parse(markdown);
            const sanitizedContent = DOMPurify.sanitize(htmlContent);
            notesContent.innerHTML = sanitizedContent;

            // Re-render LaTeX equations with MathJax 3.x
            if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
                MathJax.typesetPromise([notesContent]).catch(function (err) {
                    console.error('MathJax typeset failed: ', err.message);
                });
            }
        } catch (error) {
            console.error('Error loading note:', error);
            notesContent.innerHTML = `<p class="text-danger">Error loading note: ${error.message}</p>`;
        }
    }

    // Back to Top Button Functionality
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
});

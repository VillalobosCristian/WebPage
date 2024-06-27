// Smooth scrolling
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

// Dark mode toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(theme) {
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
    toggleButton.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
    setTheme(storedTheme);
} else if (prefersDarkScheme.matches) {
    setTheme('dark');
} else {
    setTheme('light');
}

toggleButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
    setTheme(newTheme);
});

// Animate sections on scroll
const sections = document.querySelectorAll('section');
const observerOptions = {
    rootMargin: '0px',
    threshold: 0.1,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => {
    observer.observe(section);
});

// Typing effect
const typingElement = document.getElementById('typing-effect');
const typingText = 'Physicist specializing in bacterial suspension dynamics';
const typingDelay = 75;
let typingIndex = 0;

function typeText() {
    if (typingElement && typingIndex < typingText.length) {
        typingElement.innerHTML += typingText.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeText, typingDelay);
    }
}

document.addEventListener('DOMContentLoaded', typeText);

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYearSpan = document.querySelector('footer p span');
if (footerYearSpan) {
    footerYearSpan.textContent = currentYear;
}

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Load and render Markdown content on notes.html
function loadMarkdownContent() {
    const markdownContent = document.getElementById('markdown-content');
    if (markdownContent) {
        fetch('Resumen Control 3.md')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(markdown => {
                console.log("Markdown content loaded:", markdown.substring(0, 100) + "..."); // Log the first 100 characters
                if (typeof marked !== 'function') {
                    throw new Error('Marked library is not loaded or not a function');
                }
                markdownContent.innerHTML = marked(markdown);
                if (typeof MathJax !== 'undefined') {
                    MathJax.typesetPromise().catch((err) => console.error('MathJax error:', err));
                }
            })
            .catch(error => {
                console.error('Error loading or processing Markdown:', error);
                markdownContent.innerHTML = `<p>Error loading or processing content: ${error.message}</p>`;
                markdownContent.innerHTML += `<p>Please check the browser console for more details.</p>`;
            });
    } else {
        console.error('Element with id "markdown-content" not found');
    }
}

document.addEventListener('DOMContentLoaded', loadMarkdownContent);

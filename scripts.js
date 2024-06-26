// Smooth scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});

// Dark mode toggle
const toggleButton = document.getElementById('dark-mode-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.toggle('dark-mode');
} else if (currentTheme === 'light') {
    document.body.classList.remove('dark-mode');
}

toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Animate sections on scroll
const sections = document.querySelectorAll('section');
const observerOptions = {
    rootMargin: '0px',
    threshold: 0.2,
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
const typingText = 'Exploring the dynamics of active matter systems';
const typingDelay = 100;
let typingIndex = 0;

function typeText() {
    if (typingIndex < typingText.length) {
        typingElement.innerHTML += typingText.charAt(typingIndex);
        typingIndex++;
        setTimeout(typeText, typingDelay);
    }
}

document.addEventListener('DOMContentLoaded', typeText);

// Language switcher
const languageToggle = document.getElementById('language-toggle');
const defaultLanguage = 'en';

languageToggle.addEventListener('click', () => {
    const currentLanguage = languageToggle.textContent.toLowerCase();
    const newLanguage = currentLanguage === 'es' ? 'en' : 'es';
    languageToggle.textContent = newLanguage.toUpperCase();
    loadLanguage(newLanguage);
});

function loadLanguage(language) {
    const contentElements = document.querySelectorAll('[data-i18n]');
    fetch(`./lang/${language}.json`)
        .then(response => response.json())
        .then(data => {
            contentElements.forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = data[key];
            });
        });
}

document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(defaultLanguage);
});

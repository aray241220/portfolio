// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to system preference
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        // Use saved preference
        if (savedTheme === 'dark') {
            html.classList.add('dark-mode');
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
        } else {
            html.classList.remove('dark-mode');
            themeToggle.querySelector('.theme-icon').textContent = '🌙';
        }
    } else {
        // Use system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            html.classList.add('dark-mode');
            themeToggle.querySelector('.theme-icon').textContent = '☀️';
        } else {
            html.classList.remove('dark-mode');
            themeToggle.querySelector('.theme-icon').textContent = '🌙';
        }
    }
}

// Initialize theme on page load
initTheme();

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark-mode');
    
    if (html.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.querySelector('.theme-icon').textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.querySelector('.theme-icon').textContent = '🌙';
    }
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                html.classList.add('dark-mode');
                themeToggle.querySelector('.theme-icon').textContent = '☀️';
            } else {
                html.classList.remove('dark-mode');
                themeToggle.querySelector('.theme-icon').textContent = '🌙';
            }
        }
    });
}

// ========== MOBILE MENU TOGGLE ==========
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========== CONTACT FORM HANDLING ==========
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = this.querySelector('input[placeholder="Your Name"]').value;
    const email = this.querySelector('input[placeholder="Your Email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Validate form
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
        alert('Please fill in all fields');
        return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    
    // Reset form
    this.reset();
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.project-card, .education-card, .skill-category, .stat-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ========== ACTIVE NAV LINK HIGHLIGHTING ==========
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-dark)';
        }
    });
});

// ========== SMOOTH SCROLL BEHAVIOR FOR OLDER BROWSERS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ========== CONSOLE MESSAGE ==========
console.log('%c Welcome to Adrija Ray Mondal\'s Portfolio! ', 
    'font-size: 16px; font-weight: bold; color: #fff; background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); padding: 10px 20px; border-radius: 5px;');
console.log('%c Feel free to explore and get in touch!', 
    'font-size: 12px; color: #667eea; font-weight: 500;');

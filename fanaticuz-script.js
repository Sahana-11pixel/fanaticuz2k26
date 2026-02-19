// Initialize Lucide icons
lucide.createIcons();

// ==================== Navigation ==================== 
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ==================== Countdown Timer ====================
function updateCountdown() {
    const eventDate = new Date('February 21, 2026 09:30:00').getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// ==================== Smooth Scrolling ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Registration Modal ====================
const modal = document.getElementById('registrationModal');
const registerBtn = document.getElementById('registerBtn');
const closeModalBtn = document.getElementById('closeModal');
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const closeSuccessBtn = document.getElementById('closeSuccess');

// Open modal
registerBtn.addEventListener('click', () => {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // Reset form and hide success message
    setTimeout(() => {
        registrationForm.style.display = 'block';
        successMessage.classList.remove('active');
        registrationForm.reset();
    }, 300);
}

closeModalBtn.addEventListener('click', closeModal);
closeSuccessBtn.addEventListener('click', closeModal);

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Form submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(registrationForm);
    const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        department: formData.get('department'),
        year: formData.get('year'),
        events: formData.getAll('events'),
        message: formData.get('message')
    };

    // Validate that at least one event is selected
    if (data.events.length === 0) {
        alert('Please select at least one event to register for.');
        return;
    }

    // Log form data (in real implementation, send to backend)
    console.log('Registration Data:', data);

    // Store in localStorage
    const registrations = JSON.parse(localStorage.getItem('registrations') || '[]');
    registrations.push({
        ...data,
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Show success message
    registrationForm.style.display = 'none';
    successMessage.classList.add('active');

    // Reinitialize icons in success message
    lucide.createIcons();
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
function initScrollAnimations() {
    const animatedElements = [
        ...document.querySelectorAll('.event-card'),
        ...document.querySelectorAll('.member-card'),
        ...document.querySelectorAll('.committee-group')
    ];

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    lucide.createIcons();
});

// ==================== Form Validation ====================
const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', (e) => {
    // Remove non-numeric characters
    e.target.value = e.target.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (e.target.value.length > 10) {
        e.target.value = e.target.value.slice(0, 10);
    }
});

// ==================== Dynamic Year in Footer ====================
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} FANATICUZ. All rights reserved.`;
}

// ==================== Performance Optimization ====================
// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        // Perform scroll-based operations here
    });
});

// ==================== Accessibility ====================
// Add keyboard navigation for modal
modal.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusableElements = modal.querySelectorAll(
            'button, input, select, textarea, a[href]'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// ==================== Detail Cards Animation on Hover ====================
document.querySelectorAll('.detail-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Event Cards Stagger Animation ====================
document.querySelectorAll('.event-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// ==================== Member Cards Stagger Animation ====================
document.querySelectorAll('.member-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.05}s`;
});

// ==================== Console Easter Egg ====================
console.log('%cFANATICUZ 2K26', 'color: #DC2626; font-size: 28px; font-weight: bold; font-family: Orbitron; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
console.log('%cCelebrating Innovation & Technologies', 'color: #1E40AF; font-size: 16px; font-weight: bold;');
console.log('%cDepartment of Computer Science', 'color: #4B5563; font-size: 13px;');
console.log('%c🕸️ With great power comes great responsibility! 🕷️', 'color: #DC2626; font-size: 14px; font-weight: bold;');
console.log('%c🕷️ Spider-Man Theme Activated! 🕸️', 'background: linear-gradient(135deg, #1E40AF, #DC2626); color: white; padding: 10px 20px; border-radius: 5px; font-size: 12px;');

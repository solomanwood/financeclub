/**
 * Financial Club Website - Main JavaScript
 * Handles smooth scrolling, interactive elements, and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    initSmoothScroll();
    initNavbarInteractions();
    initObserverAnimations();
    initCtaButton();
});

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                updateActiveLink(targetId);
            }
        });
    });
}

/**
 * Update active navigation link
 */
function updateActiveLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === activeId) {
            link.style.color = 'var(--gold)';
        } else {
            link.style.color = 'rgba(255, 255, 255, 0.9)';
        }
    });
}

/**
 * Navbar interactions on scroll
 */
function initNavbarInteractions() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 10) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15)';
        }
        
        updateActiveNavLink();
    });
    
    // Logo click to go home
    const logoSection = document.querySelector('.logo-section');
    logoSection.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Update active nav link based on scroll position
 */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 50;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        const targetId = link.getAttribute('href');
        if (targetId === '#' + currentSection) {
            link.style.color = 'var(--gold)';
        } else {
            link.style.color = 'rgba(255, 255, 255, 0.9)';
        }
    });
}

/**
 * Intersection Observer for animations
 */
function initObserverAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.club-card, .quote-container').forEach(el => {
        observer.observe(el);
    });
}

/**
 * CTA Button interaction
 */
function initCtaButton() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.position = 'absolute';
            ripple.style.width = size + 'px';
            ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.animation = 'ripple-animation 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                const clubsSection = document.querySelector('#clubs');
                if (clubsSection) {
                    const headerHeight = document.querySelector('.navbar').offsetHeight;
                    window.scrollTo({
                        top: clubsSection.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }, 300);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }
}

/**
 * Add ripple animation
 */
(function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
})();

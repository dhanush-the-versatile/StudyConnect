// Theme Management
let currentTheme = 'light';

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    
    themeToggle.addEventListener('click', () => {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
    });
}

// Navigation Management
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const pages = document.querySelectorAll('.page');
    const hamburger = document.getElementById('hamburgerBtn');
    const nav = document.getElementById('mainNav');

    // Handle navigation clicks
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = button.getAttribute('data-page');
            showPage(pageId);
            
            // Update active state
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Close mobile menu
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !nav.contains(e.target) && 
            !hamburger.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    // Handle hash navigation
    function handleHashChange() {
        let hash = window.location.hash.slice(1) || 'home';
        showPage(hash);
        
        // Update active nav button
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-page') === hash) {
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            }
        });
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

// Handle internal page links
function initInternalLinks() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('a[href^="#"]')) {
            const href = e.target.getAttribute('href');
            if (href && href.length > 1) {
                e.preventDefault();
                window.location.hash = href;
            }
        }
    });
}

// CTA Button Handlers
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-section .btn, .hero-buttons .btn');
    
    ctaButtons.forEach(button => {
        if (!button.getAttribute('href')) {
            button.addEventListener('click', () => {
                showNotification('Thank you for your interest! Our team will contact you soon.');
            });
        }
    });
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: var(--accent);
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Responsive menu handling
function handleResize() {
    const nav = document.getElementById('mainNav');
    
    if (window.innerWidth > 768) {
        nav.classList.remove('active');
    }
}

window.addEventListener('resize', handleResize);

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initInternalLinks();
    initCTAButtons();
});
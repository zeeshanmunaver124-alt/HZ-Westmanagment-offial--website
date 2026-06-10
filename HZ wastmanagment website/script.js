// ===============================================
// HZ WASTE MANAGEMENT - MAIN JAVASCRIPT FILE
// Professional Interactive Features
// ===============================================

// ===== 1. PAGE INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('HZ Waste Management - Page Loaded');
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initActiveNav();
    initBackToTop();
    initFormValidation();
    initButtonEffects();
});

// ===== 2. MOBILE MENU TOGGLE =====
function initMobileMenu() {
    // Check if mobile menu button exists
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuToggle) return; // Exit if no menu toggle button
    
    menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    if (navLinks) {
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// ===== 3. SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for empty hashes
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== 4. SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.card, .hero, section, .service-card, .feature-box'
    );
    
    // Set initial state
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const boxTop = el.getBoundingClientRect().top;
            
            if (boxTop < triggerBottom) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load
}

// ===== 5. ACTIVE NAVIGATION LINK ON SCROLL =====
function initActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// ===== 6. BACK TO TOP BUTTON =====
function initBackToTop() {
    // Create button if it doesn't exist
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTop.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTop);
        
        // Add inline styles
        Object.assign(backToTop.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            width: '50px',
            height: '50px',
            padding: '0',
            fontSize: '18px',
            background: 'linear-gradient(135deg, #f5b942, #f7c96f)',
            color: '#07101f',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'none',
            zIndex: '40',
            boxShadow: '0 10px 30px rgba(245, 185, 66, 0.25)',
            transition: 'all 0.3s ease',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: '0',
            transform: 'scale(0.8)'
        });
    }
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
            setTimeout(() => {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'scale(1)';
            }, 10);
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'scale(0.8)';
            setTimeout(() => {
                backToTop.style.display = 'none';
            }, 300);
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        if (window.scrollY > 300) {
            this.style.transform = 'scale(1)';
        }
    });
}

// ===== 7. FORM VALIDATION =====
function initFormValidation() {
    const form = document.querySelector('form');
    
    if (!form) return; // Exit if no form exists
    
    form.addEventListener('submit', function(e) {
        if (!validateForm(this)) {
            e.preventDefault();
            return false;
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    let isValid = true;
    const value = field.value.trim();
    const fieldType = field.type;
    const fieldName = field.name || field.id;
    
    // Remove previous error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    // Empty field check
    if (!value && field.required) {
        isValid = false;
        showFieldError(field, `${fieldName} is required`);
        return isValid;
    }
    
    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            showFieldError(field, 'Please enter a valid email address');
            return isValid;
        }
    }
    
    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
            isValid = false;
            showFieldError(field, 'Please enter a valid phone number');
            return isValid;
        }
    }
    
    // Min length check
    if (value && field.minLength && value.length < field.minLength) {
        isValid = false;
        showFieldError(field, `Minimum ${field.minLength} characters required`);
        return isValid;
    }
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('valid');
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    field.classList.remove('valid');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '0.85rem';
    errorDiv.style.marginTop = '4px';
    
    field.parentElement.appendChild(errorDiv);
}

// ===== 8. BUTTON EFFECTS & INTERACTIONS =====
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, button[type="submit"]');
    
    buttons.forEach(button => {
        // Ripple effect on click
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.position = 'absolute';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.background = 'rgba(255,255,255,0.5)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            // Add animation if not already in styles
            if (!document.querySelector('style[data-ripple]')) {
                const style = document.createElement('style');
                style.setAttribute('data-ripple', 'true');
                style.textContent = `
                    @keyframes rippleEffect {
                        to {
                            transform: scale(4);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
        
        // Disable multiple submissions
        if (button.type === 'submit') {
            button.addEventListener('click', function(e) {
                if (this.disabled) {
                    e.preventDefault();
                    return;
                }
            });
        }
    });
}

// ===== 9. UTILITY FUNCTIONS =====

// Throttle function for scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format phone number while typing
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value.length <= 3) {
            value = value;
        } else if (value.length <= 6) {
            value = value.slice(0, 3) + '-' + value.slice(3);
        } else {
            value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
        }
    }
    input.value = value;
}

// ===== 10. MODAL/DIALOG FUNCTIONALITY =====
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal on outside click
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// ===== 11. LOCAL STORAGE UTILITIES =====
const Storage = {
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    get: (key) => {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    },
    remove: (key) => localStorage.removeItem(key),
    clear: () => localStorage.clear()
};

// ===== 12. NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 500;
        z-index: 9999;
        animation: slideIn 0.3s ease;
        ${type === 'success' ? 'background: #4caf50; color: white;' : ''}
        ${type === 'error' ? 'background: #f44336; color: white;' : ''}
        ${type === 'warning' ? 'background: #ff9800; color: white;' : ''}
        ${type === 'info' ? 'background: #2196f3; color: white;' : ''}
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add animation styles for notifications
if (!document.querySelector('style[data-notifications]')) {
    const style = document.createElement('style');
    style.setAttribute('data-notifications', 'true');
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
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// ===== 13. PAGE VISIBILITY & PERFORMANCE =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden');
    } else {
        console.log('Page visible');
    }
});

// Log page load performance
window.addEventListener('load', function() {
    if (performance && performance.timing) {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time: ' + pageLoadTime + 'ms');
    }
});

// ===== 14. EXPORT FUNCTIONS FOR EXTERNAL USE =====
window.WasteManagement = {
    showNotification,
    openModal,
    closeModal,
    Storage,
    formatPhoneNumber,
    throttle,
    debounce
};

console.log('HZ Waste Management JavaScript loaded successfully');

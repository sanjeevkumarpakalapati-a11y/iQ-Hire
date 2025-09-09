// iQ Hire - Recruiter Platform JavaScript
// Light Theme Version - Separated from HTML and CSS

// ===========================================
// APPLICATION STATE
// ===========================================
const APP_STATE = {
    currentFilter: 'all',
    currentLocation: '',
    currentSearch: '',
    glowEnabled: false,
    recruiters: [
        {
            id: 1,
            name: 'Aarav Nair',
            title: 'Senior Tech Recruiter',
            location: 'bangalore',
            category: 'tech',
            placements: '150+',
            successRate: '98%',
            rating: '4.9',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150'
        },
        {
            id: 2,
            name: 'Isha Verma',
            title: 'Product & Design Recruiter',
            location: 'hyderabad',
            category: 'design',
            placements: '120+',
            successRate: '99%',
            rating: '5.0',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=150'
        },
        {
            id: 3,
            name: 'Rohit Shah',
            title: 'Finance & Ops Recruiter',
            location: 'mumbai',
            category: 'finance',
            placements: '165+',
            successRate: '98%',
            rating: '4.8',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150'
        }
    ]
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Animation utility
function animateElement(element, animationClass, duration = 600) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// ===========================================
// MOBILE MENU FUNCTIONALITY
// ===========================================
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    const navButtons = document.getElementById('nav-buttons');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                navLinks.classList.add('show');
                navButtons.classList.add('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
            } else {
                mobileMenu.classList.add('hidden');
                navLinks.classList.remove('show');
                navButtons.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when clicking on links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                navLinks.classList.remove('show');
                navButtons.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', throttle(() => {
            if (window.innerWidth >= 768) {
                mobileMenu.classList.add('hidden');
                navLinks.classList.remove('show');
                navButtons.classList.remove('show');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        }, 250));
    }
}

// ===========================================
// SEARCH AND FILTER FUNCTIONALITY
// ===========================================
function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const locationSelect = document.getElementById('location-select');
    const specializationSelect = document.getElementById('specialization-select');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const recruitersGrid = document.getElementById('recruiters-grid');

    // Filter recruiter cards
    function filterRecruiters() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const selectedLocation = locationSelect.value;
        const selectedSpecialization = specializationSelect.value;
        
        const recruiterCards = document.querySelectorAll('.recruiter-card');
        let visibleCount = 0;

        recruiterCards.forEach(card => {
            const category = card.dataset.category;
            const location = card.dataset.location;
            const name = card.querySelector('.recruiter-name').textContent.toLowerCase();
            const title = card.querySelector('.recruiter-title').textContent.toLowerCase();
            
            // Check if card matches filters
            const matchesSearch = !searchTerm || 
                name.includes(searchTerm) || 
                title.includes(searchTerm) || 
                category.includes(searchTerm);
            
            const matchesLocation = !selectedLocation || location === selectedLocation;
            const matchesSpecialization = !selectedSpecialization || category === selectedSpecialization;
            
            if (matchesSearch && matchesLocation && matchesSpecialization) {
                card.style.display = 'block';
                card.classList.add('fade-in', 'visible');
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.classList.remove('visible');
            }
        });

        // Show message if no results
        updateResultsMessage(visibleCount);
        
        // Track filter usage
        trackEvent('search_filter_applied', {
            search_term: searchTerm,
            location: selectedLocation,
            specialization: selectedSpecialization,
            results_count: visibleCount
        });
    }

    // Update results message
    function updateResultsMessage(count) {
        let existingMessage = document.querySelector('.search-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        if (count === 0) {
            const message = document.createElement('div');
            message.className = 'search-results-message text-center';
            message.style.cssText = `
                background-color: var(--color-surface);
                padding: 2rem;
                border-radius: 0.5rem;
                color: var(--color-text-secondary);
                grid-column: 1 / -1;
            `;
            message.innerHTML = `
                <h3 style="margin-bottom: 0.5rem; color: var(--color-text-primary);">No recruiters found</h3>
                <p>Try adjusting your search criteria or filters to find more recruiters.</p>
            `;
            recruitersGrid.appendChild(message);
        }
    }

    // Event listeners
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', filterRecruiters);
    }

    // Real-time search with debounce
    if (searchInput) {
        const debouncedSearch = debounce(filterRecruiters, 300);
        searchInput.addEventListener('input', debouncedSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                filterRecruiters();
            }
        });
    }

    // Filter dropdowns
    if (locationSelect) {
        locationSelect.addEventListener('change', filterRecruiters);
    }

    if (specializationSelect) {
        specializationSelect.addEventListener('change', filterRecruiters);
    }
}

// ===========================================
// GLOW EFFECT FUNCTIONALITY
// ===========================================
function initializeGlowEffect() {
    const toggleGlowBtn = document.getElementById('toggle-glow-btn');
    
    if (toggleGlowBtn) {
        toggleGlowBtn.addEventListener('click', () => {
            APP_STATE.glowEnabled = !APP_STATE.glowEnabled;
            
            const recruiterCards = document.querySelectorAll('.recruiter-card');
            const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
            
            if (APP_STATE.glowEnabled) {
                recruiterCards.forEach(card => card.classList.add('glow-effect'));
                buttons.forEach(btn => btn.classList.add('glow-effect'));
               // toggleGlowBtn.textContent = 'Disable Glow';
                
                // Add glow to hero elements
                const heroTitle = document.querySelector('.hero-title');
                const logoIcon = document.querySelector('.logo-icon');
                if (heroTitle) heroTitle.classList.add('glow-effect');
                if (logoIcon) logoIcon.classList.add('glow-effect');
            } else {
                recruiterCards.forEach(card => card.classList.remove('glow-effect'));
                buttons.forEach(btn => btn.classList.remove('glow-effect'));
                //toggleGlowBtn.textContent = 'Toggle Glow';
                
                // Remove glow from hero elements
                const heroTitle = document.querySelector('.hero-title');
                const logoIcon = document.querySelector('.logo-icon');
                if (heroTitle) heroTitle.classList.remove('glow-effect');
                if (logoIcon) logoIcon.classList.remove('glow-effect');
            }
            
            // Track glow toggle
            trackEvent('glow_toggled', {
                enabled: APP_STATE.glowEnabled
            });
            });
        });
    }
}

// ===========================================
// SMOOTH SCROLLING AND NAVIGATION
// ===========================================
function initializeSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink(activeId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === activeId) {
                link.classList.add('active');
            }
        });
    }

    // Scroll spy functionality
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    function updateActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = '#' + section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', throttle(updateActiveSection, 100));
}

// ===========================================
// RECRUITER CARD INTERACTIONS
// ===========================================
function initializeRecruiterCards() {
    const recruiterCards = document.querySelectorAll('.recruiter-card');
    
    recruiterCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Handle button clicks
        const viewProfileBtns = card.querySelectorAll('.btn-outline');
        const contactBtns = card.querySelectorAll('.btn-primary:not(.search-btn)');
        
        viewProfileBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const recruiterName = card.querySelector('.recruiter-name').textContent;
                
                // Simulate profile view
                showNotification(`Viewing profile for ${recruiterName}`, 'info');
                
                trackEvent('recruiter_profile_viewed', {
                    recruiter_name: recruiterName,
                    recruiter_category: card.dataset.category
                });
            });
        });
        
        contactBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const recruiterName = card.querySelector('.recruiter-name').textContent;
                
                // Simulate contact action
                showNotification(`Contacting ${recruiterName}...`, 'success');
                
                trackEvent('recruiter_contacted', {
                    recruiter_name: recruiterName,
                    recruiter_category: card.dataset.category
                });
            });
        });
    });
}

// ===========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===========================================
function initializeScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.recruiter-card, .search-form, .hero-text, .hero-image');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===========================================
// NOTIFICATION SYSTEM
// ===========================================
function showNotification(message, type = 'info', duration = 3000) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    const colors = {
        info: 'var(--color-info)',
        success: 'var(--color-success)',
        warning: 'var(--color-warning)',
        error: 'var(--color-error)'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-elevated);
        z-index: 1000;
        font-weight: 500;
        max-width: 300px;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);

    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ===========================================
// EVENT TRACKING SYSTEM
// ===========================================
function trackEvent(eventName, eventData = {}) {
    // Enhanced event tracking with user context
    const trackingData = {
        event: eventName,
        timestamp: new Date().toISOString(),
        page: 'homepage',
        user_agent: navigator.userAgent,
        screen_resolution: `${window.screen.width}x${window.screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        ...eventData
    };
    
    console.log('📊 Event Tracked:', eventName, trackingData);
    
    // Here you would integrate with your analytics service
    // Examples:
    // gtag('event', eventName, trackingData);
    // analytics.track(eventName, trackingData);
    // mixpanel.track(eventName, trackingData);
    
    // Store in localStorage for demo purposes
    const events = JSON.parse(localStorage.getItem('iq_hire_events') || '[]');
    events.push(trackingData);
    // Keep only last 50 events
    if (events.length > 50) {
        events.splice(0, events.length - 50);
    }
    localStorage.setItem('iq_hire_events', JSON.stringify(events));
}

// ===========================================
// PERFORMANCE MONITORING
// ===========================================
function initializePerformanceMonitoring() {
    // Measure page load performance
    window.addEventListener('load', () => {
        const loadTime = performance.now();
        trackEvent('page_loaded', {
            load_time: Math.round(loadTime),
            dom_content_loaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
            dom_interactive: performance.timing.domInteractive - performance.timing.navigationStart
        });
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((entryList) => {
            entryList.getEntries().forEach(entry => {
                if (entry.duration > 50) { // Long task threshold
                    trackEvent('long_task_detected', {
                        duration: Math.round(entry.duration),
                        start_time: Math.round(entry.startTime)
                    });
                }
            });
        });
        
        try {
            observer.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            console.log('Long task monitoring not supported');
        }
    }
}

// ===========================================
// ACCESSIBILITY ENHANCEMENTS
// ===========================================
function initializeAccessibility() {
    // Ensure proper focus management
    const focusableElements = document.querySelectorAll(
        'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    // Add focus indicators
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            if (!this.classList.contains('mouse-focused')) {
                this.style.outline = '2px solid var(--color-primary)';
                this.style.outlineOffset = '2px';
            }
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
            this.classList.remove('mouse-focused');
        });

        // Distinguish between mouse and keyboard focus
        element.addEventListener('mousedown', function() {
            this.classList.add('mouse-focused');
        });
    });

    // Keyboard navigation enhancements
    document.addEventListener('keydown', (e) => {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                document.getElementById('mobile-menu-btn').focus();
            }
        }
        
        // Enter key activates buttons and links
        if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
            e.target.click();
        }
    });

    // Announce dynamic content changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = 'position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden;';
    document.body.appendChild(announcer);

    window.announceToScreenReader = function(message) {
        announcer.textContent = message;
    };
}

// ===========================================
// ERROR HANDLING AND LOGGING
// ===========================================
function initializeErrorHandling() {
    window.addEventListener('error', (e) => {
        trackEvent('javascript_error', {
            error_message: e.message,
            error_filename: e.filename,
            error_line: e.lineno,
            error_column: e.colno,
            stack_trace: e.error ? e.error.stack : 'Not available'
        });
    });

    window.addEventListener('unhandledrejection', (e) => {
        trackEvent('promise_rejection', {
            reason: e.reason ? e.reason.toString() : 'Unknown rejection reason'
        });
    });
}

// ===========================================
// MAIN INITIALIZATION
// ===========================================
function initializeApp() {
    console.log('🚀 Initializing iQ Hire Platform...');
    
    // Core functionality
    initializeMobileMenu();
    initializeSearch();
    initializeGlowEffect();
    initializeSmoothScrolling();
    initializeRecruiterCards();
    initializeScrollAnimations();
    
    // Enhanced features
    initializePerformanceMonitoring();
    initializeAccessibility();
    initializeErrorHandling();
    
    // Track page view
    trackEvent('page_view', {
        page_title: document.title,
        page_url: window.location.href,
        referrer: document.referrer
    });
    
    console.log('✅ iQ Hire Platform initialized successfully!');
}

// ===========================================
// DOM CONTENT LOADED EVENT
// ===========================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// ===========================================
// WINDOW LOAD EVENT
// ===========================================
window.addEventListener('load', () => {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Initialize any remaining functionality that requires full page load
    console.log('🎉 iQ Hire Platform fully loaded!');
});

// ===========================================
// EXPORT FOR TESTING (if module system is used)
// ===========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_STATE,
        trackEvent,
        showNotification,
        debounce,
        throttle
    };
}
// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links with mobile support
    const navLinks = document.querySelectorAll('.nav-link, .btn[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = window.innerWidth <= 768 ? 60 : 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        // Touch support for mobile
        link.addEventListener('touchend', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = window.innerWidth <= 768 ? 60 : 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle with touch support
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        navMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        navMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
    
    // Event listeners for mobile menu
    if (mobileMenu) {
        mobileMenu.addEventListener('click', toggleMobileMenu);
        mobileMenu.addEventListener('touchend', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });
    }
    
    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
        link.addEventListener('touchend', function(e) {
            e.preventDefault();
            closeMobileMenu();
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });

    // Optimized scroll handling with throttling
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scroll-progress');
    let scrollTimeout;

    function updateScrollElements() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Update progress bar
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
        
        // Update navbar background
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
        
        // Update active navigation
        updateActiveNavigation();
    }

    function throttleScroll() {
        if (!scrollTimeout) {
            scrollTimeout = requestAnimationFrame(() => {
                updateScrollElements();
                scrollTimeout = null;
            });
        }
    }

    window.addEventListener('scroll', throttleScroll);

    // Active navigation based on scroll position
    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .highlight, .speaking-card, .skills-category, .contact-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace('+', ''));
            const increment = target / 50;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        
        heroObserver.observe(heroSection);
    }

    // Progressive skill bar animation
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            bar.style.transform = 'scaleX(1)';
        });
    };

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        const skillsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkillBars, 500);
                    skillsObserver.unobserve(entry.target);
                }
            });
        });
        
        skillsObserver.observe(skillsSection);
    }

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElement = document.querySelector('.hero-visual');
        if (parallaxElement) {
            const rate = scrolled * -0.5;
            parallaxElement.style.transform = `translateY(${rate}px)`;
        }
    });

    // Enhanced neural network animation
    const createConnections = () => {
        const nodes = document.querySelectorAll('.node');
        const container = document.querySelector('.neural-network');
        
        if (nodes.length > 0 && container) {
            // Clear existing connections
            const existingConnections = container.querySelectorAll('.connection');
            existingConnections.forEach(conn => conn.remove());
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const node1 = nodes[i];
                    const node2 = nodes[j];
                    
                    const connection = document.createElement('div');
                    connection.className = 'connection';
                    
                    const rect1 = node1.getBoundingClientRect();
                    const rect2 = node2.getBoundingClientRect();
                    const containerRect = container.getBoundingClientRect();
                    
                    const x1 = rect1.left - containerRect.left + rect1.width / 2;
                    const y1 = rect1.top - containerRect.top + rect1.height / 2;
                    const x2 = rect2.left - containerRect.left + rect2.width / 2;
                    const y2 = rect2.top - containerRect.top + rect2.height / 2;
                    
                    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
                    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                    
                    connection.style.cssText = `
                        position: absolute;
                        width: ${length}px;
                        height: 2px;
                        background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.3), transparent);
                        left: ${x1}px;
                        top: ${y1}px;
                        transform-origin: 0 50%;
                        transform: rotate(${angle}deg);
                        animation: connectionPulse 3s infinite;
                        animation-delay: ${Math.random() * 2}s;
                    `;
                    
                    container.appendChild(connection);
                }
            }
        }
    };

    // Add connection animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes connectionPulse {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.8; }
        }
        
        .skill-level::after {
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 1s ease-out;
        }
        
        .animate-in {
            animation: slideInUp 0.6s ease-out;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-menu.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .nav-toggle.active .bar:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active .bar:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize neural network connections
    setTimeout(createConnections, 100);
    
    // Recreate connections on window resize
    window.addEventListener('resize', () => {
        setTimeout(createConnections, 100);
    });

    // Add loading animation with mobile optimization
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);

    // Mobile-specific optimizations
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .node {
                    animation-duration: 3s;
                }
                .btn::before {
                    display: none;
                }
                .highlight:hover,
                .timeline-content:hover,
                .speaking-card:hover,
                .contact-card:hover {
                    transform: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced scroll-triggered animations
    const scrollAnimations = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Add scroll animations to all sections
    const sections = document.querySelectorAll('section > div');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        scrollAnimations.observe(section);
    });
});

// Performance optimization: Debounce scroll events
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(function() {
    // Scroll-dependent animations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Preload critical resources
const preloadResources = () => {
    const criticalFonts = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
    ];
    
    criticalFonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font;
        link.as = 'style';
        document.head.appendChild(link);
    });
};

preloadResources();
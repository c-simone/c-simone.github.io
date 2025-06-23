// Main JavaScript functionality

class NavigationManager {
    constructor() {
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section[id]');
        
        this.init();
    }
    
    init() {
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initActiveNavHighlighting();
    }
    
    initMobileMenu() {
        this.mobileMenuButton.addEventListener('click', () => {
            const isHidden = this.mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                this.mobileMenu.classList.remove('hidden');
                anime({
                    targets: this.mobileMenu,
                    opacity: [0, 1],
                    translateY: [-10, 0],
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            } else {
                anime({
                    targets: this.mobileMenu,
                    opacity: [1, 0],
                    translateY: [0, -10],
                    duration: 200,
                    easing: 'easeInQuad',
                    complete: () => {
                        this.mobileMenu.classList.add('hidden');
                    }
                });
            }
        });
    }
    
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    if (!this.mobileMenu.classList.contains('hidden')) {
                        this.mobileMenu.classList.add('hidden');
                    }
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initActiveNavHighlighting() {
        window.addEventListener('scroll', () => {
            let current = '';
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    new NavigationManager();
    
    // Initialize grid animation
    initGridAnimation();
});

// Page Animations and Interactive Effects

class PageAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.init();
    }
    
    init() {
        this.initHeroAnimations();
        this.initScrollAnimations();
        this.initCardAnimations();
        this.initTimelineAnimations();
        this.initParallaxEffects();
        this.initStatsAnimations();
    }
    
    initHeroAnimations() {
        // Hero section animations
        anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
        })
        .add({
            targets: '.hero-title',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: 300
        })
        .add({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 100
        }, '-=700')
        .add({
            targets: '.hero-description',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: 100
        }, '-=600')
        .add({
            targets: '.social-links a',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100)
        }, '-=500');
    }
    
    initScrollAnimations() {
        // Scroll animations for sections
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    
                    anime({
                        targets: entry.target,
                        translateY: [30, 0],
                        opacity: [0, 1],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        document.querySelectorAll('.section-fade').forEach(section => {
            observer.observe(section);
        });
    }
    
    initCardAnimations() {
        // Enhanced card animations
        document.querySelectorAll('.research-card, .publication-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                anime({
                    targets: this,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', function() {
                anime({
                    targets: this,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });
    }
    
    initTimelineAnimations() {
        // Timeline animations
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anime({
                        targets: entry.target.querySelectorAll('.timeline-item'),
                        translateX: [-50, 0],
                        opacity: [0, 1],
                        duration: 800,
                        delay: anime.stagger(200),
                        easing: 'easeOutExpo'
                    });
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        const experienceSection = document.querySelector('#experience');
        if (experienceSection) {
            timelineObserver.observe(experienceSection);
        }
    }
    
    initParallaxEffects() {
        // Parallax effect for scroll indicator and grid
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            // Scroll indicator fade
            const indicator = document.querySelector('.scroll-indicator');
            if (indicator) {
                indicator.style.opacity = Math.max(0, 1 - scrolled / 500);
            }
            
            // Grid intensity based on scroll
            const gridBg = document.querySelector('.grid-background');
            if (gridBg) {
                const scrollProgress = scrolled / (document.body.scrollHeight - window.innerHeight);
                const baseOpacity = 0.6;
                const newOpacity = baseOpacity + (scrollProgress * 0.2);
                gridBg.style.opacity = Math.min(newOpacity, 0.9);
            }
        });
    }
    
    initStatsAnimations() {
        // Statistics bars animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const verticalBars = entry.target.querySelectorAll('.chart-bar-vertical');
                    
                    // Animate vertical bars (for yearly citations)
                    verticalBars.forEach((bar, index) => {
                        const targetHeight = bar.style.height;
                        // Store the original height in a data attribute
                        bar.dataset.originalHeight = targetHeight;
                        bar.style.height = '0%';
                        
                        anime({
                            targets: bar,
                            height: targetHeight,
                            duration: 1200,
                            delay: index * 150,
                            easing: 'easeOutExpo'
                        });
                    });
                    
                    // Animate award count
                    const awardCount = entry.target.querySelector('.award-count');
                    if (awardCount) {
                        anime({
                            targets: awardCount,
                            innerHTML: [0, 6],
                            duration: 1000,
                            delay: 500,
                            easing: 'easeOutExpo',
                            round: 1
                        });
                    }
                    
                    // Animate company logos
                    const companyLogos = entry.target.querySelectorAll('.company-logo');
                    if (companyLogos.length > 0) {
                        anime({
                            targets: companyLogos,
                            scale: [0.8, 1],
                            opacity: [0, 1],
                            duration: 800,
                            delay: anime.stagger(150, {start: 600}),
                            easing: 'easeOutExpo'
                        });
                    }
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, this.observerOptions);

        // Find the statistics section and observe it
        const statsSection = document.querySelector('.py-20.bg-gray-50, .py-20[class*="bg-gray-50"]');
        if (statsSection && (statsSection.querySelector('.chart-bar') || statsSection.querySelector('.chart-bar-vertical'))) {
            statsObserver.observe(statsSection);
        }
    }
}

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new PageAnimations();
});

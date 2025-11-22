/**
 * App Module
 * Page animations, citation chart, and application initialization
 */

import { selectors, animations as animationConfig, citations as citationData, scroll as scrollConfig } from './config.js';
import { 
    safeQuery, 
    safeQueryAll, 
    createObserver,
    staggerFadeIn,
    fadeIn,
    slideUp,
    scale,
    EventBus,
    addListener,
    rafThrottle,
    onReady
} from './utils.js';
import { NavigationManager, ThemeManager, GridAnimationManager } from './components.js';

/**
 * Hero Animations
 * Handles entrance animations for hero section
 */
class HeroAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const timeline = anime.timeline({
            easing: animationConfig.easing.default,
            duration: animationConfig.durations.slow
        });
        
        const heroTitle = safeQuery(selectors.animations.hero.title);
        const heroSubtitle = safeQuery(selectors.animations.hero.subtitle);
        const heroDescription = safeQuery(selectors.animations.hero.description);
        const socialLinks = safeQueryAll(selectors.animations.hero.links);
        
        if (heroTitle) {
            timeline.add({
                targets: heroTitle,
                opacity: [0, 1],
                translateY: [50, 0],
                delay: 300
            });
        }
        
        if (heroSubtitle) {
            timeline.add({
                targets: heroSubtitle,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: 100
            }, '-=700');
        }
        
        if (heroDescription) {
            timeline.add({
                targets: heroDescription,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: 100
            }, '-=600');
        }
        
        if (socialLinks.length > 0) {
            timeline.add({
                targets: socialLinks,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(animationConfig.delays.stagger)
            }, '-=500');
        }
    }
}

/**
 * Scroll Animations
 * Handles scroll-triggered animations for sections
 */
class ScrollAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.initSectionFadeIns();
        this.initTimelineAnimations();
        this.initParallaxEffects();
    }
    
    initSectionFadeIns() {
        const sections = safeQueryAll('.section-fade');
        if (sections.length === 0) return;
        
        const observer = createObserver((entry, obs) => {
            entry.target.style.opacity = '1';
            
            anime({
                targets: entry.target,
                translateY: [30, 0],
                opacity: [0, 1],
                duration: animationConfig.durations.normal,
                easing: animationConfig.easing.default
            });
            
            obs.unobserve(entry.target);
        }, {
            threshold: scrollConfig.observerThreshold,
            rootMargin: scrollConfig.observerRootMargin
        });

        sections.forEach(section => observer.observe(section));
    }
    
    initTimelineAnimations() {
        const experienceSection = safeQuery('#experience');
        if (!experienceSection) return;
        
        const observer = createObserver((entry, obs) => {
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            
            if (timelineItems.length > 0) {
                anime({
                    targets: timelineItems,
                    translateX: [-50, 0],
                    opacity: [0, 1],
                    duration: animationConfig.durations.normal,
                    delay: anime.stagger(animationConfig.delays.staggerSlow),
                    easing: animationConfig.easing.default
                });
            }
            
            obs.unobserve(entry.target);
        }, {
            threshold: scrollConfig.observerThreshold,
            rootMargin: scrollConfig.observerRootMargin
        });

        observer.observe(experienceSection);
    }
    
    initParallaxEffects() {
        const handleScroll = rafThrottle(() => {
            const scrolled = window.pageYOffset;
            
            // Scroll indicator fade
            const indicator = safeQuery(selectors.animations.scrollIndicator);
            if (indicator) {
                indicator.style.opacity = Math.max(0, 1 - scrolled / 500);
            }
            
            // Grid intensity based on scroll
            const gridBg = safeQuery('.grid-background');
            if (gridBg) {
                const scrollProgress = scrolled / (document.body.scrollHeight - window.innerHeight);
                const baseOpacity = 0.8;
                const newOpacity = baseOpacity + (scrollProgress * 0.2);
                gridBg.style.opacity = Math.min(newOpacity, 1.0);
            }
        });
        
        addListener(window, 'scroll', handleScroll);
    }
}

/**
 * Card Animations
 * Handles hover animations for cards
 */
class CardAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        const cards = safeQueryAll('.research-card, .publication-card');
        
        cards.forEach(card => {
            addListener(card, 'mouseenter', () => {
                anime({
                    targets: card,
                    scale: 1.02,
                    duration: animationConfig.durations.fast,
                    easing: animationConfig.easing.smooth
                });
            });

            addListener(card, 'mouseleave', () => {
                anime({
                    targets: card,
                    scale: 1,
                    duration: animationConfig.durations.fast,
                    easing: animationConfig.easing.smooth
                });
            });
        });
    }
}

/**
 * Statistics Animations
 * Handles animations for statistics section including charts
 */
class StatsAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        // Find stats sections - try multiple selectors
        const statsSections = [
            ...safeQueryAll('.py-20.bg-gray-50'),
            ...safeQueryAll('.py-20.bg-white'),
            safeQuery('#statistics')
        ].filter(Boolean);
        
        if (statsSections.length === 0) return;
        
        const observer = createObserver((entry, obs) => {
            this.animateSection(entry.target);
            obs.unobserve(entry.target);
        }, {
            threshold: scrollConfig.observerThreshold,
            rootMargin: scrollConfig.observerRootMargin
        });

        statsSections.forEach(section => {
            // Only observe sections that have chart elements
            if (section.querySelector('.chart-bar-vertical') || 
                section.querySelector('.company-logo') ||
                section.querySelector('.award-count')) {
                observer.observe(section);
            }
        });
    }
    
    animateSection(section) {
        // Animate vertical bars (for yearly citations)
        const verticalBars = section.querySelectorAll('.chart-bar-vertical');
        verticalBars.forEach((bar, index) => {
            const targetHeight = bar.style.height || bar.dataset.height;
            if (targetHeight) {
                bar.dataset.originalHeight = targetHeight;
                bar.style.height = '0%';
                
                anime({
                    targets: bar,
                    height: targetHeight,
                    duration: animationConfig.durations.slow,
                    delay: index * 150,
                    easing: animationConfig.easing.default
                });
            }
        });
        
        // Animate award count
        const awardCount = section.querySelector('.award-count');
        if (awardCount) {
            const targetValue = parseInt(awardCount.textContent) || 6;
            anime({
                targets: awardCount,
                innerHTML: [0, targetValue],
                duration: animationConfig.durations.slow,
                delay: 500,
                easing: animationConfig.easing.default,
                round: 1
            });
        }
        
        // Animate company logos
        const companyLogos = section.querySelectorAll('.company-logo');
        if (companyLogos.length > 0) {
            anime({
                targets: companyLogos,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: animationConfig.durations.normal,
                delay: anime.stagger(150, {start: 600}),
                easing: animationConfig.easing.default
            });
        }
    }
}

/**
 * Citation Chart Manager
 * Renders and manages citation statistics chart
 */
export class CitationChart {
    constructor() {
        this.data = citationData;
        this.chartContainer = safeQuery(selectors.citations.container);
        this.totalCitationsElement = safeQuery(selectors.citations.totalCitations);
        this.hIndexElement = safeQuery(selectors.citations.hIndex);
        this.i10IndexElement = safeQuery(selectors.citations.i10Index);
        
        this.init();
    }
    
    init() {
        if (this.chartContainer) {
            this.renderChart();
        }
        this.updateStats();
        
        EventBus.emit('citations:ready');
    }
    
    renderChart() {
        const maxCitations = Math.max(...this.data.byYear.map(d => d.count));
        
        // Clear existing content
        this.chartContainer.innerHTML = '';

        this.data.byYear.forEach(item => {
            const percentage = (item.count / maxCitations) * 100;
            
            const barContainer = document.createElement('div');
            barContainer.className = 'flex flex-col items-center flex-1 h-full group';
            
            barContainer.innerHTML = `
                <div class="chart-container w-full bg-gray-200 dark:bg-gray-700 rounded-t h-full relative flex items-end">
                    <div class="chart-bar-vertical w-full rounded-t bg-teal-500 dark:bg-teal-400 transition-all duration-1000 ease-out" 
                         style="height: ${percentage}%" 
                         data-height="${percentage}%">
                    </div>
                    <!-- Tooltip -->
                    <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        ${item.count} citations
                    </div>
                </div>
                <div class="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">${item.year}</div>
                <div class="text-xs text-gray-700 dark:text-gray-300 font-semibold">${item.count}</div>
            `;

            this.chartContainer.appendChild(barContainer);
        });
    }
    
    updateStats() {
        if (this.totalCitationsElement) {
            this.totalCitationsElement.textContent = this.data.stats.totalCitations;
        }
        if (this.hIndexElement) {
            this.hIndexElement.textContent = this.data.stats.hIndex;
        }
        if (this.i10IndexElement) {
            this.i10IndexElement.textContent = this.data.stats.i10Index;
        }
    }
    
    updateData(newData) {
        this.data = newData;
        this.renderChart();
        this.updateStats();
    }
}

/**
 * Application Initialization
 */
class App {
    constructor() {
        this.components = {};
        this.init();
    }
    
    init() {
        // Initialize core components
        this.components.navigation = new NavigationManager();
        this.components.theme = new ThemeManager();
        this.components.grid = new GridAnimationManager();
        
        // Initialize animations
        this.components.heroAnimations = new HeroAnimations();
        this.components.scrollAnimations = new ScrollAnimations();
        this.components.cardAnimations = new CardAnimations();
        this.components.statsAnimations = new StatsAnimations();
        
        // Initialize citation chart
        this.components.citationChart = new CitationChart();
        
        // Animate theme toggle buttons
        if (this.components.theme) {
            this.components.theme.animateInitialLoad();
        }
        
        // Set up event listeners for component communication
        this.setupEventListeners();
        
        EventBus.emit('app:ready');
    }
    
    setupEventListeners() {
        // Listen for theme changes to update components if needed
        EventBus.on('theme:changed', (data) => {
            console.log('Theme changed to:', data.theme);
        });
        
        // Listen for navigation events
        EventBus.on('navigation:scrolled', (data) => {
            console.log('Scrolled to:', data.target);
        });
    }
    
    getComponent(name) {
        return this.components[name];
    }
}

// Initialize app when DOM is ready
onReady(() => {
    window.app = new App();
});

// Export for external access if needed
export default App;

/**
 * Configuration Module
 * Centralized configuration for all constants, settings, and data
 */

export const CONFIG = {
    // Animation settings
    animations: {
        durations: {
            fast: 300,
            normal: 800,
            slow: 1200,
            verySlow: 1500
        },
        easing: {
            default: 'easeOutExpo',
            smooth: 'easeInOutQuad',
            bounce: 'easeOutElastic(1, .5)'
        },
        delays: {
            stagger: 100,
            staggerSlow: 200
        }
    },

    // Grid animation settings
    grid: {
        size: 50, // Grid tile size in pixels
        proximity: {
            near: 120, // Distance for "near" hover effect
            close: 60  // Distance for "close" hover effect
        },
        debounceDelay: 16 // ~60fps
    },

    // Scroll and intersection observer settings
    scroll: {
        offset: 50, // Offset for navigation highlighting
        observerThreshold: 0.1,
        observerRootMargin: '0px 0px -10% 0px'
    },

    // Theme settings
    theme: {
        storageKey: 'theme',
        darkClass: 'dark',
        lightClass: 'light',
        transitionDuration: 300
    },

    // Citation data - Update this section to update the website
    citations: {
        byYear: [
            { year: 2020, count: 23 },
            { year: 2021, count: 63 },
            { year: 2022, count: 140 },
            { year: 2023, count: 174 },
            { year: 2024, count: 399 },
            { year: 2025, count: 570 }
        ],
        stats: {
            totalCitations: "1,370",
            hIndex: 16,
            i10Index: 23
        }
    },

    // DOM selectors - centralized to avoid magic strings
    selectors: {
        navigation: {
            mobileMenu: '#mobile-menu',
            mobileMenuButton: '#mobile-menu-button',
            navLinks: 'a[href^="#"]',
            sections: 'section[id]'
        },
        theme: {
            toggle: '#theme-toggle',
            mobileToggle: '#mobile-theme-toggle',
            html: 'html',
            gridBackground: '.grid-background'
        },
        grid: {
            background: '.grid-background',
            container: '.grid-background'
        },
        animations: {
            hero: {
                title: '.hero-title',
                subtitle: '.hero-subtitle',
                description: '.hero-description',
                links: '.hero-links a',
                profilePic: '.profile-pic'
            },
            sections: '.fade-in-section',
            cards: '.hover-card',
            timeline: '.timeline-item',
            scrollIndicator: '.scroll-indicator',
            citationBars: '.chart-bar-vertical',
            stats: '.py-20.bg-gray-50, .py-20.bg-white'
        },
        citations: {
            container: '#citation-chart-container',
            totalCitations: '#total-citations',
            hIndex: '#h-index',
            i10Index: '#i10-index'
        }
    },

    // Site metadata (for potential use in JS)
    site: {
        title: "Simone Conia",
        baseUrl: "https://c-simone.github.io",
        author: "Simone Conia"
    }
};

// Export individual sections for convenience
export const { animations, grid, scroll, theme, citations, selectors, site } = CONFIG;

// Export as default for full config access
export default CONFIG;

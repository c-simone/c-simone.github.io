/**
 * Components Module
 * Core UI components: Navigation, Theme, and Grid Animation
 */

import { selectors, theme as themeConfig, grid as gridConfig, animations as animationConfig } from './config.js';
import { 
    safeQuery, 
    safeQueryAll, 
    getStorage, 
    setStorage, 
    fadeIn, 
    fadeOut,
    rafThrottle,
    getDistance,
    EventBus,
    addListener
} from './utils.js';

/**
 * Navigation Manager
 * Handles mobile menu, smooth scrolling, and active nav highlighting
 */
export class NavigationManager {
    constructor() {
        this.mobileMenuButton = safeQuery(selectors.navigation.mobileMenuButton);
        this.mobileMenu = safeQuery(selectors.navigation.mobileMenu);
        this.navLinks = safeQueryAll('.nav-link');
        this.sections = safeQueryAll(selectors.navigation.sections);
        this.cleanupFunctions = [];
        
        this.init();
    }
    
    init() {
        if (this.mobileMenuButton && this.mobileMenu) {
            this.initMobileMenu();
        }
        this.initSmoothScrolling();
        this.initActiveNavHighlighting();
        
        // Emit ready event
        EventBus.emit('navigation:ready');
    }
    
    initMobileMenu() {
        const cleanup = addListener(this.mobileMenuButton, 'click', () => {
            const isHidden = this.mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                this.openMobileMenu();
            } else {
                this.closeMobileMenu();
            }
            
            EventBus.emit('navigation:menu-toggled', { isOpen: isHidden });
        });
        
        this.cleanupFunctions.push(cleanup);
    }
    
    openMobileMenu() {
        this.mobileMenu.classList.remove('hidden');
        anime({
            targets: this.mobileMenu,
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: animationConfig.durations.fast,
            easing: animationConfig.easing.smooth
        });
    }
    
    closeMobileMenu() {
        anime({
            targets: this.mobileMenu,
            opacity: [1, 0],
            translateY: [0, -10],
            duration: animationConfig.durations.fast,
            easing: animationConfig.easing.smooth,
            complete: () => {
                this.mobileMenu.classList.add('hidden');
            }
        });
    }
    
    initSmoothScrolling() {
        const anchors = safeQueryAll(selectors.navigation.navLinks);
        
        anchors.forEach(anchor => {
            const cleanup = addListener(anchor, 'click', (e) => {
                const href = anchor.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                
                e.preventDefault();
                const target = safeQuery(href);
                
                if (target) {
                    // Close mobile menu if open
                    if (this.mobileMenu && !this.mobileMenu.classList.contains('hidden')) {
                        this.closeMobileMenu();
                    }
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    EventBus.emit('navigation:scrolled', { target: href });
                }
            });
            
            this.cleanupFunctions.push(cleanup);
        });
    }
    
    initActiveNavHighlighting() {
        const handleScroll = rafThrottle(() => {
            let current = '';
            const scrollOffset = window.pageYOffset;
            
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
        
        const cleanup = addListener(window, 'scroll', handleScroll);
        this.cleanupFunctions.push(cleanup);
    }
    
    destroy() {
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
    }
}

/**
 * Theme Manager
 * Handles dark/light mode switching with persistence
 */
export class ThemeManager {
    constructor() {
        this.themeToggle = safeQuery(selectors.theme.toggle);
        this.mobileThemeToggle = safeQuery(selectors.theme.mobileToggle);
        this.html = document.documentElement;
        this.cleanupFunctions = [];
        
        this.init();
    }
    
    init() {
        // Check for saved theme preference or default to system preference
        const savedTheme = getStorage(themeConfig.storageKey);
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const currentTheme = savedTheme || systemTheme;
        
        // Apply theme on page load
        this.applyTheme(currentTheme, false);
        
        // Add event listeners
        if (this.themeToggle) {
            const cleanup1 = addListener(this.themeToggle, 'click', () => this.toggleTheme());
            this.cleanupFunctions.push(cleanup1);
        }
        
        if (this.mobileThemeToggle) {
            const cleanup2 = addListener(this.mobileThemeToggle, 'click', () => this.toggleTheme());
            this.cleanupFunctions.push(cleanup2);
        }
        
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleSystemThemeChange = (e) => {
            if (!getStorage(themeConfig.storageKey)) {
                this.applyTheme(e.matches ? 'dark' : 'light', false);
            }
        };
        const cleanup3 = addListener(mediaQuery, 'change', handleSystemThemeChange);
        this.cleanupFunctions.push(cleanup3);
        
        // Listen for theme changes from other tabs
        const handleStorageChange = (e) => {
            if (e.key === themeConfig.storageKey) {
                location.reload();
            }
        };
        const cleanup4 = addListener(window, 'storage', handleStorageChange);
        this.cleanupFunctions.push(cleanup4);
        
        EventBus.emit('theme:ready', { theme: currentTheme });
    }
    
    toggleTheme() {
        const isDark = this.html.classList.contains(themeConfig.darkClass);
        const newTheme = isDark ? 'light' : 'dark';
        
        // Animate the theme transition
        anime({
            targets: 'body',
            opacity: [1, 0.95, 1],
            duration: themeConfig.transitionDuration,
            easing: animationConfig.easing.smooth,
            complete: () => {
                this.applyTheme(newTheme, true);
                this.animateToggleButtons();
            }
        });
    }
    
    applyTheme(theme, animate = false) {
        const wasDark = this.html.classList.contains(themeConfig.darkClass);
        
        if (theme === 'dark') {
            this.html.classList.add(themeConfig.darkClass);
            setStorage(themeConfig.storageKey, 'dark');
        } else {
            this.html.classList.remove(themeConfig.darkClass);
            setStorage(themeConfig.storageKey, 'light');
        }
        
        if (animate) {
            this.updateGridBackground(wasDark);
        }
        
        EventBus.emit('theme:changed', { theme, wasDark });
    }
    
    animateToggleButtons() {
        const targets = [this.themeToggle, this.mobileThemeToggle].filter(Boolean);
        
        if (targets.length > 0) {
            anime({
                targets: targets,
                scale: [1, 1.1, 1],
                duration: 200,
                easing: animationConfig.easing.smooth
            });
        }
    }
    
    updateGridBackground(wasDark) {
        const gridBg = safeQuery(selectors.theme.gridBackground);
        if (gridBg) {
            anime({
                targets: gridBg,
                opacity: [gridBg.style.opacity || 1, 1],
                duration: themeConfig.transitionDuration,
                easing: animationConfig.easing.smooth
            });
        }
    }
    
    animateInitialLoad() {
        const targets = [this.themeToggle, this.mobileThemeToggle].filter(Boolean);
        
        if (targets.length > 0) {
            anime({
                targets: targets,
                scale: [0, 1],
                duration: 500,
                delay: 1000,
                easing: animationConfig.easing.bounce
            });
        }
    }
    
    getCurrentTheme() {
        return this.html.classList.contains(themeConfig.darkClass) ? 'dark' : 'light';
    }
    
    destroy() {
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
    }
}

/**
 * Grid Animation Manager
 * Interactive animated grid background with mouse proximity effects
 */
export class GridAnimationManager {
    constructor() {
        this.gridContainer = safeQuery(selectors.grid.container);
        if (!this.gridContainer) return;
        
        this.gridSize = gridConfig.size;
        this.proximityNear = gridConfig.proximity.near;
        this.proximityClose = gridConfig.proximity.close;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseMoving = false;
        this.mouseTimeout = null;
        this.animationFrame = null;
        this.tiles = [];
        this.cleanupFunctions = [];
        
        this.init();
    }
    
    init() {
        this.createGridTiles();
        this.initMouseTracking();
        this.initResizeHandler();
        
        EventBus.emit('grid:ready');
    }
    
    createGridTiles() {
        // Clear existing tiles
        const existingTiles = this.gridContainer.querySelectorAll('.grid-tile');
        existingTiles.forEach(tile => tile.remove());
        
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const columns = Math.ceil(windowWidth / this.gridSize);
        const rows = Math.ceil(windowHeight / this.gridSize);
        
        this.tiles = [];
        
        for (let row = 0; row < rows + 1; row++) {
            for (let col = 0; col < columns + 1; col++) {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                tile.style.left = `${col * this.gridSize}px`;
                tile.style.top = `${row * this.gridSize}px`;
                tile.dataset.row = row;
                tile.dataset.col = col;
                this.gridContainer.appendChild(tile);
                this.tiles.push(tile);
            }
        }
    }
    
    initMouseTracking() {
        const handleMouseMove = rafThrottle((e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMouseMoving = true;
            
            clearTimeout(this.mouseTimeout);
            this.updateTileProximity();
            
            // Reset hover effect after mouse stops moving
            this.mouseTimeout = setTimeout(() => {
                this.isMouseMoving = false;
                this.clearTileProximity();
            }, 500);
        });
        
        const cleanup = addListener(document, 'mousemove', handleMouseMove);
        this.cleanupFunctions.push(cleanup);
    }
    
    updateTileProximity() {
        this.tiles.forEach(tile => {
            const rect = tile.getBoundingClientRect();
            const tileCenterX = rect.left + rect.width / 2;
            const tileCenterY = rect.top + rect.height / 2;
            
            const distance = getDistance(this.mouseX, this.mouseY, tileCenterX, tileCenterY);
            
            // Remove existing proximity classes
            tile.classList.remove('hover-near', 'hover-close');
            
            if (this.isMouseMoving) {
                if (distance < this.proximityClose) {
                    tile.classList.add('hover-close');
                } else if (distance < this.proximityNear) {
                    tile.classList.add('hover-near');
                }
            }
        });
    }
    
    clearTileProximity() {
        this.tiles.forEach(tile => {
            tile.classList.remove('hover-near', 'hover-close');
        });
    }
    
    initResizeHandler() {
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.destroy();
                this.init();
                EventBus.emit('grid:resized');
            }, 100);
        };
        
        const cleanup = addListener(window, 'resize', handleResize);
        this.cleanupFunctions.push(cleanup);
    }
    
    destroy() {
        // Clear timeouts and animation frames
        clearTimeout(this.mouseTimeout);
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
        
        // Remove all tiles
        this.tiles.forEach(tile => tile.remove());
        this.tiles = [];
        
        // Remove event listeners
        this.cleanupFunctions.forEach(cleanup => cleanup());
        this.cleanupFunctions = [];
    }
}

/**
 * Utilities Module
 * Reusable helper functions for DOM manipulation, animations, and event handling
 */

import { animations as animationConfig } from './config.js';

/**
 * Event Bus for component communication
 * Allows decoupled communication between components
 */
export const EventBus = {
    events: {},

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },

    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(cb => cb !== callback);
    },

    emit(event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data));
    },

    clear(event) {
        if (event) {
            delete this.events[event];
        } else {
            this.events = {};
        }
    }
};

/**
 * Safe DOM query with error handling
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {Element|null}
 */
export function safeQuery(selector, context = document) {
    try {
        const element = context.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    } catch (error) {
        console.error(`Invalid selector: ${selector}`, error);
        return null;
    }
}

/**
 * Safe DOM query for multiple elements
 * @param {string} selector - CSS selector
 * @param {Element} context - Context element (default: document)
 * @returns {NodeList}
 */
export function safeQueryAll(selector, context = document) {
    try {
        return context.querySelectorAll(selector);
    } catch (error) {
        console.error(`Invalid selector: ${selector}`, error);
        return [];
    }
}

/**
 * Safe localStorage access with fallback
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*}
 */
export function getStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item !== null ? item : defaultValue;
    } catch (error) {
        console.warn('localStorage not available:', error);
        return defaultValue;
    }
}

/**
 * Safe localStorage write
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} - Success status
 */
export function setStorage(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.warn('localStorage write failed:', error);
        return false;
    }
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
export function debounce(func, wait) {
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

/**
 * Request animation frame throttle
 * @param {Function} callback - Function to throttle
 * @returns {Function}
 */
export function rafThrottle(callback) {
    let rafId = null;
    return function (...args) {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
            callback(...args);
            rafId = null;
        });
    };
}

/**
 * Animation Utilities using anime.js
 */

/**
 * Fade in animation
 * @param {Element|string} target - Target element or selector
 * @param {Object} options - Animation options
 * @returns {Object} anime instance
 */
export function fadeIn(target, options = {}) {
    return anime({
        targets: target,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: options.duration || animationConfig.durations.normal,
        easing: options.easing || animationConfig.easing.default,
        delay: options.delay || 0,
        ...options
    });
}

/**
 * Fade out animation
 * @param {Element|string} target - Target element or selector
 * @param {Object} options - Animation options
 * @returns {Object} anime instance
 */
export function fadeOut(target, options = {}) {
    return anime({
        targets: target,
        opacity: [1, 0],
        translateY: [0, -30],
        duration: options.duration || animationConfig.durations.fast,
        easing: options.easing || animationConfig.easing.default,
        delay: options.delay || 0,
        ...options
    });
}

/**
 * Slide up animation
 * @param {Element|string} target - Target element or selector
 * @param {Object} options - Animation options
 * @returns {Object} anime instance
 */
export function slideUp(target, options = {}) {
    return anime({
        targets: target,
        opacity: [0, 1],
        translateY: [50, 0],
        duration: options.duration || animationConfig.durations.normal,
        easing: options.easing || animationConfig.easing.default,
        delay: options.delay || 0,
        ...options
    });
}

/**
 * Scale animation
 * @param {Element|string} target - Target element or selector
 * @param {Object} options - Animation options
 * @returns {Object} anime instance
 */
export function scale(target, options = {}) {
    return anime({
        targets: target,
        scale: options.scale || [0.9, 1],
        duration: options.duration || animationConfig.durations.fast,
        easing: options.easing || animationConfig.easing.smooth,
        ...options
    });
}

/**
 * Stagger animation helper
 * @param {Element[]|string} targets - Target elements or selector
 * @param {Object} options - Animation options
 * @returns {Object} anime instance
 */
export function staggerFadeIn(targets, options = {}) {
    return anime({
        targets: targets,
        opacity: [0, 1],
        translateY: [30, 0],
        duration: options.duration || animationConfig.durations.normal,
        easing: options.easing || animationConfig.easing.default,
        delay: anime.stagger(options.stagger || animationConfig.delays.stagger),
        ...options
    });
}

/**
 * Create Intersection Observer with common options
 * @param {Function} callback - Callback function
 * @param {Object} options - Observer options
 * @returns {IntersectionObserver}
 */
export function createObserver(callback, options = {}) {
    const defaultOptions = {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -10% 0px'
    };

    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry, observer);
            }
        });
    }, defaultOptions);
}

/**
 * Smooth scroll to element
 * @param {Element|string} target - Target element or selector
 * @param {number} offset - Offset in pixels
 */
export function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? safeQuery(target) : target;
    if (!element) return;

    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Get current scroll position
 * @returns {number}
 */
export function getScrollTop() {
    return window.pageYOffset || document.documentElement.scrollTop;
}

/**
 * Check if element is in viewport
 * @param {Element} element - Element to check
 * @param {number} offset - Offset in pixels
 * @returns {boolean}
 */
export function isInViewport(element, offset = 0) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Add event listener with automatic cleanup
 * Returns cleanup function
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event listener options
 * @returns {Function} cleanup function
 */
export function addListener(element, event, handler, options = {}) {
    if (!element) return () => {};
    element.addEventListener(event, handler, options);
    return () => element.removeEventListener(event, handler, options);
}

/**
 * Wait for DOM to be ready
 * @param {Function} callback - Callback function
 */
export function onReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Get distance between two points
 * @param {number} x1 - First point X
 * @param {number} y1 - First point Y
 * @param {number} x2 - Second point X
 * @param {number} y2 - Second point Y
 * @returns {number}
 */
export function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

/**
 * Generate unique ID
 * @param {string} prefix - Optional prefix
 * @returns {string}
 */
export function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

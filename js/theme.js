// Theme Management System

class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.mobileThemeToggle = document.getElementById('mobile-theme-toggle');
        this.html = document.documentElement;
        
        this.init();
    }
    
    init() {
        // Check for saved theme preference or default to system preference
        const currentTheme = localStorage.getItem('theme') || 
                           (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        
        // Apply theme on page load
        if (currentTheme === 'dark') {
            this.html.classList.add('dark');
        }
        
        // Add event listeners
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        this.mobileThemeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
        
        // Listen for theme changes from other tabs
        window.addEventListener('storage', (e) => {
            if (e.key === 'theme') {
                location.reload();
            }
        });
    }
    
    toggleTheme() {
        const isDark = this.html.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        // Animate the theme transition
        anime({
            targets: 'body',
            opacity: [1, 0.8, 1],
            duration: 300,
            easing: 'easeInOutQuad',
            complete: () => {
                this.applyTheme(newTheme);
                this.animateToggleButtons();
                this.updateGridBackground(isDark);
            }
        });
    }
    
    applyTheme(theme) {
        if (theme === 'dark') {
            this.html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            this.html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }
    
    animateToggleButtons() {
        anime({
            targets: [this.themeToggle, this.mobileThemeToggle],
            scale: [1, 1.1, 1],
            duration: 200,
            easing: 'easeOutQuad'
        });
    }
    
    updateGridBackground(wasDark) {
        const gridBg = document.querySelector('.grid-background');
        if (gridBg) {
            anime({
                targets: gridBg,
                opacity: [gridBg.style.opacity || 0.4, wasDark ? 0.4 : 0.6],
                duration: 300,
                easing: 'easeInOutQuad'
            });
        }
    }
    
    animateInitialLoad() {
        // Theme toggle button animation on page load
        anime({
            targets: [this.themeToggle, this.mobileThemeToggle],
            scale: [0, 1],
            duration: 500,
            delay: 1000,
            easing: 'easeOutBounce'
        });
    }
}

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const themeManager = new ThemeManager();
    themeManager.animateInitialLoad();
});

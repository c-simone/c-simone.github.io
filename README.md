# Personal Website - Simone Conia

A modern, responsive personal portfolio website built with Tailwind CSS, anime.js, and vanilla JavaScript ES6 modules.

## 🌟 Features

- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Dark/Light Mode**: Smooth theme switching with localStorage persistence
- **Interactive Animations**: Scroll-triggered animations using anime.js and Intersection Observer
- **Animated Grid Background**: Mouse proximity effects for engaging user experience
- **Citation Statistics**: Dynamic chart visualization powered by data configuration
- **Modular Architecture**: Clean, maintainable ES6 module structure
- **Icon Library**: Tabler Icons for consistent, scalable iconography
- **GitHub Pages Compatible**: Simple static site deployment

## 📁 Project Structure

```
.
├── index.html              # Main HTML file
├── _config.yml            # Jekyll/GitHub Pages configuration
├── css/
│   └── styles.css         # Custom styles and animations
├── js/
│   ├── config.js          # Centralized configuration (data, settings, selectors)
│   ├── utils.js           # Reusable utility functions and helpers
│   ├── components.js      # Core UI components (Navigation, Theme, Grid)
│   ├── app.js             # Application initialization and animations
│   └── old/               # Backup of original JavaScript files
├── assets/
│   └── profile_pic.jpeg   # Profile image
├── build.sh               # Development build script
├── robots.txt             # SEO robots file
└── sitemap.xml            # SEO sitemap
```

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/c-simone/c-simone.github.io.git
   cd c-simone.github.io
   ```

2. **Serve locally**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using the build script
   bash build.sh
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

### GitHub Pages Deployment

The site is automatically deployed to GitHub Pages when you push to the main branch.

- **Live URL**: https://c-simone.github.io
- No build step required - pure static HTML/CSS/JS

## 🛠️ Technology Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** (CDN) - Utility-first CSS framework
- **JavaScript ES6 Modules** - Modern, modular code organization
- **anime.js** - Powerful animation library
- **Tabler Icons** - Beautiful icon set
- **Urbanist Font** - Clean, modern typography
- **GitHub Pages** - Free static site hosting

## 📝 Configuration

### Updating Content

#### Citation Data
Edit `js/config.js`:
```javascript
citations: {
    byYear: [
        { year: 2025, count: 570 },
        // Add more years...
    ],
    stats: {
        totalCitations: "1,370",
        hIndex: 16,
        i10Index: 23
    }
}
```

#### Animation Settings
Modify timing and easing in `js/config.js`:
```javascript
animations: {
    durations: {
        fast: 300,
        normal: 800,
        slow: 1200
    },
    easing: {
        default: 'easeOutExpo',
        smooth: 'easeInOutQuad'
    }
}
```

#### Site Metadata
Update `_config.yml` for Jekyll/SEO settings:
```yaml
title: "Your Name | Title"
description: "Your description"
url: "https://your-username.github.io"
```

## 🎨 Architecture

### Modular JavaScript Structure

The JavaScript is organized into 4 main modules:

1. **config.js** - Configuration and constants
   - Animation settings
   - Grid parameters
   - Citation data
   - DOM selectors
   - Site metadata

2. **utils.js** - Utility functions
   - Event bus for component communication
   - Safe DOM manipulation
   - Animation helpers
   - Intersection Observer wrappers
   - Storage management

3. **components.js** - Core UI components
   - `NavigationManager` - Mobile menu, smooth scrolling, active highlighting
   - `ThemeManager` - Dark/light mode with persistence
   - `GridAnimationManager` - Interactive grid background

4. **app.js** - Application logic
   - `HeroAnimations` - Hero section entrance animations
   - `ScrollAnimations` - Scroll-triggered section animations
   - `CardAnimations` - Hover effects for cards
   - `StatsAnimations` - Chart and statistics animations
   - `CitationChart` - Citation data visualization
   - `App` - Main application initialization

### Component Communication

Components communicate via an event bus pattern, reducing tight coupling:

```javascript
// Emit events
EventBus.emit('theme:changed', { theme: 'dark' });

// Listen to events
EventBus.on('theme:changed', (data) => {
    console.log('Theme changed to:', data.theme);
});
```

### Design Patterns

- **Module Pattern**: ES6 modules for encapsulation
- **Observer Pattern**: Event bus for loose coupling
- **Utility Functions**: DRY principle for common operations
- **Configuration Object**: Centralized settings management
- **Defensive Programming**: Safe DOM queries with error handling

## 🎯 Key Features Explained

### Interactive Grid Background

Mouse proximity detection creates a dynamic grid effect:
- Tiles respond to cursor position
- RAF-throttled for smooth performance
- Responsive to window resizing
- Configurable proximity distances

### Theme Management

Smart theme system with multiple sources:
- User preference (localStorage)
- System preference (prefers-color-scheme)
- Manual toggle with smooth transitions
- Cross-tab synchronization

### Scroll Animations

Performant scroll-triggered animations:
- Intersection Observer API (no scroll listeners)
- Staggered entrance animations
- Parallax effects
- Responsive thresholds

### Citation Chart

Data-driven visualization:
- Configuration-based data source
- Animated bar charts
- Hover tooltips
- Responsive design

## 🔧 Development

### Adding New Features

1. **Add configuration** to `js/config.js`
2. **Create utilities** in `js/utils.js` if needed
3. **Build component** in `js/components.js` or `js/app.js`
4. **Initialize** in the App class

### Code Style

- Use ES6+ features (arrow functions, destructuring, template literals)
- Follow event-driven architecture
- Emit events for major state changes
- Use utility functions for common operations
- Add JSDoc comments for complex functions

### Performance Tips

- Use `rafThrottle` for scroll/mouse handlers
- Leverage Intersection Observer for visibility detection
- Minimize DOM queries with caching
- Use CSS animations where possible
- Debounce expensive operations

## 📦 Refactoring Summary

### What Changed (November 2025)

**From**: 5 separate JavaScript files with duplicated code and tight coupling
**To**: 3 modular ES6 files with clean architecture

#### File Consolidation
- ❌ `main.js` (85 lines)
- ❌ `theme.js` (105 lines)
- ❌ `grid-animation.js` (113 lines)
- ❌ `animations.js` (203 lines)
- ❌ `citations.js` (74 lines)
- ✅ `config.js` (122 lines) - NEW
- ✅ `utils.js` (330 lines) - NEW
- ✅ `components.js` (380 lines) - Consolidated 3 files
- ✅ `app.js` (380 lines) - Consolidated 2 files

#### Improvements
- **Configuration Centralized**: All magic numbers and settings in one place
- **Utilities Extracted**: 20+ reusable functions for DRY code
- **Event Bus Added**: Decoupled component communication
- **Error Handling**: Safe DOM queries with fallbacks
- **Icons Modernized**: 12 inline SVGs replaced with Tabler Icons
- **Module Pattern**: ES6 imports/exports for better organization
- **Performance**: RAF throttling and debouncing optimized

#### Benefits
- **Maintainability**: Clear separation of concerns
- **Readability**: Self-documenting code with proper naming
- **Testability**: Pure functions and dependency injection ready
- **Extensibility**: Easy to add new features
- **Performance**: Optimized event handling and animations

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

MIT License - See LICENSE file for details

## 👤 Author

**Simone Conia**
- Website: https://c-simone.github.io
- Google Scholar: https://scholar.google.com/citations?user=5C4gTY4AAAAJ
- LinkedIn: https://linkedin.com/in/simone-conia
- GitHub: https://github.com/simone-conia

## 🙏 Credits

- **Tailwind CSS** - Utility-first CSS framework
- **anime.js** - Animation library
- **Tabler Icons** - Icon set
- **Urbanist Font** - Typography

---

**Last Updated**: November 22, 2025  
**Version**: 2.0 (Refactored Architecture)

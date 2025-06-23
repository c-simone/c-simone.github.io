# Simone Conia - Academic Website

A modern, minimal academic website built with Tailwind CSS and anime.js, designed specifically for researchers and academics. Features smooth animations, responsive design, and GitHub Pages compatibility.

## Features

- **Modern Design**: Clean, minimal design with teal accents and subtle color palette
- **Dark/Light Mode**: Smooth animated toggle between light and dark themes with system preference detection
- **Smooth Animations**: Powered by anime.js for elegant transitions and interactions
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **GitHub Pages Ready**: Static HTML/CSS/JS for easy deployment
- **Academic Sections**:
  - Hero section with profile photo and social links
  - About section highlighting research interests
  - Current research overview with interactive cards
  - Publications showcase with hover effects
  - Experience and education timeline
  - Contact section with research interests tags
- **Interactive Navigation**: Smooth scrolling with active state indicators and mobile menu
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance Focused**: Lightweight with CDN-based dependencies

## Tech Stack

- **HTML5**: Semantic markup
- **Tailwind CSS**: Utility-first CSS framework (via CDN)
- **Anime.js**: Lightweight animation library (via CDN)
- **Inter Font**: Modern, readable typography

## Live Demo

Visit the live website: [Your GitHub Pages URL will be here]

## Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Customize Content

The website is designed for Simone Conia but can be easily customized:

#### Personal Information

- Replace profile photo in `assets/profile_pic.jpg`
- Update name, title, and affiliation in the hero section
- Modify research interests and about section content
- Update social media links (Google Scholar, LinkedIn, GitHub, Email)

#### Research Content

- Edit the "Current Research" section with your research areas
- Update the "Publications" section with your papers
- Modify the "Experience & Education" timeline
- Adjust research interest tags in the contact section

#### Styling

- The site uses a teal accent color (`#14b8a6`) which can be changed in the Tailwind config
- Animations can be customized in the JavaScript section
- Layout and spacing can be adjusted using Tailwind utility classes

#### `styles.css`

- Customize colors in the `:root` CSS variables if desired
- Adjust fonts or spacing as needed

#### `script.js`

- The animations should work out of the box
- Customize watercolor colors if desired

### 3. Local Development

To preview the site locally:

1. Open `index.html` in your web browser
2. Or use a simple HTTP server:

   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve .
   
   # Using PHP
   php -S localhost:8000
   ```

3. Navigate to `http://localhost:8000`

### 4. Deployment to GitHub Pages

1. Push your changes to the main branch
2. Go to repository Settings → Pages
3. Select "Deploy from a branch" and choose "main"
4. Your site will be live at `https://yourusername.github.io/repository-name`

## Customization Guide

This guide provides an overview of the modular structure of the personal website, detailing how to customize and extend it for your own academic profile.

### Structure Overview

The website is organized into a modular structure for better maintainability and scalability. The main components are:

- **HTML**: Main structure and content
- **CSS**: All custom styles consolidated into a single stylesheet
- **JavaScript**: Modular scripts for functionality and animations
- **Assets**: Images and other static files

```plaintext
personal-website/
├── index.html              # Main HTML file (482 lines, reduced from 1162)
├── favicon.svg
├── robots.txt
├── assets/
│   └── profile_pic.jpg
├── css/
│   └── styles.css          # All custom CSS styles
└── js/
    ├── main.js             # Core navigation and initialization
    ├── theme.js            # Theme management system
    ├── grid-animation.js   # Interactive grid background
    └── animations.js       # Page animations and effects
```

### CSS Module

- **`css/styles.css`**: Contains all custom CSS styles previously embedded in the HTML
  - Layout styles (gradient backgrounds, floating animations)
  - Component styles (navigation, cards, timeline)
  - Theme-specific styles (dark/light mode)
  - Grid background and animation styles

### JavaScript Modules

#### `js/main.js`

- Core navigation functionality
- Mobile menu management
- Smooth scrolling
- Active navigation highlighting
- Main initialization

#### `js/theme.js`

- Theme management system (ThemeManager class)
- Dark/light mode toggle
- Theme persistence in localStorage
- System theme preference detection
- Smooth theme transitions

#### `js/grid-animation.js`

- Interactive grid background system
- Mouse proximity effects
- Animated trails and pulses
- Performance-optimized animations
- Responsive grid resizing

#### `js/animations.js`

- Page load animations (PageAnimations class)
- Scroll-triggered animations
- Card hover effects
- Timeline animations
- Parallax effects

### Colors and Theming

The website uses a carefully selected color palette with teal as the primary accent:

- **Primary Teal**: `#14b8a6` (used for links, buttons, accents)
- **Background**: Gradient from teal-50 to blue-50
- **Text**: Various shades of gray for hierarchy

To change the color scheme, modify the Tailwind config in the HTML head section.

### Animations

Animations are powered by anime.js and include:

- **Hero section**: Staggered fade-in animations for title, subtitle, and social links
- **Scroll animations**: Sections fade in as they enter viewport
- **Card interactions**: Subtle hover effects with scale transforms
- **Timeline**: Sequential animation of timeline items
- **Navigation**: Smooth scrolling between sections

### Dark/Light Mode

The website features a sophisticated dark/light mode system:

- **Theme Toggle**: Elegant toggle button in the navigation (both desktop and mobile)
- **System Preference Detection**: Automatically detects user's system theme preference
- **Local Storage**: Remembers user's theme choice across sessions
- **Smooth Transitions**: Animated theme switching with anime.js
- **Comprehensive Coverage**: All elements properly styled for both themes

#### Color Schemes

**Light Mode:**

- Background: Soft gradient from teal-50 to blue-50
- Text: Various shades of gray for proper hierarchy
- Cards: White backgrounds with subtle shadows
- Accents: Teal-600 for interactive elements

**Dark Mode:**

- Background: Deep gradient from slate-900 to slate-800
- Text: Light grays and whites for readability
- Cards: Dark gray backgrounds with enhanced shadows
- Accents: Teal-400 for better contrast in dark theme

### Adding New Sections

To add a new section:

1. Add HTML structure following existing patterns
2. Include appropriate `id` attribute for navigation
3. Add navigation link to the menu
4. Apply `.section-fade` class for scroll animations
5. Update mobile menu if needed

### SEO Optimization

The website includes:

- Semantic HTML structure
- Open Graph meta tags
- Proper heading hierarchy
- Alt text for images
- Structured data ready markup

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design for mobile devices
- Graceful degradation for older browsers

## Dependencies

All dependencies are loaded via CDN:

- **Tailwind CSS**: v3.x (latest)
- **Anime.js**: v3.2.1
- **Inter Font**: Google Fonts

## Performance

- Fast loading with CDN resources
- Optimized images and fonts
- Minimal JavaScript footprint

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests!

## Contact

For questions about this template, please reach out via the contact information on the website.

---

**Note**: Remember to replace placeholder content with your actual information before deploying!

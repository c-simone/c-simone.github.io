#!/bin/bash

# Personal Website Build Script
# This script helps with development and deployment tasks

set -e

echo "🚀 Personal Website Build Script"
echo "================================"

# Function to start a local development server
start_dev_server() {
    echo "📡 Starting local development server..."
    
    # Check if Python 3 is available
    if command -v python3 &> /dev/null; then
        echo "Using Python 3 HTTP server on port 8080"
        echo "📱 Open http://localhost:8080 in your browser"
        python3 -m http.server 8080
    elif command -v python &> /dev/null; then
        echo "Using Python 2 HTTP server on port 8080"
        echo "📱 Open http://localhost:8080 in your browser"
        python -m SimpleHTTPServer 8080
    else
        echo "❌ Python not found. Please install Python to run the development server."
        exit 1
    fi
}

# Function to validate HTML
validate_html() {
    echo "🔍 Validating HTML structure..."
    
    if command -v tidy &> /dev/null; then
        tidy -q -e index.html
        echo "✅ HTML validation complete"
    else
        echo "⚠️  HTML Tidy not found. Skipping HTML validation."
        echo "   Install with: brew install tidy-html5 (macOS) or apt-get install tidy (Linux)"
    fi
}

# Function to check CSS syntax
check_css() {
    echo "🎨 Checking CSS files..."
    
    if [ -f "css/styles.css" ]; then
        echo "✅ CSS file found: css/styles.css"
        
        # Basic CSS syntax check
        if grep -q "}" css/styles.css && grep -q "{" css/styles.css; then
            echo "✅ CSS syntax looks good"
        else
            echo "❌ CSS syntax issues detected"
            exit 1
        fi
    else
        echo "❌ CSS file not found: css/styles.css"
        exit 1
    fi
}

# Function to check JavaScript files
check_js() {
    echo "📜 Checking JavaScript files..."
    
    js_files=("js/app.js" "js/components.js" "js/config.js" "js/utils.js")
    
    for file in "${js_files[@]}"; do
        if [ -f "$file" ]; then
            echo "✅ JavaScript file found: $file"
        else
            echo "❌ JavaScript file not found: $file"
            exit 1
        fi
    done
    
    echo "✅ All JavaScript files present"
}

# Function to optimize images
optimize_images() {
    echo "🖼️  Checking images..."
    
    if [ -f "assets/profile_pic.jpg" ]; then
        echo "✅ Profile image found"
        
        # Check image size
        file_size=$(du -h "assets/profile_pic.jpg" | cut -f1)
        echo "📊 Profile image size: $file_size"
        
        if command -v identify &> /dev/null; then
            dimensions=$(identify -format "%wx%h" "assets/profile_pic.jpg")
            echo "📐 Profile image dimensions: $dimensions"
        fi
    else
        echo "⚠️  Profile image not found: assets/profile_pic.jpg"
    fi
    
    if [ -f "favicon.svg" ]; then
        echo "✅ Favicon found"
    else
        echo "⚠️  Favicon not found: favicon.svg"
    fi
}

# Function to show project statistics
show_stats() {
    echo "📊 Project Statistics"
    echo "===================="
    
    if [ -f "index.html" ]; then
        html_lines=$(wc -l < index.html)
        echo "📄 HTML lines: $html_lines"
    fi
    
    if [ -f "css/styles.css" ]; then
        css_lines=$(wc -l < css/styles.css)
        echo "🎨 CSS lines: $css_lines"
    fi
    
    js_total=0
    for file in js/*.js; do
        if [ -f "$file" ]; then
            lines=$(wc -l < "$file")
            js_total=$((js_total + lines))
            echo "📜 $(basename "$file"): $lines lines"
        fi
    done
    echo "📜 Total JS lines: $js_total"
    
    total_files=$(find . -name "*.html" -o -name "*.css" -o -name "*.js" | wc -l)
    echo "📁 Total source files: $total_files"
}

# Main script logic
case "${1:-help}" in
    "dev"|"serve")
        start_dev_server
        ;;
    "validate"|"check")
        validate_html
        check_css
        check_js
        optimize_images
        echo "✅ All checks completed successfully!"
        ;;
    "stats")
        show_stats
        ;;
    "help"|*)
        echo "Usage: ./build.sh [command]"
        echo ""
        echo "Commands:"
        echo "  dev, serve    Start local development server"
        echo "  validate      Validate HTML, CSS, and JS files"
        echo "  stats         Show project statistics"
        echo "  help          Show this help message"
        echo ""
        echo "Examples:"
        echo "  ./build.sh dev       # Start development server"
        echo "  ./build.sh validate  # Check all files"
        echo "  ./build.sh stats     # Show project stats"
        ;;
esac

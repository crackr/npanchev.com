# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the personal website repository for npanchev.com. The project is currently empty and ready for initial setup.

## Development Setup

This is a portfolio website built with modern HTML5, CSS3, and JavaScript. 

### Local Development
```bash
# Install dependencies (optional - for live server)
npm install

# Start development server
npm run dev
# OR serve with any static server
python -m http.server 3000
```

### Git Configuration
The repository is configured with GitHub authentication. The remote origin is set up for the crackr/npanchev.com repository.

### Deployment
The site is deployed to GitHub Pages and can also be deployed to:
- Netlify
- Vercel  
- Any static hosting provider

## Architecture Notes

**Frontend Stack:**
- Pure HTML5, CSS3, JavaScript (no framework dependencies)
- Responsive design with mobile-first approach
- CSS Grid and Flexbox for layouts
- Progressive enhancement philosophy

**Key Features:**
- Interactive experience timeline
- Animated skill showcases
- Contact form with validation
- SEO optimization with meta tags and sitemap
- Performance optimized with lazy loading and efficient CSS

**File Structure:**
- `index.html` - Main page structure
- `styles.css` - Complete responsive styling
- `script.js` - Interactive functionality
- `manifest.json` - PWA configuration
- `sitemap.xml` - SEO sitemap
- `robots.txt` - Search engine directives
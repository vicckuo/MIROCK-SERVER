# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Mirock Photo Server is a React-based image/video viewing and sharing application. Users can view and download images and videos through URL-based routing. The application includes expiration checking and download functionality for media files.

Key features:
- URL-based image/video serving (e.g., `/mirock/123` or `/mirock/hamilton/456`)
- Countdown timer for expiration tracking
- Download functionality for both images and videos
- Social media integration
- Responsive design with Tailwind CSS

## Technology Stack

- **Frontend**: React 18 with React Router
- **Styling**: Tailwind CSS
- **Additional Libraries**: 
  - `react-countdown` for expiration timers
  - `react-icons` for social media icons
  - `react-share` for sharing functionality
  - `react-helmet` for SEO meta tags

## Project Structure

```
src/
├── App.js                    # Main router component
├── components/
│   ├── ImageLoader.js       # Core image/video loading and display logic
│   └── SocialMedia.js       # Social media links component
├── assets/images/           # Static image assets
└── index.js                 # React entry point
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Run tests
npm test

# Build for production
npm run build
```

## Architecture Notes

### URL Routing Pattern
- `/mirock/:imageId` - Direct image access
- `/mirock/hamilton/:imageId` - Vendor-specific image access
- URLs dynamically construct image/video paths from `https://pics.easy4music.com/mirock/`

### Media Loading Logic
- Checks both `.jpg` and `.mp4` extensions for each media ID
- Validates media availability with HEAD requests
- Implements expiration checking based on `last-modified` headers (7-day expiry)
- Handles download functionality with Web Share API fallback

### Styling Approach
- Uses Tailwind CSS with custom color palette
- Responsive design (mobile-first)
- Custom gradient backgrounds for buttons
- Conditional watermark rendering based on URL structure
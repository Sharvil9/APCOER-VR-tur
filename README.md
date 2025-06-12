# APCOER VR Campus Tour Website

This is the official repository for the Anantrao Pawar College of Engineering & Research (APCOER) Virtual Reality Campus Tour website. The website allows prospective students and visitors to explore the APCOER campus through an immersive VR experience.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [VR Tour Integration](#vr-tour-integration)
- [Technologies Used](#technologies-used)
- [Browser Compatibility](#browser-compatibility)
- [SEO Optimization](#seo-optimization)
- [Accessibility Features](#accessibility-features)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

The APCOER VR Campus Tour website is designed to provide an interactive virtual experience of the campus facilities, departments, and environment. The site is responsive, accessible, and optimized for various devices and browsers.

## Features

- **Responsive Design**: Adapts seamlessly to all device sizes (desktop, tablet, mobile)
- **VR Tour**: Interactive virtual reality tour of the campus
- **Non-VR Alternative**: Web-based tour option for users without VR equipment
- **User-Friendly Navigation**: Intuitive menus and controls
- **Detailed Information**: Comprehensive details about programs, facilities, and departments
- **Feedback System**: User feedback collection for continuous improvement
- **Download Center**: Downloadable resources for prospective students
- **Contact Forms**: Easy ways to get in touch with the institution
- **Fast Loading**: Optimized for quick page loading

## Installation

To run this website locally:

1. Clone the repository:
   ```
   git clone https://github.com/apcoer/vr-campus-tour.git
   ```

2. Navigate to the project directory:
   ```
   cd vr-campus-tour
   ```

3. Open the index.html file in your browser, or use a local server like Live Server for VS Code.

## Project Structure

```
/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── script.js           # Main JavaScript file
├── images/                 # Image assets
│   ├── apcoer-logo.png     # APCOER logo
│   ├── college-building.jpg# College building image
│   ├── favicon.ico         # Website favicon
│   └── vr-preview.jpg      # VR tour preview image
├── videos/                 # Video assets
│   └── campus-tour-preview.mp4 # Preview video
└── vr-tour/                # VR tour files (to be integrated)
```

## VR Tour Integration

The VR tour functionality should be integrated using one of the following methods:

### Option 1: A-Frame Integration
For A-Frame-based VR experiences, add the following to the head section of your HTML:

```html
<script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
<script src="js/vr-tour.js"></script>
```

Then implement the tour in the `vr-tour.js` file using the configuration from `script.js`.

### Option 2: Third-party VR Tour Service
To integrate with services like Matterport, ThreeJS, or other VR platforms, modify the "Launch VR Tour" button event handler in `script.js` to open the appropriate URL or embed the tour iframe.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Font Awesome for icons
- Mobile-first responsive design
- Intersection Observer API for lazy loading

## Browser Compatibility

The website is tested and compatible with:
- Chrome 70+
- Firefox 63+
- Safari 12+
- Edge 79+
- Opera 60+

## SEO Optimization

The website includes the following SEO optimizations:
- Semantic HTML structure
- Meta tags for description and keywords
- Proper heading hierarchy
- Image alt attributes
- Schema.org markup for educational institution
- Mobile-friendly design
- Optimized page loading speed

## Accessibility Features

- WCAG 2.1 AA compliance
- Semantic HTML
- Alternative text for images
- Keyboard navigation support
- Sufficient color contrast
- Screen reader compatibility
- Focus indicators for interactive elements
- Resizable text without breaking layouts

## Customization Guide

### Changing Colors
To update the color scheme, modify the CSS variables in the `:root` selector in `style.css`:

```css
:root {
  --primary: #800020; /* Main color - APCOER's maroon */
  --secondary: #f5a425; /* Accent color - gold/yellow */
  /* Other variables */
}
```

### Adding New Sections
To add new sections to the page:

1. Add the HTML markup to `index.html`
2. Style the section in `style.css`
3. Add any necessary JavaScript functionality in `script.js`

### Updating Content
Edit the content in `index.html` to update text, images, or links.

## Deployment

To deploy the website to production:

1. Optimize all images and videos for web
2. Minify CSS and JavaScript files
3. Test on various devices and browsers
4. Upload all files to your web hosting server
5. Ensure HTTPS is enabled
6. Set up proper redirects if needed
7. Test the deployed website for performance and functionality

## Contributing

If you would like to contribute to this project, please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

© 2024 Anantrao Pawar College of Engineering & Research. All Rights Reserved. 
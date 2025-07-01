// Simple build script to copy the components to the styles.css file
const fs = require('fs');
const path = require('path');

// Read the input.css file
const inputCssPath = path.join(__dirname, 'src', 'input.css');
const inputCss = fs.readFileSync(inputCssPath, 'utf8');

// Copy it to styles.css
const stylesCssPath = path.join(__dirname, 'styles.css');
fs.writeFileSync(stylesCssPath, inputCss, 'utf8');

console.log('Styles copied successfully! Since we cannot run Tailwind build process, we are using the pre-defined styles.'); 
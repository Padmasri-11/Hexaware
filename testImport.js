// testImport.js
try {
    const resumeParser = require('./ai/resumeParser'); // Change this line
    console.log('resumeParser loaded successfully:', resumeParser);
} catch (error) {
    console.error('Error loading resumeParser:', error);
}

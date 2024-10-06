const resumeParser = require('../ai/resumeParser');
const keywordExtractor = require('../ai/keywordExtractor');

exports.parseResume = async (req, res) => {
    try {
        const resumeFile = req.file; // Ensure this matches the multer upload name
        const parsedResume = await resumeParser.parseResume(resumeFile.path); // Make sure to call the correct function
        res.status(200).json({ parsedResume });
    } catch (error) {
        console.error('Error parsing resume:', error);
        res.status(500).json({ message: 'Error parsing resume', error: error.message });
    }
};

exports.extractKeywords = async (req, res) => {
    try {
        const { text } = req.body;
        const keywords = await keywordExtractor.extract(text);
        res.status(200).json({ keywords });
    } catch (error) {
        console.error('Error extracting keywords:', error);
        res.status(500).json({ message: 'Error extracting keywords', error: error.message });
    }
};

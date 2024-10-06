const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI('AIzaSyDS4ckYw_8foFkPiRfpXyjD1gDDQS4phP8');

async function extract(text) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Extract the key skills and experiences from the following text:
        
        ${text}
        
        Please return the result as a comma-separated list of keywords.`;

        const result = await model.generateContent(prompt);
        const keywords = result.response.text().split(',').map(keyword => keyword.trim());

        return keywords;
    } catch (error) {
        console.error('Error extracting keywords:', error);
        throw error;
    }
}

module.exports = {
    extract
};
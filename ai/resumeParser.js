const { HfInference } = require('@huggingface/inference');

// Correct way to access environment variables
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

async function parseResume(resumeContent) {
    try {
        const result = await hf.documentQuestion({
            model: 'deepset/roberta-base-squad2',
            inputs: {
                question: 'What are the key skills and experiences in this resume?',
                context: resumeContent // Provide resume content here
            }
        });

        return result.answer;
    } catch (error) {
        console.error('Error parsing resume:', error);
        throw error;
    }
}

module.exports = {
    parseResume
};

const { LLMChain } = require('langchain/chains');
const { OpenAI } = require('langchain/llms/openai');
const { PromptTemplate } = require('langchain/prompts');

const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY });

async function generateJobDescription(jobTitle, skills) {
    const template = `Create a job description for a {jobTitle} position. The ideal candidate should have the following skills: {skills}.`;
    const prompt = new PromptTemplate({
        template: template,
        inputVariables: ['jobTitle', 'skills'],
    });

    const chain = new LLMChain({ llm: llm, prompt: prompt });

    const result = await chain.call({ jobTitle: jobTitle, skills: skills.join(', ') });
    return result.text;
}

module.exports = {
    generateJobDescription
};
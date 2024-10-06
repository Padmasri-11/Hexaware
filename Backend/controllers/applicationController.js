const Application = require('../models/application');
const emailUtil = require('../utils/email');
const resumeParser = require('../../ai/resumeParser');
const keywordExtractor = require('../../ai/keywordExtractor');

exports.submitApplication = async (req, res) => {
    try {
        const { name, dob, address, gender, skills, jobRole } = req.body;
        const resumeFile = req.files.resume;

        // Save application to database
        const application = new Application({
            name,
            dob,
            address,
            gender,
            skills: skills.split(',').map(skill => skill.trim()),
            jobRole,
            resumePath: resumeFile.path
        });
        await application.save();

        // Parse resume
        const parsedResume = await resumeParser.parse(resumeFile.path);

        // Extract keywords
        const keywords = await keywordExtractor.extract(parsedResume);

        // Check if resume matches job role
        const isEligible = keywords.some(keyword => jobRole.toLowerCase().includes(keyword.toLowerCase()));

        if (isEligible) {
            // Notify recruiter
            await emailUtil.sendEmail(process.env.RECRUITER_EMAIL, 'New Eligible Candidate', `A new eligible candidate has applied for the ${jobRole} position.`);
            
            // Notify candidate
            await emailUtil.sendEmail(application.email, 'Application Shortlisted', 'Your application has been shortlisted. We will contact you soon for further steps.');
        }

        // Send confirmation email to candidate
        await emailUtil.sendEmail(application.email, 'Application Received', 'Thank you for submitting your application. We will review it shortly.');

        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting application', error: error.message });
    }
};
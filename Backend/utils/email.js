const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'email-smtp.ap-south-1.amazonaws.com',
    port: 465,
    secure: true, // Use SSL
    auth: {
        user: "AKIARSU7KPETHAZ7BIXH",
        pass: "BKHYVz8Xrqfee0zens6OwfcVf+pm9j9AwMlttgRiTUDy"
    }
});

async function sendEmail(to, subject, text) {
    const mailOptions = {
        from: 'padmasrib_ai21@velhightech.com',
        to,
        subject,
        text
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = {
    sendEmail
};
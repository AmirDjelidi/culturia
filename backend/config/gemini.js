require('dotenv').config();

module.exports = {
    apiKey: process.env.GEMINI_API_KEY,
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent'
};

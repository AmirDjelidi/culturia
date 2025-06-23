const axios = require('axios');
const { apiKey, apiUrl } = require('../config/gemini');

exports.sendToGemini = async (base64Image, age) => {
    const prompt = `Décris cette œuvre à une personne de ${age} ans, de façon simple, pédagogique et engageante.`;

    const body = {
        contents: [{
            parts: [
                {
                    inlineData: {
                        mimeType: "image/jpeg",
                        data: base64Image
                    }
                },
                {
                    text: prompt
                }
            ]
        }]
    };

    const response = await axios.post(apiUrl, body, {
        params: { key: apiKey },
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const description = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    return description || "Pas de réponse générée.";
};

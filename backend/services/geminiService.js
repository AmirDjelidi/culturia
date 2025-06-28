const axios = require('axios');
const { apiKey, apiUrl } = require('../config/gemini');
const { getLangue } = require('../routes/langueRoutes');

exports.sendToGemini = async (base64Image, langue) => {
    const selectedLangue = langue || getLangue();

    const prompt = `Décris cette œuvre dans la langue ${selectedLangue} sous ce format et réponds à la question de manière directe et informative, sans utiliser d'introduction comme “Bien sûr”, “Absolument”, ou toute autre formule de politesse. Commence directement par le contenu attendu : 
    Titre : [titre complet de l'œuvre]
    Artiste : [nom de l'artiste]
    Date : [date de création]
    Courant artistique : [nom du courant artistique]
    Matériaux et technique : [matériaux et technique utilisée]
    Description : [éléments visuels et symboliques]
    Contexte : [contexte historique ou culturel de l'œuvre]
    Anecdotes : [anecdotes ou faits intéressants sur l'œuvre]
    Importance : [importance de l'œuvre dans l'histoire de l'art ou la culture]
    Dans cette forme et rien d'autre !
    Si aucune oeuvre d'art n'est détectée, réponds simplement "Aucune oeuvre d'art détectée". Si l'image est floue ou illisible, réponds "Image floue ou illisible".
    `;

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

const geminiService = require('../services/geminiService');

exports.analyzeImage = async (req, res) => {
    const { base64Image, langue } = req.body;

    if (!base64Image) {
        return res.status(400).json({ error: "Image requis." });
    }

    try {
        const result = await geminiService.sendToGemini(base64Image, langue);
        res.json({ description: result });
    } catch (error) {
        console.error("❌ Erreur API Gemini :", error.response?.data || error.message);
        res.status(500).json({ error: "Erreur de traitement." });
    }

};

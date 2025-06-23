const geminiService = require('../services/geminiService');

exports.analyzeImage = async (req, res) => {
    const { base64Image, age } = req.body;

    if (!base64Image || !age) {
        return res.status(400).json({ error: "Image et âge requis." });
    }

    try {
        const result = await geminiService.sendToGemini(base64Image, age);
        res.json({ description: result });
    } catch (error) {
        console.error("❌ Erreur API Gemini :", error.response?.data || error.message);
        res.status(500).json({ error: "Erreur de traitement." });
    }

};

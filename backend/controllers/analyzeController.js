const geminiService = require('../services/geminiService');
const { getLangue } = require('../routes/langueRoutes');

exports.analyzeImage = async (req, res) => {
    const { base64Image} = req.body;

    if (!base64Image) {
        return res.status(400).json({ error: "Image requis." });
    }
    const langue = getLangue();

    try {
        const result = await geminiService.sendToGemini(base64Image, langue);
        res.json({ description: result });
        console.log("Analyser en langue :", langue);
    } catch (error) {
        console.error("❌ Erreur API Gemini :", error.response?.data || error.message);
        res.status(500).json({ error: "Erreur de traitement." });
    }

};

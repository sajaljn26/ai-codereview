const aiService = require("../services/ai.service");

const getReview = async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Code is required in request body" });
        }

        const prompt = `Please review this code and provide feedback:\n\n${code}`;
        const response = await aiService(prompt);
        res.json({ response });
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
};

module.exports = {
    getReview
}; 
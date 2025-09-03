const { GoogleGenAI } = require("@google/genai");
const path = require("path");
const envPath = path.join(__dirname, "../../.env");
require("dotenv").config({ path: envPath });

const apiKey = process.env.GOOGLE_GEMINI_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_GEMINI_KEY environment variable is not set");
}

const ai = new GoogleGenAI({
  apiKey: apiKey
});

async function generateContent(prompt) {
    try {
        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            systemInstruction: `You are a code reviewer who has expertise in development. You analyze code and find problems, then provide solutions to the developer. You always write clean code.`,
            contents: prompt
        });
        return result.text;
    } catch (error) {
        console.error("Error generating content:", error);
        throw error;
    }
}

module.exports = generateContent;
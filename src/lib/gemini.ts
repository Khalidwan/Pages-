import { GoogleGenAI, GenerateContentParameters } from "@google/genai";

// Initialize Gemini API
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateContent = async (params: any | string, model = "gemini-3-flash-preview") => {
  if (!ai) {
    throw new Error("Gemini API Key not configured");
  }

  try {
    const config = typeof params === 'string' 
      ? { model, contents: params } 
      : { model: params.model || model, ...params };

    const response = await ai.models.generateContent(config);
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

import { GoogleGenAI } from "@google/genai";
import { Product } from '../types';

const apiKey = process.env.API_KEY || ''; 
// Note: In a real production app, this key would be secured backend-side. 
// For this demo, we assume the environment variable is injected.

const ai = new GoogleGenAI({ apiKey });

export const generateProductDescription = async (productName: string, niche: string): Promise<Partial<Product> | null> => {
  if (!apiKey) {
    console.warn("No API Key provided for Gemini");
    return null;
  }

  try {
    const prompt = `
      You are an expert dropshipping copywriter. 
      Create a high-converting product title and description for a product named "${productName}" in the "${niche}" niche.
      Also suggest a retail price (USD) and a realistic supplier cost price (USD) for dropshipping.
      
      Return JSON only:
      {
        "title": "SEO Optimized Title",
        "description": "Persuasive 2-sentence description.",
        "price": 0.00,
        "costPrice": 0.00,
        "category": "Suggested Category"
      }
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return null;
  }
};

export const analyzeCompetitors = async (niche: string): Promise<string> => {
  if (!apiKey) return "API Key missing. Cannot analyze competitors.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide a brief 3-point competitor analysis for the dropshipping niche: ${niche}. Focus on pricing, marketing angles, and potential gaps.`,
    });
    return response.text || "No analysis generated.";
  } catch (error) {
    return "Failed to analyze competitors.";
  }
};

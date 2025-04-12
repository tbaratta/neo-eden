import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function main() {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "Explain how AI works"
            }
          ]
        }
      ]
    });

    const text = result.candidates[0].content.parts[0].text;
    console.log("Gemini says:", text);
  } catch (err) {
    console.error("Gemini API error:", err);
  }
}

main();

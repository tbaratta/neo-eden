import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper to convert image to base64
function fileToBase64(filePath) {
  const file = fs.readFileSync(filePath);
  return file.toString("base64");
}

async function main() {
  const imagePath = path.resolve("test.jpg"); // update if needed
  const base64Image = fileToBase64(imagePath);

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-pro",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: "What do you see in this image?"
            },
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: base64Image
              }
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

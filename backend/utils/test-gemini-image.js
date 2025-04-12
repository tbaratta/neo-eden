import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Function to convert image to base64
function fileToBase64(filePath) {
  const fullPath = path.join(__dirname, filePath);
  console.log('Reading image from:', fullPath);
  const imageBuffer = fs.readFileSync(fullPath);
  return imageBuffer.toString('base64');
}

async function main() {
  try {
    // Initialize the model
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // For image input, use the gemini-pro-vision model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Get the image data
    // The image should be in the 'test-images' directory next to this script
    const imageData = fileToBase64('./test.jpg');

    // Prepare the prompt parts
    const prompt = "Analyze this image and describe what you see.";

    // Generate content
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg'
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    console.log("Gemini says:", text);

  } catch (err) {
    console.error("Error:", err);
    if (err.code === 'ENOENT') {
      console.error("\nERROR: Image file not found!");
      console.error("Please make sure to:");
      console.error("1. Create a 'test-images' directory in the utils folder");
      console.error("2. Place your test.jpg file in that directory");
      console.error(`3. Expected path: ${path.join(__dirname, 'test-images', 'test.jpg')}`);
    }
  }
}

main();

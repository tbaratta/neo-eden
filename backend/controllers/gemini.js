import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend root directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Validate prompt middleware
export const validatePrompt = (req, res, next) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    return res.status(400).json({ error: 'Valid prompt is required' });
  }
  req.body.prompt = prompt.trim();
  next();
};

export const generateResponse = async (req, res) => {
  const { prompt, imageBase64 } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let result;

    if (imageBase64) {
      // 🖼 If image provided, send image + prompt
      result = await model.generateContent({
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg", // assuming jpeg (Expo defaults)
                  data: imageBase64,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
      });
    } else {
      // 🧠 If NO image, just send the prompt
      result = await model.generateContent(prompt);
    }

    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      reply: text,
      timestamp: new Date().toISOString(),
    });

  } catch (err) {
    console.error('Gemini API Error:', err);
    let errorMessage = 'Failed to get response from Gemini API';
    
    if (err.response) {
      try {
        const errorDetails = await err.response.text();
        console.error('Error details:', errorDetails);
        errorMessage = errorDetails;
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
    }
    
    res.status(500).json({
      success: false,
      error: errorMessage,
      message: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
  }
};





// export const generateResponse = async (req, res) => {
//   const { prompt, imageBase64 } = req.body;

//   if (!imageBase64) {
//     return res.status(400).json({ error: 'Image data (base64) is required' });
//   }

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

//     const result = await model.generateContent({
//       contents: [
//         {
//           parts: [
//             {
//               inlineData: {
//                 mimeType: "image/jpeg", // assuming it's a jpeg (Expo returns jpeg by default)
//                 data: imageBase64
//               }
//             },
//             {
//               text: prompt
//             }
//           ]
//         }
//       ]
//     });

//     const response = await result.response;
//     const text = response.text();

//     res.json({
//       success: true,
//       reply: text,
//       timestamp: new Date().toISOString()
//     });
//   } catch (err) {
//     console.error('Gemini API Error:', err);
//     let errorMessage = 'Failed to get response from Gemini API';
    
//     if (err.response) {
//       try {
//         const errorDetails = await err.response.text();
//         console.error('Error details:', errorDetails);
//         errorMessage = errorDetails;
//       } catch (e) {
//         console.error('Error parsing error response:', e);
//       }
//     }
    
//     res.status(500).json({
//       success: false,
//       error: errorMessage,
//       message: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// };








// // Generate AI response
// export const generateResponse = async (req, res) => {
//   const { prompt, imageBase64 } = req.body;

//   try {
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();

//     res.json({
//       success: true,
//       reply: text,
//       timestamp: new Date().toISOString()
//     });
//   } catch (err) {
//     console.error('Gemini API Error:', err);
//     let errorMessage = 'Failed to get response from Gemini API';
    
//     if (err.response) {
//       try {
//         const errorDetails = await err.response.text();
//         console.error('Error details:', errorDetails);
//         errorMessage = errorDetails;
//       } catch (e) {
//         console.error('Error parsing error response:', e);
//       }
//     }
    
//     res.status(500).json({
//       success: false,
//       error: errorMessage,
//       message: process.env.NODE_ENV === 'development' ? err.message : undefined
//     });
//   }
// }; 
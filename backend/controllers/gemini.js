import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

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

// Generate AI response
export const generateResponse = async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      success: true,
      reply: text,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Gemini API Error:', err);
    res.status(500).json({
      success: false,
      error: 'Failed to get response from Gemini API',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
}; 
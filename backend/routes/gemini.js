import express from 'express';
import { validatePrompt, generateResponse } from '../controllers/gemini.js';

const router = express.Router();

router.post('/ask', validatePrompt, generateResponse);

export default router;

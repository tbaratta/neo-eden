// controllers/insight.controller.js
const Insight = require('../models/Insight');

exports.createInsight = async (req, res) => {
  try {
    const { image, prompt, geminiResponse } = req.body;

    const newInsight = new Insight({ image, prompt, geminiResponse });
    await newInsight.save();

    res.status(201).json(newInsight);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save insight', details: err.message });
  }
};

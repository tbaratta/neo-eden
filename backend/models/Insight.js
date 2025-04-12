const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  image: { type: String, required: true }, // URL or base64
  prompt: { type: String, required: true },
  geminiResponse: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Insight', insightSchema);

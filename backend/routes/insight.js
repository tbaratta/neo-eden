const express = require('express');
const router = express.Router();
const Insight = require('../models/Insight');

// Create a new insight
router.post('/', async (req, res) => {
  try {
    const insight = new Insight({
      image: req.body.image, // base64 string or image URL
      prompt: req.body.prompt,
      geminiResponse: req.body.geminiResponse
    });

    const savedInsight = await insight.save();
    res.status(201).json(savedInsight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all insights
router.get('/', async (req, res) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single insight by ID
router.get('/:id', async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);
    if (insight) {
      res.json(insight);
    } else {
      res.status(404).json({ message: 'Insight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an insight
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      image: req.body.image,
      prompt: req.body.prompt,
      geminiResponse: req.body.geminiResponse
    };

    const updatedInsight = await Insight.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (updatedInsight) {
      res.json(updatedInsight);
    } else {
      res.status(404).json({ message: 'Insight not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an insight
router.delete('/:id', async (req, res) => {
  try {
    const deletedInsight = await Insight.findByIdAndDelete(req.params.id);
    if (deletedInsight) {
      res.json({ message: 'Insight deleted successfully' });
    } else {
      res.status(404).json({ message: 'Insight not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

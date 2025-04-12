import express from 'express';
import Insight from '../models/Insight.js';

const router = express.Router();

// Create a new insight
router.post('/', async (req, res) => {
  try {
    const insight = new Insight({
      image: req.body.image,
      prompt: req.body.prompt,
      geminiResponse: req.body.geminiResponse
    });

    const savedInsight = await insight.save();
    res.status(201).json(savedInsight);
  } catch (error) {
    console.error('Error creating insight:', error);
    res.status(400).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Get all insights with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const insights = await Insight.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Insight.countDocuments();

    res.json({
      insights,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalInsights: total
    });
  } catch (error) {
    console.error('Error fetching insights:', error);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Get a single insight by ID
router.get('/:id', async (req, res) => {
  try {
    const insight = await Insight.findById(req.params.id);
    if (!insight) {
      return res.status(404).json({ message: 'Insight not found' });
    }
    res.json(insight);
  } catch (error) {
    console.error('Error fetching insight:', error);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Update an insight
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      image: req.body.image,
      prompt: req.body.prompt,
      geminiResponse: req.body.geminiResponse,
      updatedAt: Date.now()
    };

    const updatedInsight = await Insight.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedInsight) {
      return res.status(404).json({ message: 'Insight not found' });
    }
    res.json(updatedInsight);
  } catch (error) {
    console.error('Error updating insight:', error);
    res.status(400).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

// Delete an insight
router.delete('/:id', async (req, res) => {
  try {
    const deletedInsight = await Insight.findByIdAndDelete(req.params.id);
    if (!deletedInsight) {
      return res.status(404).json({ message: 'Insight not found' });
    }
    res.json({ 
      message: 'Insight deleted successfully',
      deletedInsight
    });
  } catch (error) {
    console.error('Error deleting insight:', error);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error : {}
    });
  }
});

export default router; 
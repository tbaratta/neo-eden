const express = require('express');
const router = express.Router();
const Example = require('../models/Example');

// Create - POST
router.post('/', async (req, res) => {
  try {
    const example = new Example({
      name: req.body.name,
      description: req.body.description
    });
    const savedExample = await example.save();
    res.status(201).json(savedExample);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Read All - GET
router.get('/', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Read One - GET
router.get('/:id', async (req, res) => {
  try {
    const example = await Example.findById(req.params.id);
    if (example) {
      res.json(example);
    } else {
      res.status(404).json({ message: 'Example not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update - PUT
router.put('/:id', async (req, res) => {
  try {
    const updatedExample = await Example.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true } // Returns the updated document
    );
    if (updatedExample) {
      res.json(updatedExample);
    } else {
      res.status(404).json({ message: 'Example not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete - DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedExample = await Example.findByIdAndDelete(req.params.id);
    if (deletedExample) {
      res.json({ message: 'Example deleted successfully' });
    } else {
      res.status(404).json({ message: 'Example not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
const express = require('express');
const router = express.Router();
const analysis = require('../controllers/analysis');

// Create a new analysis
router.post('/', analysis.createAnalysis);

// Get all analyses with optional filtering
router.get('/', analysis.getAllAnalyses);

// Get analyses within a radius
router.get('/nearby', analysis.getNearbyAnalyses);

// Get a single analysis
router.get('/:id', analysis.getAnalysis);

// Update an analysis
router.put('/:id', analysis.updateAnalysis);

// Delete an analysis
router.delete('/:id', analysis.deleteAnalysis);

module.exports = router; 
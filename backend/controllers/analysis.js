import Analysis from '../models/Analysis.js';

// Create a new analysis
export const createAnalysis = async (req, res) => {
  try {
    const analysis = new Analysis({
      type: req.body.type,
      imageUrl: req.body.imageUrl,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      },
      results: req.body.results,
      aiResponse: req.body.aiResponse,
      createdBy: req.body.userId,
      relatedResource: req.body.resourceId
    });

    const savedAnalysis = await analysis.save();
    res.status(201).json(savedAnalysis);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all analyses with optional filtering
export const getAllAnalyses = async (req, res) => {
  try {
    const { type, resourceId } = req.query;
    let query = {};

    if (type) query.type = type.toUpperCase();
    if (resourceId) query.relatedResource = resourceId;

    const analyses = await Analysis.find(query)
      .populate('createdBy', 'username')
      .populate('relatedResource', 'name resourceType');
    
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get analyses within a radius
export const getNearbyAnalyses = async (req, res) => {
  try {
    const { longitude, latitude, radius = 5000, type } = req.query;
    
    let query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    };

    if (type) {
      query.type = type.toUpperCase();
    }

    const nearbyAnalyses = await Analysis.find(query)
      .populate('createdBy', 'username')
      .populate('relatedResource', 'name resourceType');
    
    res.json(nearbyAnalyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single analysis
export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('relatedResource', 'name resourceType');
    
    if (analysis) {
      res.json(analysis);
    } else {
      res.status(404).json({ message: 'Analysis not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an analysis
export const updateAnalysis = async (req, res) => {
  try {
    const updates = {
      type: req.body.type,
      results: req.body.results,
      aiResponse: req.body.aiResponse
    };

    if (req.body.longitude !== undefined && req.body.latitude !== undefined) {
      updates.location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      };
    }

    const updatedAnalysis = await Analysis.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).populate('createdBy', 'username')
      .populate('relatedResource', 'name resourceType');

    if (updatedAnalysis) {
      res.json(updatedAnalysis);
    } else {
      res.status(404).json({ message: 'Analysis not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an analysis
export const deleteAnalysis = async (req, res) => {
  try {
    const deletedAnalysis = await Analysis.findByIdAndDelete(req.params.id);
    if (deletedAnalysis) {
      res.json({ message: 'Analysis deleted successfully' });
    } else {
      res.status(404).json({ message: 'Analysis not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 
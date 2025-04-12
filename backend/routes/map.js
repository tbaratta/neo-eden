const express = require('express');
const router = express.Router();
const Map = require('../models/Map');

// Create a new map point
router.post('/', async (req, res) => {
  try {
    const mapPoint = new Map({
      name: req.body.name,
      description: req.body.description,
      location: {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      },
      type: req.body.type
    });

    const savedMapPoint = await mapPoint.save();
    res.status(201).json(savedMapPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all map points
router.get('/', async (req, res) => {
  try {
    const mapPoints = await Map.find();
    res.json(mapPoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get points within a radius (in meters) of a location
router.get('/nearby', async (req, res) => {
  try {
    const { longitude, latitude, radius = 5000 } = req.query;

    const nearbyPoints = await Map.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(radius)
        }
      }
    });

    res.json(nearbyPoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get points within a bounding box
router.get('/bounds', async (req, res) => {
  try {
    const { swLng, swLat, neLng, neLat } = req.query;

    const pointsInBounds = await Map.find({
      location: {
        $geoWithin: {
          $box: [
            [parseFloat(swLng), parseFloat(swLat)],
            [parseFloat(neLng), parseFloat(neLat)]
          ]
        }
      }
    });

    res.json(pointsInBounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get points by type
router.get('/type/:type', async (req, res) => {
  try {
    const mapPoints = await Map.find({ type: req.params.type.toUpperCase() });
    res.json(mapPoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single map point
router.get('/:id', async (req, res) => {
  try {
    const mapPoint = await Map.findById(req.params.id);
    if (mapPoint) {
      res.json(mapPoint);
    } else {
      res.status(404).json({ message: 'Map point not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a map point
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      description: req.body.description,
      type: req.body.type
    };

    // Only update location if coordinates are provided
    if (req.body.longitude !== undefined && req.body.latitude !== undefined) {
      updates.location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      };
    }

    const updatedMapPoint = await Map.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (updatedMapPoint) {
      res.json(updatedMapPoint);
    } else {
      res.status(404).json({ message: 'Map point not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a map point
router.delete('/:id', async (req, res) => {
  try {
    const deletedMapPoint = await Map.findByIdAndDelete(req.params.id);
    if (deletedMapPoint) {
      res.json({ message: 'Map point deleted successfully' });
    } else {
      res.status(404).json({ message: 'Map point not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
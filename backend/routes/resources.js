const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const {
  geocodeAddress,
  getPlaceDetails,
  searchNearbyPlaces,
  calculateDistance
} = require('../utils/googleMaps');

// Get all resources with optional filtering
router.get('/', async (req, res) => {
  try {
    const { type, status, reliability } = req.query;
    let query = {};

    if (type) query.resourceType = type.toUpperCase();
    if (status) query.status = status.toUpperCase();
    if (reliability) query.reliability = { $gte: parseFloat(reliability) };

    const resources = await Resource.find(query)
      .sort({ reliability: -1, updatedAt: -1 });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get resources within radius
router.get('/nearby', async (req, res) => {
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
      query.resourceType = type.toUpperCase();
    }

    const resources = await Resource.find(query);
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new resource with address
router.post('/', async (req, res) => {
  try {
    let coordinates;
    
    // If address is provided, geocode it
    if (req.body.address) {
      const geoData = await geocodeAddress(req.body.address);
      if (geoData) {
        coordinates = geoData.coordinates;
      } else {
        return res.status(400).json({ message: 'Could not geocode address' });
      }
    } else {
      coordinates = [req.body.longitude, req.body.latitude];
    }

    const resource = new Resource({
      name: req.body.name,
      description: req.body.description,
      location: {
        type: 'Point',
        coordinates: coordinates
      },
      resourceType: req.body.resourceType,
      markerType: req.body.markerType || 'DEFAULT',
      zone: req.body.zone || 'NEUTRAL',
      zoneColor: req.body.zoneColor,
      status: req.body.status,
      analysis: req.body.analysis,
      seasonality: req.body.seasonality,
      createdBy: req.body.userId // Assuming user authentication is implemented
    });

    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Vote on a resource
router.post('/:id/vote', async (req, res) => {
  try {
    const { voteType } = req.body; // 'upvote' or 'downvote'
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    if (voteType === 'upvote') {
      resource.votes.upvotes += 1;
    } else if (voteType === 'downvote') {
      resource.votes.downvotes += 1;
    }

    resource.votes.lastVoted = Date.now();
    const updatedResource = await resource.save();
    res.json(updatedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update resource status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.status = status.toUpperCase();
    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add verification
router.post('/:id/verify', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.verifiedBy.push({
      user: req.body.userId,
      date: Date.now()
    });

    if (resource.verifiedBy.length >= 3) { // Require 3 verifications
      resource.status = 'ACTIVE';
    }

    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get resource by ID
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (resource) {
      res.json(resource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a resource
router.put('/:id', async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      description: req.body.description,
      resourceType: req.body.resourceType,
      markerType: req.body.markerType,
      zone: req.body.zone,
      zoneColor: req.body.zoneColor,
      status: req.body.status,
      analysis: req.body.analysis,
      seasonality: req.body.seasonality
    };

    // Only update location if coordinates are provided
    if (req.body.longitude !== undefined && req.body.latitude !== undefined) {
      updates.location = {
        type: 'Point',
        coordinates: [req.body.longitude, req.body.latitude]
      };
    }

    const updatedResource = await Resource.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );

    if (updatedResource) {
      res.json(updatedResource);
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get nearby places from Google Maps
router.get('/google/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius, type } = req.query;
    const places = await searchNearbyPlaces(
      parseFloat(latitude),
      parseFloat(longitude),
      parseInt(radius),
      type
    );
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get place details from Google Maps
router.get('/google/place/:placeId', async (req, res) => {
  try {
    const placeDetails = await getPlaceDetails(req.params.placeId);
    res.json(placeDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Calculate distance between two points
router.get('/distance', async (req, res) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.query;
    const distance = await calculateDistance(
      parseFloat(originLat),
      parseFloat(originLng),
      parseFloat(destLat),
      parseFloat(destLng)
    );
    res.json(distance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get resources within a bounding box
router.get('/bounds', async (req, res) => {
  try {
    const { swLng, swLat, neLng, neLat, resourceType, zone, markerType } = req.query;

    let query = {
      location: {
        $geoWithin: {
          $box: [
            [parseFloat(swLng), parseFloat(swLat)],
            [parseFloat(neLng), parseFloat(neLat)]
          ]
        }
      }
    };

    if (resourceType) query.resourceType = resourceType.toUpperCase();
    if (zone) query.zone = zone.toUpperCase();
    if (markerType) query.markerType = markerType.toUpperCase();

    const resourcesInBounds = await Resource.find(query);
    res.json(resourcesInBounds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a resource
router.delete('/:id', async (req, res) => {
  try {
    const deletedResource = await Resource.findByIdAndDelete(req.params.id);
    if (deletedResource) {
      res.json({ message: 'Resource deleted successfully' });
    } else {
      res.status(404).json({ message: 'Resource not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 
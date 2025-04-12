const Resource = require('../models/Resource');
const { geocodeAddress } = require('../utils/googleMaps');

// Get all resources with optional filtering
exports.getAllResources = async (req, res) => {
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
};

// Get resources within radius
exports.getNearbyResources = async (req, res) => {
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
};

// Create a new resource
exports.createResource = async (req, res) => {
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
      createdBy: req.body.userId
    });

    const savedResource = await resource.save();
    res.status(201).json(savedResource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Vote on a resource
exports.voteOnResource = async (req, res) => {
  try {
    const { voteType } = req.body;
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
};

// Update resource status
exports.updateStatus = async (req, res) => {
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
};

// Verify a resource
exports.verifyResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    resource.verifiedBy.push({
      user: req.body.userId,
      date: Date.now()
    });

    if (resource.verifiedBy.length >= 3) {
      resource.status = 'ACTIVE';
    }

    await resource.save();
    res.json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get resource by ID
exports.getResource = async (req, res) => {
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
};

// Update a resource
exports.updateResource = async (req, res) => {
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
};

// Get resources within a bounding box
exports.getResourcesInBounds = async (req, res) => {
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
};

// Delete a resource
exports.deleteResource = async (req, res) => {
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
}; 
import express from 'express';
import * as resource from '../controllers/resource.js';
import { searchNearbyPlaces, getPlaceDetails, calculateDistance } from '../utils/googleMaps.js';

const router = express.Router();

// Get all resources with optional filtering
router.get('/', resource.getAllResources);

// Get resources within radius
router.get('/nearby', resource.getNearbyResources);

// Get resources within bounds
router.get('/bounds', resource.getResourcesInBounds);

// Create a new resource
router.post('/', resource.createResource);

// Vote on a resource
router.post('/:id/vote', resource.voteOnResource);

// Update resource status
router.patch('/:id/status', resource.updateStatus);

// Verify a resource
router.post('/:id/verify', resource.verifyResource);

// Get resource by ID
router.get('/:id', resource.getResource);

// Update a resource
router.put('/:id', resource.updateResource);

// Delete a resource
router.delete('/:id', resource.deleteResource);

// Google Maps Integration
router.get('/google/nearby', async (req, res) => {
  try {
    const { latitude, longitude, radius, type } = req.query;
    const places = await searchNearbyPlaces(latitude, longitude, radius, type);
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/google/place/:placeId', async (req, res) => {
  try {
    const placeDetails = await getPlaceDetails(req.params.placeId);
    res.json(placeDetails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/distance', async (req, res) => {
  try {
    const { originLat, originLng, destLat, destLng } = req.query;
    const distance = await calculateDistance(
      originLat,
      originLng,
      destLat,
      destLng
    );
    res.json(distance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 
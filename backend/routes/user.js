import express from 'express';
import * as user from '../controllers/user.js';

const router = express.Router();

// Authentication routes
router.post('/register', user.register);
router.post('/login', user.login);

// Profile routes
router.get('/profile/:id', user.getProfile);
router.put('/profile/:id', user.updateProfile);

// Admin routes
router.get('/', user.getAllUsers);
router.patch('/:id/role', user.updateRole);
router.patch('/:id/deactivate', user.deactivateUser);

// Location routes
router.post('/:id/location', user.updateLocation);
router.get('/:id/location/history', user.getLocationHistory);
router.post('/:id/base-location', user.updateBaseLocation);
router.get('/nearby', user.getNearbyUsers);
router.post('/:id/search-radius', user.updateSearchRadius);

export default router; 
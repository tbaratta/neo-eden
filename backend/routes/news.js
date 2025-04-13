import express from 'express';
import {
  getAllNews,
  createNews,
  getNewsById,
  updateNews,
  deleteNews,
  getNewsByLocation
} from '../controllers/news.js';

const router = express.Router();

// Get all news articles
router.get('/', getAllNews);

// Create a new news article
router.post('/', createNews);

// Get news articles by location
router.get('/nearby', getNewsByLocation);

// Get a single news article
router.get('/:id', getNewsById);

// Update a news article
router.put('/:id', updateNews);

// Delete a news article
router.delete('/:id', deleteNews);

export default router; 
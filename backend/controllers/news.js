import News from '../models/news.js';

// Get all news articles
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news articles' });
  }
};

// Create a new news article
export const createNews = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' });
    }

    // Create new news article
    const news = new News({
      title,
      description,
      location,
      createdBy: req.user?._id // Optional: if you have user authentication
    });

    // Save to database
    const savedNews = await news.save();
    res.status(201).json(savedNews);
  } catch (error) {
    console.error('Error creating news:', error);
    res.status(500).json({ message: 'Error creating news article' });
  }
};

// Get a single news article
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ message: 'Error fetching news article' });
  }
};

// Update a news article
export const updateNews = async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, description, location },
      { new: true, runValidators: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: 'News article not found' });
    }

    res.json(updatedNews);
  } catch (error) {
    console.error('Error updating news:', error);
    res.status(500).json({ message: 'Error updating news article' });
  }
};

// Delete a news article
export const deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ message: 'News article not found' });
    }
    res.json({ message: 'News article deleted successfully' });
  } catch (error) {
    console.error('Error deleting news:', error);
    res.status(500).json({ message: 'Error deleting news article' });
  }
};

// Get news articles by location
export const getNewsByLocation = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query; // maxDistance in meters, default 10km

    const news = await News.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      }
    }).sort({ createdAt: -1 });

    res.json(news);
  } catch (error) {
    console.error('Error fetching news by location:', error);
    res.status(500).json({ message: 'Error fetching news articles by location' });
  }
}; 
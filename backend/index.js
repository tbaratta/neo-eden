import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import connectDB from './config/db.js';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the correct path
dotenv.config({ 
  path: process.env.NODE_ENV === 'test' 
    ? join(__dirname, '.env.test')
    : join(__dirname, '.env')
});

// Connect to MongoDB
try {
  await connectDB();
  console.log('MongoDB connected successfully');
} catch (error) {
  console.error('MongoDB connection error:', error);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Import routes
import insight from './routes/insight.js';
import gemini from './routes/gemini.js';
import resources from './routes/resources.js';
import users from './routes/user.js';
import analyses from './routes/analysis.js';
import auth from './routes/auth.js';
import news from './routes/news.js';

// API Routes
app.use('/api/auth', auth);
app.use('/api/insights', insight);
app.use('/api/gemini', gemini);
app.use('/api/resources', resources);
app.use('/api/users', users);
app.use('/api/analysis', analyses);
app.use('/api/news', news);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Neo-Eden API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      auth: '/api/auth',
      resources: '/api/resources',
      users: '/api/users',
      analysis: '/api/analysis',
      insights: '/api/insights',
      gemini: '/api/gemini',
      news: '/api/news'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
    availableEndpoints: {
      auth: '/api/auth',
      resources: '/api/resources',
      users: '/api/users',
      analysis: '/api/analysis',
      insights: '/api/insights',
      gemini: '/api/gemini',
      news: '/api/news'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Start server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
}); 
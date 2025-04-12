import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const insight = require('./routes/insight');
import gemini from './routes/gemini.js';
import resources from './routes/resources.js';
import users from './routes/user.js';
import analyses from './routes/analysis.js';

// API Routes
app.use('/api/gemini', gemini);
app.use('/api/resources', resources);
app.use('/api/users', users);
app.use('/api/analysis', analyses);
app.use('/api/insights', insight);

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Neo-Eden API',
    version: '1.0.0',
    documentation: '/api/docs',
    endpoints: {
      resources: '/api/resources',
      users: '/api/users',
      analysis: '/api/analysis'
    }
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
    availableEndpoints: {
      resources: '/api/resources',
      users: '/api/users',
      analysis: '/api/analysis'
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

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
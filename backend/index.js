const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Documentation
app.get('/api/docs', (req, res) => {
  res.redirect('https://github.com/yourusername/neo-eden#api-documentation');
});

// Import routes
const resources = require('./routes/resources');
const users = require('./routes/user');
const analyses = require('./routes/analysis');

// API Routes
app.use('/api/resources', resources);
app.use('/api/users', users);
app.use('/api/analysis', analyses);

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
      analysis: '/api/analysis',
      documentation: '/api/docs'
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
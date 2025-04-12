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

// Routes
const resourceRoutes = require('./routes/resources');
const userRoutes = require('./routes/user');
const analysisRoutes = require('./routes/analysis');

app.use('/api/resources', resourceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/analysis', analysisRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Neo-Eden backend!' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
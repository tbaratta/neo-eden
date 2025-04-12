const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const mapRoutes = require('./routes/map');
app.use('/api/maps', mapRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Neo-Eden backend!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
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
const exampleRoutes = require('./routes/example');
app.use('/api/examples', exampleRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Neo-Eden backend!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 
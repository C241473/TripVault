const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripvault';

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🗺️ Welcome to TripVault API Server!',
    status: 'Server is running',
    version: '2.0.0 (Week 2 - Trip Management Enabled)'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Database Connection & Server Start
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
    app.listen(PORT, () => {
      console.log(`🚀 TripVault Backend Server running on port ${PORT}`);
      console.log(`🔗 Auth API: http://localhost:${PORT}/api/auth`);
      console.log(`🔗 Trip API: http://localhost:${PORT}/api/trips`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️ Running server without DB connection for testing endpoints fallback...');
    app.listen(PORT, () => {
      console.log(`🚀 TripVault Backend Server running on port ${PORT} (DB Connection Warning)`);
    });
  });

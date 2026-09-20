const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const tripRoutes = require('./routes/trips');
const userRoutes = require('./routes/users');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tripvault';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: '🗺️ Welcome to TripVault API Server!',
    status: 'Server is running',
    version: '3.0.0 (Week 3 - Photo Uploads & Public Profiles Enabled)'
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
      console.log(`🔗 User API: http://localhost:${PORT}/api/users`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err.message);
    console.log('⚠️ Running server without DB connection for testing endpoints fallback...');
    app.listen(PORT, () => {
      console.log(`🚀 TripVault Backend Server running on port ${PORT} (DB Connection Warning)`);
    });
  });

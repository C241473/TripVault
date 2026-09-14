const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');

// All routes require valid JWT authentication
router.use(authMiddleware);

// Default curated travel images list
const defaultImages = [
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Beach
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Mountain
  'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', // Paris
  'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80', // Tokyo
  'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80'  // Rome
];

const getRandomImage = () => {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)];
};

/**
 * @route   POST /api/trips
 * @desc    Create a new trip for logged-in user
 * @access  Private
 */
router.post('/', async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating, image } = req.body;

    if (!title || !destination) {
      return res.status(400).json({ message: 'Title and Destination are required fields.' });
    }

    const newTrip = new Trip({
      title: title.trim(),
      destination: destination.trim(),
      startDate: startDate || null,
      endDate: endDate || null,
      description: description ? description.trim() : '',
      rating: rating ? Number(rating) : 5,
      image: image && image.trim() !== '' ? image.trim() : getRandomImage(),
      user: req.user.id
    });

    const savedTrip = await newTrip.save();
    return res.status(201).json({
      message: 'Trip created successfully!',
      trip: savedTrip
    });
  } catch (error) {
    console.error('Error creating trip:', error);
    return res.status(500).json({ message: 'Server error while creating trip', error: error.message });
  }
});

/**
 * @route   GET /api/trips
 * @desc    Get all trips belonging to logged-in user
 * @access  Private
 */
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({
      count: trips.length,
      trips
    });
  } catch (error) {
    console.error('Error fetching user trips:', error);
    return res.status(500).json({ message: 'Server error while fetching trips', error: error.message });
  }
});

/**
 * @route   GET /api/trips/:id
 * @desc    Get a single trip by ID (Owner only)
 * @access  Private
 */
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Verify trip ownership
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized: You do not own this trip' });
    }

    return res.status(200).json({ trip });
  } catch (error) {
    console.error('Error fetching single trip:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Trip ID' });
    }
    return res.status(500).json({ message: 'Server error while fetching trip', error: error.message });
  }
});

/**
 * @route   PUT /api/trips/:id
 * @desc    Update a trip (Owner only)
 * @access  Private
 */
router.put('/:id', async (req, res) => {
  try {
    const { title, destination, startDate, endDate, description, rating, image } = req.body;

    let trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Verify trip ownership
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized: You do not own this trip' });
    }

    // Update fields
    if (title !== undefined) trip.title = title.trim();
    if (destination !== undefined) trip.destination = destination.trim();
    if (startDate !== undefined) trip.startDate = startDate;
    if (endDate !== undefined) trip.endDate = endDate;
    if (description !== undefined) trip.description = description.trim();
    if (rating !== undefined) trip.rating = Number(rating);
    if (image !== undefined) trip.image = image.trim() !== '' ? image.trim() : getRandomImage();

    const updatedTrip = await trip.save();

    return res.status(200).json({
      message: 'Trip updated successfully!',
      trip: updatedTrip
    });
  } catch (error) {
    console.error('Error updating trip:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Trip ID' });
    }
    return res.status(500).json({ message: 'Server error while updating trip', error: error.message });
  }
});

/**
 * @route   DELETE /api/trips/:id
 * @desc    Delete a trip (Owner only)
 * @access  Private
 */
router.delete('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Verify trip ownership
    if (trip.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized: You do not own this trip' });
    }

    await Trip.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      message: 'Trip deleted successfully!',
      id: req.params.id
    });
  } catch (error) {
    console.error('Error deleting trip:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid Trip ID' });
    }
    return res.status(500).json({ message: 'Server error while deleting trip', error: error.message });
  }
});

module.exports = router;

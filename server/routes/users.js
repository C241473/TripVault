const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Trip = require('../models/Trip');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @route   GET /api/users/:username/profile
 * @desc    Get public user profile & their trips (PUBLIC ROUTE - NO AUTH REQUIRED)
 * @access  Public
 */
router.get('/:username/profile', async (req, res) => {
  try {
    const targetUsername = req.params.username.toLowerCase().trim();

    // Find user by username, EXCLUDING email & password for privacy
    const user = await User.findOne({ username: targetUsername }).select('name username bio createdAt');

    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Fetch all public trips belonging to this user
    const trips = await Trip.find({ user: user._id }).sort({ createdAt: -1 });

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        bio: user.bio,
        createdAt: user.createdAt
      },
      tripsCount: trips.length,
      trips
    });
  } catch (error) {
    console.error('Error fetching public profile:', error);
    return res.status(500).json({ message: 'Server error fetching public profile', error: error.message });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update logged-in user profile (bio, username)
 * @access  Private
 */
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { bio, username } = req.body;

    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Handle username update if provided
    if (username && username.trim().toLowerCase() !== user.username) {
      const formattedUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
      if (formattedUsername.length < 3) {
        return res.status(400).json({ message: 'Username must be at least 3 alphanumeric characters' });
      }

      const existingUser = await User.findOne({ username: formattedUsername });
      if (existingUser && existingUser._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'Username is already taken by another user' });
      }

      user.username = formattedUsername;
    }

    if (bio !== undefined) {
      user.bio = bio.trim();
    }

    await user.save();

    return res.status(200).json({
      message: 'Profile updated successfully!',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    return res.status(500).json({ message: 'Server error updating profile', error: error.message });
  }
});

module.exports = router;

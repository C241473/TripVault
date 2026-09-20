const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

const JWT_SECRET = process.env.JWT_SECRET || 'tripvault_secret_key_codgen_2026';

// Helper function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

// Helper function to generate default username from email or name
const generateDefaultUsername = (email, name) => {
  let base = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '');
  if (base.length < 3 && name) {
    base = name.toLowerCase().replace(/[^a-z0-9_]/g, '');
  }
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${base || 'traveller'}_${randomNum}`;
};

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, username, bio } = req.body;

    // Basic Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please enter all required fields: name, email, and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return res.status(400).json({ message: 'A user with this email address already exists' });
    }

    // Auto-generate or format username
    let finalUsername = username ? username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '') : '';
    if (!finalUsername || finalUsername.length < 3) {
      finalUsername = generateDefaultUsername(email, name);
    }

    // Ensure unique username
    let usernameExists = await User.findOne({ username: finalUsername });
    if (usernameExists) {
      finalUsername = `${finalUsername}_${Math.floor(100 + Math.random() * 900)}`;
    }

    // Hash password using bcryptjs
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      name: name.trim(),
      username: finalUsername,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      bio: bio ? bio.trim() : 'Passionate traveller logging memories on TripVault 🗺️'
    });

    await newUser.save();

    // Create JWT token
    const token = generateToken(newUser._id);

    return res.status(201).json({
      message: 'User registered successfully!',
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        bio: newUser.bio,
        createdAt: newUser.createdAt
      }
    });
  } catch (error) {
    console.error('Error in registration route:', error);
    return res.status(500).json({ message: 'Server error during registration', error: error.message });
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials. User not found.' });
    }

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials. Incorrect password.' });
    }

    // Ensure user has a username
    if (!user.username) {
      user.username = generateDefaultUsername(user.email, user.name);
      await user.save();
    }

    // Create JWT token
    const token = generateToken(user._id);

    return res.status(200).json({
      message: 'Login successful!',
      token,
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
    console.error('Error in login route:', error);
    return res.status(500).json({ message: 'Server error during login', error: error.message });
  }
});

/**
 * @route   GET /api/auth/me
 * @desc    Get currently logged in user info (Protected)
 * @access  Private
 */
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure user has a username
    if (!user.username) {
      user.username = generateDefaultUsername(user.email, user.name);
      await user.save();
    }

    return res.status(200).json({
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
    console.error('Error in me route:', error);
    return res.status(500).json({ message: 'Server error fetching user details', error: error.message });
  }
});

module.exports = router;

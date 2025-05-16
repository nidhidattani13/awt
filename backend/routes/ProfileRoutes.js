const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Pet = require('../models/Pets'); // Added Pet model
const Adoption = require('../models/AdoptionRequest'); // Added Adoption model

// routes/profile.js or routes/userRoutes.js
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  // Validate the userId format before querying MongoDB
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's listed pets
router.get('/listings', auth, async (req, res) => {
  try {
    const user = req.user;
    const pets = await Pet.find({ creator: user.id }).populate('creator');
    res.json({ pets });
  } catch (err) {
    console.error('Error fetching listed pets:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's adoption applications
router.get('/applications', auth, async (req, res) => {
  try {
    const user = req.user;
    const applications = await Adoption.find({ userId: user.id })
      .populate('petId')
      .sort({ createdAt: -1 });
    res.json({ applications });
  } catch (err) {
    console.error('Error fetching applications:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/update', auth, async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      bio
    } = req.body;

    // Build user object
    const profileFields = {};
    if (firstName) profileFields.firstName = firstName;
    if (lastName) profileFields.lastName = lastName;
    if (email) profileFields.email = email;
    if (phone) profileFields.phone = phone;
    if (address) profileFields.address = address;
    if (city) profileFields.city = city;
    if (state) profileFields.state = state;
    if (country) profileFields.country = country;
    if (zipCode) profileFields.zipCode = zipCode;
    if (bio) profileFields.bio = bio;

    // Check if user exists
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if trying to change email and verify it's not already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== req.user.id) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
    }

    // Update user
    user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: profileFields },
      { new: true }
    ).select('-password');

    res.status(200).json({ 
      message: 'Profile updated successfully',
      user
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
const express = require('express');
const { registerUser, loginUser, googleAuth } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Registration route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

// Google authentication route
router.post('/google', googleAuth);

module.exports = router;
const express = require('express');
const { loginUser, signupUser, getUserDetails } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Login Route
router.post('/login', loginUser);

// Signup Route
router.post('/signup', signupUser);

// Get user info route
router.get('/user/details', authMiddleware, getUserDetails)

module.exports = router;

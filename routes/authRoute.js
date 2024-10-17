const express = require('express');
const { loginUser, signupUser, getUserDetails, getAllUsers, getUserCount } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Login Route
router.post('/login',  loginUser);

// Signup Route
router.post('/signup',  signupUser);

// Get user info route
router.get('/user/details', authMiddleware, getUserDetails)

// Logout
router.post('/logout', authMiddleware, (req, res) => {
    res.status(200).json({ message: 'Logout successful'})
})

// Get all users
router.get('/users', authMiddleware, getAllUsers)

// Get total users
router.get('/users/count', authMiddleware, getUserCount)

module.exports = router;

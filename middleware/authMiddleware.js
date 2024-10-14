const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async(req, res, next) => {
    console.log('Auth middleware hit');
    console.log('Headers:', req.headers);
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('No token provided');
            return res.status(401).json({ message: 'Authentication required. No token provided.' });
        }
        const token = authHeader.split(' ')[1]
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find the user
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Attach the user to the request object
        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        console.error('Auth middleware error:', error);
        res.status(500).json({ message: 'Server error' });
    }
    
}

module.exports = authMiddleware
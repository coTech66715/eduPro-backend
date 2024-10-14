const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const adminCredentials = {
  username: 'admin',
  password: 'admin123'
};

// User login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const token = jwt.sign({ username, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token, role: 'admin' });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: 'user' });
  } catch (error) {

    res.status(500).json({ message: 'Server error' });
  }
};

// User signup
exports.signupUser = async (req, res) => {
  const { username, name, phone, university, program, level, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match' });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username, name, phone, university, program, level, email, password: hashedPassword
    });

    await user.save();
    const token = jwt.sign({ userId: user._id, role: 'user' }, process.env.JWT_SECRET, { expiresIn: '4h' });
    res.json({ token, role: 'user' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserDetails = async(req, res) => {
  console.log('getUserDetails hit, user:', req.user);
  try {
    const user = await User.findById(req.user._id).select('-password')
    if(!user) {
      res.status(404).json({ message: 'User not found'})
    }
    res.json(user)
  } catch (error) {
    console.error('getUserDetails error:', error);
    res.status(500).json({ message: 'Server error'})
  }
}

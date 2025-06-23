const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await new User({ name, email, password: hashedPassword }).save();

  const token = jwt.sign({ userId: user._id, email }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ message: 'Registered', token, user: { id: user._id, name, email } });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(400).json({ message: 'Invalid credentials' });

  const isAdmin = email === 'admin@intellipaat.com'; // ✅ detect admin

  const token = jwt.sign(
    { userId: user._id, email, isAdmin }, // ✅ include isAdmin
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: { id: user._id, name: user.name, email, isAdmin }
  });
});


// Admin login
router.post('/admin-login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@intellipaat.com' && password === 'admin123') {
    const token = jwt.sign({ userId: 'admin', email, isAdmin: true }, JWT_SECRET, { expiresIn: '1d' });
    return res.json({ message: 'Admin login', token, user: { id: 'admin', email, name: 'Admin', isAdmin: true } });
  }
  res.status(400).json({ message: 'Invalid admin credentials' });
});

module.exports = router;

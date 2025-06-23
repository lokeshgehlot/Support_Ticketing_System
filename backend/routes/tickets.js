const express = require('express');
const Ticket = require('../models/ticket');
const User = require('../models/user');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Create ticket
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { course, contactNumber, concern } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const ticket = new Ticket({
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
      course,
      contactNumber,
      concern,
    });

    await ticket.save();
    res.status(201).json({ message: 'Ticket created', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Get user tickets
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user.userId });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Admin: Get all open tickets
router.get('/all', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });
    const tickets = await Ticket.find({ status: 'Need to Call' });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Admin: Update status
router.put('/:id/status', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin only' });

    const { status } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true }
    );

    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.json({ message: 'Status updated', ticket });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

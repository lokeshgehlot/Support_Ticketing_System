const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  userEmail: String,
  course: { type: String, enum: ['AWS', 'Full Stack', 'Python'], required: true },
  contactNumber: String,
  concern: String,
  status: { type: String, enum: ['Need to Call', 'Closed'], default: 'Need to Call' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Ticket', ticketSchema);

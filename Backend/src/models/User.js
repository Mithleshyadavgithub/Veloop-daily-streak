const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: 'Explorer' },
  email: { type: String, default: 'explorer@veloop.io' },
  rank: { type: Number, default: 18 },
  level: { type: Number, default: 5 },
  levelProgress: { type: Number, default: 72 },
  longestStreak: { type: Number, default: 14 },
  currentStreak: { type: Number, default: 1 },
  currentCycle: { type: String, default: 'CYCLE_001' },
  lastClaimAt: { type: Date, default: null },
  nextClaimAt: { type: Date, default: () => new Date() },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

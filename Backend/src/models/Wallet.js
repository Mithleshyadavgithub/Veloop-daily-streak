const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, index: true },
  vesBalance: { type: Number, default: 100, min: 0 },
  giftCardBalance: { type: Number, default: 0, min: 0 },
  totalPoints: { type: Number, default: 100, min: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wallet', walletSchema);

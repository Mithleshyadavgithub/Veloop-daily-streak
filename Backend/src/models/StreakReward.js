const mongoose = require('mongoose');

const streakRewardSchema = new mongoose.Schema({
  day: { type: Number, required: true, unique: true, min: 1, max: 7 },
  rewardType: { type: String, enum: ['VES', 'GIFT_CARD', 'ULTIMATE'], required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  assetType: { type: String, enum: ['coin', 'gift-card', 'gift-box', 'crown'], required: true },
  badge: { type: String, default: null },
  active: { type: Boolean, default: true },
  metadata: { type: Object, default: {} }
});

module.exports = mongoose.model('StreakReward', streakRewardSchema);

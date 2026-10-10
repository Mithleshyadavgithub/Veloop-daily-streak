const mongoose = require('mongoose');

const streakConfigSchema = new mongoose.Schema({
  configId: { type: String, default: 'DEFAULT_STREAK_CONFIG', unique: true },
  totalDays: { type: Number, default: 7 },
  claimIntervalHours: { type: Number, default: 24 },
  gracePeriodHours: { type: Number, default: 24 }, // Allowed window before streak resets (48h total)
  active: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StreakConfig', streakConfigSchema);

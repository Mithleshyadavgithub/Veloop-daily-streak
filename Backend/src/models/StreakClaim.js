const mongoose = require('mongoose');

const streakClaimSchema = new mongoose.Schema({
  claimId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  cycleId: { type: String, default: 'CYCLE_001', required: true },
  day: { type: Number, required: true, min: 1, max: 7 },
  rewardAmount: { type: Number, required: true },
  rewardCurrency: { type: String, required: true },
  rewardType: { type: String, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['CLAIMED', 'REVOKED'], default: 'CLAIMED' },
  claimedAt: { type: Date, default: Date.now },
  clientIp: { type: String, default: null }
});

// Compound unique index for idempotency and duplicate prevention (Specs #40, #42, #62)
streakClaimSchema.index({ userId: 1, cycleId: 1, day: 1 }, { unique: true });

module.exports = mongoose.model('StreakClaim', streakClaimSchema);

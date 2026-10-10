const mongoose = require('mongoose');

const walletTransactionSchema = new mongoose.Schema({
  transactionId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  currency: { type: String, required: true }, // 'VES' | 'INR'
  type: { type: String, enum: ['CREDIT', 'DEBIT'], default: 'CREDIT' },
  amount: { type: Number, required: true },
  source: { type: String, default: 'DAILY_STREAK' },
  referenceId: { type: String, required: true },
  streakDay: { type: Number, default: null },
  balanceBefore: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
  status: { type: String, enum: ['SUCCESS', 'PENDING', 'FAILED'], default: 'SUCCESS' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WalletTransaction', walletTransactionSchema);

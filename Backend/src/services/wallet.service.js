const Wallet = require('../models/Wallet');
const WalletTransaction = require('../models/WalletTransaction');
const { logEvent } = require('./audit.service');

// Fallback in-memory wallet store for resilient offline dev
const inMemoryWallets = new Map();
const inMemoryTransactions = [];

const getWallet = async (userId) => {
  try {
    if (Wallet.db.readyState === 1) {
      let wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        wallet = await Wallet.create({ userId, vesBalance: 100, giftCardBalance: 0, totalPoints: 100 });
      }
      const transactions = await WalletTransaction.find({ userId }).sort({ createdAt: -1 }).limit(20);
      return { wallet, transactions };
    }
  } catch (err) {
    console.warn('Wallet DB fetch warning:', err.message);
  }

  // Memory fallback
  if (!inMemoryWallets.has(userId)) {
    inMemoryWallets.set(userId, { userId, vesBalance: 100, giftCardBalance: 0, totalPoints: 100 });
  }
  const wallet = inMemoryWallets.get(userId);
  const transactions = inMemoryTransactions.filter(t => t.userId === userId).slice(0, 20);
  return { wallet, transactions };
};

const creditReward = async (userId, reward, source = 'DAILY_STREAK', referenceId = '', streakDay = null) => {
  const isGc = reward.currency === 'INR' || reward.rewardType === 'GIFT_CARD' || reward.rewardType === 'ULTIMATE';
  const amount = reward.amount;

  try {
    if (Wallet.db.readyState === 1) {
      let wallet = await Wallet.findOne({ userId });
      if (!wallet) {
        wallet = await Wallet.create({ userId, vesBalance: 100, giftCardBalance: 0, totalPoints: 100 });
      }

      const balanceBefore = isGc ? wallet.giftCardBalance : wallet.vesBalance;
      if (isGc) {
        wallet.giftCardBalance += amount;
      } else {
        wallet.vesBalance += amount;
        wallet.totalPoints += amount;
      }
      wallet.updatedAt = new Date();
      await wallet.save();
      const balanceAfter = isGc ? wallet.giftCardBalance : wallet.vesBalance;

      const tx = await WalletTransaction.create({
        transactionId: `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        userId,
        currency: reward.currency,
        type: 'CREDIT',
        amount,
        source,
        referenceId: referenceId || `STREAK_DAY_${streakDay}`,
        streakDay,
        balanceBefore,
        balanceAfter,
        status: 'SUCCESS',
        createdAt: new Date()
      });

      return { wallet, transaction: tx };
    }
  } catch (err) {
    console.error('Database credit error:', err.message);
  }

  // Memory fallback
  if (!inMemoryWallets.has(userId)) {
    inMemoryWallets.set(userId, { userId, vesBalance: 100, giftCardBalance: 0, totalPoints: 100 });
  }
  const wallet = inMemoryWallets.get(userId);
  const balanceBefore = isGc ? wallet.giftCardBalance : wallet.vesBalance;
  if (isGc) {
    wallet.giftCardBalance += amount;
  } else {
    wallet.vesBalance += amount;
    wallet.totalPoints += amount;
  }
  const balanceAfter = isGc ? wallet.giftCardBalance : wallet.vesBalance;

  const tx = {
    transactionId: `TX_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
    userId,
    currency: reward.currency,
    type: 'CREDIT',
    amount,
    source,
    referenceId: referenceId || `STREAK_DAY_${streakDay}`,
    streakDay,
    balanceBefore,
    balanceAfter,
    status: 'SUCCESS',
    createdAt: new Date()
  };
  inMemoryTransactions.unshift(tx);

  return { wallet, transaction: tx };
};

module.exports = { getWallet, creditReward };

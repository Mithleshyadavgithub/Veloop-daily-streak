require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const StreakConfig = require('../models/StreakConfig');
const StreakReward = require('../models/StreakReward');
const Wallet = require('../models/Wallet');
const StreakClaim = require('../models/StreakClaim');

const INITIAL_REWARDS = [
  { day: 1, rewardType: 'VES', currency: 'VES', amount: 5, title: '+5', subtitle: '5 VEs', assetType: 'coin', badge: null },
  { day: 2, rewardType: 'VES', currency: 'VES', amount: 10, title: '+10', subtitle: '10 VEs', assetType: 'coin', badge: 'Today' },
  { day: 3, rewardType: 'VES', currency: 'VES', amount: 15, title: '+15', subtitle: '15 VEs', assetType: 'coin', badge: null },
  { day: 4, rewardType: 'GIFT_CARD', currency: 'INR', amount: 1, title: '₹1', subtitle: 'Amazon Gift Card', assetType: 'gift-box', badge: null },
  { day: 5, rewardType: 'GIFT_CARD', currency: 'INR', amount: 2, title: '₹2', subtitle: 'Amazon Gift Card', assetType: 'gift-card', badge: 'Gift Card' },
  { day: 6, rewardType: 'VES', currency: 'VES', amount: 30, title: '+30', subtitle: '30 VEs', assetType: 'coin', badge: 'Coin' },
  { day: 7, rewardType: 'ULTIMATE', currency: 'INR', amount: 5, title: '₹5', subtitle: 'Amazon Gift Card', assetType: 'crown', badge: 'VIP' }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/veloop_rewards';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for Seeding...');

    // Clear and re-populate streak configuration & rewards
    await StreakConfig.deleteMany({});
    await StreakConfig.create({
      configId: 'DEFAULT_STREAK_CONFIG',
      totalDays: 7,
      claimIntervalHours: 24,
      gracePeriodHours: 24,
      active: true
    });
    console.log('✅ StreakConfig seeded.');

    await StreakReward.deleteMany({});
    await StreakReward.insertMany(INITIAL_REWARDS);
    console.log('✅ 7-Day Streak Rewards seeded.');

    // Seed default test user if not exists
    const existingUser = await User.findOne({ userId: 'USER_MEMBER_9921' });
    if (!existingUser) {
      await User.create({
        userId: 'USER_MEMBER_9921',
        name: 'Explorer',
        email: 'explorer@veloop.io',
        rank: 18,
        level: 5,
        levelProgress: 72,
        longestStreak: 14,
        currentStreak: 1,
        currentCycle: 'CYCLE_001',
        lastClaimAt: new Date(Date.now() - 25 * 3600 * 1000), // 25h ago (Day 2 claimable)
        nextClaimAt: new Date(Date.now() - 60000)
      });
      console.log('✅ Default Test User seeded.');
    }

    const existingWallet = await Wallet.findOne({ userId: 'USER_MEMBER_9921' });
    if (!existingWallet) {
      await Wallet.create({
        userId: 'USER_MEMBER_9921',
        vesBalance: 100,
        giftCardBalance: 0,
        totalPoints: 100
      });
      console.log('✅ Default Wallet seeded.');
    }

    console.log('🎉 Seeding Complete!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  seed();
}

module.exports = { seed, INITIAL_REWARDS };

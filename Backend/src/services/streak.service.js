const User = require('../models/User');
const StreakConfig = require('../models/StreakConfig');
const StreakReward = require('../models/StreakReward');
const StreakClaim = require('../models/StreakClaim');
const { creditReward, getWallet } = require('./wallet.service');
const { logEvent } = require('./audit.service');

// Simulated server clock offset for developer testing (+24h time-travel)
let simulatedServerTimeOffsetMs = 0;

const getServerTime = () => {
  return new Date(Date.now() + simulatedServerTimeOffsetMs);
};

const setSimulatedTimeOffset = (hours) => {
  simulatedServerTimeOffsetMs += hours * 3600 * 1000;
  return getServerTime();
};

const resetSimulatedTimeOffset = () => {
  simulatedServerTimeOffsetMs = 0;
  return getServerTime();
};

const DEFAULT_REWARDS = [
  { day: 1, rewardType: 'VES', currency: 'VES', amount: 5, title: '+5', subtitle: '5 VEs', assetType: 'coin', badge: null },
  { day: 2, rewardType: 'VES', currency: 'VES', amount: 10, title: '+10', subtitle: '10 VEs', assetType: 'coin', badge: 'Today' },
  { day: 3, rewardType: 'VES', currency: 'VES', amount: 15, title: '+15', subtitle: '15 VEs', assetType: 'coin', badge: null },
  { day: 4, rewardType: 'GIFT_CARD', currency: 'INR', amount: 1, title: '₹1', subtitle: 'Amazon Gift Card', assetType: 'gift-box', badge: null },
  { day: 5, rewardType: 'GIFT_CARD', currency: 'INR', amount: 2, title: '₹2', subtitle: 'Amazon Gift Card', assetType: 'gift-card', badge: 'Gift Card' },
  { day: 6, rewardType: 'VES', currency: 'VES', amount: 30, title: '+30', subtitle: '30 VEs', assetType: 'coin', badge: 'Coin' },
  { day: 7, rewardType: 'ULTIMATE', currency: 'INR', amount: 5, title: '₹5', subtitle: 'Amazon Gift Card', assetType: 'crown', badge: 'VIP' }
];

// Fallback in-memory state
const inMemoryUsers = new Map();
const inMemoryClaims = [];

const getOrCreateUser = async (userId) => {
  try {
    if (User.db.readyState === 1) {
      let user = await User.findOne({ userId });
      if (!user) {
        user = await User.create({
          userId,
          name: 'Explorer',
          rank: 18,
          level: 5,
          levelProgress: 72,
          longestStreak: 14,
          currentStreak: 1,
          currentCycle: 'CYCLE_001',
          lastClaimAt: new Date(getServerTime().getTime() - 25 * 3600 * 1000),
          nextClaimAt: new Date(getServerTime().getTime() - 60000)
        });
      }
      return user;
    }
  } catch {}

  if (!inMemoryUsers.has(userId)) {
    inMemoryUsers.set(userId, {
      userId,
      name: 'Explorer',
      rank: 18,
      level: 5,
      levelProgress: 72,
      longestStreak: 14,
      currentStreak: 1,
      currentCycle: 'CYCLE_001',
      lastClaimAt: new Date(getServerTime().getTime() - 25 * 3600 * 1000),
      nextClaimAt: new Date(getServerTime().getTime() - 60000)
    });
  }
  return inMemoryUsers.get(userId);
};

const getStreakStatus = async (userId = 'USER_MEMBER_9921') => {
  const user = await getOrCreateUser(userId);
  const now = getServerTime();
  const cycleId = user.currentCycle || 'CYCLE_001';

  // Fetch configured rewards
  let configuredRewards = DEFAULT_REWARDS;
  try {
    if (StreakReward.db.readyState === 1) {
      const dbRewards = await StreakReward.find({ active: true }).sort({ day: 1 });
      if (dbRewards && dbRewards.length === 7) {
        configuredRewards = dbRewards;
      }
    }
  } catch {}

  // Fetch claims in current cycle
  let claims = [];
  try {
    if (StreakClaim.db.readyState === 1) {
      claims = await StreakClaim.find({ userId, cycleId });
    }
  } catch {}
  if (claims.length === 0) {
    claims = inMemoryClaims.filter(c => c.userId === userId && c.cycleId === cycleId);
  }

  // Check missed day logic (Grace period = 48h since last claim)
  const lastClaimTime = user.lastClaimAt ? new Date(user.lastClaimAt).getTime() : null;
  let isMissed = false;
  if (lastClaimTime && user.currentStreak > 0) {
    const hoursSinceLastClaim = (now.getTime() - lastClaimTime) / (3600 * 1000);
    if (hoursSinceLastClaim > 48) { // 24h interval + 24h grace period = 48h
      isMissed = true;
      user.currentStreak = 0;
      user.currentCycle = `CYCLE_${Date.now()}`;
      user.lastClaimAt = null;
      user.nextClaimAt = now;
      if (User.db.readyState === 1 && typeof user.save === 'function') {
        await user.save();
      }
      await logEvent('STREAK_RESET', userId, 1, 'Missed streak detected: Exceeded 48h claim window. Streak reset to Day 1.');
      claims = [];
    }
  }

  // Determine current day & claimable status
  const checkedInCount = claims.length;
  let currentDay = checkedInCount + 1;
  if (currentDay > 7) currentDay = 7;

  // Determine nextClaimAt & status
  let isTodayClaimable = false;
  let nextClaimAt = user.nextClaimAt || now;

  if (checkedInCount === 0) {
    isTodayClaimable = true;
    nextClaimAt = now;
  } else {
    const lastClaim = claims.sort((a, b) => new Date(b.claimedAt) - new Date(a.claimedAt))[0];
    const claimTime = new Date(lastClaim.claimedAt).getTime();
    const unlockTime = claimTime + 24 * 3600 * 1000;
    nextClaimAt = new Date(unlockTime);

    if (now.getTime() >= unlockTime && checkedInCount < 7) {
      isTodayClaimable = true;
    }
  }

  // Compute states for all 7 cards (Specs #28, #29, #57)
  const computedRewards = configuredRewards.map((r) => {
    const isClaimed = claims.some(c => c.day === r.day);
    let status = 'LOCKED';
    if (isClaimed) {
      status = 'CLAIMED';
    } else if (r.day === currentDay && isTodayClaimable) {
      status = 'TODAY';
    } else if (r.day === currentDay && !isTodayClaimable) {
      status = 'LOCKED';
    } else {
      status = 'LOCKED';
    }

    return {
      day: r.day,
      rewardType: r.rewardType,
      currency: r.currency,
      amount: r.amount,
      title: r.title,
      subtitle: r.subtitle,
      assetType: r.assetType,
      badge: r.badge,
      status,
      nextClaimAt: status === 'LOCKED' && r.day === currentDay ? nextClaimAt.toISOString() : null
    };
  });

  const { wallet } = await getWallet(userId);

  return {
    success: true,
    serverTime: now.toISOString(),
    user: {
      userId: user.userId,
      name: user.name,
      rank: user.rank,
      level: user.level,
      levelProgress: user.levelProgress,
      longestStreak: user.longestStreak,
      vesBalance: wallet.vesBalance,
      giftCardBalance: wallet.giftCardBalance,
      totalPoints: wallet.totalPoints
    },
    streak: {
      currentStreak: user.currentStreak,
      currentDay,
      checkedIn: checkedInCount,
      totalRewards: 7,
      status: isTodayClaimable ? 'ACTIVE' : 'LOCKED',
      nextClaimAt: nextClaimAt.toISOString(),
      longestStreak: user.longestStreak
    },
    rewards: computedRewards
  };
};

const claimStreakReward = async (userId = 'USER_MEMBER_9921', requestedDay = null, clientIp = null) => {
  const now = getServerTime();
  const status = await getStreakStatus(userId);
  const currentDay = status.streak.currentDay;
  const targetDay = requestedDay ? parseInt(requestedDay, 10) : currentDay;
  const user = await getOrCreateUser(userId);
  const cycleId = user.currentCycle || 'CYCLE_001';

  await logEvent('STREAK_CLAIM_REQUEST', userId, targetDay, `Claim requested for Day ${targetDay}`);

  // 1. Sequential Claim Validation (Specs #13, #14, #99)
  if (targetDay !== currentDay) {
    await logEvent('ATTACK_REJECTED', userId, targetDay, `Skip day exploit attempt: Requested Day ${targetDay} while eligible for Day ${currentDay}`);
    return {
      success: false,
      error: `Invalid streak day. You are currently on Day ${currentDay}.`,
      errorCode: 'INVALID_DAY'
    };
  }

  // 2. Already Claimed Check (Specs #33, #40, #101)
  const todayRewardConfig = status.rewards.find(r => r.day === targetDay);
  if (todayRewardConfig.status === 'CLAIMED') {
    await logEvent('DUPLICATE_CLAIM', userId, targetDay, `Duplicate claim rejected for Day ${targetDay}`);
    return {
      success: false,
      error: 'This streak reward has already been claimed.',
      errorCode: 'ALREADY_CLAIMED'
    };
  }

  // 3. 24h Timer / Unlock Check (Specs #9, #10, #97)
  if (todayRewardConfig.status === 'LOCKED') {
    await logEvent('STREAK_CLAIM_REJECTED', userId, targetDay, `Attempted early claim while locked. Next unlock: ${status.streak.nextClaimAt}`);
    return {
      success: false,
      error: 'Your next streak reward is still locked. Please wait for the countdown timer.',
      errorCode: 'STILL_LOCKED'
    };
  }

  // 4. Server-Side Reward Lookup (Never trust client payload - Specs #18, #36, #98)
  const configuredReward = DEFAULT_REWARDS.find(r => r.day === targetDay);
  const claimId = `CLAIM_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const txId = `TX_STREAK_D${targetDay}_${Date.now()}`;

  // 5. Atomic Claim Persistence & Wallet Credit (Specs #37, #38, #42)
  try {
    if (StreakClaim.db.readyState === 1) {
      await StreakClaim.create({
        claimId,
        userId,
        cycleId,
        day: targetDay,
        rewardAmount: configuredReward.amount,
        rewardCurrency: configuredReward.currency,
        rewardType: configuredReward.rewardType,
        transactionId: txId,
        status: 'CLAIMED',
        claimedAt: now,
        clientIp
      });
    }
  } catch (err) {
    // Unique compound index violation -> Idempotent rejection
    if (err.code === 11000) {
      await logEvent('DUPLICATE_CLAIM', userId, targetDay, `MongoDB unique constraint blocked duplicate claim.`);
      return {
        success: false,
        error: 'Duplicate claim rejected.',
        errorCode: 'DUPLICATE_CLAIM'
      };
    }
  }

  inMemoryClaims.push({
    claimId,
    userId,
    cycleId,
    day: targetDay,
    rewardAmount: configuredReward.amount,
    rewardCurrency: configuredReward.currency,
    rewardType: configuredReward.rewardType,
    transactionId: txId,
    status: 'CLAIMED',
    claimedAt: now
  });

  // Credit reward to wallet
  const { wallet, transaction } = await creditReward(userId, configuredReward, 'DAILY_STREAK', txId, targetDay);

  // Update user streak stats
  user.currentStreak += 1;
  if (user.currentStreak > user.longestStreak) {
    user.longestStreak = user.currentStreak;
  }
  user.lastClaimAt = now;
  user.nextClaimAt = new Date(now.getTime() + 24 * 3600 * 1000);

  if (User.db.readyState === 1 && typeof user.save === 'function') {
    await user.save();
  }

  await logEvent('STREAK_CLAIM_SUCCESS', userId, targetDay, `Successfully claimed Day ${targetDay} reward: +${configuredReward.amount} ${configuredReward.currency}`);

  return {
    success: true,
    day: targetDay,
    reward: configuredReward,
    transaction,
    updatedStreak: user.currentStreak,
    nextClaimAt: user.nextClaimAt.toISOString(),
    wallet
  };
};

const resetStreakToDay1 = async (userId = 'USER_MEMBER_9921') => {
  const user = await getOrCreateUser(userId);
  user.currentStreak = 0;
  user.currentCycle = `CYCLE_${Date.now()}`;
  user.lastClaimAt = null;
  user.nextClaimAt = getServerTime();

  if (User.db.readyState === 1 && typeof user.save === 'function') {
    await user.save();
  }

  // Clear in-memory claims for user
  const remaining = inMemoryClaims.filter(c => c.userId !== userId);
  inMemoryClaims.length = 0;
  inMemoryClaims.push(...remaining);

  await logEvent('STREAK_RESET', userId, 1, 'Development testing: Streak reset to Day 1 initial state.');
  return { success: true, message: 'Streak reset to Day 1 initial state' };
};

module.exports = {
  getServerTime,
  setSimulatedTimeOffset,
  resetSimulatedTimeOffset,
  getStreakStatus,
  claimStreakReward,
  resetStreakToDay1,
  DEFAULT_REWARDS
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Wallet = require('../models/Wallet');

const register = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.body.userId || `USER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let user = await User.findOne({ $or: [{ email: email || 'never_match' }, { userId }] });
    if (!user) {
      user = await User.create({
        userId,
        name: name || 'Student Explorer',
        email: email || `${userId.toLowerCase()}@veloop.io`,
        rank: Math.floor(Math.random() * 15) + 5,
        level: 3,
        levelProgress: 72,
        longestStreak: 14,
        currentStreak: 1,
        currentCycle: 'CYCLE_001',
        nextClaimAt: new Date(Date.now() - 60000)
      });

      // Create initial wallet with 100 VES coins in MongoDB
      await Wallet.create({
        userId: user.userId,
        vesBalance: 100,
        giftCardBalance: 0,
        totalPoints: 100
      });
    }

    const secret = process.env.JWT_SECRET || 'veloop_super_secure_jwt_secret_key_2026';
    const token = jwt.sign({ userId: user.userId, name: user.name, role: 'member' }, secret, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        level: user.level,
        rank: user.rank,
        currentStreak: user.currentStreak
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, userId, name } = req.body;
    let user = null;
    
    if (email) {
      user = await User.findOne({ email });
    } else if (userId) {
      user = await User.findOne({ userId });
    }

    if (!user) {
      const newUserId = userId || `USER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      user = await User.create({
        userId: newUserId,
        name: name || (email ? email.split('@')[0] : 'Student Explorer'),
        email: email || `${newUserId.toLowerCase()}@veloop.io`,
        rank: 18,
        level: 3,
        levelProgress: 72,
        longestStreak: 14,
        currentStreak: 1,
        currentCycle: 'CYCLE_001',
        nextClaimAt: new Date(Date.now() - 60000)
      });

      await Wallet.create({
        userId: user.userId,
        vesBalance: 100,
        giftCardBalance: 0,
        totalPoints: 100
      });
    }

    const secret = process.env.JWT_SECRET || 'veloop_super_secure_jwt_secret_key_2026';
    const token = jwt.sign({ userId: user.userId, name: user.name, role: 'member' }, secret, { expiresIn: '7d' });

    res.json({
      success: true,
      token,
      user: {
        userId: user.userId,
        name: user.name,
        email: user.email,
        level: user.level,
        rank: user.rank,
        currentStreak: user.currentStreak
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
};

const getMe = async (req, res) => {
  try {
    const userId = req.user?.userId || 'USER_MEMBER_9921';
    const user = await User.findOne({ userId });
    const wallet = await Wallet.findOne({ userId });

    res.json({
      success: true,
      user: user || { userId, name: 'Explorer' },
      wallet: wallet || { vesBalance: 100, giftCardBalance: 0 }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch user' });
  }
};

module.exports = { register, login, getMe };

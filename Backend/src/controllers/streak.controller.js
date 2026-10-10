const streakService = require('../services/streak.service');

const getStreak = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'USER_MEMBER_9921';
    const status = await streakService.getStreakStatus(userId);
    res.json(status);
  } catch (err) {
    next(err);
  }
};

const claimStreak = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'USER_MEMBER_9921';
    const { day } = req.body;
    const clientIp = req.ip || req.headers['x-forwarded-for'];
    const result = await streakService.claimStreakReward(userId, day, clientIp);

    if (!result.success) {
      return res.status(400).json(result);
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { getStreak, claimStreak };

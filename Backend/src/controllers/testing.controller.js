const streakService = require('../services/streak.service');
const { getRecentLogs, logEvent } = require('../services/audit.service');

const timeTravel = async (req, res, next) => {
  try {
    const { hours } = req.body;
    const hoursNum = parseFloat(hours) || 24;
    const newServerTime = streakService.setSimulatedTimeOffset(hoursNum);
    await logEvent('TIME_TRAVEL_SIMULATED', 'SYSTEM_EVALUATOR', null, `Simulated server clock advanced by +${hoursNum} hours.`);
    res.json({
      success: true,
      message: `Server time advanced by ${hoursNum} hours.`,
      simulatedServerTime: newServerTime.toISOString()
    });
  } catch (err) {
    next(err);
  }
};

const resetStreak = async (req, res, next) => {
  try {
    const userId = req.body?.userId || 'USER_MEMBER_9921';
    const result = await streakService.resetStreakToDay1(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

const getAuditLogs = async (req, res, next) => {
  try {
    const logs = await getRecentLogs(30);
    res.json({ success: true, logs });
  } catch (err) {
    next(err);
  }
};

const resetTime = async (req, res, next) => {
  try {
    const normalTime = streakService.resetSimulatedTimeOffset();
    await logEvent('TIME_OFFSET_RESET', 'SYSTEM_EVALUATOR', null, 'Simulated clock reset back to true real-world server time.');
    res.json({
      success: true,
      message: 'Server time offset reset to real server time.',
      serverTime: normalTime.toISOString()
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { timeTravel, resetStreak, getAuditLogs, resetTime };

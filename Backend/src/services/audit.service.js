const AuditLog = require('../models/AuditLog');

const inMemoryLogs = [];

const logEvent = async (action, userId, day, details, metadata = {}) => {
  const logEntry = {
    logId: `LOG_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    action,
    userId,
    day,
    details,
    metadata,
    timestamp: new Date()
  };

  inMemoryLogs.unshift(logEntry);
  if (inMemoryLogs.length > 100) inMemoryLogs.pop();

  try {
    if (AuditLog.db.readyState === 1) {
      await AuditLog.create(logEntry);
    }
  } catch (err) {
    console.error('AuditLog persistence error:', err.message);
  }

  return logEntry;
};

const getRecentLogs = async (limit = 25) => {
  try {
    if (AuditLog.db.readyState === 1) {
      return await AuditLog.find().sort({ timestamp: -1 }).limit(limit);
    }
  } catch {
    // fallback
  }
  return inMemoryLogs.slice(0, limit);
};

module.exports = { logEvent, getRecentLogs, inMemoryLogs };

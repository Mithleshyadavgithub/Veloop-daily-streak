const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  logId: { type: String, required: true, unique: true },
  action: { 
    type: String, 
    enum: [
      'STREAK_CLAIM_REQUEST', 
      'STREAK_CLAIM_SUCCESS', 
      'STREAK_CLAIM_REJECTED', 
      'STREAK_RESET', 
      'DUPLICATE_CLAIM', 
      'INVALID_CLAIM',
      'TIME_TRAVEL_SIMULATED',
      'ATTACK_REJECTED'
    ], 
    required: true 
  },
  userId: { type: String, required: true },
  day: { type: Number, default: null },
  details: { type: String, required: true },
  metadata: { type: Object, default: {} },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);

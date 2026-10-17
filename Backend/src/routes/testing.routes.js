const express = require('express');
const router = express.Router();
const testingController = require('../controllers/testing.controller');

// POST /api/testing/time-travel
router.post('/time-travel', testingController.timeTravel);

// POST /api/testing/reset
router.post('/reset', testingController.resetStreak);

// POST /api/testing/reset-time
router.post('/reset-time', testingController.resetTime);

// GET /api/testing/audit-logs
router.get('/audit-logs', testingController.getAuditLogs);

module.exports = router;

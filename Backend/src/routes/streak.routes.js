const express = require('express');
const router = express.Router();
const streakController = require('../controllers/streak.controller');
const authMiddleware = require('../middleware/auth.middleware');
const { claimLimiter } = require('../middleware/rateLimiter');

// GET /api/daily-streak
router.get('/', authMiddleware, streakController.getStreak);

// GET /api/daily-streak/status
router.get('/status', authMiddleware, streakController.getStreak);

// POST /api/daily-streak/claim
router.post('/claim', authMiddleware, claimLimiter, streakController.claimStreak);

module.exports = router;

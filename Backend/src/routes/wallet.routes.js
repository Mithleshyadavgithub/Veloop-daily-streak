const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');
const authMiddleware = require('../middleware/auth.middleware');

// GET /api/wallet
router.get('/', authMiddleware, walletController.getWallet);

module.exports = router;

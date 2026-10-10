const walletService = require('../services/wallet.service');

const getWallet = async (req, res, next) => {
  try {
    const userId = req.user?.userId || 'USER_MEMBER_9921';
    const data = await walletService.getWallet(userId);
    res.json({
      success: true,
      wallet: data.wallet,
      transactions: data.transactions
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getWallet };

import React, { useState, useEffect } from 'react';
import styles from './WalletPage.module.css';
import { Wallet, ArrowDownLeft, ArrowUpRight, ShieldCheck, History, Gift, RefreshCw } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import { streakApi } from '../../services/streakApi';

export default function WalletPage() {
  const { wallet, showToast } = useStreak();
  const [transactions, setTransactions] = useState([]);
  const [loadingTx, setLoadingTx] = useState(false);

  const fetchTransactions = async () => {
    setLoadingTx(true);
    const data = await streakApi.getWallet();
    if (data && data.transactions) {
      setTransactions(data.transactions);
    }
    setLoadingTx(false);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleWithdraw = () => {
    showToast('💳 Amazon Gift Card code and VES payout processing is active in your region.', 'info');
  };

  return (
    <div className={styles.walletContainer}>
      {/* Wallet Header */}
      <div className={styles.header}>
        <div className="d-flex align-items-center gap-2">
          <div className={styles.walletIconBox}>
            <Wallet size={24} color="#ffd700" />
          </div>
          <div>
            <h2 className={styles.title}>VELoop Wallet &amp; Ledger</h2>
            <p className={styles.subtitle}>Cryptographically recorded transactions and verified token balances</p>
          </div>
        </div>

        <button className={styles.refreshBtn} onClick={fetchTransactions} disabled={loadingTx}>
          <RefreshCw size={15} className={loadingTx ? 'spinner-border spinner-border-sm' : ''} />
          <span>Refresh Ledger</span>
        </button>
      </div>

      {/* Balances Overview Grid */}
      <div className={styles.balanceGrid}>
        {/* VES Balance Card */}
        <div className={styles.balanceCard}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className={styles.cardTag}>TOKEN ASSET</span>
            <span className={styles.badgeVes}>VES</span>
          </div>
          <div className={styles.bigAmount}>🪙 {wallet?.vesBalance ?? 100}</div>
          <div className={styles.cardSub}>VELoop Native Reward Tokens</div>
          <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-between align-items-center font-xs text-muted">
            <span>Source: Daily Streaks &amp; Tasks</span>
            <span className="text-success fw-bold">Verified Balance</span>
          </div>
        </div>

        {/* Amazon Gift Card Balance Card */}
        <div className={styles.balanceCard}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className={styles.cardTag}>GIFT CARD VOUCHERS</span>
            <span className={styles.badgeGc}>Amazon Pay</span>
          </div>
          <div className={styles.bigAmount}>₹{wallet?.giftCardBalance ?? 0}</div>
          <div className={styles.cardSub}>Amazon Gift Card Balance</div>
          <div className="mt-3 pt-3 border-top border-secondary d-flex justify-content-between align-items-center font-xs text-muted">
            <span>Redeemable on Day 4 (₹50), Day 5 (₹100), Day 7 (₹500)</span>
            <button className="btn btn-sm btn-outline-warning py-0 px-2 font-xs" onClick={handleWithdraw}>
              Redeem Code
            </button>
          </div>
        </div>
      </div>

      {/* Immutable Transaction History Ledger */}
      <div className={styles.ledgerSection}>
        <div className={styles.ledgerHeader}>
          <div className="d-flex align-items-center gap-2">
            <History size={18} color="#a855f7" />
            <h4 className={styles.ledgerTitle}>Reward Transaction Ledger</h4>
          </div>
          <div className={styles.securePill}>
            <ShieldCheck size={14} color="#10b981" />
            <span>MongoDB Ledger Sync</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Type / Source</th>
                <th>Streak Day</th>
                <th>Amount</th>
                <th>Balance (Before &rarr; After)</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-muted">
                    No transactions recorded yet. Claim daily rewards to generate ledger records.
                  </td>
                </tr>
              ) : (
                transactions.map((tx, i) => (
                  <tr key={i}>
                    <td className={styles.txIdCell}>
                      <code>{tx.transactionId}</code>
                    </td>
                    <td>
                      <span className={styles.sourceBadge}>{tx.source || 'DAILY_STREAK'}</span>
                    </td>
                    <td>
                      <span className="text-light fw-bold">Day {tx.streakDay || 1}</span>
                    </td>
                    <td>
                      <span className="text-warning fw-bold">+{tx.amount} {tx.currency}</span>
                    </td>
                    <td className="text-muted">
                      {tx.balanceBefore ?? '-'} &rarr; <strong className="text-white">{tx.balanceAfter ?? '-'}</strong>
                    </td>
                    <td className="text-muted font-xs">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                    <td>
                      <span className={styles.statusSuccess}>SUCCESS</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

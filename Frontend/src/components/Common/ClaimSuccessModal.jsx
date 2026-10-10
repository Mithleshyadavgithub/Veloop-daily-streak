import React from 'react';
import styles from './ClaimSuccessModal.module.css';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck, X } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import { CrownIcon, CoinStackIcon, AmazonGiftCardIcon, GiftBoxIcon } from '../../assets/rewardIcons';

export default function ClaimSuccessModal() {
  const { claimSuccessModal, setClaimSuccessModal, wallet, countdown, setActiveTab } = useStreak();

  if (!claimSuccessModal) return null;

  const { reward, transaction, day } = claimSuccessModal;

  const renderRewardIcon = () => {
    if (!reward) return <CoinStackIcon size={64} />;
    if (reward.assetType === 'crown' || reward.day === 7) return <CrownIcon size={64} />;
    if (reward.assetType === 'gift-card' || reward.rewardType === 'GIFT_CARD') return <AmazonGiftCardIcon size={64} />;
    if (reward.assetType === 'gift-box') return <GiftBoxIcon size={64} />;
    return <CoinStackIcon size={64} />;
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        <button 
          className={styles.closeBtn} 
          onClick={() => setClaimSuccessModal(null)}
        >
          <X size={18} />
        </button>

        {/* Celebration Header */}
        <div className={styles.iconCircle}>
          {renderRewardIcon()}
        </div>

        <div className={styles.badgeSuccess}>
          <CheckCircle2 size={14} />
          <span>DAY {day} CLAIMED SUCCESSFULLY</span>
        </div>

        <h2 className={styles.rewardTitle}>
          {reward?.title} {reward?.currency === 'VES' ? 'VES' : 'Amazon Card'}
        </h2>
        <p className={styles.subtitle}>
          Reward credited directly to your backend wallet!
        </p>

        {/* Transaction Ledger Receipt Box */}
        <div className={styles.receiptBox}>
          <div className={styles.receiptRow}>
            <span className="text-muted">Transaction ID:</span>
            <span className={styles.txId}>{transaction?.transactionId || `STREAK-DAY-${day}`}</span>
          </div>
          <div className={styles.receiptRow}>
            <span className="text-muted">Source:</span>
            <span className="text-warning fw-bold">DAILY_STREAK</span>
          </div>
          <div className={styles.receiptRow}>
            <span className="text-muted">Updated Balance:</span>
            <span className="text-white fw-bold">
              {wallet.vesBalance} VES {wallet.giftCardBalance > 0 && `(₹${wallet.giftCardBalance} GC)`}
            </span>
          </div>
          <div className={styles.receiptRow}>
            <span className="text-muted">Next Check-In:</span>
            <span className="text-info fw-bold">Tomorrow in {countdown.formatted}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex flex-column gap-2 mt-4">
          <button 
            className={styles.continueBtn}
            onClick={() => setClaimSuccessModal(null)}
          >
            <span>Awesome! Continue Streak</span>
            <ArrowRight size={18} />
          </button>
          
          <button 
            className={styles.walletBtn}
            onClick={() => { setClaimSuccessModal(null); setActiveTab('wallet'); }}
          >
            View in Wallet Ledger
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './UltimateReward.module.css';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { CrownIcon } from '../../assets/rewardIcons';
import { useStreak } from '../../context/StreakContext';

export default function UltimateReward() {
  const { streakData, initiateClaim } = useStreak();

  const day7Reward = streakData?.rewards?.find(r => r.day === 7) || {
    title: '₹500',
    subtitle: 'Amazon Gift Card',
    status: 'LOCKED',
    amount: 500,
    currency: 'INR'
  };

  const isClaimable = day7Reward.status === 'TODAY';
  const isClaimed = day7Reward.status === 'CLAIMED';

  return (
    <div className={styles.ultimateCard}>
      {/* Left: Crown Art */}
      <div className={styles.crownCol}>
        <div className={styles.crownGlowBackdrop}>
          <CrownIcon size={56} className={styles.floatingCrown} />
        </div>
      </div>

      {/* Middle: Reward Content */}
      <div className={styles.infoCol}>
        <div className={styles.tagLine}>
          <Sparkles size={11} color="#ffd700" />
          <span>Ultimate Reward</span>
        </div>
        <div className={styles.priceRow}>
          <span className={styles.priceAmount}>₹500</span>
        </div>
        <div className={styles.brandRow}>
          <span className={styles.amazonLogo}>a</span>
          <span className={styles.brandText}>Amazon Gift Card</span>
        </div>
      </div>

      {/* Right: Unlock State */}
      <div className={styles.actionCol}>
        {isClaimable ? (
          <button 
            className={styles.claimDay7Btn}
            onClick={() => initiateClaim(7)}
          >
            Claim ₹500
          </button>
        ) : isClaimed ? (
          <div className={styles.claimedBadge}>
            <CheckCircle2 size={16} color="#10b981" />
            <span>Claimed</span>
          </div>
        ) : (
          <div className={styles.lockContainer}>
            <div className={styles.lockCircle}>
              <Lock size={15} color="#c4bcd8" />
            </div>
            <span className={styles.unlockText}>Unlock on Day 7</span>
          </div>
        )}
      </div>
    </div>
  );
}

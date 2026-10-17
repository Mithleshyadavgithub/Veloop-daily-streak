import React from 'react';
import styles from './UltimateReward.module.css';
import { Lock, CheckCircle2 } from 'lucide-react';
import { crownImg } from '../../assets/streakAssets';
import { useStreak } from '../../context/StreakContext';

export default function UltimateReward() {
  const { streakData } = useStreak();

  // Day 7 is the ultimate reward configured by backend
  const day7Reward = streakData?.rewards?.find((r) => r.day === 7) || {
    title: '₹5',
    subtitle: 'Amazon Gift Card',
    status: 'LOCKED',
    amount: 5,
    currency: 'INR'
  };

  const isClaimed = day7Reward.status === 'CLAIMED';
  const isToday = day7Reward.status === 'TODAY';

  return (
    <div className={styles.ultimateCard}>
      <div className={styles.ambientGlow} />

      <div className={styles.cardContent}>
        {/* Left: 3D Crown on Velvet Podium Artwork */}
        <div className={styles.artSlot}>
          <img
            src={crownImg}
            alt="Day 7 Ultimate Reward 3D Crown"
            className={styles.crownImg}
            loading="lazy"
          />
        </div>

        {/* Center: Reward Details from Backend */}
        <div className={styles.detailsCol}>
          <span className={styles.label}>Ultimate Reward</span>
          <h3 className={styles.amount}>
            {day7Reward.title || `₹${day7Reward.amount}`}
          </h3>
          <div className={styles.providerRow}>
            <span className={styles.amazonBadge}>a</span>
            <span className={styles.providerText}>
              {day7Reward.subtitle || 'Amazon Gift Card'}
            </span>
          </div>
        </div>

        {/* Right: Unlock Status / Badge */}
        <div className={styles.statusCol}>
          {isClaimed ? (
            <div className={styles.claimedPill}>
              <CheckCircle2 size={15} className={styles.checkIcon} />
              <span>Claimed</span>
            </div>
          ) : isToday ? (
            <div className={styles.unlockedPill}>
              <span>Ready Today!</span>
            </div>
          ) : (
            <div className={styles.unlockPill}>
              <Lock size={15} className={styles.lockIcon} />
              <span>Unlock on Day 7</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

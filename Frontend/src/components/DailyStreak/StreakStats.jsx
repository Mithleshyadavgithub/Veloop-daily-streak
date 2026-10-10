import React from 'react';
import styles from './StreakStats.module.css';
import { Award, CheckCircle2, Star, Gift, Sparkles } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function StreakStats() {
  const { streakData } = useStreak();

  const totalRewards = streakData?.streak?.totalRewards ?? 7;
  const checkedIn = streakData?.streak?.checkedIn ?? 0;
  const nextReward = streakData?.streak?.nextReward;

  const nextRewardAmount = nextReward ? (
    nextReward.currency === 'VES' ? `+${nextReward.amount} VEs` : `₹${nextReward.amount}`
  ) : '+10 VEs';

  return (
    <div className={styles.statsRow}>
      {/* Stat 1: Total Rewards */}
      <div className={styles.statBox}>
        <div className={styles.headerLine}>
          <Gift size={13} className={styles.iconPurple} />
          <span className={styles.label}>Total Rewards</span>
        </div>
        <div className={styles.valueWhite}>{totalRewards}</div>
      </div>

      {/* Stat 2: Checked In */}
      <div className={styles.statBox}>
        <div className={styles.headerLine}>
          <CheckCircle2 size={13} className={styles.iconGreen} />
          <span className={styles.label}>Checked In</span>
        </div>
        <div className={styles.valueGreen}>{checkedIn}</div>
      </div>

      {/* Stat 3: Next Reward */}
      <div className={styles.statBox}>
        <div className={styles.headerLine}>
          <Star size={13} className={styles.iconGold} />
          <span className={styles.label}>Next Reward</span>
        </div>
        <div className={styles.valueGold}>{nextRewardAmount}</div>
      </div>
    </div>
  );
}

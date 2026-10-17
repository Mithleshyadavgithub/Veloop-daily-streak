import React from 'react';
import styles from './StreakStats.module.css';
import { Calendar as CalendarIcon, CheckSquare, Star } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function StreakStats() {
  const { streakData } = useStreak();

  const totalRewards = streakData?.streak?.totalRewards ?? 7;
  const checkedIn = streakData?.streak?.checkedIn ?? 1;
  const nextReward = streakData?.streak?.nextReward;

  const nextRewardAmount = nextReward ? (
    nextReward.currency === 'VES' ? `+${nextReward.amount} VEs` : `${nextReward.title} Card`
  ) : '+10 VEs';

  return (
    <div className={styles.statsGrid}>
      {/* Stat 1: Total Rewards */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapperPurple}>
            <CalendarIcon size={14} className={styles.statIcon} />
          </div>
          <span className={styles.statLabel}>Total Rewards</span>
        </div>
        <div className={styles.statValueWhite}>{totalRewards}</div>
      </div>

      {/* Stat 2: Checked In */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapperGreen}>
            <CheckSquare size={14} className={styles.statIcon} />
          </div>
          <span className={styles.statLabel}>Checked In</span>
        </div>
        <div className={styles.statValueGreen}>{checkedIn}</div>
      </div>

      {/* Stat 3: Next Reward */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className={styles.iconWrapperGold}>
            <Star size={14} className={styles.statIcon} />
          </div>
          <span className={styles.statLabel}>Next Reward</span>
        </div>
        <div className={styles.statValueGold}>{nextRewardAmount}</div>
      </div>
    </div>
  );
}

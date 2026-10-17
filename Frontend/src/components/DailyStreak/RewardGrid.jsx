import React from 'react';
import styles from './RewardGrid.module.css';
import RewardCard from './RewardCard';
import { useStreak } from '../../context/StreakContext';

export default function RewardGrid() {
  const { streakData } = useStreak();
  const rewards = streakData?.rewards || [];

  // Split into Row 1 (Days 1 to 4) and Row 2 (Days 5 to 7) matching Page 62 & 63
  const row1 = rewards.slice(0, 4);
  const row2 = rewards.slice(4, 7);

  return (
    <section className={styles.gridSection}>
      {/* Motivational Divider Strip */}
      <div className={styles.dividerStrip}>
        <span className={styles.sparkleIcon}>✦</span>
        <span className={styles.dividerText}>Come back tomorrow for more rewards!</span>
        <span className={styles.sparkleIcon}>✦</span>
      </div>

      {/* Row 1: Day 1 to Day 4 */}
      <div className={styles.row1Grid}>
        {row1.map((reward) => (
          <RewardCard key={reward.day} reward={reward} />
        ))}
      </div>

      {/* Row 2: Day 5 to Day 7 */}
      <div className={styles.row2Grid}>
        {row2.map((reward) => (
          <RewardCard key={reward.day} reward={reward} />
        ))}
      </div>
    </section>
  );
}

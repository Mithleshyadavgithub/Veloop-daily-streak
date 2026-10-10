import React from 'react';
import styles from './RewardGrid.module.css';
import RewardCard from './RewardCard';
import { useStreak } from '../../context/StreakContext';

export default function RewardGrid() {
  const { streakData } = useStreak();
  const rewards = streakData?.rewards || [];

  const row1 = rewards.slice(0, 4); // Day 1 to Day 4
  const row2 = rewards.slice(4, 7); // Day 5 to Day 7

  return (
    <div className={styles.gridContainer}>
      {/* Motivational Divider Strip before cards (Page 63) */}
      <div className={styles.dividerStrip}>
        <span>✦ Come back tomorrow for more rewards! ✦</span>
      </div>

      {/* Row 1: 4 cards (Day 1 - 4) */}
      <div className={styles.gridRowTop}>
        {row1.map((reward) => (
          <RewardCard key={reward.day} reward={reward} />
        ))}
      </div>

      {/* Row 2: 3 cards (Day 5 - 7) */}
      <div className={styles.gridRowBottom}>
        {row2.map((reward) => (
          <RewardCard key={reward.day} reward={reward} />
        ))}
      </div>
    </div>
  );
}

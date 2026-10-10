import React from 'react';
import styles from './TimelineProgress.module.css';
import { Flame, Lock, CheckCircle2, Sparkles } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function TimelineProgress() {
  const { streakData } = useStreak();

  const rewards = streakData?.rewards || [];
  const checkedIn = streakData?.streak?.checkedIn ?? 0;
  const totalRewards = streakData?.streak?.totalRewards ?? 7;
  const percentage = Math.round((checkedIn / totalRewards) * 100);

  return (
    <div className={styles.timelineContainer}>
      {/* Timeline Header */}
      <div className={styles.header}>
        <div>
          <h4 className={styles.title}>7-Day Streak Progression</h4>
          <p className={styles.subtitle}>Check in consecutively to reach the Day 7 Ultimate Reward</p>
        </div>
        <div className={styles.progressPill}>
          <Sparkles size={13} color="#ffd700" />
          <span>{checkedIn} of {totalRewards} Days Completed ({percentage}%)</span>
        </div>
      </div>

      {/* Progress Track */}
      <div className={styles.progressTrackWrapper}>
        <div className={styles.trackLine}>
          <div 
            className={styles.trackFill} 
            style={{ width: `${Math.min(100, (checkedIn / (totalRewards - 1)) * 100)}%` }} 
          />
        </div>

        {/* 7 Milestone Nodes */}
        <div className={styles.nodesContainer}>
          {rewards.map((r) => {
            const isClaimed = r.status === 'CLAIMED';
            const isToday = r.status === 'TODAY';
            const isLocked = r.status === 'LOCKED';

            let nodeClass = styles.nodeLocked;
            if (isClaimed) nodeClass = styles.nodeClaimed;
            if (isToday) nodeClass = styles.nodeToday;

            return (
              <div key={r.day} className={styles.nodeItem}>
                <div className={`${styles.nodeCircle} ${nodeClass}`}>
                  {isClaimed ? (
                    <CheckCircle2 size={16} />
                  ) : isToday ? (
                    <Flame size={16} className={styles.pulseFlame} />
                  ) : (
                    <Lock size={14} />
                  )}
                </div>
                <span className={styles.dayLabel}>Day {r.day}</span>
                <span className={styles.rewardLabel}>{r.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Motivational Divider Banner */}
      <div className={styles.motivationStrip}>
        <span>✦ Come back tomorrow for more rewards! ✦</span>
      </div>
    </div>
  );
}

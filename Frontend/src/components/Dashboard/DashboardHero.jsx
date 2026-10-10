import React from 'react';
import styles from './DashboardHero.module.css';
import { Sparkles, Flame, Zap } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function DashboardHero() {
  const { setActiveTab } = useStreak();

  return (
    <div className={styles.heroSection}>
      <div className={styles.leftCol}>
        <div className={styles.dashboardBadge}>
          <Sparkles size={13} color="#ffd700" />
          <span>VELOOP REWARDS DASHBOARD</span>
        </div>

        <h1 className={styles.welcomeHeading}>
          Welcome back 👋 <span className={styles.userName}>Explorer</span>
        </h1>
        <p className={styles.subHeading}>
          Your daily rewards, streak status, and booster milestones are synchronized in real-time.
        </p>
      </div>

      <div className={styles.rightButtons}>
        <button 
          className={styles.checkInBtn}
          onClick={() => setActiveTab('streak')}
        >
          <Flame size={18} color="#0b071e" />
          <span>Check-In Streak</span>
        </button>

        <button 
          className={styles.earnExtraBtn}
          onClick={() => setActiveTab('tasks')}
        >
          <Sparkles size={16} />
          <span>Earn Extra Points</span>
        </button>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import styles from './DashboardPage.module.css';
import DashboardHero from '../../components/Dashboard/DashboardHero';
import StatCards from '../../components/Dashboard/StatCards';
import DashboardStreakWidget from '../../components/Dashboard/DashboardStreakWidget';
import ActiveTasks from '../../components/Dashboard/ActiveTasks';
import GamifiedProgressHub from '../../components/Dashboard/GamifiedProgressHub';
import { useStreak } from '../../context/StreakContext';
import { SkeletonLoader } from '../../components/Common/StreakLoader';
import { Sparkles, LayoutDashboard, Flame } from 'lucide-react';

export default function DashboardPage() {
  const { loading } = useStreak();
  const [dashboardMode, setDashboardMode] = useState('gamified'); // 'gamified' | 'classic'

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className={styles.dashboardContainer}>
      {/* Top Welcome Hero Banner */}
      <DashboardHero />

      {/* Mode Switcher Pill (Explore More Features) */}
      <div className={styles.modeSwitcherRow}>
        <button 
          className={`${styles.modeBtn} ${dashboardMode === 'gamified' ? styles.modeActive : ''}`}
          onClick={() => setDashboardMode('gamified')}
        >
          <Sparkles size={14} color={dashboardMode === 'gamified' ? '#76ff03' : '#9c94b8'} />
          <span>Gamified Quests &amp; Streak Hub</span>
        </button>

        <button 
          className={`${styles.modeBtn} ${dashboardMode === 'classic' ? styles.modeActive : ''}`}
          onClick={() => setDashboardMode('classic')}
        >
          <LayoutDashboard size={14} />
          <span>Classic Metrics</span>
        </button>
      </div>

      {/* 4 Stat Cards: Total Points, Streak, Level, Rank */}
      <StatCards />

      {/* When in Gamified Mode: Show the Duolingo-style streak mascot, monthly challenge & review */}
      {dashboardMode === 'gamified' && (
        <GamifiedProgressHub />
      )}

      {/* Daily Check-In System Widget (Monday-Sunday strip) */}
      <DashboardStreakWidget />

      {/* Active Tasks & Activities */}
      <ActiveTasks />
    </div>
  );
}

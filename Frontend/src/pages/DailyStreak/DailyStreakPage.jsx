import React from 'react';
import styles from './DailyStreakPage.module.css';
import { ChevronLeft, Flame, Sparkles } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import HeroBanner from '../../components/DailyStreak/HeroBanner';
import UltimateReward from '../../components/DailyStreak/UltimateReward';
import StreakStats from '../../components/DailyStreak/StreakStats';
import RewardGrid from '../../components/DailyStreak/RewardGrid';
import WhyStreak from '../../components/DailyStreak/WhyStreak';
import { SkeletonLoader } from '../../components/Common/StreakLoader';

export default function DailyStreakPage() {
  const { loading, streakData, setActiveTab } = useStreak();

  if (loading) {
    return <SkeletonLoader />;
  }

  return (
    <div className={styles.pageContainer}>
      {/* Top Header Bar (Matching Page 63: Back chevron, Daily Streak 🔥, Gem/Token count) */}
      <div className={styles.headerBar}>
        <button 
          className={styles.backBtn}
          onClick={() => setActiveTab('dashboard')}
          title="Back to Dashboard"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="d-flex align-items-center gap-2">
          <h2 className={styles.pageTitle}>Daily Streak</h2>
          <Flame size={20} color="#ff9900" className={styles.titleFlame} />
        </div>

        <div className={styles.headerRightToken}>
          <span>🪙 {streakData?.user?.vesBalance ?? 100}</span>
        </div>
      </div>

      {/* Hero Banner (Illustrated top card) */}
      <HeroBanner />

      {/* 3 Stats in a clean row (Total Rewards 7, Checked In 1, Next Reward +10 VEs) */}
      <StreakStats />

      {/* Ultimate Reward Card (Crown + ₹5 Amazon Gift card + Unlock Day 7) */}
      <UltimateReward />

      {/* 7 Daily Reward Cards Grid (Row 1: 4 cards, Row 2: 3 cards) */}
      <RewardGrid />

      {/* Why Maintain Your Streak Section */}
      <WhyStreak />
    </div>
  );
}

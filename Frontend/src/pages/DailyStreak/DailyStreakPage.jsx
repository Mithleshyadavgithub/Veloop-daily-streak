import React, { useState } from 'react';
import styles from './DailyStreakPage.module.css';
import { AlertCircle, Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import StreakHeader from '../../components/DailyStreak/StreakHeader';
import HeroBanner from '../../components/DailyStreak/HeroBanner';
import StreakStats from '../../components/DailyStreak/StreakStats';
import UltimateReward from '../../components/DailyStreak/UltimateReward';
import RewardGrid from '../../components/DailyStreak/RewardGrid';
import WhyStreak from '../../components/DailyStreak/WhyStreak';
import TrustFooter from '../../components/DailyStreak/TrustFooter';
import StreakCalendarModal from '../../components/DailyStreak/StreakCalendarModal';
import { SkeletonLoader } from '../../components/Common/StreakLoader';
import CpaModal from '../../components/Common/CpaModal';
import ClaimSuccessModal from '../../components/Common/ClaimSuccessModal';
import AntiCheatDrawer from '../../components/Common/AntiCheatDrawer';
import { heroCrownImg, flameImg } from '../../assets/streakAssets';

export default function DailyStreakPage() {
  const { loading, streakData } = useStreak();
  const [calendarOpen, setCalendarOpen] = useState(false);

  if (loading) {
    return <SkeletonLoader />;
  }

  const isReset = streakData?.streak?.status === 'RESET' || streakData?.streak?.wasReset;
  const currentStreak = streakData?.streak?.currentStreak ?? 1;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        {/* Top Navbar */}
        <StreakHeader />

        {/* Missed Day Reset Notice if server reset occurred */}
        {isReset && (
          <div className={styles.resetAlert} role="alert">
            <AlertCircle size={18} />
            <span>
              Your streak was reset due to more than 48 hours without check-in. Start fresh today from Day 1!
            </span>
          </div>
        )}

        {/* ============================================================== */}
        {/* DESKTOP LAYOUT (matches Page 62 reference image on screens >= 992px) */}
        {/* ============================================================== */}
        <div className={styles.desktopLayout}>
          {/* Left Column */}
          <div className={styles.desktopLeftCol}>
            {/* Daily Check-In Hero Heading */}
            <div className={styles.desktopHeroText}>
              <h1 className={styles.desktopMainHeading}>
                Daily Check-In <br />
                <span className={styles.goldText}>Rewards</span>
              </h1>
              <p className={styles.desktopSubHeading}>
                Check in every day and earn exciting rewards!
              </p>
            </div>

            {/* 3 Statistics Cards */}
            <StreakStats />

            {/* Motivational Divider */}
            <div className={styles.desktopDivider}>
              <span className={styles.sparkleIcon}>✦</span>
              <span className={styles.dividerText}>Come back tomorrow for more rewards!</span>
              <span className={styles.sparkleIcon}>✦</span>
            </div>

            {/* Large 3D Hero Crown Artwork on Podium */}
            <div className={styles.heroCrownWrapper}>
              <img
                src={heroCrownImg}
                alt="3D Gold Crown on Podium"
                className={styles.heroCrownImg}
              />
            </div>

            {/* Official Trust Strip */}
            <TrustFooter />
          </div>

          {/* Right Column */}
          <div className={styles.desktopRightCol}>
            {/* Top Row: Streak Pill & Streak Calendar Button */}
            <div className={styles.desktopStreakRow}>
              <div className={styles.streakIndicatorPill}>
                <img src={flameImg} alt="Flame" className={styles.flameIcon} />
                <span>{currentStreak} Day Streak</span>
                <span className={styles.streakSubNote}>Keep it going!</span>
              </div>

              <button
                type="button"
                className={styles.desktopCalendarBtn}
                onClick={() => setCalendarOpen(true)}
              >
                <CalendarIcon size={14} />
                <span>Streak Calendar</span>
                <ChevronRight size={13} />
              </button>
            </div>

            {/* Ultimate Reward Banner */}
            <UltimateReward />

            {/* 7 Daily Cards Grid */}
            <RewardGrid />

            {/* Why Maintain Your Streak Benefits */}
            <WhyStreak />
          </div>
        </div>

        {/* ============================================================== */}
        {/* MOBILE / TABLET LAYOUT (matches Page 63 reference image on < 992px) */}
        {/* ============================================================== */}
        <div className={styles.mobileLayout}>
          {/* 1. Hero Banner with 3D Calendar, 3D Gift Box & Streak Pill */}
          <HeroBanner />

          {/* 2. Three Statistics Cards (Total Rewards, Checked In, Next Reward) */}
          <StreakStats />

          {/* 3. Ultimate Reward (₹5 Amazon Gift Card) */}
          <UltimateReward />

          {/* 4. 7 Daily Reward Cards Grid with Motivational Divider */}
          <RewardGrid />

          {/* 5. Four Why Maintain Your Streak Pillars */}
          <WhyStreak />

          {/* 6. Official Brand Trust Strip */}
          <TrustFooter />
        </div>
      </div>

      {/* Global Modals & Drawers */}
      <CpaModal />
      <ClaimSuccessModal />
      <AntiCheatDrawer />
      <StreakCalendarModal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </div>
  );
}

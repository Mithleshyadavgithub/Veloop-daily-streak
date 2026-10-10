import React from 'react';
import styles from './DashboardStreakWidget.module.css';
import { Flame, Trophy, Sparkles, Zap, CheckCircle2, Lock, ArrowRight } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function DashboardStreakWidget() {
  const { streakData, wallet, initiateClaim, claiming, setActiveTab, countdown } = useStreak();

  const currentStreak = streakData?.streak?.currentStreak ?? 0;
  const currentDay = streakData?.streak?.currentDay ?? 1;
  const longestStreak = wallet?.longestStreak ?? 14;
  const todayReward = streakData?.rewards?.find(r => r.day === currentDay);
  const isTodayClaimable = todayReward?.status === 'TODAY';
  const isClaimedToday = todayReward?.status === 'CLAIMED';

  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

  return (
    <div className={styles.widgetCard}>
      {/* Top Header */}
      <div className={styles.topHeader}>
        <div className="d-flex align-items-center gap-3">
          <div className={styles.flameIconBox}>
            <Flame size={22} color="#ff9900" />
          </div>
          <div>
            <div className={styles.systemTag}>DAILY CHECK-IN SYSTEM</div>
            <h4 className={styles.streakCountText}>🔥 {currentStreak} DAY STREAK</h4>
          </div>
        </div>

        <div className={styles.milestonesRight}>
          <div className={styles.milestonePill}>
            <Trophy size={14} color="#ffd700" />
            <span>Longest: <strong>{longestStreak} Days</strong></span>
          </div>
          <div className={styles.nextBonusPill}>
            <Sparkles size={14} color="#a855f7" />
            <span>Next: <strong>10 Days (+250 VEs)</strong></span>
          </div>
        </div>
      </div>

      {/* 7 Days of the Week Selector */}
      <div className={styles.daysRow}>
        {daysOfWeek.map((dayName, idx) => {
          const dayNum = idx + 1;
          const r = streakData?.rewards?.find(item => item.day === dayNum);
          const isDone = r?.status === 'CLAIMED';
          const isCurrentActive = r?.status === 'TODAY' || (!isDone && dayNum === currentDay);

          let dayBoxClass = styles.dayBox;
          if (isDone) dayBoxClass += ` ${styles.dayDone}`;
          if (isCurrentActive) dayBoxClass += ` ${styles.dayActive}`;

          return (
            <div 
              key={dayName} 
              className={dayBoxClass}
              onClick={() => setActiveTab('streak')}
              title={`Day ${dayNum} Reward: ${r?.title || ''}`}
            >
              <span className={styles.dayNameLabel}>{dayName}</span>
              <div className={styles.dayIconSlot}>
                {isDone ? (
                  <CheckCircle2 size={16} color="#10b981" />
                ) : isCurrentActive ? (
                  <Flame size={16} color="#ffaa00" />
                ) : (
                  <span className={styles.dayNumber}>{dayNum}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Claim / Status Bar */}
      <div className={styles.claimBanner}>
        <div className="d-flex align-items-center gap-3">
          <div className={styles.lightningCircle}>
            <Zap size={20} color="#ffd700" />
          </div>
          <div>
            <div className={styles.claimStatusLabel}>
              {isTodayClaimable 
                ? "TODAY'S CHECK-IN AVAILABLE" 
                : isClaimedToday 
                ? "TODAY'S REWARD CLAIMED" 
                : "NEXT REWARD COUNTDOWN"}
            </div>
            <div className={styles.claimRewardText}>
              {isTodayClaimable 
                ? `Claim Day ${currentDay} Reward: ${todayReward?.title} ${todayReward?.currency === 'VES' ? 'VES' : 'GC'}`
                : isClaimedToday
                ? `Great job! Check back tomorrow for Day ${Math.min(7, currentDay + 1)}`
                : `Next Check-in unlocks in: ${countdown.formatted}`}
            </div>
          </div>
        </div>

        {isTodayClaimable ? (
          <button 
            className={styles.claimActionBtn}
            onClick={() => initiateClaim(currentDay)}
            disabled={claiming}
          >
            <Zap size={16} />
            <span>Claim Reward Now</span>
          </button>
        ) : (
          <button 
            className={styles.viewStreakBtn}
            onClick={() => setActiveTab('streak')}
          >
            <span>View 7-Day Rewards</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

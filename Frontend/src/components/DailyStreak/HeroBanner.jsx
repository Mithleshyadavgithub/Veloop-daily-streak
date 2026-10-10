import React from 'react';
import styles from './HeroBanner.module.css';
import { Flame, Calendar, Sparkles, Clock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import { GiftBoxIcon, CoinStackIcon } from '../../assets/rewardIcons';

export default function HeroBanner() {
  const { streakData, countdown, initiateClaim, claiming } = useStreak();

  const currentStreak = streakData?.streak?.currentStreak ?? 0;
  const currentDay = streakData?.streak?.currentDay ?? 1;
  const todayReward = streakData?.rewards?.find(r => r.day === currentDay);
  const isTodayClaimable = todayReward?.status === 'TODAY';
  const isAlreadyClaimedToday = todayReward?.status === 'CLAIMED';

  return (
    <div className={styles.heroCard}>
      {/* Mobile Top Illustrated Header Icons (Page 63) */}
      <div className={styles.mobileArtRow}>
        {/* Calendar check illustration */}
        <div className={styles.calendarMiniArt}>
          <div className={styles.calSheet}>
            <span className={styles.calTopBar} />
            <div className={styles.calBody}>
              <span className={styles.calCheck}>✓</span>
            </div>
          </div>
          <span className={styles.calCoinBadge}>🪙</span>
        </div>

        {/* Gift Box mini illustration */}
        <div className={styles.giftMiniArt}>
          <GiftBoxIcon size={44} />
        </div>
      </div>

      {/* Hero Headings */}
      <div className={styles.titleSection}>
        <h1 className={styles.heroTitle}>
          Login Daily &amp; Earn <br />
          <span className={styles.heroTitleHighlight}>Bigger Rewards!</span>
        </h1>
        <p className={styles.heroSubtitle}>
          Maintain your streak and unlock exciting rewards every day.
        </p>
      </div>

      {/* Streak Info Pills (Page 63) */}
      <div className={styles.pillsRow}>
        <div className={styles.streakBadge}>
          <Flame size={15} color="#FF9900" className={styles.flameIcon} />
          <span>{currentStreak} Day Streak</span>
        </div>

        <button className={styles.calendarBtn} title="Streak Calendar">
          <Calendar size={13} />
          <span>Streak Calendar</span>
          <span className={styles.calendarArrow}>&gt;</span>
        </button>
      </div>

      {/* Main Call to Action Button */}
      {isTodayClaimable ? (
        <button 
          className={styles.claimHeroButton}
          onClick={() => initiateClaim(currentDay)}
          disabled={claiming}
        >
          <span>Claim Today's Reward ({todayReward?.title} {todayReward?.currency === 'VES' ? 'VES' : 'GC'})</span>
          <ArrowRight size={16} />
        </button>
      ) : isAlreadyClaimedToday ? (
        <div className={styles.lockedTimerBanner}>
          <Clock size={16} color="#ffd700" />
          <span>Next Reward Unlocks in: </span>
          <strong className={styles.timerDisplay}>{countdown.formatted}</strong>
        </div>
      ) : (
        <button 
          className={styles.claimHeroButton}
          onClick={() => initiateClaim(currentDay)}
        >
          <span>Claim Day {currentDay} Reward</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}

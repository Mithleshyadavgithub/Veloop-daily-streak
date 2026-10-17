import React, { useState } from 'react';
import styles from './HeroBanner.module.css';
import { Calendar as CalendarIcon, ChevronRight } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import { calendarImg, exclusiveGiftImg, flameImg } from '../../assets/streakAssets';
import StreakCalendarModal from './StreakCalendarModal';

export default function HeroBanner() {
  const { streakData } = useStreak();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const currentStreak = streakData?.streak?.currentStreak ?? 1;

  return (
    <>
      <div className={styles.heroCard}>
        {/* Ambient background glow */}
        <div className={styles.heroGlow} />

        {/* 3D Calendar illustration on the left */}
        <div className={styles.calendarArtWrapper}>
          <img
            src={calendarImg}
            alt="Streak Calendar 3D"
            className={styles.calendarArt}
          />
          <span className={styles.v3Badge}>V3</span>
        </div>

        {/* Center Content */}
        <div className={styles.heroCenter}>
          <h2 className={styles.heroTitle}>
            Login Daily &amp; Earn{' '}
            <span className={styles.goldText}>Bigger Rewards!</span>
          </h2>
          <p className={styles.heroSubtitle}>
            Maintain your streak and unlock exciting rewards every day.
          </p>

          {/* Bottom pills row */}
          <div className={styles.pillsRow}>
            <div className={styles.streakPill}>
              <img src={flameImg} alt="Flame" className={styles.flameIcon} />
              <span>{currentStreak} Day Streak</span>
            </div>

            <button
              type="button"
              className={styles.calendarBtn}
              onClick={() => setCalendarOpen(true)}
              title="Open Streak Calendar"
            >
              <CalendarIcon size={14} className={styles.calIconSvg} />
              <span>Streak Calendar</span>
              <ChevronRight size={13} className={styles.chevronSvg} />
            </button>
          </div>
        </div>

        {/* 3D Gift Box illustration on the right */}
        <div className={styles.giftArtWrapper}>
          <img
            src={exclusiveGiftImg}
            alt="Reward Gift Box 3D"
            className={styles.giftArt}
          />
        </div>
      </div>

      {/* Streak Calendar Modal */}
      <StreakCalendarModal
        open={calendarOpen}
        onClose={() => setCalendarOpen(false)}
      />
    </>
  );
}

import React from 'react';
import styles from './StatCards.module.css';
import { Flame, Star, Trophy, TrendingUp } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function StatCards() {
  const { wallet, streakData } = useStreak();

  const totalPoints = wallet?.totalPoints ?? 100;
  const currentStreak = streakData?.streak?.currentStreak ?? 0;
  const level = wallet?.level ?? 3;
  const levelProgress = wallet?.levelProgress ?? 72;
  const rank = wallet?.rank ?? 18;

  return (
    <div className={styles.cardsGrid}>
      {/* Card 1: Total Points */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className="d-flex align-items-center gap-2">
            <span className={styles.headerDot} />
            <span className={styles.cardLabel}>TOTAL POINTS</span>
          </div>
          <span className={styles.coinBadge}>🪙</span>
        </div>
        <div className={styles.cardMainValue}>{totalPoints}</div>
        <div className={styles.cardFooterGreen}>
          <TrendingUp size={14} />
          <span>+12.5% this month ↑</span>
        </div>
      </div>

      {/* Card 2: Streak */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className="d-flex align-items-center gap-2">
            <span className={styles.headerDotOrange} />
            <span className={styles.cardLabelOrange}>STREAK</span>
          </div>
          <Flame size={17} color="#FF9900" />
        </div>
        <div className={styles.cardMainValueGold}>{currentStreak} Days</div>
        <div className={styles.cardFooterMuted}>
          <span>Keep it going!</span>
        </div>
      </div>

      {/* Card 3: Level */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className="d-flex align-items-center gap-2">
            <span className={styles.headerDotPurple} />
            <span className={styles.cardLabelPurple}>LEVEL</span>
          </div>
          <Star size={16} color="#a855f7" />
        </div>
        <div className={styles.cardMainValue}>Level {level}</div>
        <div className={styles.levelProgressContainer}>
          <div className="d-flex justify-content-between align-items-center mb-1 font-xs">
            <span className="text-muted">{levelProgress}% to next level</span>
            <span className="text-purple fw-bold">Lvl {level + 1}</span>
          </div>
          <div className={styles.progressBarBg}>
            <div className={styles.progressBarFill} style={{ width: `${levelProgress}%` }} />
          </div>
        </div>
      </div>

      {/* Card 4: Rank */}
      <div className={styles.statCard}>
        <div className={styles.cardHeader}>
          <div className="d-flex align-items-center gap-2">
            <span className={styles.headerDotGreen} />
            <span className={styles.cardLabelGreen}>RANK</span>
          </div>
          <Trophy size={16} color="#10b981" />
        </div>
        <div className={styles.cardMainValue}>#{rank}</div>
        <div className={styles.cardFooterGreenText}>
          <span>Top 5% of participants</span>
        </div>
      </div>
    </div>
  );
}

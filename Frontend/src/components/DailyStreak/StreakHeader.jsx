import React from 'react';
import styles from './StreakHeader.module.css';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import { flameImg, coinImg } from '../../assets/streakAssets';

export default function StreakHeader() {
  const { streakData, wallet, setActiveTab, setAntiCheatOpen } = useStreak();

  const vesBalance = wallet?.vesBalance ?? streakData?.user?.vesBalance ?? 120;

  return (
    <header className={styles.topHeader}>
      {/* Left: Back button & Title with flame */}
      <div className={styles.headerLeft}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => setActiveTab('dashboard')}
          title="Go Back"
          aria-label="Go Back"
        >
          <ChevronLeft size={20} strokeWidth={2.4} />
        </button>

        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>Daily Streak</h1>
          <img src={flameImg} alt="Flame" className={styles.flameIcon} />
        </div>
      </div>

      {/* Right: Anti-Cheat Suite trigger & Balance Pill */}
      <div className={styles.headerRight}>
        <button
          type="button"
          className={styles.antiCheatBtn}
          onClick={() => setAntiCheatOpen(true)}
          title="Open Anti-Cheat / Evaluator Suite"
          aria-label="Open Anti-Cheat Evaluator Suite"
        >
          <ShieldCheck size={16} />
          <span className={styles.antiCheatLabel}>Anti-Cheat</span>
        </button>

        <div
          className={styles.balancePill}
          onClick={() => setActiveTab('wallet')}
          title="View Wallet Ledger"
          role="button"
          tabIndex={0}
        >
          <img src={coinImg} alt="Tokens" className={styles.coinIcon} />
          <span className={styles.balanceText}>{vesBalance}</span>
        </div>
      </div>
    </header>
  );
}

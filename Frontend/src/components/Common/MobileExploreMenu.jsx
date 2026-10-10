import React from 'react';
import styles from './MobileExploreMenu.module.css';
import { 
  X, Flame, Target, Users, Award, Wallet, ShieldCheck, 
  Sparkles, Gift, Compass, ChevronRight, Zap 
} from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import { MascotFlameHero } from '../../assets/mascotIcons';

export default function MobileExploreMenu({ isOpen, onClose }) {
  const { setActiveTab, setAntiCheatOpen, streakData, wallet } = useStreak();

  if (!isOpen) return null;

  const handleNavigate = (tabName) => {
    setActiveTab(tabName);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <div className="d-flex align-items-center gap-2">
            <div className={styles.mascotPill}>
              <MascotFlameHero size={28} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold text-white">Explore Features</h5>
              <small className="text-muted font-xs">Gamified VELoop Rewards Hub</small>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* User Status Bar */}
        <div className={styles.userStatusBar}>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span className={styles.rankTag}>#{wallet.rank || 18}</span>
              <span className="text-white fw-bold">Explorer</span>
            </div>
            <span className="text-warning fw-bold">🪙 {wallet.vesBalance || 100} VEs</span>
          </div>
          <div className="d-flex justify-content-between font-xs text-muted mt-2">
            <span>🔥 {streakData?.streak?.currentStreak || 1} Day Streak</span>
            <span>⭐ Level {wallet.level || 3} (72%)</span>
          </div>
        </div>

        {/* Explore Links List */}
        <div className={styles.menuList}>
          {/* Item 1: Gamified Quests & Milestone Hub */}
          <button 
            className={`${styles.menuCard} ${styles.highlightCard}`}
            onClick={() => handleNavigate('dashboard')}
          >
            <div className={styles.cardIconBoxGold}>
              <Sparkles size={20} color="#ffd700" />
            </div>
            <div className={styles.cardText}>
              <div className="d-flex align-items-center gap-2">
                <span className={styles.cardTitle}>Gamified Quests Hub</span>
                <span className={styles.newBadge}>NEW</span>
              </div>
              <p className={styles.cardSub}>Friends quests, monthly challenges &amp; year review</p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </button>

          {/* Item 2: Daily Streak System */}
          <button 
            className={styles.menuCard}
            onClick={() => handleNavigate('streak')}
          >
            <div className={styles.cardIconBoxOrange}>
              <Flame size={20} color="#ff9900" />
            </div>
            <div className={styles.cardText}>
              <span className={styles.cardTitle}>Daily Streak &amp; Rewards</span>
              <p className={styles.cardSub}>Claim 7-day rewards &amp; ₹500 Amazon Gift Card</p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </button>

          {/* Item 3: Tasks & Quests */}
          <button 
            className={styles.menuCard}
            onClick={() => handleNavigate('tasks')}
          >
            <div className={styles.cardIconBoxPurple}>
              <Target size={20} color="#a855f7" />
            </div>
            <div className={styles.cardText}>
              <span className={styles.cardTitle}>Active Quests &amp; Tasks</span>
              <p className={styles.cardSub}>Earn +25 to +50 VEs by completing activities</p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </button>

          {/* Item 4: Streak Leaderboard */}
          <button 
            className={styles.menuCard}
            onClick={() => handleNavigate('leaderboard')}
          >
            <div className={styles.cardIconBoxGreen}>
              <Award size={20} color="#10b981" />
            </div>
            <div className={styles.cardText}>
              <span className={styles.cardTitle}>Streak Champions Leaderboard</span>
              <p className={styles.cardSub}>View top rankers and compare streak days</p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </button>

          {/* Item 5: Wallet & Ledger */}
          <button 
            className={styles.menuCard}
            onClick={() => handleNavigate('wallet')}
          >
            <div className={styles.cardIconBoxBlue}>
              <Wallet size={20} color="#00e5ff" />
            </div>
            <div className={styles.cardText}>
              <span className={styles.cardTitle}>Wallet &amp; Transaction Ledger</span>
              <p className={styles.cardSub}>Audit history, token balances &amp; Amazon vouchers</p>
            </div>
            <ChevronRight size={16} className="text-muted" />
          </button>

          {/* Item 6: Anti-Cheat & Internship Test Suite */}
          <button 
            className={`${styles.menuCard} ${styles.testCard}`}
            onClick={() => { onClose(); setAntiCheatOpen(true); }}
          >
            <div className={styles.cardIconBoxEmerald}>
              <ShieldCheck size={20} color="#10b981" />
            </div>
            <div className={styles.cardText}>
              <span className={styles.cardTitle}>Anti-Cheat &amp; Test Suite</span>
              <p className={styles.cardSub}>Simulate +24h time jump, double claim &amp; audit logs</p>
            </div>
            <Zap size={16} color="#10b981" />
          </button>
        </div>
      </div>
    </div>
  );
}

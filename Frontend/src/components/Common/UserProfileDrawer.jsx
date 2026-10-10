import React, { useEffect } from 'react';
import styles from './UserProfileDrawer.module.css';
import { 
  X, User, Mail, Flame, Award, Wallet, Trophy, ShieldCheck, 
  Sparkles, LogOut, CheckCircle2, ChevronRight, Gift, Calendar 
} from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function UserProfileDrawer({ isOpen, onClose }) {
  const { currentUser, logoutUser, wallet, streakData, setActiveTab, setAntiCheatOpen } = useStreak();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !currentUser) return null;

  const currentStreak = streakData?.streak?.currentStreak ?? 1;
  const longestStreak = wallet.longestStreak || 14;
  const vesBalance = wallet.vesBalance || 100;
  const userRank = wallet.rank || 18;
  const userLevel = wallet.level || 3;
  const levelProgress = wallet.levelProgress || 72;

  const handleLogout = () => {
    logoutUser();
    onClose();
  };

  const handleGoToWallet = () => {
    onClose();
    setActiveTab('wallet');
  };

  const handleGoToLeaderboard = () => {
    onClose();
    setActiveTab('leaderboard');
  };

  return (
    <div className={styles.drawerOverlay} onClick={onClose}>
      <div className={styles.drawerContainer} onClick={(e) => e.stopPropagation()}>
        
        {/* Drawer Top Header */}
        <div className={styles.drawerHeader}>
          <div className="d-flex align-items-center gap-2">
            <User size={18} color="#ff9100" />
            <h4 className={styles.drawerTitle}>Student Profile</h4>
          </div>
          <button className={styles.closeBtn} onClick={onClose} title="Close Profile (Esc)">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className={styles.drawerScrollBody}>
          
          {/* User Hero Card */}
          <div className={styles.userHeroCard}>
            <div className={styles.avatarRing}>
              <div className={styles.avatarInner}>
                <span>{currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}</span>
              </div>
            </div>

            <div className={styles.userInfo}>
              <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
                <h3 className={styles.userName}>{currentUser.name || 'Student Explorer'}</h3>
                <span className={styles.verifiedTag}>
                  <CheckCircle2 size={12} color="#ffffff" /> Active
                </span>
              </div>

              <div className={styles.userEmail}>
                <Mail size={13} color="#a78bfa" />
                <span>{currentUser.email || 'student@veloop.io'}</span>
              </div>

              <div className={styles.userMetaPill}>
                <span>ID: {currentUser.userId || 'STUDENT_9921'}</span>
                <span>•</span>
                <span>Level {userLevel} Explorer</span>
              </div>
            </div>
          </div>

          {/* Gamified Stat Grid */}
          <div className={styles.statGrid}>
            
            {/* Stat 1: Coins */}
            <div className={styles.statBox} onClick={handleGoToWallet}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className={styles.statLabel}>TOTAL COINS</span>
                <span className="font-sm">🪙</span>
              </div>
              <div className={styles.statVal}>{vesBalance} <span className={styles.statSub}>Coins</span></div>
              <div className={styles.statNote}>≈ ₹{(vesBalance / 10).toFixed(2)} Value</div>
            </div>

            {/* Stat 2: Active Streak */}
            <div className={styles.statBox}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className={styles.statLabel}>ACTIVE STREAK</span>
                <Flame size={16} color="#ff7b00" />
              </div>
              <div className={styles.statVal}>{currentStreak} <span className={styles.statSub}>Days</span></div>
              <div className={styles.statNote}>Record: {longestStreak} Days</div>
            </div>

            {/* Stat 3: Rank */}
            <div className={styles.statBox} onClick={handleGoToLeaderboard}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className={styles.statLabel}>CAMPUS RANK</span>
                <Trophy size={16} color="#ffd700" />
              </div>
              <div className={styles.statVal}>#{userRank} <span className={styles.statSub}>Rank</span></div>
              <div className={styles.statNote} style={{ color: '#22d3ee' }}>Top 5% Students</div>
            </div>

            {/* Stat 4: Level */}
            <div className={styles.statBox}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className={styles.statLabel}>CURRENT LEVEL</span>
                <Sparkles size={16} color="#ec4899" />
              </div>
              <div className={styles.statVal}>Lvl {userLevel}</div>
              <div className={styles.statNote}>{levelProgress}% to Lvl {userLevel + 1}</div>
            </div>

          </div>

          {/* Level Progress Bar */}
          <div className={styles.levelProgressCard}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold text-white font-xs">Progress to Level {userLevel + 1}</span>
              <span className="text-warning fw-bold font-xs">{levelProgress}% Complete</span>
            </div>
            <div className={styles.levelTrack}>
              <div className={styles.levelFill} style={{ width: `${levelProgress}%` }} />
            </div>
          </div>

          {/* Quick Navigation Action Links */}
          <div className={styles.actionsList}>
            <button className={styles.actionItem} onClick={handleGoToWallet}>
              <div className="d-flex align-items-center gap-3">
                <div className={styles.actionIconBox} style={{ background: 'rgba(139, 92, 246, 0.2)', color: '#8b5cf6' }}>
                  <Wallet size={18} />
                </div>
                <div>
                  <div className={styles.actionItemTitle}>My Wallet &amp; Ledger</div>
                  <div className={styles.actionItemSub}>Check coin balance &amp; claim vouchers</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted" />
            </button>

            <button className={styles.actionItem} onClick={handleGoToLeaderboard}>
              <div className="d-flex align-items-center gap-3">
                <div className={styles.actionIconBox} style={{ background: 'rgba(255, 215, 0, 0.2)', color: '#ffd700' }}>
                  <Trophy size={18} />
                </div>
                <div>
                  <div className={styles.actionItemTitle}>Campus Leaderboard</div>
                  <div className={styles.actionItemSub}>View rank &amp; top active students</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted" />
            </button>

            <button className={styles.actionItem} onClick={() => { onClose(); setAntiCheatOpen(true); }}>
              <div className="d-flex align-items-center gap-3">
                <div className={styles.actionIconBox} style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className={styles.actionItemTitle}>Anti-Cheat &amp; Test Suite</div>
                  <div className={styles.actionItemSub}>Authoritative server verification</div>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted" />
            </button>
          </div>

          {/* Logout Button */}
          <button className={styles.logoutBtn} onClick={handleLogout}>
            <LogOut size={16} />
            <span>Log Out from Account</span>
          </button>

        </div>

      </div>
    </div>
  );
}

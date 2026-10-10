import React, { useState } from 'react';
import { useStreak } from '../../context/StreakContext';
import styles from './Navbar.module.css';
import { 
  Flame, LayoutDashboard, Wallet, Award, CheckSquare, 
  Bell, ChevronDown, ShieldCheck, ChevronLeft, User, Menu 
} from 'lucide-react';
import MobileExploreMenu from './MobileExploreMenu';

export default function Navbar() {
  const { activeTab, setActiveTab, wallet, streakData, setAntiCheatOpen } = useStreak();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [exploreMenuOpen, setExploreMenuOpen] = useState(false);

  const streakDays = streakData?.streak?.currentStreak ?? 0;
  const ves = wallet?.vesBalance ?? 100;

  return (
    <>
      {/* Top Header Bar */}
      <header className={styles.navbarContainer}>
        <div className={styles.navbarInner}>
          {/* Left: Brand / Back */}
          <div className={styles.leftGroup}>
            {activeTab !== 'dashboard' ? (
              <button 
                className={styles.mobileBackBtn} 
                onClick={() => setActiveTab('dashboard')}
                title="Back to Dashboard"
              >
                <ChevronLeft size={20} />
              </button>
            ) : null}

            <div className={styles.brand} onClick={() => setActiveTab('dashboard')}>
              <div className={styles.brandLogoBox}>
                <span className={styles.brandVR}>VR</span>
              </div>
              <div className={styles.brandText}>
                <span className={styles.brandName}>VELoop</span>
                <span className={styles.brandSuffix}>Rewards</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <nav className={styles.navMenu}>
            <button 
              className={`${styles.navItem} ${activeTab === 'dashboard' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <LayoutDashboard size={16} />
              <span>Dashboard</span>
            </button>

            <button 
              className={`${styles.navItem} ${activeTab === 'streak' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('streak')}
            >
              <Flame size={16} className={styles.streakFlameIcon} />
              <span>Daily Streak</span>
              {streakData?.rewards?.some(r => r.status === 'TODAY') && (
                <span className={styles.dotBadge} />
              )}
            </button>

            <button 
              className={`${styles.navItem} ${activeTab === 'tasks' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <CheckSquare size={16} />
              <span>Tasks</span>
            </button>

            <button 
              className={`${styles.navItem} ${activeTab === 'leaderboard' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('leaderboard')}
            >
              <Award size={16} />
              <span>Leaderboard</span>
            </button>

            <button 
              className={`${styles.navItem} ${activeTab === 'wallet' ? styles.navItemActive : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <Wallet size={16} />
              <span>Wallet</span>
            </button>
          </nav>

          {/* Right Side Info & Pills */}
          <div className={styles.rightActions}>
            {/* VES Balance Pill */}
            <div className={styles.vesPill} onClick={() => setActiveTab('wallet')} title="VES Token Balance">
              <span className={styles.vesCoinIcon}>🪙</span>
              <span className={styles.vesAmount}>{ves}</span>
              <span className={styles.vesLabel}>VEs</span>
            </div>

            {/* Streak Flame Pill (Desktop / Tablet) */}
            <div className={styles.streakPill} onClick={() => setActiveTab('streak')} title="Current Streak Days">
              <Flame size={14} color="#FF9900" />
              <span className={styles.streakAmount}>{streakDays}d</span>
            </div>

            {/* Notifications */}
            <div className="position-relative">
              <button 
                className={styles.iconButton} 
                onClick={() => { setNotifDropdownOpen(!notifDropdownOpen); setProfileDropdownOpen(false); }}
                title="Notifications"
              >
                <Bell size={16} />
                <span className={styles.notifBadge}>3</span>
              </button>

              {notifDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownHeader}>Notifications</div>
                  <div className={styles.notifItem}>
                    <span className="text-warning">🔥 Daily Check-in:</span> Day 2 reward (+10 VES) is ready to claim!
                  </div>
                  <div className={styles.notifItem}>
                    <span className="text-info">🏆 Streak Milestone:</span> Reach 7 days for the ₹500 Amazon Gift Card.
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Pill */}
            <div className="position-relative">
              <button 
                className={styles.userPill} 
                onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setNotifDropdownOpen(false); }}
              >
                <div className={styles.userAvatar}>
                  <User size={13} color="#ffd700" />
                </div>
                <span className={styles.userName}>Explorer</span>
                <ChevronDown size={13} className={styles.userChevron} />
              </button>

              {profileDropdownOpen && (
                <div className={`${styles.dropdownMenu} ${styles.profileDropdown}`}>
                  <div className={styles.dropdownHeader}>
                    <div className="fw-bold text-white">Explorer</div>
                    <small className="text-muted">Rank #18 • Level 3 (72%)</small>
                  </div>
                  <div className={styles.dropdownDivider} />
                  <button className={styles.dropdownAction} onClick={() => { setActiveTab('streak'); setProfileDropdownOpen(false); }}>
                    <Flame size={15} color="#ffd700" /> Daily Streak
                  </button>
                  <button className={styles.dropdownAction} onClick={() => { setActiveTab('wallet'); setProfileDropdownOpen(false); }}>
                    <Wallet size={15} /> Wallet &amp; Ledger
                  </button>
                  <button className={styles.dropdownAction} onClick={() => { setAntiCheatOpen(true); setProfileDropdownOpen(false); }}>
                    <ShieldCheck size={15} color="#10b981" /> Test &amp; Anti-Cheat Suite
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Button (☰ - Opens Mobile Explore Drawer) */}
            <button 
              className={styles.hamburgerBtn}
              onClick={() => setExploreMenuOpen(true)}
              title="Explore More Features"
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-Out Explore Menu */}
      <MobileExploreMenu 
        isOpen={exploreMenuOpen} 
        onClose={() => setExploreMenuOpen(false)} 
      />

      {/* Dedicated Mobile Bottom Navigation Bar */}
      <nav className={styles.mobileBottomNav}>
        <button 
          className={`${styles.mobileNavItem} ${activeTab === 'dashboard' ? styles.mobileNavActive : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          <LayoutDashboard size={20} />
          <span>Home</span>
        </button>

        <button 
          className={`${styles.mobileNavItem} ${activeTab === 'streak' ? styles.mobileNavActive : ''}`}
          onClick={() => setActiveTab('streak')}
        >
          <div className={styles.mobileStreakIconWrapper}>
            <Flame size={20} color="#ff9900" />
            {streakData?.rewards?.some(r => r.status === 'TODAY') && (
              <span className={styles.mobileDotBadge} />
            )}
          </div>
          <span>Streak</span>
        </button>

        <button 
          className={`${styles.mobileNavItem} ${activeTab === 'tasks' ? styles.mobileNavActive : ''}`}
          onClick={() => setActiveTab('tasks')}
        >
          <CheckSquare size={20} />
          <span>Quests</span>
        </button>

        <button 
          className={`${styles.mobileNavItem} ${activeTab === 'leaderboard' ? styles.mobileNavActive : ''}`}
          onClick={() => setActiveTab('leaderboard')}
        >
          <Award size={20} />
          <span>Ranks</span>
        </button>

        <button 
          className={`${styles.mobileNavItem} ${activeTab === 'wallet' ? styles.mobileNavActive : ''}`}
          onClick={() => setActiveTab('wallet')}
        >
          <Wallet size={20} />
          <span>Wallet</span>
        </button>
      </nav>
    </>
  );
}

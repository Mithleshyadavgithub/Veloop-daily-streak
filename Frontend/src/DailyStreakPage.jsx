import React, { useState } from 'react';
import styles from './DailyStreak.module.css';
import { 
  ChevronLeft, CheckCircle2, Lock, Sparkles, Gift, ShieldCheck, 
  Flame, Trophy, Wallet, Award, LayoutDashboard, Calendar 
} from 'lucide-react';

export default function DailyStreakPage() {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    gems: 120,
    ves: 100,
    checkedIn: 0,
    totalRewards: 7,
    rewards: [
      { day: 1, title: '+5', subtitle: '5 VES', type: 'VES', status: 'TODAY' },
      { day: 2, title: '+10', subtitle: '10 VES', type: 'VES', status: 'LOCKED' },
      { day: 3, title: '+15', subtitle: '15 VES', type: 'VES', status: 'LOCKED' },
      { day: 4, title: '₹50', subtitle: 'Amazon Gift Card', type: 'GIFT_CARD', status: 'LOCKED' },
      { day: 5, title: '₹100', subtitle: 'Amazon Gift Card', type: 'GIFT_CARD', status: 'LOCKED' },
      { day: 6, title: '+30', subtitle: '30 VES', type: 'VES', status: 'LOCKED' },
      { day: 7, title: '₹500', subtitle: 'Amazon Gift Card', type: 'ULTIMATE', status: 'LOCKED' },
    ]
  });

  const handleClaim = (dayNum) => {
    alert(`Claim action triggered for Day ${dayNum}. (Backend verification pending)`);
  };

  return (
    <div className={styles.appContainer}>
      {/* Top Navbar */}
      <nav className={styles.navbar}>
        <div className="d-flex align-items-center gap-2">
          <div className="bg-warning text-dark fw-bold px-2 py-1 rounded-3">VR</div>
          <span className="fw-bold text-white fs-5">VELoopRewards</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#dashboard" className={styles.navItem}><LayoutDashboard size={16} /> Dashboard</a>
          <a href="#streak" className={`${styles.navItem} ${styles.navItemActive}`}><Flame size={16} color="#ffd700" /> Daily Streak</a>
          <a href="#wallet" className={styles.navItem}><Wallet size={16} /> Wallet</a>
          <a href="#badges" className={styles.navItem}><Award size={16} /> Badges</a>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="badge bg-dark border border-secondary px-3 py-2 text-warning">
            🪙 {streakData.ves} VES
          </div>
          <div className={styles.userProfileMenu}>
            <Sparkles size={14} color="#ffd700" /> New VELoop Member ▾
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className={styles.contentWrapper}>
        {/* Header Title */}
        <div className={styles.pageHeader}>
          <button className={styles.backBtn} onClick={() => window.history.back()}>
            <ChevronLeft size={18} />
          </button>
          <h3 className="mb-0 fw-bold">Daily Streak 🔥</h3>
        </div>

        {/* Hero Section Grid (Top Banner + Ultimate Reward) */}
        <div className={styles.heroGrid}>
          {/* Left Daily Streak Banner */}
          <div className={styles.mainHeroCard}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="badge bg-dark border border-purple text-warning px-3 py-1 rounded-pill">
                ✨ VELoop REWARDS • DAILY CHECK-IN
              </span>
              <button className="btn btn-sm btn-dark border border-secondary text-light">
                <Calendar size={14} className="me-1" /> Streak Calendar ▾
              </button>
            </div>

            <h1 className={styles.heroTitle}>Your Daily Streak</h1>
            <p className="text-muted mb-4">Keep your streak alive and unlock bigger rewards.</p>

            <div className="d-flex align-items-center gap-3 mb-4">
              <span className="badge bg-warning text-dark px-3 py-2 fw-bold rounded-pill">
                🔥 {streakData.currentStreak} Day Streak
              </span>
              <span className="badge bg-dark border border-secondary text-warning px-3 py-2 fw-bold rounded-pill">
                🎁 Today's Reward: +5 VES
              </span>
            </div>

            <button className={styles.claimHeroBtn} onClick={() => handleClaim(1)}>
              Claim Today's Reward (+5 VES) &gt;
            </button>
          </div>

          {/* Right Ultimate Reward Card */}
          <div className={styles.ultimateHeroCard}>
            <div>
              <span className="text-warning small fw-bold">ULTIMATE REWARD ✨</span>
              <h2 className="display-6 fw-bold text-white mb-1">₹500</h2>
              <div className="text-light small">a Amazon Gift Card</div>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-secondary">
              <span className="text-muted small">Unlock on Day 7</span>
              <div className="bg-dark p-2 rounded-circle border border-secondary">
                <Lock size={18} color="#9c94b8" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Row */}
        <div className={styles.statsRow}>
          <div className={styles.statBox}>
            <div className="text-muted small text-uppercase">Total Rewards</div>
            <div className="fs-4 fw-bold text-white">{streakData.totalRewards}</div>
          </div>
          <div className={styles.statBox}>
            <div className="text-muted small text-uppercase">Checked In</div>
            <div className="fs-4 fw-bold text-success">
              <CheckCircle2 size={20} className="me-1" /> {streakData.checkedIn}
            </div>
          </div>
          <div className={styles.statBox}>
            <div className="text-muted small text-uppercase">Next Reward</div>
            <div className="fs-4 fw-bold text-warning">+5 VES</div>
          </div>
        </div>

        {/* 7-Day Progression Bar */}
        <div className={styles.timelineCard}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-0">7-Day Streak Progression</h5>
              <small className="text-muted">Check in consecutively to reach the Day 7 Ultimate Reward</small>
            </div>
            <span className="badge bg-warning text-dark fw-bold">
              ✦ 0 of 7 Days Completed (0%)
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center text-center mt-4">
            {streakData.rewards.map((r, i) => (
              <div key={i} className="d-flex flex-column align-items-center">
                <div className={`rounded-circle p-2 mb-1 ${r.status === 'TODAY' ? 'bg-warning text-dark' : 'bg-dark border border-secondary text-muted'}`}>
                  {r.status === 'TODAY' ? <Flame size={16} /> : <Lock size={16} />}
                </div>
                <small className="text-light fw-bold">Day {r.day}</small>
                <small className="text-muted" style={{ fontSize: '0.75rem' }}>{r.title}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center text-warning my-4 small">
          ✦ Come back tomorrow for more rewards! ✦
        </div>

        {/* 7 Daily Reward Cards Grid */}
        <div className={styles.rewardGrid}>
          {streakData.rewards.map((item) => {
            let cardStyle = styles.rewardCard;
            if (item.status === 'TODAY') cardStyle += ` ${styles.todayCard}`;
            if (item.status === 'CLAIMED') cardStyle += ` ${styles.claimedCard}`;

            return (
              <div key={item.day} className={cardStyle}>
                <div className="w-100 d-flex justify-content-between align-items-center mb-2">
                  <span className="small text-muted fw-bold">Day {item.day}</span>
                  {item.status === 'TODAY' && <span className="badge bg-warning text-dark font-xs">Today</span>}
                  {item.status === 'LOCKED' && <Lock size={14} color="#6b7280" />}
                </div>

                <div className="my-3">
                  <Sparkles size={28} color={item.status === 'TODAY' ? '#ffd700' : '#6b7280'} />
                </div>

                <div className="fw-bold text-white fs-5">{item.title}</div>
                <small className="text-muted mb-3" style={{ fontSize: '0.8rem' }}>{item.subtitle}</small>

                {item.status === 'TODAY' && (
                  <button className={styles.cardClaimBtn} onClick={() => handleClaim(item.day)}>
                    Claim Now &gt;
                  </button>
                )}
                {item.status === 'LOCKED' && (
                  <div className="text-muted small mt-2">Locked</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Why Maintain Your Streak Section */}
        <div className="mt-5">
          <h5 className="fw-bold text-center mb-4">✦ WHY MAINTAIN YOUR STREAK? ✦</h5>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <Flame size={24} color="#ffd700" className="mb-2" />
              <h6 className="fw-bold text-white">Stay Active</h6>
              <small className="text-muted">Keep your streak alive & earn more!</small>
            </div>
            <div className={styles.whyCard}>
              <Trophy size={24} color="#ffd700" className="mb-2" />
              <h6 className="fw-bold text-white">Bigger Streak</h6>
              <small className="text-muted">More consecutive logins, bigger rewards!</small>
            </div>
            <div className={styles.whyCard}>
              <Gift size={24} color="#ffd700" className="mb-2" />
              <h6 className="fw-bold text-white">Exclusive Rewards</h6>
              <small className="text-muted">Get coins, gift cards & special bonuses!</small>
            </div>
            <div className={styles.whyCard}>
              <ShieldCheck size={24} color="#ffd700" className="mb-2" />
              <h6 className="fw-bold text-white">Don't Miss Out</h6>
              <small className="text-muted">Come back every day & unlock all rewards!</small>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Anti-Cheat Panel */}
      <div className={styles.antiCheatBar}>
        <div className="d-flex align-items-center gap-2">
          <ShieldCheck size={18} color="#ffd700" />
          <span className="fw-bold text-white small">Internship Evaluator & Anti-Cheat Suite</span>
          <span className="text-muted small d-none d-md-inline">| Test fast-forward 24h, missed streak, and anti-cheat tests</span>
        </div>
        <button className="btn btn-sm btn-outline-warning rounded-pill">▲</button>
      </div>
    </div>
  );
}

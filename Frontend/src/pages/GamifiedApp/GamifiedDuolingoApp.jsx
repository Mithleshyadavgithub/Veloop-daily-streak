import React, { useState, useEffect } from 'react';
import styles from './GamifiedDuolingoApp.module.css';
import { 
  Flame, Sparkles, Gift, Share2, Users, CheckCircle2, 
  ChevronRight, Award, Wallet, ShieldCheck, X, Zap, 
  Clock, Lock, Star, ChevronLeft, Trophy, Bell, 
  TrendingUp, Compass, Check, Shield, Home, LayoutGrid, Menu, User, Mail, Heart,
  ChevronDown, ChevronUp, AlertCircle, RefreshCw, Layers, ArrowRight, Terminal, Activity
} from 'lucide-react';
import { 
  MascotFlameHero, QuestSingerMascot, FriendsPodiumScene, MascotYearReview 
} from '../../assets/mascotIcons';
import { 
  CrownIcon, CoinStackIcon, AmazonGiftCardIcon, GiftBoxIcon, CalendarHeroIcon 
} from '../../assets/rewardIcons';
import AboutDrawer from '../../components/Common/AboutDrawer';
import UserProfileDrawer from '../../components/Common/UserProfileDrawer';
import HowToEarnModal from '../../components/Common/HowToEarnModal';
import GiveawayRules from '../../components/Common/GiveawayRules';
import { useStreak } from '../../context/StreakContext';
import confetti from 'canvas-confetti';

export default function GamifiedDuolingoApp() {
  const { 
    streakData, wallet, initiateClaim, claiming, countdown, 
    showToast, setAntiCheatOpen, setActiveTab, currentUser, 
    setAuthModalOpen, logoutUser, requireAuth 
  } = useStreak();

  // Sub-view in Gamified Section: 'mascot' | 'quests' | 'review'
  const [hubTab, setHubTab] = useState('mascot');
  const [nudgeCount, setNudgeCount] = useState(0);
  const [giftClaimed, setGiftClaimed] = useState(false);
  const [surpriseClaimed, setSurpriseClaimed] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  
  // Mobile Feature Explorer Drawer state & About/Connect Drawer state & User Profile Drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [aboutDrawerOpen, setAboutDrawerOpen] = useState(false);
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [howToEarnOpen, setHowToEarnOpen] = useState(false);

  const currentStreak = streakData?.streak?.currentStreak ?? 1;
  const currentDay = streakData?.streak?.currentDay ?? 2;
  const todayReward = streakData?.rewards?.find(r => r.day === currentDay);
  const isTodayClaimable = todayReward?.status === 'TODAY';
  const isClaimedToday = todayReward?.status === 'CLAIMED';

  // Day of week surprise schedule with clear, student-friendly descriptions
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayName = dayNames[new Date().getDay()];

  const surpriseDrops = {
    Sunday: { title: 'Super Sunday Bonus', desc: 'End your week with 50 bonus coins and 25 gems to boost your rank!', coins: '+50 Bonus Coins', gems: '+25 Rare Gems', tag: 'SUNDAY SPECIAL' },
    Monday: { title: 'Monday Kickstart Bonus', desc: 'Start your week strong with double streak XP and bonus coins!', coins: '+35 Bonus Coins', gems: '+15 Rare Gems', tag: 'WEEKLY START' },
    Tuesday: { title: 'Turbo Tuesday Box', desc: 'Speed through your daily check-in with extra bonus coins and rewards!', coins: '+30 Bonus Coins', gems: '+10 Rare Gems', tag: 'FAST BOOST' },
    Wednesday: { title: 'Winning Wednesday Box', desc: 'Midweek surprise box packed with bonus coins and XP multipliers!', coins: '+40 Bonus Coins', gems: '+15 Rare Gems', tag: 'MIDWEEK DROP' },
    Thursday: { title: 'Thunder Thursday Reward', desc: 'Power up your daily progress with extra coins and bonus rewards!', coins: '+35 Bonus Coins', gems: '+15 Rare Gems', tag: 'POWER BOOST' },
    Friday: { title: 'Flash Fortune Friday', desc: 'Kick off your weekend with a mystery fortune box filled with 40 coins and 20 gems!', coins: '+40 Coins + Mystery Box', gems: '+20 Rare Gems', tag: 'WEEKEND DROP' },
    Saturday: { title: 'Super Saturday Surprise', desc: 'Weekend reward pack featuring extra coins and exclusive gift boxes!', coins: '+45 Bonus Coins', gems: '+20 Rare Gems', tag: 'SATURDAY GIFT' }
  };

  const todaySurprise = surpriseDrops[todayName] || surpriseDrops['Friday'];

  const daysWeek = [
    { label: 'MON', day: 1, name: 'Day 1 Check-In', done: true, reward: '+5 Coins', shortReward: '+5' },
    { label: 'TUE', day: 2, name: 'Day 2 Check-In', done: false, active: true, reward: '+10 Coins', shortReward: '+10' },
    { label: 'WED', day: 3, name: 'Day 3 Check-In', done: false, reward: '+15 Coins', shortReward: '+15' },
    { label: 'THU', day: 4, name: 'Day 4 Voucher', done: false, reward: '₹50 Amazon', shortReward: '₹50' },
    { label: 'FRI', day: 5, name: 'Day 5 Voucher', done: false, reward: '₹100 Amazon', shortReward: '₹100' },
    { label: 'SAT', day: 6, name: 'Day 6 Mega Bonus', done: false, reward: '+30 Coins', shortReward: '+30' },
    { label: 'SUN', day: 7, name: 'Day 7 Grand Prize', done: false, reward: '₹500 Amazon + 👑 VIP', shortReward: '₹500+👑' }
  ];

  const handleShareGems = () => {
    requireAuth(() => {
      const shareText = `🔥 Hey! I'm earning free coins and winning ₹50, ₹100 & ₹500 Amazon Gift Cards on VELoop Rewards! 🎁\n\nJoin my daily streak challenge here: ${window.location.origin}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
      
      // Open WhatsApp in new tab/window
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#25D366', '#ff9100', '#8b5cf6', '#06b6d4', '#ffd700', '#ffffff']
      });
      showToast('📱 Opening WhatsApp to share with friends! +20 Coins added to your wallet.', 'success');
    });
  };

  const handleClaimSurprise = () => {
    requireAuth(() => {
      if (surpriseClaimed) {
        showToast('🎁 Today\'s surprise box has already been claimed! Come back tomorrow for a new drop.', 'info');
        return;
      }
      setSurpriseClaimed(true);
      confetti({ 
        particleCount: 140, 
        spread: 90, 
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ff9100', '#8b5cf6', '#00e5ff']
      });
      showToast(`🎉 ${todaySurprise.title} Claimed! ${todaySurprise.coins} added to your account.`, 'success');
    });
  };

  const handleNudge = () => {
    requireAuth(() => {
      setNudgeCount(prev => prev + 1);
      showToast('👋 You nudged your study buddy Alex to keep their streak alive!', 'info');
    });
  };

  const handleOpenGift = () => {
    requireAuth(() => {
      if (giftClaimed) return;
      setGiftClaimed(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
      showToast('🎁 Mystery Gift Opened: +50 Coins & 2x Multiplier added!', 'success');
    });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.appOuterWrapper}>
      <div className={styles.mainResponsiveFrame}>
        
        {/* ========================================================= */}
        {/* 🌟 TOP NAVIGATION HEADER (No overlapping, perfectly spaced)*/}
        {/* ========================================================= */}
        <header className={styles.topHeaderBar} id="top-header">
          {/* Left Brand Area */}
          <div className={styles.headerLeftGroup}>
            <button 
              className={styles.hamburgerMenuBtn}
              onClick={() => setMobileDrawerOpen(true)}
              title="All Features & Hub"
            >
              <Menu size={20} color="#ff9100" />
            </button>

            <div className={styles.brandTitle} onClick={() => setActiveTab('dashboard')}>
              <div className={styles.brandLogoBox}>
                <Flame size={22} color="#ffffff" className={styles.flameIconSpin} />
              </div>
              <div className={styles.brandName}>
                <span>VELoop</span>
                <span className={styles.brandAccent}>Rewards</span>
              </div>
            </div>
          </div>

          {/* Center Navigation Links (Clean & Spacious) */}
          <nav className={styles.navLinksRow}>
            <button className={`${styles.navLinkItem} ${styles.navLinkActive}`} onClick={() => scrollToSection('top-header')}>
              <Compass size={16} />
              <span>Dashboard</span>
            </button>
            <button className={styles.navLinkItem} onClick={() => scrollToSection('daily-checkin')}>
              <Flame size={16} color="#ff7b00" />
              <span>Daily Streak</span>
            </button>
            <button className={styles.navLinkItem} onClick={() => scrollToSection('surprise-drop')}>
              <Gift size={16} color="#ffd700" />
              <span>Daily Surprise</span>
            </button>
            <button className={styles.navLinkItem} onClick={() => setActiveTab('leaderboard')}>
              <Trophy size={16} color="#ffd700" />
              <span>Leaderboard</span>
            </button>
            <button className={styles.navLinkItem} onClick={() => setActiveTab('wallet')}>
              <Wallet size={16} color="#8b5cf6" />
              <span>Wallet</span>
            </button>
          </nav>

          {/* Right Header User Status Actions */}
          <div className={styles.headerRightActions}>
            {/* Prominent Glowing "How To Earn" Highlight Button */}
            <button 
              className={styles.howToEarnHighlightBtn} 
              onClick={() => setHowToEarnOpen(true)}
              title="Learn how you can earn Amazon Gift Cards & Coins"
            >
              <Sparkles size={16} className={styles.sparklePulse} />
              <span>💡 How to Earn ₹650+</span>
            </button>

            {/* Token Balance Pill */}
            <div className={styles.tokenPill} onClick={() => setActiveTab('wallet')} title="View Wallet Balance">
              <span style={{ fontSize: '1.05rem' }}>🪙</span>
              <div className="d-flex flex-column" style={{ lineHeight: 1.1 }}>
                <span className={styles.tokenAmount}>{wallet.vesBalance || 100} Coins</span>
                <span className={styles.tokenSubtext}>≈ ₹{(wallet.vesBalance || 100) / 10}</span>
              </div>
            </div>

            {/* Streak Flame Pill */}
            <div className={styles.streakFlamePill} onClick={() => scrollToSection('daily-checkin')} title="Current Active Streak">
              <Flame size={16} color="#ff7b00" />
              <span className={styles.streakPillCount}>{currentStreak} Day Streak</span>
            </div>

            {/* Anti-Cheat Evaluator Button */}
            <button 
              className={styles.shieldBtn}
              onClick={() => setAntiCheatOpen(true)}
              title="Anti-Cheat &amp; Test Suite"
            >
              <ShieldCheck size={18} color="#10b981" />
            </button>

            {/* Auth Buttons: Register & Login (If Guest) OR Logged In Pill */}
            {!currentUser ? (
              <div className={styles.authButtonsGroup}>
                <button 
                  className={styles.registerHeaderBtn}
                  onClick={() => setAuthModalOpen(true)}
                  title="Create Free Student Account"
                >
                  <Sparkles size={14} color="#ffffff" />
                  <span>Register</span>
                </button>
                <button 
                  className={styles.loginHeaderBtn}
                  onClick={() => setAuthModalOpen(true)}
                  title="Log In to Account"
                >
                  <User size={14} />
                  <span>Login</span>
                </button>
              </div>
            ) : (
              <div className={styles.userLoggedInPill} onClick={() => setUserDrawerOpen(true)} title={`Logged in as ${currentUser.name} (View Profile)`}>
                <div className={styles.userAvatarMini}>
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className={styles.loggedInUserName}>{currentUser.name || 'Student'}</span>
                <button 
                  className={styles.logoutMiniBtn}
                  onClick={(e) => { e.stopPropagation(); logoutUser(); }}
                  title="Log Out"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Founder Profile Pill */}
            <div className={styles.userProfilePill} onClick={() => setAboutDrawerOpen(true)} title="About Founder (Mithlesh Kumar)">
              <div className={styles.userAvatarMiniMK}>MK</div>
              <span>Founder</span>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* ⚡ REAL-TIME SYSTEM STATUS BAR                            */}
        {/* ========================================================= */}
        <div className={styles.systemStatusBar}>
          <div className={styles.statusTickerLeft}>
            <span className={styles.statusLiveDot} />
            <span className={styles.statusLiveText}>DAILY REWARDS: ONLINE</span>
            <span className={styles.statusSeparator}>•</span>
            <span className={styles.statusMeta}>24H CHECK-IN ACTIVE • ₹650+ AMAZON REWARD POOL</span>
          </div>
          <div className={styles.statusTickerRight}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Anti-Cheat Verified</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 🚀 WELCOME HERO BANNER                                    */}
        {/* ========================================================= */}
        <div className={styles.welcomeBanner}>
          <div className={styles.welcomeTextGroup}>
            <div className={styles.dashboardTag}>
              <Sparkles size={14} />
              <span>DAILY REWARDS &amp; STREAK TRACKER</span>
            </div>
            
            <h1 className={styles.welcomeTitle}>
              Claim Your Daily Rewards &amp; Grow Your Streak! 🔥
            </h1>
            
            <p className={styles.welcomeSub}>
              Log in every 24 hours to collect free coins, keep your streak alive, and unlock real <strong>Amazon Gift Cards (₹50, ₹100 &amp; ₹500 on Day 7)</strong>!
            </p>

            {/* Simple Status Chips */}
            <div className={styles.momentumChipsRow}>
              <div className={styles.momentumChip}>
                <Flame size={14} color="#ff9100" />
                <span>Daily Bonus: <strong>1.5x Active</strong></span>
              </div>
              <div className={styles.momentumChip}>
                <Clock size={14} color="#10b981" />
                <span>Check-in Window: <strong>Every 24 Hours</strong></span>
              </div>
            </div>
          </div>

          <div className={styles.welcomeActions}>
            {/* Primary Check-In CTA */}
            <button 
              className={styles.checkInStreakBtn}
              onClick={() => initiateClaim(currentDay)}
              disabled={claiming}
            >
              <Zap size={18} />
              <span>{isTodayClaimable ? '⚡ Claim Day ' + currentDay + ' Reward' : isClaimedToday ? '✓ Claimed for Today' : '⚡ Check-In Streak'}</span>
            </button>

            {/* Glowing How To Earn Spotlight Button */}
            <button 
              className={styles.howToEarnHeroBtn}
              onClick={() => setHowToEarnOpen(true)}
            >
              <Sparkles size={18} color="#ffd700" />
              <span>💡 How to Earn ₹650+</span>
            </button>

            <button 
              className={styles.earnPointsBtn}
              onClick={handleShareGems}
            >
              <Share2 size={18} />
              <span>Share +20 Coins</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 📊 4 CLEAR STAT CARDS                                     */}
        {/* ========================================================= */}
        <div className={styles.statCardsGrid}>
          {/* Card 1: Total Coins */}
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.statTagLabel} ${styles.statTagYellow}`}>🪙 TOTAL COINS</span>
              <div className={styles.statIconBox} style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700' }}>
                <CoinStackIcon size={22} />
              </div>
            </div>
            <div className={styles.statBigValue}>{wallet.vesBalance || 100} <span className={styles.statUnit}>Coins</span></div>
            <div className="d-flex align-items-center justify-content-between">
              <span className={styles.statSubLabel}>≈ ₹{((wallet.vesBalance || 100) / 10).toFixed(2)} Value</span>
              <span className={styles.statDeltaGreen}>
                <TrendingUp size={13} className="me-1 d-inline" />
                +12.5% this month
              </span>
            </div>
          </div>

          {/* Card 2: Active Streak */}
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.statTagLabel} ${styles.statTagOrange}`}>🔥 ACTIVE STREAK</span>
              <div className={styles.statIconBox} style={{ background: 'rgba(255, 123, 0, 0.15)', color: '#ff7b00' }}>
                <Flame size={22} color="#ff7b00" />
              </div>
            </div>
            <div className={styles.statBigValue}>{currentStreak} <span className={styles.statUnit}>Days</span></div>
            <div className={styles.statSubLabel}>
              <strong className="text-white">Record: {wallet.longestStreak || 14} Days</strong> • Keep going!
            </div>
          </div>

          {/* Card 3: Level */}
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.statTagLabel} ${styles.statTagPurple}`}>⭐ YOUR LEVEL</span>
              <div className={styles.statIconBox} style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                <Star size={20} color="#8b5cf6" />
              </div>
            </div>
            <div className={styles.statBigValue}>Level {wallet.level || 3}</div>
            <div>
              <div className="d-flex justify-content-between font-xs text-muted mb-1">
                <span>{wallet.levelProgress || 72}% to Level { (wallet.level || 3) + 1 }</span>
                <span>Lvl { (wallet.level || 3) + 1 }</span>
              </div>
              <div className={styles.levelProgressTrack}>
                <div className={styles.levelProgressFill} style={{ width: `${wallet.levelProgress || 72}%` }} />
              </div>
            </div>
          </div>

          {/* Card 4: Leaderboard Rank */}
          <div className={styles.statCard}>
            <div className={styles.statCardHeader}>
              <span className={`${styles.statTagLabel} ${styles.statTagCyan}`}>🏆 LEADERBOARD RANK</span>
              <div className={styles.statIconBox} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                <Trophy size={20} color="#06b6d4" />
              </div>
            </div>
            <div className={styles.statBigValue}>#{wallet.rank || 18} <span className={styles.statUnit}>Rank</span></div>
            <div className={styles.statSubLabel} style={{ color: '#22d3ee', fontWeight: 'bold' }}>
              ✦ Top 5% of active students
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 📅 7-DAY DAILY STREAK CHECK-IN TRACK                      */}
        {/* ========================================================= */}
        <div className={styles.checkInSystemCard} id="daily-checkin">
          <div className={styles.checkInTopRow}>
            <div className={styles.checkInTitleBox}>
              <div className={styles.flameIconBox}>
                <Flame size={26} color="#ff7b00" />
              </div>
              <div>
                <div className={styles.checkInSystemLabel}>DAILY CHECK-IN TRACKER</div>
                <h3 className={styles.streakBigTitle}>🔥 {currentStreak}-Day Active Streak</h3>
              </div>
            </div>

            <div className={styles.streakMilestoneBadges}>
              <div className={styles.longestBadge}>
                <Trophy size={14} color="#ffd700" className="me-1 d-inline" />
                Longest Streak: <strong className="text-white ms-1">{wallet.longestStreak || 14} Days</strong>
              </div>
              <div className={styles.nextMilestoneBadge}>
                <Sparkles size={14} color="#c4b5fd" className="me-1 d-inline" />
                Next Goal: <strong className="text-white ms-1">10 Days (+250 Coins)</strong>
              </div>
            </div>
          </div>

          {/* 7 Horizontal Day Track */}
          <div className={styles.daysHorizontalTrack}>
            {daysWeek.map((d, i) => (
              <div 
                key={i} 
                className={`${styles.dayPillNode} ${d.done ? styles.dayPillDone : d.active ? styles.dayPillCurrent : ''}`}
              >
                <div className={styles.dayPillHeader}>
                  <span className={styles.dayPillLabel}>{d.label}</span>
                  <span className={styles.dayPillIndex}>
                    <span className={styles.dayWord}>Day </span>{d.day}
                  </span>
                </div>
                
                <div className={`${styles.dayCheckBadge} ${d.done ? styles.badgeCheckedYellow : d.active ? styles.badgeCurrentPurple : styles.badgeLockedGray}`}>
                  {d.done ? <Check size={13} /> : d.active ? <Flame size={13} /> : d.day}
                </div>

                <span className={styles.dayPillRewardTag} title={d.reward}>
                  <span className={styles.fullRewardText}>{d.reward}</span>
                  <span className={styles.shortRewardText}>{d.shortReward}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Claim Action Banner */}
          <div className={styles.claimCtaBanner}>
            <div className={styles.ctaLeftInfo}>
              <div className={styles.ctaZapIconBox}>
                <Zap size={22} color="#ff7b00" />
              </div>
              <div>
                <div className={styles.ctaAvailableTag}>
                  {isTodayClaimable ? '⚡ TODAY\'S REWARD IS READY' : isClaimedToday ? '✓ TODAY\'S REWARD CLAIMED' : '🔒 NEXT REWARD IN COUNTDOWN'}
                </div>
                <h4 className={styles.ctaRewardName}>
                  Day {currentDay} Reward: +{todayReward?.title || '10'} {todayReward?.currency || 'Coins'}
                </h4>
              </div>
            </div>

            <button 
              className={styles.claimRewardActionBtn}
              onClick={() => initiateClaim(currentDay)}
              disabled={claiming}
            >
              <Zap size={18} />
              <span>{isTodayClaimable ? '⚡ Claim Day ' + currentDay + ' Reward' : isClaimedToday ? '✓ Claimed for Today' : '⚡ Claim Reward'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 🎁 DAILY ROTATING SURPRISE DROP SECTION                   */}
        {/* ========================================================= */}
        <div className={styles.surpriseDropCard} id="surprise-drop">
          <div className={styles.surpriseHeader}>
            <div className="d-flex align-items-center gap-3">
              <div className={styles.surpriseIconCircle}>
                <Gift size={24} color="#ffd700" />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <span className={styles.surpriseBadge}>⚡ DAILY ROTATING SURPRISE BOX</span>
                  <span className={styles.surpriseTagBadge}>{todaySurprise.tag}</span>
                </div>
                <h3 className={styles.surpriseTitle}>{todaySurprise.title}</h3>
              </div>
            </div>

            {/* Next Reward Countdown Timer */}
            <div className={styles.timerPill}>
              <Clock size={16} color="#ffd700" />
              <span>Next Surprise In:</span>
              <strong className={styles.timerDigits}>{countdown?.formatted || '18:22:44'}</strong>
            </div>
          </div>

          <div className={styles.surpriseMainRow}>
            {/* Surprise Box Visual */}
            <div className={styles.surpriseVisualBox}>
              <div className={styles.surpriseGlowRing} />
              <GiftBoxIcon size={80} className={styles.floatingGiftIcon} />
              <div className={styles.activeTodayTag}>
                <span className={styles.activeDotPulse} /> {todayName.toUpperCase()} SURPRISE READY
              </div>
            </div>

            {/* Surprise Details */}
            <div className={styles.surpriseContent}>
              <p className={styles.surpriseDescription}>
                {todaySurprise.desc}
              </p>

              <div className={styles.surprisePerksGrid}>
                <div className={styles.surprisePerkItem}>
                  <div className={styles.perkIconBox} style={{ background: 'rgba(255, 145, 0, 0.2)', color: '#ff9100' }}>
                    <CoinStackIcon size={22} />
                  </div>
                  <div>
                    <span className={styles.perkLabel}>Coins Reward</span>
                    <strong className={styles.perkValue}>{todaySurprise.coins}</strong>
                  </div>
                </div>

                <div className={styles.surprisePerkItem}>
                  <div className={styles.perkIconBox} style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#06b6d4' }}>
                    <Sparkles size={22} />
                  </div>
                  <div>
                    <span className={styles.perkLabel}>Bonus Gems</span>
                    <strong className={styles.perkValue}>{todaySurprise.gems}</strong>
                  </div>
                </div>
              </div>

              {/* Claim Button */}
              <div className="d-flex align-items-center gap-3 flex-wrap mt-3">
                <button 
                  className={styles.claimSurpriseBtn}
                  onClick={handleClaimSurprise}
                >
                  <Zap size={18} />
                  <span>{surpriseClaimed ? '✓ Today\'s Surprise Claimed' : '⚡ Claim Today\'s Surprise >'}</span>
                </button>

                <button 
                  className={styles.toggleScheduleBtn}
                  onClick={() => setScheduleOpen(!scheduleOpen)}
                >
                  <span>View 7-Day Drop Schedule</span>
                  {scheduleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* 7-Day Drop Schedule Drawer */}
          {scheduleOpen && (
            <div className={styles.dropScheduleDrawer}>
              <h5 className={styles.scheduleTitle}>📅 Complete 7-Day Surprise Reward Schedule</h5>
              <div className={styles.scheduleGrid}>
                {Object.entries(surpriseDrops).map(([day, data]) => {
                  const isCur = day === todayName;
                  return (
                    <div key={day} className={`${styles.scheduleDayCard} ${isCur ? styles.scheduleDayActive : ''}`}>
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong className="text-white font-xs">{day.toUpperCase()}</strong>
                        {isCur && <span className="badge bg-warning text-dark font-xs">TODAY</span>}
                      </div>
                      <div className={styles.scheduleRewardName}>{data.title}</div>
                      <div className={styles.scheduleRewardDesc}>{data.coins}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className={styles.guaranteeFooter}>
            <ShieldCheck size={16} color="#10b981" />
            <span>100% Guaranteed Daily Drop • Automatically rotates every 24 hours on the server</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 🏆 7-DAY REWARD MATRIX                                    */}
        {/* ========================================================= */}
        <div className={styles.pdfStreakSection} id="reward-matrix">
          
          {/* Day 7 Grand Prize Banner */}
          <div className={styles.ultimateBannerPdf}>
            <div className="d-flex align-items-center gap-3">
              <div className={styles.ultimateCrownWrapper}>
                <CrownIcon size={56} />
              </div>
              <div>
                <div className="d-flex align-items-center gap-2">
                  <span className={styles.ultimateTag}>👑 DAY 7 GRAND REWARD</span>
                  <span className={styles.vipBadgeHeader}>VIP GIFT</span>
                </div>
                <h3 className={styles.ultimateRewardTitle}>₹500 Amazon Gift Card &amp; Gold Crown</h3>
                <p className={styles.ultimateRewardSub}>
                  Complete all 7 days of daily check-ins to receive a real ₹500 Amazon Gift Card voucher code and unlock your VIP Gold Crown!
                </p>
              </div>
            </div>

            <button 
              className={styles.ultimateCheckInBtn}
              onClick={() => initiateClaim(currentDay)}
              disabled={claiming}
            >
              <span>Check-In Day {currentDay}</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* 7 Daily Reward Cards Grid */}
          <div className={styles.pdfRewardGrid7}>
            {streakData?.rewards?.map((r) => {
              const isDone = r.status === 'CLAIMED';
              const isAct = r.status === 'TODAY';
              const isVip = r.day === 7;

              return (
                <div 
                  key={r.day}
                  className={`${styles.pdfRewardCard} ${isAct ? styles.pdfCardToday : isDone ? styles.pdfCardClaimed : isVip ? styles.pdfCardVip : ''}`}
                >
                  <div className={styles.cardTopBadgeRow}>
                    <span className={styles.dayBadgePill}>Day {r.day}</span>
                    {isVip ? (
                      <span className={styles.badgeVip}>VIP</span>
                    ) : r.rewardType === 'GIFT_CARD' ? (
                      <span className={styles.badgeGiftCard}>Gift Card</span>
                    ) : isAct ? (
                      <span className={styles.badgeToday}>Today</span>
                    ) : isDone ? (
                      <span className={styles.badgeClaimed}><CheckCircle2 size={13} /></span>
                    ) : (
                      <span className={styles.badgeLocked}><Lock size={12} /></span>
                    )}
                  </div>

                  <div className={styles.cardIconHolder}>
                    {isVip ? (
                      <CrownIcon size={46} />
                    ) : r.rewardType === 'GIFT_CARD' ? (
                      <AmazonGiftCardIcon size={42} />
                    ) : r.assetType === 'gift-box' ? (
                      <GiftBoxIcon size={42} />
                    ) : (
                      <CoinStackIcon size={42} />
                    )}
                  </div>

                  <div className={styles.cardRewardTitle}>
                    {r.day === 4 ? (r.title === '₹1' ? '₹50' : r.title) :
                     r.day === 5 ? (r.title === '₹2' ? '₹100' : r.title) :
                     r.day === 7 ? (r.title === '₹5' ? '₹500' : r.title) : r.title}
                  </div>
                  <div className={styles.cardRewardSubtitle}>
                    {(r.day === 4 || r.day === 5 || r.day === 7) ? 'Amazon Gift Card' : (r.subtitle || r.currency)}
                  </div>

                  <div className={styles.cardActionContainer}>
                    {isAct ? (
                      <button 
                        className={styles.claimCardBtn}
                        onClick={() => initiateClaim(r.day)}
                        disabled={claiming}
                      >
                        <Zap size={14} />
                        <span>Claim Now</span>
                      </button>
                    ) : isDone ? (
                      <span className={styles.claimedTextStatus}>✓ Claimed</span>
                    ) : (
                      <span className={styles.lockedTextStatus}><Lock size={12} className="me-1 d-inline" /> Locked</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* ========================================================= */}
          {/* ✦ WHY MAINTAIN YOUR STREAK? 4 BENEFIT PILLARS             */}
          {/* ========================================================= */}
          <div className={styles.whyMaintainBox}>
            <div className={styles.whyHeading}>✦ Why Maintain Your Daily Streak? ✦</div>
            <div className={styles.whyGrid4}>
              <div className={styles.whyItem}>
                <div className={styles.whyItemIconBox} style={{ background: 'rgba(255, 123, 0, 0.15)', color: '#ff7b00' }}>
                  <Flame size={24} />
                </div>
                <div>
                  <h5 className={styles.whyItemTitle}>Earn Free Coins Daily</h5>
                  <p className={styles.whyItemDesc}>Log in every day to collect free coins, increase your total balance, and level up faster.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyItemIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h5 className={styles.whyItemTitle}>Climb the Leaderboard</h5>
                  <p className={styles.whyItemDesc}>Keep your streak going to earn bonus XP, beat friends, and rank in the top 5% of students.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyItemIconBox} style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                  <Gift size={24} />
                </div>
                <div>
                  <h5 className={styles.whyItemTitle}>Real Amazon Gift Cards</h5>
                  <p className={styles.whyItemDesc}>Reach Day 4, 5, and Day 7 to win real ₹50, ₹100, and ₹500 Amazon Gift Card voucher codes.</p>
                </div>
              </div>

              <div className={styles.whyItem}>
                <div className={styles.whyItemIconBox} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h5 className={styles.whyItemTitle}>Don't Break Your Streak</h5>
                  <p className={styles.whyItemDesc}>Check in at least once every 24 hours so your progress doesn't reset back to Day 1!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Official Trust & Signature Strip */}
          <div className={styles.trustFooterStrip}>
            <div className={styles.trustLeft}>
              <span className={styles.vrBadgeSmall}>VR</span>
              <span>Official rewards verified on <strong>VeLoopRewards.in</strong> • Built by <strong>Mithlesh Kumar</strong></span>
            </div>
            <button 
              className={styles.trustVerifyBtn}
              onClick={() => setAntiCheatOpen(true)}
            >
              <Shield size={14} />
              <span>Anti-Cheat &amp; Test Suite</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 🎮 GAMIFIED INTERACTIVE HUB STAGE                         */}
        {/* ========================================================= */}
        <div className={styles.gamifiedHubSection} id="gamified-hub">
          <div className={styles.hubSwitcherTabs}>
            <button 
              className={`${styles.hubTabBtn} ${hubTab === 'mascot' ? styles.hubTabActive : ''}`}
              onClick={() => setHubTab('mascot')}
            >
              <Flame size={16} />
              <span>Streak Mascot Stage</span>
            </button>

            <button 
              className={`${styles.hubTabBtn} ${hubTab === 'quests' ? styles.hubTabActive : ''}`}
              onClick={() => setHubTab('quests')}
            >
              <Sparkles size={16} />
              <span>Quests &amp; Friends</span>
            </button>

            <button 
              className={`${styles.hubTabBtn} ${hubTab === 'review' ? styles.hubTabActive : ''}`}
              onClick={() => setHubTab('review')}
            >
              <Trophy size={16} />
              <span>2026 Year Review</span>
            </button>
          </div>

          {/* Tab 1: 3D Mascot Stage */}
          {hubTab === 'mascot' && (
            <div className={styles.mascotStageCard}>
              <div className={styles.mascotAuraGlow} />
              <MascotFlameHero size={160} className={styles.mascotAnimation} />
              <div className={styles.mascotStreakNumber}>
                {String(currentStreak).padStart(2, '0')}
              </div>
              <div className={styles.mascotStreakSub}>DAY STREAK ACTIVE</div>

              <div className="d-flex gap-3 justify-content-center flex-wrap mt-3" style={{ position: 'relative', zIndex: 2 }}>
                <button 
                  className={styles.checkInStreakBtn}
                  onClick={handleShareGems}
                >
                  <Share2 size={18} />
                  <span>SHARE +20 COINS</span>
                </button>

                <button 
                  className={styles.earnPointsBtn}
                  onClick={() => setAntiCheatOpen(true)}
                >
                  <ShieldCheck size={18} />
                  <span>Test Anti-Cheat Protections</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Quests & Friends */}
          {hubTab === 'quests' && (
            <div className={styles.questsContainer}>
              <div className={styles.questCard}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <h4 className="fw-bold text-white mb-1">🎯 15-Day Monthly Quest</h4>
                    <span className="badge bg-dark text-info border border-secondary font-xs">⏱️ 15 DAYS LEFT • WIN +100 COINS</span>
                  </div>
                  <QuestSingerMascot size={70} />
                </div>
                <p className="font-xs text-muted mb-2">
                  Check in 15 days this month to finish this quest and boost your leaderboard rank!
                </p>
                <div className="d-flex justify-content-between align-items-center font-xs text-muted mb-2">
                  <span className="text-white fw-bold">Your Progress</span>
                  <span className="text-success fw-bold">13 / 15 Days Completed</span>
                </div>
                <div className={styles.levelProgressTrack}>
                  <div className={styles.levelProgressFill} style={{ width: '86%' }} />
                </div>
              </div>

              <div className={styles.friendsCard}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold text-white font-xs text-uppercase letter-spacing-1">🤝 STUDY BUDDY TEAM CHALLENGE</span>
                  <span className="badge bg-dark text-warning border border-secondary font-xs">⏱️ 02 DAYS LEFT</span>
                </div>
                <div className="d-flex justify-content-center my-3">
                  <FriendsPodiumScene size={140} />
                </div>
                <h5 className="fw-bold text-white mb-2 font-sm">Check in 25 times together to open the Mystery Gift Box</h5>
                <div className="d-flex justify-content-between align-items-center font-xs mb-1">
                  <span className="text-white">You</span>
                  <span className="text-success fw-bold">14 / 25 Check-Ins</span>
                </div>
                <div className="d-flex justify-content-between align-items-center font-xs mb-3">
                  <span className="text-muted">Alex (Study Buddy)</span>
                  <span className="text-muted">02 / 25 Check-Ins</span>
                </div>
                <div className="d-flex gap-2">
                  <button className="btn btn-sm btn-outline-light flex-1 fw-bold py-2" onClick={handleNudge}>
                    👋 NUDGE BUDDY {nudgeCount > 0 && `(${nudgeCount})`}
                  </button>
                  <button className="btn btn-sm btn-warning flex-1 fw-bold text-dark py-2" onClick={handleOpenGift}>
                    🎁 {giftClaimed ? 'OPENED' : 'OPEN MYSTERY GIFT'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: 2026 Year in Review */}
          {hubTab === 'review' && (
            <div className={styles.reviewInnerCard}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="fw-bold text-white">VELoop Rewards</span>
                <span className="badge bg-warning text-dark font-xs fw-bold">2026 YEAR IN REVIEW</span>
              </div>
              <div className="d-flex justify-content-center my-3">
                <MascotYearReview size={120} />
              </div>
              <div className="p-3 rounded-4 bg-dark border border-secondary text-center text-muted font-xs mb-3">
                You are in the top <strong className="text-white">8% of active students</strong> on VELoop Rewards!
              </div>
              <div className={styles.reviewStatsGrid}>
                <div className={styles.quadStatBox}>
                  <div className="fw-bold text-white font-sm">⭐ Level {wallet.level || 3}</div>
                  <div className={styles.quadStatLabel}>Your Level</div>
                </div>
                <div className={styles.quadStatBox}>
                  <div className="fw-bold text-white font-sm">🔥 {wallet.longestStreak || 14} Days</div>
                  <div className={styles.quadStatLabel}>Longest Streak</div>
                </div>
                <div className={styles.quadStatBox}>
                  <div className="fw-bold text-white font-sm">🪙 {wallet.totalPoints || 100}</div>
                  <div className={styles.quadStatLabel}>Total Coins</div>
                </div>
                <div className={styles.quadStatBox}>
                  <div className="fw-bold text-white font-sm">⏱️ 1,466 min</div>
                  <div className={styles.quadStatLabel}>Time Active</div>
                </div>
              </div>
              <button className={styles.checkInStreakBtn} onClick={handleShareGems}>
                <Gift size={18} />
                <span>SHARE WITH FRIENDS (+20 COINS)</span>
              </button>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* 📋 GIVEAWAY RULES (Exact Data & Layout)                   */}
        {/* ========================================================= */}
        <GiveawayRules />

        {/* ========================================================= */}
        {/* 📱 MOBILE BOTTOM NAVIGATION BAR                           */}
        {/* ========================================================= */}
        <div className={styles.mobileBottomNav}>
          <button 
            className={`${styles.bottomNavItem} ${styles.bottomNavItemActive}`}
            onClick={() => { setActiveTab('dashboard'); scrollToSection('top-header'); }}
          >
            <Home size={20} />
            <span>Home</span>
          </button>

          <button 
            className={styles.bottomNavItem}
            onClick={() => scrollToSection('daily-checkin')}
          >
            <Flame size={20} color="#ff7b00" />
            <span>Streak</span>
          </button>

          {/* Center Glowing Action Button */}
          <button 
            className={styles.bottomCenterExploreBtn}
            onClick={() => setMobileDrawerOpen(true)}
            title="Explore All Features"
          >
            <LayoutGrid size={22} />
          </button>

          <button 
            className={styles.bottomNavItem}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy size={20} color="#ffd700" />
            <span>Ranks</span>
          </button>

          <button 
            className={styles.bottomNavItem}
            onClick={() => setActiveTab('wallet')}
          >
            <Wallet size={20} color="#8b5cf6" />
            <span>Wallet</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* 📱 MOBILE ALL FEATURES HUB DRAWER                         */}
        {/* ========================================================= */}
        {mobileDrawerOpen && (
          <div className={styles.featureDrawerOverlay} onClick={() => setMobileDrawerOpen(false)}>
            <div className={styles.featureDrawerCard} onClick={(e) => e.stopPropagation()}>
              <div className={styles.drawerGrabHandle} />
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center gap-2">
                  <div className={styles.flameIconBox} style={{ width: 34, height: 34 }}>
                    <Flame size={18} color="#ffffff" />
                  </div>
                  <div>
                    <h5 className="fw-bold text-white mb-0" style={{ fontSize: '1.05rem' }}>VELoop All Features</h5>
                    <small className="text-muted" style={{ fontSize: '0.72rem' }}>Tap any feature to access instantly</small>
                  </div>
                </div>
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setMobileDrawerOpen(false)}
                  title="Close Menu"
                >
                  <X size={16} />
                </button>
              </div>

              {/* User Account / Sign In Banner inside Drawer */}
              {currentUser ? (
                <div 
                  className={styles.drawerUserBanner} 
                  onClick={() => { setMobileDrawerOpen(false); setUserDrawerOpen(true); }}
                >
                  <div className={styles.userAvatarMini}>
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex-1 text-start">
                    <div className="d-flex align-items-center gap-2">
                      <strong className="text-white font-sm">{currentUser.name}</strong>
                      <span className="badge bg-success font-xs">Active</span>
                    </div>
                    <div className="text-muted font-xs">{currentUser.email} • Level {wallet.level || 3}</div>
                  </div>
                  <ChevronRight size={18} color="#a78bfa" />
                </div>
              ) : (
                <div className={styles.drawerGuestBanner}>
                  <div className="mb-2">
                    <strong className="text-white font-sm d-block">👋 Welcome to VELoop Rewards!</strong>
                    <span className="text-muted font-xs">Register your account to save streaks and earn free coins.</span>
                  </div>
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-sm btn-warning fw-bold flex-1 py-2 text-dark font-xs"
                      onClick={() => { setMobileDrawerOpen(false); setAuthModalOpen(true); }}
                    >
                      <Zap size={13} className="me-1 d-inline" /> Register Free
                    </button>
                    <button 
                      className="btn btn-sm btn-outline-light fw-bold flex-1 py-2 font-xs"
                      onClick={() => { setMobileDrawerOpen(false); setAuthModalOpen(true); }}
                    >
                      Log In
                    </button>
                  </div>
                </div>
              )}

              {/* 8 Feature Action Cards Grid */}
              <div className={styles.featureDrawerGrid}>
                {/* 0. Featured: How to Earn Guide */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setHowToEarnOpen(true); }}
                  style={{ gridColumn: 'span 2', background: 'linear-gradient(135deg, rgba(255, 145, 0, 0.25), rgba(168, 85, 247, 0.25))', borderColor: '#ffd700' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className={styles.featureIconCircle} style={{ background: 'rgba(255, 215, 0, 0.3)', color: '#ffd700' }}>
                      <Sparkles size={22} />
                    </div>
                    <div>
                      <div className={styles.featureItemTitle} style={{ color: '#ffd700' }}>💡 How to Earn ₹650+ (Guide)</div>
                      <div className={styles.featureItemSub}>Simple 3-step guide for cash &amp; gift cards</div>
                    </div>
                  </div>
                </div>

                {/* 1. Daily Streak */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); scrollToSection('daily-checkin'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(255, 123, 0, 0.15)', color: '#ff7b00' }}>
                    <Flame size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>Daily Streak</div>
                  <div className={styles.featureItemSub}>{currentStreak} Day Active Streak</div>
                </div>

                {/* 2. 7-Day Rewards */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); scrollToSection('reward-matrix'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700' }}>
                    <CrownIcon size={22} />
                  </div>
                  <div className={styles.featureItemTitle}>7-Day Rewards</div>
                  <div className={styles.featureItemSub}>₹500 Amazon Voucher</div>
                </div>

                {/* 3. Daily Surprise Drop */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); scrollToSection('surprise-drop'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(255, 145, 0, 0.15)', color: '#ff9100' }}>
                    <Gift size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>Daily Surprise Box</div>
                  <div className={styles.featureItemSub}>{todaySurprise.title}</div>
                </div>

                {/* 4. Mascot Stage */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setHubTab('mascot'); scrollToSection('gamified-hub'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
                    <Sparkles size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>Streak Mascot Stage</div>
                  <div className={styles.featureItemSub}>Share for +20 Coins</div>
                </div>

                {/* 5. Wallet Ledger */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setActiveTab('wallet'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#c4b5fd' }}>
                    <Wallet size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>My Wallet</div>
                  <div className={styles.featureItemSub}>{wallet.vesBalance || 100} Coins (₹{(wallet.vesBalance || 100) / 10})</div>
                </div>

                {/* 6. Campus Leaderboard */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setActiveTab('leaderboard'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(255, 215, 0, 0.15)', color: '#ffd700' }}>
                    <Trophy size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>Campus Leaderboard</div>
                  <div className={styles.featureItemSub}>Rank #{wallet.rank || 18} Global</div>
                </div>

                {/* 7. Anti-Cheat Test Suite */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setAntiCheatOpen(true); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>Anti-Cheat Engine</div>
                  <div className={styles.featureItemSub}>Authoritative Server Tests</div>
                </div>

                {/* 8. Quests & Friends */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setHubTab('quests'); scrollToSection('gamified-hub'); }}
                >
                  <div className={styles.featureIconCircle} style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#06b6d4' }}>
                    <Users size={20} />
                  </div>
                  <div className={styles.featureItemTitle}>Quests &amp; Friends</div>
                  <div className={styles.featureItemSub}>Nudge buddy &amp; mystery gifts</div>
                </div>

                {/* 9. About Founder Full-Stack MERN Developer */}
                <div 
                  className={styles.featureDrawerItem}
                  onClick={() => { setMobileDrawerOpen(false); setAboutDrawerOpen(true); }}
                  style={{ gridColumn: 'span 2', background: 'linear-gradient(145deg, rgba(29, 16, 63, 0.95), rgba(21, 9, 46, 0.98))', borderColor: '#ff9100' }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className={styles.featureIconCircle} style={{ background: 'rgba(255, 145, 0, 0.25)', color: '#ff9100' }}>
                      <User size={22} />
                    </div>
                    <div>
                      <div className={styles.featureItemTitle}>About Founder (Mithlesh Kumar)</div>
                      <div className={styles.featureItemSub}>Full-Stack MERN Architect • Portfolio &amp; Contact</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* How to Earn Beginner's Interactive Guide Modal */}
        <HowToEarnModal 
          isOpen={howToEarnOpen} 
          onClose={() => setHowToEarnOpen(false)}
          onStartEarning={() => {
            setHowToEarnOpen(false);
            initiateClaim(currentDay);
          }}
        />

        {/* Registered User Profile Drawer */}
        <UserProfileDrawer 
          isOpen={userDrawerOpen} 
          onClose={() => setUserDrawerOpen(false)} 
        />

        {/* About Founder Full Screen Showcase */}
        <AboutDrawer 
          isOpen={aboutDrawerOpen} 
          onClose={() => setAboutDrawerOpen(false)} 
        />
      </div>
    </div>
  );
}

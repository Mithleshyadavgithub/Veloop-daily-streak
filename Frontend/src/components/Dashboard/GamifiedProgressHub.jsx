import React, { useState } from 'react';
import styles from './GamifiedProgressHub.module.css';
import { 
  Flame, Sparkles, Gift, Share2, Users, CheckCircle2, 
  ArrowRight, Award, ShieldCheck, HeartHandshake, Zap, Trophy 
} from 'lucide-react';
import { MascotFlameHero, FriendsAvatars } from '../../assets/mascotIcons';
import { useStreak } from '../../context/StreakContext';
import confetti from 'canvas-confetti';

export default function GamifiedProgressHub() {
  const { streakData, wallet, initiateClaim, showToast } = useStreak();
  const [activeSubView, setActiveSubView] = useState('streak'); // 'streak' | 'quests' | 'review'
  const [nudgeCount, setNudgeCount] = useState(0);
  const [giftClaimed, setGiftClaimed] = useState(false);

  const currentStreak = streakData?.streak?.currentStreak ?? 1;
  const currentDay = streakData?.streak?.currentDay ?? 2;
  const todayReward = streakData?.rewards?.find(r => r.day === currentDay);
  const isTodayClaimable = todayReward?.status === 'TODAY';

  const daysLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const handleShareReward = () => {
    const shareText = `🔥 Hey! I'm earning free coins and winning ₹50, ₹100 & ₹500 Amazon Gift Cards on VELoop Rewards! 🎁\n\nJoin my daily streak challenge here: ${window.location.origin}`;
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#25D366', '#76ff03', '#ffd700', '#00e5ff', '#ffffff']
    });
    showToast('📱 Opening WhatsApp to share with friends! +20 Bonus Coins credited.', 'success');
  };

  const handleNudgeFriend = () => {
    setNudgeCount(prev => prev + 1);
    showToast('👋 You nudged your streak partner Alex! Keep going together.', 'info');
  };

  const handleOpenGift = () => {
    if (giftClaimed) return;
    setGiftClaimed(true);
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    showToast('🎁 Mystery Partner Gift Opened: +35 VEs & 2x Booster Multiplier!', 'success');
  };

  return (
    <div className={styles.hubContainer}>
      {/* Sub-view Navigation Pill Tabs */}
      <div className={styles.subViewTabs}>
        <button 
          className={`${styles.tabBtn} ${activeSubView === 'streak' ? styles.tabActive : ''}`}
          onClick={() => setActiveSubView('streak')}
        >
          <Flame size={14} color="#ff9900" />
          <span>Daily Streak</span>
        </button>

        <button 
          className={`${styles.tabBtn} ${activeSubView === 'quests' ? styles.tabActive : ''}`}
          onClick={() => setActiveSubView('quests')}
        >
          <Sparkles size={14} color="#76ff03" />
          <span>Friends &amp; Quests</span>
        </button>

        <button 
          className={`${styles.tabBtn} ${activeSubView === 'review' ? styles.tabActive : ''}`}
          onClick={() => setActiveSubView('review')}
        >
          <Trophy size={14} color="#ffd700" />
          <span>2026 Review</span>
        </button>
      </div>

      {/* VIEW 1: DUOLINGO-STYLE STREAK CELEBRATION (SCREEN 2 REFERENCE) */}
      {activeSubView === 'streak' && (
        <div className={styles.streakCard}>
          {/* Animated Mascot in Center */}
          <div className={styles.mascotWrapper}>
            <MascotFlameHero size={120} streak={currentStreak} className={styles.floatMascot} />
          </div>

          {/* Streak Number Heading */}
          <div className={styles.streakNumberBox}>
            <h1 className={styles.streakBigNumber}>
              {String(currentStreak).padStart(2, '0')}
            </h1>
            <div className={styles.streakSubtitle}>day streak!</div>
          </div>

          {/* S M T W T F S Week Check Circles */}
          <div className={styles.weekCirclesRow}>
            {daysLabels.map((dayChar, index) => {
              const dayIndex = index + 1;
              const isChecked = dayIndex < currentDay;
              const isCurrent = dayIndex === currentDay;

              return (
                <div key={index} className={styles.dayCircleCol}>
                  <span className={styles.dayCharLabel}>{dayChar}</span>
                  <div className={`${styles.circleNode} ${isChecked ? styles.circleDone : isCurrent ? styles.circleActive : styles.circlePending}`}>
                    {isChecked ? (
                      <CheckCircle2 size={13} color="#ffffff" />
                    ) : isCurrent ? (
                      <Flame size={14} color="#0b071e" />
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Action CTAs */}
          <div className={styles.streakActions}>
            {isTodayClaimable ? (
              <button 
                className={styles.claimGreenBtn}
                onClick={() => initiateClaim(currentDay)}
              >
                <span>CLAIM TODAY'S REWARD ({todayReward?.title} VEs)</span>
              </button>
            ) : (
              <button 
                className={styles.shareGreenBtn}
                onClick={handleShareReward}
              >
                <Share2 size={16} />
                <span>SHARE +20 GEMS / VEs</span>
              </button>
            )}

            <button 
              className={styles.continueOutlineBtn}
              onClick={() => setActiveSubView('quests')}
            >
              EXPLORE QUESTS &gt;
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: MONTHLY & FRIENDS QUESTS (SCREEN 1 REFERENCE) */}
      {activeSubView === 'quests' && (
        <div className={styles.questsCard}>
          {/* Monthly Quest Section */}
          <div className={styles.questSection}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex align-items-center gap-2">
                <span className={styles.questTitleBadge}>October Quest</span>
              </div>
              <span className={styles.questDaysLeft}>⏱️ 15 DAYS</span>
            </div>

            <div className={styles.challengeBox}>
              <div className="d-flex justify-content-between align-items-center mb-1">
                <span className="text-white fw-bold small">Challenge Completed!</span>
                <span className={styles.greenRatio}>13/15</span>
              </div>
              <div className={styles.progressBarBg}>
                <div className={styles.progressBarFillGreen} style={{ width: '86%' }} />
              </div>
            </div>
          </div>

          {/* Friends Quest Section */}
          <div className={styles.friendsQuestBox}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className={styles.friendsTag}>✦ FRIENDS QUEST</span>
              <span className="text-muted font-xs">⏱️ 02 D</span>
            </div>

            {/* Avatars Artwork */}
            <div className={styles.avatarsWrapper}>
              <FriendsAvatars size={36} />
            </div>

            <div className="text-center my-2">
              <h6 className="text-white fw-bold mb-1">Complete 25 Check-Ins</h6>
              <div className={styles.progressBarBg}>
                <div className={styles.progressBarFillGreen} style={{ width: '80%' }} />
              </div>
            </div>

            {/* Score Breakdown */}
            <div className={styles.scoreRow}>
              <div className="d-flex align-items-center gap-2 font-xs">
                <span className={styles.dotGreen} />
                <span className="text-white">You</span>
              </div>
              <span className="text-success fw-bold font-xs">14 Check-ins</span>
            </div>
            <div className={styles.scoreRow}>
              <div className="d-flex align-items-center gap-2 font-xs">
                <span className={styles.dotPink} />
                <span className="text-white">Alex</span>
              </div>
              <span className="text-muted font-xs">06 Check-ins</span>
            </div>

            {/* Nudge & Gift Buttons */}
            <div className={styles.questButtonsGrid}>
              <button className={styles.nudgeBtn} onClick={handleNudgeFriend}>
                <span>👋 NUDGE</span>
                {nudgeCount > 0 && <span className={styles.countBadge}>({nudgeCount})</span>}
              </button>
              <button 
                className={`${styles.openGiftBtn} ${giftClaimed ? styles.giftClaimedBtn : ''}`}
                onClick={handleOpenGift}
              >
                <span>🎁 {giftClaimed ? 'OPENED' : 'OPEN GIFT'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: 2026 YEAR IN REVIEW / STATS PROGRESS CARD (SCREEN 3 REFERENCE) */}
      {activeSubView === 'review' && (
        <div className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <h5 className={styles.reviewTitle}>
              Share your <span className={styles.greenText}>progress</span> and keep earning!
            </h5>
          </div>

          <div className={styles.reviewInnerCard}>
            <div className={styles.duoBrandRow}>
              <span className={styles.veloopBrandText}>veloop</span>
              <span className={styles.yearTag}>2026 YEAR IN REVIEW</span>
            </div>

            {/* Mascot with 2026 Banner */}
            <div className={styles.mascotBannerWrapper}>
              <MascotFlameHero size={90} className={styles.floatMascot} />
              <div className={styles.year2026Badge}>2026</div>
            </div>

            <div className={styles.topPercentageText}>
              I'm a top <span className="text-warning fw-bold">5% Explorer</span> on VELoop!
            </div>

            {/* 4 Stats Grid */}
            <div className={styles.statsQuadGrid}>
              <div className={styles.quadBox}>
                <div className={styles.quadValue}>⭐ Level {wallet.level || 3}</div>
                <div className={styles.quadLabel}>Explorer Score</div>
              </div>
              <div className={styles.quadBox}>
                <div className={styles.quadValue}>🔥 {wallet.longestStreak || 14}d</div>
                <div className={styles.quadLabel}>Longest Streak</div>
              </div>
              <div className={styles.quadBox}>
                <div className={styles.quadValue}>🪙 {wallet.vesBalance || 100}</div>
                <div className={styles.quadLabel}>Total VEs Earned</div>
              </div>
              <div className={styles.quadBox}>
                <div className={styles.quadValue}>⏱️ 1,466</div>
                <div className={styles.quadLabel}>Minutes Active</div>
              </div>
            </div>

            {/* Share CTA */}
            <button className={styles.shareRewardBtn} onClick={handleShareReward}>
              <Gift size={16} />
              <span>SHARE FOR A REWARD (+20 VEs)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

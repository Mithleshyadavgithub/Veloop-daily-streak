import React from 'react';
import styles from './HowToEarnModal.module.css';
import { 
  X, Sparkles, Flame, Gift, Award, Zap, ShieldCheck, 
  ArrowRight, Users, CheckCircle2, ChevronRight, Wallet, Star
} from 'lucide-react';
import { CrownIcon, AmazonGiftCardIcon, CoinStackIcon, GiftBoxIcon } from '../../assets/rewardIcons';
import confetti from 'canvas-confetti';

export default function HowToEarnModal({ isOpen, onClose, onStartEarning }) {
  if (!isOpen) return null;

  const handleStart = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#ffd700', '#ff9100', '#8b5cf6', '#10b981', '#ffffff']
    });
    onClose();
    if (onStartEarning) {
      onStartEarning();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Close Button */}
        <button className={styles.closeBtn} onClick={onClose} title="Close Guide">
          <X size={20} />
        </button>

        {/* Header Section */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <Sparkles size={15} color="#ffd700" />
            <span>BEGINNER'S EARNING GUIDE</span>
          </div>
          <h2 className={styles.title}>
            How to Earn on <span className={styles.titleAccent}>VELoop Rewards</span>
          </h2>
          <p className={styles.subtitle}>
            Earn real Amazon Gift Cards and reward coins in 3 simple steps. 100% Free, Guaranteed &amp; Instant!
          </p>
        </div>

        {/* Total Cycle Potential Spotlight */}
        <div className={styles.spotlightBanner}>
          <div className={styles.spotlightLeft}>
            <div className={styles.spotlightIcon}>
              <CrownIcon size={38} />
            </div>
            <div>
              <div className={styles.spotlightTag}>💰 7-DAY EARNING POTENTIAL</div>
              <div className={styles.spotlightAmount}>₹650+ in Amazon Gift Cards + 100+ Coins</div>
            </div>
          </div>
          <div className={styles.spotlightPill}>
            <ShieldCheck size={16} color="#10b981" />
            <span>Verified Payouts</span>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className={styles.stepsContainer}>
          
          {/* Step 1: Daily Check-In */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumberBadge}>1</div>
            <div className={styles.stepContent}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Flame size={18} color="#ff7b00" />
                <h4 className={styles.stepTitle}>Step 1: Check In Once Every 24 Hours</h4>
              </div>
              <p className={styles.stepDesc}>
                Just open the website once a day and click the <strong>"Claim Reward"</strong> button. Each day you log in consecutively, your streak grows and your rewards get bigger!
              </p>
              <div className={styles.stepRewardPills}>
                <span className={styles.coinPill}>🪙 Day 1: +5 Coins</span>
                <span className={styles.coinPill}>🪙 Day 2: +10 Coins</span>
                <span className={styles.coinPill}>🪙 Day 3: +15 Coins</span>
                <span className={styles.coinPill}>🪙 Day 6: +30 Coins</span>
              </div>
            </div>
          </div>

          {/* Step 2: Milestone Amazon Cash Gift Cards */}
          <div className={`${styles.stepCard} ${styles.stepCardHighlight}`}>
            <div className={`${styles.stepNumberBadge} ${styles.badgeGold}`}>2</div>
            <div className={styles.stepContent}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Gift size={18} color="#ffd700" />
                <h4 className={styles.stepTitle}>Step 2: Unlock Real Amazon Gift Cards!</h4>
              </div>
              <p className={styles.stepDesc}>
                Reach milestone streak days to instantly win official Amazon Pay gift card balance:
              </p>

              {/* 3 Milestone Gift Cards Grid */}
              <div className={styles.giftCardGrid}>
                <div className={styles.giftCardItem}>
                  <div className={styles.giftCardTag}>DAY 4 MILESTONE</div>
                  <div className={styles.giftCardPrice}>₹50</div>
                  <div className={styles.giftCardLabel}>Amazon Gift Card</div>
                </div>

                <div className={styles.giftCardItem}>
                  <div className={styles.giftCardTag}>DAY 5 MILESTONE</div>
                  <div className={styles.giftCardPrice}>₹100</div>
                  <div className={styles.giftCardLabel}>Amazon Gift Card</div>
                </div>

                <div className={`${styles.giftCardItem} ${styles.giftCardVip}`}>
                  <div className={styles.giftCardTag}>👑 DAY 7 GRAND PRIZE</div>
                  <div className={styles.giftCardPrice}>₹500</div>
                  <div className={styles.giftCardLabel}>Amazon Gift Card + VIP Crown</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Daily Surprises & Bonus Quests */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumberBadge}>3</div>
            <div className={styles.stepContent}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Zap size={18} color="#00e5ff" />
                <h4 className={styles.stepTitle}>Step 3: Collect Daily Surprises &amp; Invite Friends</h4>
              </div>
              <p className={styles.stepDesc}>
                Claim daily mystery surprise drops every 24 hours for bonus coins &amp; gems. Complete quick quests or invite study buddies for an extra <strong>+50 Coins</strong> &amp; <strong>₹50 Voucher</strong>!
              </p>
            </div>
          </div>

          {/* Step 4: Instant Wallet Redeem */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumberBadge}>4</div>
            <div className={styles.stepContent}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <Wallet size={18} color="#a855f7" />
                <h4 className={styles.stepTitle}>Step 4: Redeem &amp; Spend in Your Wallet</h4>
              </div>
              <p className={styles.stepDesc}>
                All your earned tokens and Amazon Gift Cards are securely tracked in your <strong>Wallet &amp; Ledger</strong>. Easily copy your gift card codes and add them to Amazon Pay in 1 click!
              </p>
            </div>
          </div>

        </div>

        {/* Bottom CTA Action Button */}
        <div className={styles.footerActions}>
          <button className={styles.startEarningBtn} onClick={handleStart}>
            <Sparkles size={18} />
            <span>Start Earning Now — Claim Today's Reward</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

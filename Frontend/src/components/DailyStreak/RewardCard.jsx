import React from 'react';
import styles from './RewardCard.module.css';
import { Lock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';
import { CrownIcon, CoinStackIcon, AmazonGiftCardIcon, GiftBoxIcon } from '../../assets/rewardIcons';
import { useStreak } from '../../context/StreakContext';

export default function RewardCard({ reward }) {
  const { initiateClaim, claiming } = useStreak();

  const { day, title, subtitle, status, assetType, badge, rewardType } = reward;

  const isToday = status === 'TODAY';
  const isClaimed = status === 'CLAIMED';
  const isLocked = status === 'LOCKED';
  const isMissed = status === 'MISSED';

  const renderCardIcon = () => {
    if (assetType === 'crown' || day === 7) {
      return <CrownIcon size={34} className={isToday ? styles.activeAsset : ''} />;
    }
    if (assetType === 'gift-card' || (rewardType === 'GIFT_CARD' && day === 5)) {
      return <AmazonGiftCardIcon size={32} className={isToday ? styles.activeAsset : ''} />;
    }
    if (assetType === 'gift-box' || day === 4) {
      return <GiftBoxIcon size={32} className={isToday ? styles.activeAsset : ''} />;
    }
    return <CoinStackIcon size={32} className={isToday ? styles.activeAsset : ''} />;
  };

  let cardClasses = styles.cardContainer;
  if (isToday) cardClasses += ` ${styles.cardToday}`;
  if (isClaimed) cardClasses += ` ${styles.cardClaimed}`;
  if (isLocked) cardClasses += ` ${styles.cardLocked}`;
  if (isMissed) cardClasses += ` ${styles.cardMissed}`;

  const isAmazonCard = rewardType === 'GIFT_CARD' || subtitle.toLowerCase().includes('amazon');

  return (
    <div className={cardClasses}>
      {/* Top Header: Day Number + Badge */}
      <div className={styles.cardHeader}>
        <span className={styles.dayText}>Day {day}</span>
        
        {badge && (
          <span className={isToday ? styles.badgeToday : styles.badgeNormal}>
            {badge}
          </span>
        )}
        {isClaimed && !badge && (
          <span className={styles.claimedCheckCircle}>
            <CheckCircle2 size={11} color="#10b981" />
          </span>
        )}
      </div>

      {/* Visual Icon Illustration */}
      <div className={styles.iconSlot}>
        {renderCardIcon()}
      </div>

      {/* Reward Labels */}
      <div className={styles.labelsSection}>
        <div className={styles.dailyRewardSub}>
          {day === 7 ? 'Ultimate Reward' : 'Daily Reward'}
        </div>
        <div className={`${styles.mainAmount} ${isClaimed ? styles.greenAmount : ''}`}>
          {title}
        </div>
        <div className={styles.currencySub} title={subtitle}>
          {isAmazonCard ? 'Amazon Gift Card' : subtitle}
        </div>
      </div>

      {/* Bottom CTA / State Badge */}
      <div className={styles.actionFooter}>
        {isToday && (
          <button 
            className={styles.claimBtn}
            onClick={() => initiateClaim(day)}
            disabled={claiming}
          >
            <span>Claim Now</span>
            <ChevronRight size={12} />
          </button>
        )}

        {isClaimed && (
          <div className={styles.claimedPill}>
            <CheckCircle2 size={11} />
            <span>Claimed</span>
          </div>
        )}

        {isLocked && (
          <div className={styles.lockedPill}>
            <Lock size={10} />
            <span>Locked</span>
          </div>
        )}

        {isMissed && (
          <div className={styles.missedPill}>
            <AlertCircle size={10} />
            <span>Missed</span>
          </div>
        )}
      </div>
    </div>
  );
}

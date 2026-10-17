import React from 'react';
import styles from './RewardCard.module.css';
import { Lock, Check, ChevronRight } from 'lucide-react';
import { coinImg, giftBoxImg, giftCardImg, crownImg } from '../../assets/streakAssets';
import { useStreak } from '../../context/StreakContext';

export default function RewardCard({ reward }) {
  const { initiateClaim, claiming } = useStreak();

  const { day, title, subtitle, status, assetType, badge, amount, currency } = reward;

  const isToday = status === 'TODAY';
  const isClaimed = status === 'CLAIMED';
  const isLocked = status === 'LOCKED';
  const isDay7 = day === 7;

  // Select official 3D asset image based on backend metadata or day
  const getAsset = () => {
    if (isDay7 || assetType === 'crown') return crownImg;
    if (day === 5 || assetType === 'gift-card') return giftCardImg;
    if (day === 4 || assetType === 'gift-box') return giftBoxImg;
    return coinImg;
  };

  // Determine badge label
  const renderBadge = () => {
    if (isClaimed) {
      return (
        <span className={styles.badgeCheck}>
          <Check size={11} strokeWidth={3} />
        </span>
      );
    }
    if (badge) {
      const badgeStyle =
        badge === 'VIP'
          ? styles.badgeVip
          : badge === 'Today'
          ? styles.badgeToday
          : badge === 'Gift Card'
          ? styles.badgeGiftCard
          : styles.badgeCoin;
      return <span className={`${styles.badgePill} ${badgeStyle}`}>{badge}</span>;
    }
    if (isToday) {
      return <span className={`${styles.badgePill} ${styles.badgeToday}`}>Today</span>;
    }
    return null;
  };

  // Card class based on status
  let cardClass = styles.rewardCard;
  if (isToday) cardClass += ` ${styles.cardToday}`;
  else if (isClaimed) cardClass += ` ${styles.cardClaimed}`;
  else if (isDay7) cardClass += ` ${styles.cardDay7}`;

  // Value color styling
  const getValueColorClass = () => {
    if (isClaimed) return styles.valueGreen;
    if (isToday || isDay7) return styles.valueGold;
    return styles.valuePurple;
  };

  // Amount display from backend
  const displayValue = title || (currency === 'VES' ? `+${amount}` : `₹${amount}`);
  const displaySubtext = subtitle || (currency === 'VES' ? `${amount} VEs` : 'Amazon Gift Card');
  const sectionLabel = isDay7 ? 'Ultimate Reward' : 'Daily Reward';

  return (
    <div className={cardClass}>
      {/* Top Header: Day & Badge */}
      <div className={styles.cardHeader}>
        <span className={styles.dayLabel}>Day {day}</span>
        {renderBadge()}
      </div>

      {/* 3D Asset Illustration */}
      <div className={styles.assetSlot}>
        {isToday && <div className={styles.glowBackdrop} />}
        <img
          src={getAsset()}
          alt={`Day ${day} ${displayValue}`}
          className={styles.assetImg}
          loading="lazy"
        />
      </div>

      {/* Info: Label, Big Value, Subtext */}
      <div className={styles.infoCol}>
        <span className={styles.rewardLabel}>{sectionLabel}</span>
        <div className={`${styles.rewardValue} ${getValueColorClass()}`}>
          {displayValue}
        </div>
        <span className={styles.rewardSubtext} title={displaySubtext}>
          {displaySubtext}
        </span>
      </div>

      {/* Bottom Status Button */}
      <div className={styles.actionSlot}>
        {isToday ? (
          <button
            type="button"
            className={styles.claimNowBtn}
            onClick={() => initiateClaim(day)}
            disabled={claiming}
          >
            <span>{claiming ? 'Claiming...' : 'Claim Now'}</span>
            <ChevronRight size={13} strokeWidth={2.5} />
          </button>
        ) : isClaimed ? (
          <div className={styles.claimedPill}>
            <Check size={12} strokeWidth={2.8} />
            <span>Claimed</span>
          </div>
        ) : (
          <div className={styles.lockedPill}>
            <Lock size={11} />
            <span>Locked</span>
          </div>
        )}
      </div>
    </div>
  );
}

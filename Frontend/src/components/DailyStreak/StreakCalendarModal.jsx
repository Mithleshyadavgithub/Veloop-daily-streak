import React, { useEffect } from 'react';
import styles from './StreakCalendarModal.module.css';
import { X, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { calendarImg } from '../../assets/streakAssets';
import { useStreak } from '../../context/StreakContext';

export default function StreakCalendarModal({ open, onClose }) {
  const { streakData } = useStreak();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const currentStreak = streakData?.streak?.currentStreak ?? 1;
  const currentDay = streakData?.streak?.currentDay ?? 1;
  const checkedIn = streakData?.streak?.checkedIn ?? 1;
  const rewards = streakData?.rewards || [];
  const claimedRewards = rewards.filter(r => r.status === 'CLAIMED');

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.titleBox}>
            <div className={styles.titleIcon}>
              <img src={calendarImg} alt="Calendar" />
            </div>
            <div>
              <h3 className={styles.title}>Streak Calendar</h3>
              <span className="font-xs text-muted">Authoritative check-in record</span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.cycleCard}>
            <div className={styles.cycleHeader}>
              <span className={styles.cycleTitle}>Current 7-Day Cycle</span>
              <span className={styles.cycleBadge}>
                {checkedIn} of 7 Days Claimed
              </span>
            </div>

            {claimedRewards.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No check-ins claimed yet in this cycle.</p>
                <span className="text-warning small">Claim Day 1 to ignite your streak!</span>
              </div>
            ) : (
              <ul className={styles.claimsList}>
                {claimedRewards.map((reward) => (
                  <li key={reward.day} className={styles.claimRow}>
                    <div className={styles.dayBadge}>
                      <small>Day</small>
                      <span>{reward.day}</span>
                    </div>
                    <div className={styles.claimDetails}>
                      <span className={styles.claimReward}>
                        {reward.title} {reward.currency === 'VES' ? 'VEs' : reward.subtitle}
                      </span>
                      <span className={styles.claimTime}>
                        ✓ Verified on backend ledger
                      </span>
                    </div>
                    <span className={styles.claimRef}>
                      #STRK-D{reward.day}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 px-2 text-muted font-xs">
            <ShieldCheck size={14} color="#10b981" />
            <span>Anti-cheat timestamps recorded on MongoDB ledger</span>
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.closeModalBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

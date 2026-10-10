import React, { useState, useEffect } from 'react';
import styles from './CpaModal.module.css';
import { ShieldCheck, Sparkles, Loader2, Award, Zap, CheckCircle2 } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function CpaModal() {
  const { cpaModalOpen, setCpaModalOpen, handleCpaComplete } = useStreak();
  const [progress, setProgress] = useState(0);
  const [stepText, setStepText] = useState('Initializing reward verification...');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!cpaModalOpen) {
      setProgress(0);
      setIsReady(false);
      return;
    }

    const timer1 = setTimeout(() => {
      setProgress(35);
      setStepText('Connecting to VELoop verification server...');
    }, 400);

    const timer2 = setTimeout(() => {
      setProgress(75);
      setStepText('Verifying consecutive-day eligibility & anti-fraud check...');
    }, 1100);

    const timer3 = setTimeout(() => {
      setProgress(100);
      setStepText('Verification complete! Click below to collect your reward.');
      setIsReady(true);
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [cpaModalOpen]);

  if (!cpaModalOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalCard}>
        {/* Header Badge */}
        <div className={styles.headerBadge}>
          <Sparkles size={14} color="#ffd700" />
          <span>CPA ADVERTISEMENT DEMO • REWARD VERIFICATION</span>
        </div>

        <h3 className={styles.title}>Preparing Your Reward...</h3>
        <p className={styles.subtitle}>
          Please wait while our verification engine validates your streak activity.
        </p>

        {/* Sponsor / Ad Visual Container */}
        <div className={styles.adFrame}>
          <div className={styles.adHeader}>
            <div className="d-flex align-items-center gap-2">
              <div className={styles.sponsorBadge}>SPONSOR AD</div>
              <span className="text-light small fw-bold">VELoop Booster Network</span>
            </div>
            <span className="text-muted small">ID: CPA-9921-VR</span>
          </div>

          <div className={styles.adContent}>
            <div className={styles.adGlowCircle}>
              <Zap size={36} color="#ffd700" />
            </div>
            <h5 className="text-white fw-bold mt-3 mb-1">Double Your Point Multiplier</h5>
            <p className="text-muted small mb-0">
              Maintain a 7-day streak to unlock exclusive high-tier reward cards & vouchers.
            </p>
          </div>

          {/* Verification Progress Bar */}
          <div className={styles.progressSection}>
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className={styles.stepLabel}>
                {progress < 100 ? (
                  <Loader2 size={13} className="spinner-border spinner-border-sm me-1 text-warning" />
                ) : (
                  <CheckCircle2 size={13} className="text-success me-1" />
                )}
                {stepText}
              </span>
              <span className="text-warning fw-bold small">{progress}%</span>
            </div>
            <div className={styles.progressBarTrack}>
              <div 
                className={styles.progressBarFill} 
                style={{ width: `${progress}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          <button 
            className={`${styles.claimActionBtn} ${!isReady ? styles.disabledBtn : ''}`}
            onClick={handleCpaComplete}
            disabled={!isReady}
          >
            {isReady ? (
              <>
                <Award size={18} />
                <span>Confirm & Claim Reward Now &gt;</span>
              </>
            ) : (
              <>
                <Loader2 size={18} className="spinner-border spinner-border-sm" />
                <span>Verifying Ad Stream ({progress}%)...</span>
              </>
            )}
          </button>
          
          <button 
            className={styles.cancelBtn}
            onClick={() => setCpaModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import styles from './Footer.module.css';
import { ShieldCheck, Sparkles, ChevronRight, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className={styles.footerStrip}>
      <div className={styles.footerInner}>
        <div className={styles.brandBadge}>
          <div className={styles.vrMini}>VR</div>
          <div>
            <div className={styles.officialText}>
              Official rewards only on <span className="text-warning fw-bold">VeloopRewards.in</span>
            </div>
            <div className={styles.subText}>Stay active, stay rewarded! • Anti-Cheat &amp; Cryptographic Ledger Protected</div>
          </div>
        </div>

        <div className={styles.linksRight}>
          <div className={styles.trustPill}>
            <ShieldCheck size={14} color="#10b981" />
            <span>Fair Play Verified</span>
          </div>
          <div className={styles.trustPill}>
            <Lock size={14} color="#ffd700" />
            <span>Server Time Authority</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

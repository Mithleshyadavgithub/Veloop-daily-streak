import React from 'react';
import styles from './TrustFooter.module.css';
import { ChevronRight } from 'lucide-react';
import { shieldImg } from '../../assets/streakAssets';

export default function TrustFooter() {
  return (
    <footer className={styles.footerStrip}>
      <div className={styles.leftCol}>
        <div className={styles.brandBadge}>
          <span className={styles.badgeVr}>VR</span>
        </div>
        <div className={styles.brandTextCol}>
          <span className={styles.mainText}>
            Official rewards only on <strong className={styles.domain}>VeloopRewards.in</strong>
          </span>
          <span className={styles.subText}>Stay active, stay rewarded!</span>
        </div>
      </div>

      <div className={styles.rightCol}>
        <ChevronRight size={16} className={styles.arrowIcon} />
      </div>
    </footer>
  );
}

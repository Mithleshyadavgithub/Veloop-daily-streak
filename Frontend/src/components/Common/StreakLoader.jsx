import React from 'react';
import styles from './Loader.module.css';
import { CrownIcon } from '../../assets/rewardIcons';

export function StreakLoader() {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loaderCenter}>
        <div className={styles.loaderGlowRing}>
          <CrownIcon size={72} className={styles.pulseIcon} />
        </div>
        <h4 className={styles.loaderTitle}>VELoop Rewards</h4>
        <div className={styles.loaderBar}>
          <div className={styles.loaderBarInner} />
        </div>
        <p className={styles.loaderSub}>Synchronizing Daily Streak with secure server...</p>
      </div>
    </div>
  );
}

export function SkeletonLoader() {
  return (
    <div className={styles.skeletonContainer}>
      {/* Header Skeleton */}
      <div className={styles.skeletonHeader} />

      {/* Hero 2-col Skeleton */}
      <div className={styles.skeletonHeroGrid}>
        <div className={styles.skeletonHeroLeft} />
        <div className={styles.skeletonHeroRight} />
      </div>

      {/* Stats Skeleton */}
      <div className={styles.skeletonStatsGrid}>
        <div className={styles.skeletonStatBox} />
        <div className={styles.skeletonStatBox} />
        <div className={styles.skeletonStatBox} />
      </div>

      {/* 7 Card Grid Skeleton */}
      <div className={styles.skeletonCardsGrid}>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <div key={n} className={styles.skeletonCard} />
        ))}
      </div>
    </div>
  );
}

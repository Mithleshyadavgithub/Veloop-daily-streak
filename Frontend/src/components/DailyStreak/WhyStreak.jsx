import React from 'react';
import styles from './WhyStreak.module.css';
import {
  calendarImg,
  biggerStreakImg,
  exclusiveGiftImg,
  shieldImg
} from '../../assets/streakAssets';

export default function WhyStreak() {
  const pillars = [
    {
      img: calendarImg,
      title: 'Stay Active',
      desc: 'Keep your streak alive & earn more!'
    },
    {
      img: biggerStreakImg,
      title: 'Bigger Streak',
      desc: 'More consecutive logins, bigger rewards!'
    },
    {
      img: exclusiveGiftImg,
      title: 'Exclusive Rewards',
      desc: 'Get coins, gift cards & special bonuses!'
    },
    {
      img: shieldImg,
      title: "Don't Miss Out",
      desc: 'Come back every day & unlock all rewards!'
    }
  ];

  return (
    <section className={styles.whySection}>
      {/* Title with sparkles */}
      <div className={styles.titleRow}>
        <span className={styles.sparkleIcon}>✦</span>
        <h3 className={styles.sectionTitle}>Why Maintain Your Streak?</h3>
        <span className={styles.sparkleIcon}>✦</span>
      </div>

      {/* 4 Pillars Grid */}
      <div className={styles.pillarsGrid}>
        {pillars.map((item, idx) => (
          <div key={idx} className={styles.pillarCard}>
            <div className={styles.iconSlot}>
              <img
                src={item.img}
                alt={item.title}
                className={styles.pillarImg}
                loading="lazy"
              />
            </div>
            <div className={styles.textContent}>
              <h4 className={styles.pillarTitle}>{item.title}</h4>
              <p className={styles.pillarDesc}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

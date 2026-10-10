import React from 'react';
import styles from './WhyStreak.module.css';
import { Flame, TrendingUp, Gift, ShieldCheck } from 'lucide-react';

export default function WhyStreak() {
  const reasons = [
    {
      icon: <Flame size={26} color="#FF9900" />,
      title: 'Stay Active',
      desc: 'Keep your streak alive & earn more rewards every single day.'
    },
    {
      icon: <TrendingUp size={26} color="#ffd700" />,
      title: 'Bigger Streak',
      desc: 'More consecutive logins unlock higher tier bonuses and multiplier perks.'
    },
    {
      icon: <Gift size={26} color="#a855f7" />,
      title: 'Exclusive Rewards',
      desc: 'Get coins, Amazon gift cards, and VIP celebratory milestones.'
    },
    {
      icon: <ShieldCheck size={26} color="#10b981" />,
      title: "Don't Miss Out",
      desc: 'Come back daily to safeguard your streak and prevent auto-reset!'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <span className={styles.headerLine} />
        <h5 className={styles.sectionTitle}>✦ WHY MAINTAIN YOUR STREAK? ✦</h5>
        <span className={styles.headerLine} />
      </div>

      <div className={styles.grid}>
        {reasons.map((r, idx) => (
          <div key={idx} className={styles.whyCard}>
            <div className={styles.iconCircle}>
              {r.icon}
            </div>
            <h6 className={styles.cardTitle}>{r.title}</h6>
            <p className={styles.cardDesc}>{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

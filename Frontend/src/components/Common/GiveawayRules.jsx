import React from 'react';
import styles from './GiveawayRules.module.css';
import { 
  Key, 
  Diamond, 
  Gift, 
  Rocket, 
  Trophy, 
  ShieldCheck, 
  Mail, 
  CheckCircle2 
} from 'lucide-react';

export default function GiveawayRules() {
  const rules = [
    {
      num: '01',
      icon: <Key size={22} color="#f59e0b" />,
      text: 'One entry per user per giveaway.'
    },
    {
      num: '02',
      icon: <Diamond size={22} color="#00e5ff" />,
      text: 'Entry fees are non-refundable once submitted.'
    },
    {
      num: '03',
      icon: <Gift size={22} color="#ff3366" />,
      text: 'Winners are selected randomly after the giveaway end time.'
    },
    {
      num: '04',
      icon: <Rocket size={22} color="#8b5cf6" />,
      text: 'Prize claims must be submitted within the deadline shown after winning.'
    },
    {
      num: '05',
      icon: <ShieldCheck size={22} color="#10b981" />,
      text: 'VELOOP Rewards reserves the right to cancel a giveaway if fraud is detected.'
    },
    {
      num: '06',
      icon: <Trophy size={22} color="#ffd700" />,
      text: 'Winners may be required to verify their identity before receiving physical prizes.'
    },
    {
      num: '07',
      icon: <Mail size={22} color="#ec4899" />,
      text: 'Gift card prizes will be delivered to the registered email within 7 business days.'
    },
    {
      num: '08',
      icon: <CheckCircle2 size={22} color="#38bdf8" />,
      text: 'VELOOP Rewards decisions regarding winners and claims are final.'
    }
  ];

  return (
    <section className={styles.rulesContainer} id="giveaway-rules">
      <h2 className={styles.mainTitle}>📋 Giveaway Rules</h2>
      
      <div className={styles.rulesList}>
        {rules.map((rule) => (
          <div key={rule.num} className={styles.ruleItem}>
            <div className={styles.leftNode}>
              <div className={styles.iconBox}>
                {rule.icon}
              </div>
              <span className={styles.numberLabel}>{rule.num}</span>
            </div>
            
            <div className={styles.rightContent}>
              <p className={styles.ruleText}>{rule.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

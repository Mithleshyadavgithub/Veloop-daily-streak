import React from 'react';
import styles from './TasksPage.module.css';
import { CheckSquare, Sparkles } from 'lucide-react';
import ActiveTasks from '../../components/Dashboard/ActiveTasks';

export default function TasksPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="d-flex align-items-center gap-3">
          <div className={styles.iconBox}>
            <CheckSquare size={24} color="#ffd700" />
          </div>
          <div>
            <h2 className={styles.title}>Quests &amp; Milestone Tasks</h2>
            <p className={styles.subtitle}>Complete activities to supercharge your daily reward multipliers</p>
          </div>
        </div>
      </div>

      <ActiveTasks />
    </div>
  );
}

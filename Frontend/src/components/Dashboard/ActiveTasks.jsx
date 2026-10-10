import React, { useState } from 'react';
import styles from './ActiveTasks.module.css';
import { CheckSquare, ArrowRight, Zap, Gift, Award, CheckCircle2 } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function ActiveTasks() {
  const { showToast } = useStreak();
  const [completedTasks, setCompletedTasks] = useState([]);

  const tasks = [
    {
      id: 'task_1',
      title: '🔥 Log in 3 Days in a Row',
      desc: 'Just visit the website and click claim for 3 days straight to get bonus coins.',
      reward: '+25 Coins',
      tag: 'EASY STREAK'
    },
    {
      id: 'task_2',
      title: '👥 Invite a Friend',
      desc: 'Share your link with a friend. When they sign up, you instantly get free reward coins!',
      reward: '+50 Coins',
      tag: 'FRIENDS BONUS'
    },
    {
      id: 'task_3',
      title: '💳 Connect Amazon Pay Account',
      desc: 'Link your Amazon account so your ₹50, ₹100, and ₹500 gift cards are sent directly to your wallet.',
      reward: '₹50 Voucher',
      tag: 'CASH PAYOUT'
    },
    {
      id: 'task_4',
      title: '🎁 Open Today\'s Surprise Mystery Box',
      desc: 'Claim the daily free surprise box on your home screen for extra bonus gems and coins.',
      reward: '+40 Coins & Gems',
      tag: 'DAILY FREE GIFT'
    }
  ];

  const handleComplete = (task) => {
    if (completedTasks.includes(task.id)) return;
    setCompletedTasks([...completedTasks, task.id]);
    showToast(`🎯 Task Complete: "${task.title}" (+${task.reward})`, 'success');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="d-flex align-items-center gap-2">
          <CheckSquare size={18} color="#ffd700" />
          <h4 className={styles.title}>Active Tasks &amp; Activities</h4>
        </div>
        <span className={styles.subTag}>Earn Extra Points</span>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => {
          const isDone = completedTasks.includes(task.id);
          return (
            <div key={task.id} className={`${styles.taskCard} ${isDone ? styles.taskDone : ''}`}>
              <div className={styles.taskLeft}>
                <div className={styles.taskTag}>{task.tag}</div>
                <h5 className={styles.taskTitle}>{task.title}</h5>
                <p className={styles.taskDesc}>{task.desc}</p>
              </div>

              <div className={styles.taskRight}>
                <div className={styles.rewardBadge}>{task.reward}</div>
                <button 
                  className={`${styles.actionBtn} ${isDone ? styles.btnDone : ''}`}
                  onClick={() => handleComplete(task)}
                  disabled={isDone}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 size={15} color="#10b981" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <span>Start Task</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React from 'react';
import styles from './LeaderboardPage.module.css';
import { Award, Flame, Trophy, Crown, Sparkles } from 'lucide-react';
import { useStreak } from '../../context/StreakContext';

export default function LeaderboardPage() {
  const { wallet, streakData } = useStreak();

  const leaders = [
    { rank: 1, name: 'Aarav_Sharma', streak: 42, points: 4200, badge: 'Gold Crown' },
    { rank: 2, name: 'Priya_V', streak: 38, points: 3650, badge: 'Silver' },
    { rank: 3, name: 'Rohan_K', streak: 29, points: 2800, badge: 'Bronze' },
    { rank: 4, name: 'CryptoKnight', streak: 22, points: 2100, badge: 'Top 1%' },
    { rank: 18, name: 'Explorer (You)', streak: streakData?.streak?.currentStreak ?? 1, points: wallet.totalPoints, badge: 'Rising Star', isUser: true },
    { rank: 19, name: 'NexusTrader', streak: 12, points: 1200, badge: 'Active' },
    { rank: 20, name: 'StarGazer', streak: 9, points: 950, badge: 'Active' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="d-flex align-items-center gap-3">
          <div className={styles.trophyIconBox}>
            <Trophy size={24} color="#ffd700" />
          </div>
          <div>
            <h2 className={styles.title}>Streak Champions Leaderboard</h2>
            <p className={styles.subtitle}>Top consecutive streak holders across VELoop Rewards</p>
          </div>
        </div>

        <div className={styles.userRankPill}>
          <span>Your Current Rank: </span>
          <strong className="text-warning">#{wallet.rank || 18}</strong>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className={styles.podiumGrid}>
        {/* Rank 2 */}
        <div className={`${styles.podiumCard} ${styles.rank2}`}>
          <div className={styles.podiumBadge}>#2 Silver</div>
          <div className={styles.podiumName}>Priya_V</div>
          <div className={styles.podiumStreak}>🔥 38 Days</div>
          <small className="text-muted">3,650 VEs</small>
        </div>

        {/* Rank 1 */}
        <div className={`${styles.podiumCard} ${styles.rank1}`}>
          <Crown size={28} color="#ffd700" className={styles.goldCrown} />
          <div className={styles.podiumBadgeGold}>#1 Champion</div>
          <div className={styles.podiumNameBig}>Aarav_Sharma</div>
          <div className={styles.podiumStreakGold}>🔥 42 Days</div>
          <small className="text-warning fw-bold">4,200 VEs</small>
        </div>

        {/* Rank 3 */}
        <div className={`${styles.podiumCard} ${styles.rank3}`}>
          <div className={styles.podiumBadge}>#3 Bronze</div>
          <div className={styles.podiumName}>Rohan_K</div>
          <div className={styles.podiumStreak}>🔥 29 Days</div>
          <small className="text-muted">2,800 VEs</small>
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Member</th>
              <th>Current Streak</th>
              <th>Total Points</th>
              <th>Tier Badge</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((item, idx) => (
              <tr key={idx} className={item.isUser ? styles.userRow : ''}>
                <td className="fw-bold">
                  {item.rank <= 3 ? <span className="text-warning">#{item.rank}</span> : `#${item.rank}`}
                </td>
                <td className="fw-bold text-white">
                  {item.name} {item.isUser && <span className={styles.youTag}>YOU</span>}
                </td>
                <td>
                  <span className="text-warning fw-bold">🔥 {item.streak} Days</span>
                </td>
                <td>
                  <span className="text-light">{item.points} VEs</span>
                </td>
                <td>
                  <span className={styles.tierBadge}>{item.badge}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

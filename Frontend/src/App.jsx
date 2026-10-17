import React from 'react';
import { StreakProvider, useStreak } from './context/StreakContext';
import GamifiedDuolingoApp from './pages/GamifiedApp/GamifiedDuolingoApp';
import CpaModal from './components/Common/CpaModal';
import ClaimSuccessModal from './components/Common/ClaimSuccessModal';
import AntiCheatDrawer from './components/Common/AntiCheatDrawer';
import AuthModal from './components/Common/AuthModal';
import WalletPage from './pages/Wallet/WalletPage';
import LeaderboardPage from './pages/Leaderboard/LeaderboardPage';
import { AlertCircle, CheckCircle2, Info, ChevronLeft } from 'lucide-react';

import DailyStreakPage from './pages/DailyStreak/DailyStreakPage';

function AppContent() {
  const { activeTab, setActiveTab, toastMessage } = useStreak();

  return (
    <div className="app-root">
      {/* If navigating to Wallet or Leaderboard, show seamless view with back button */}
      {activeTab === 'wallet' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', width: '100%' }}>
          <button 
            className="btn btn-sm btn-outline-info mb-3 d-flex align-items-center gap-1"
            onClick={() => setActiveTab('streak')}
          >
            <ChevronLeft size={16} /> Back to Daily Streak
          </button>
          <WalletPage />
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px 16px', width: '100%' }}>
          <button 
            className="btn btn-sm btn-outline-info mb-3 d-flex align-items-center gap-1"
            onClick={() => setActiveTab('streak')}
          >
            <ChevronLeft size={16} /> Back to Daily Streak
          </button>
          <LeaderboardPage />
        </div>
      )}

      {/* Primary View: Dedicated Official Daily Streak System */}
      {activeTab === 'streak' && (
        <DailyStreakPage />
      )}

      {/* Gamified Hub & Features: When user navigates to Dashboard */}
      {(activeTab === 'dashboard' || activeTab === 'tasks') && (
        <GamifiedDuolingoApp />
      )}

      {/* Interactive Overlays */}
      <AuthModal />
      <CpaModal />
      <ClaimSuccessModal />
      <AntiCheatDrawer />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className={`toast-notification toast-${toastMessage.type}`}>
          {toastMessage.type === 'success' && <CheckCircle2 size={16} />}
          {toastMessage.type === 'danger' && <AlertCircle size={16} />}
          {toastMessage.type === 'info' && <Info size={16} />}
          <span>{toastMessage.msg}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StreakProvider>
      <AppContent />
    </StreakProvider>
  );
}

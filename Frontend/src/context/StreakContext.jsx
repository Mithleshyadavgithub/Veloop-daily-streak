import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { streakApi, DEFAULT_STREAK_REWARDS } from '../services/streakApi';
import confetti from 'canvas-confetti';

const StreakContext = createContext(null);

const initialStreakData = {
  success: true,
  serverTime: new Date().toISOString(),
  user: {
    userId: 'USER_MEMBER_9921',
    name: 'Explorer',
    rank: 18,
    level: 3,
    levelProgress: 72,
    longestStreak: 14,
    totalPoints: 100,
    vesBalance: 100,
    giftCardBalance: 0,
  },
  streak: {
    currentStreak: 5,
    currentDay: 2,
    checkedIn: 1,
    totalRewards: 7,
    status: 'ACTIVE',
    nextClaimAt: new Date(Date.now() - 60000).toISOString(),
    claimWindowClosesAt: new Date(Date.now() + 86400000).toISOString(),
    longestStreak: 14,
    nextReward: {
      day: 2,
      amount: 10,
      currency: 'VES',
      title: '+10',
      subtitle: '10 VES',
      assetType: 'coin'
    }
  },
  rewards: DEFAULT_STREAK_REWARDS.map(r => ({
    ...r,
    status: r.day === 1 ? 'CLAIMED' : r.day === 2 ? 'TODAY' : 'LOCKED',
    nextClaimAt: null
  }))
};

export function StreakProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [streakData, setStreakData] = useState(initialStreakData);
  const [wallet, setWallet] = useState({ 
    vesBalance: 100, 
    giftCardBalance: 0, 
    totalPoints: 100,
    longestStreak: 14,
    rank: 18,
    level: 3,
    levelProgress: 72
  });
  const [activeTab, setActiveTab] = useState('streak'); // 'dashboard' | 'streak' | 'wallet' | 'leaderboard' | 'tasks'
  const [cpaModalOpen, setCpaModalOpen] = useState(false);
  const [cpaTargetDay, setCpaTargetDay] = useState(null);
  const [claiming, setClaiming] = useState(false);
  const [claimSuccessModal, setClaimSuccessModal] = useState(null);
  const [antiCheatOpen, setAntiCheatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Authentication State (Registered User vs Guest)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('veloop_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authPendingAction, setAuthPendingAction] = useState(null);
  
  // Real Server-Relative Countdown State (HH:MM:SS)
  const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0, totalSeconds: 0, formatted: '00:00:00' });

  // Register & Login Actions (Directly linked to MongoDB Backend)
  const registerUser = async (userData) => {
    let finalUser = {
      ...userData,
      isRegistered: true,
      registeredAt: new Date().toISOString()
    };

    try {
      const res = await streakApi.register(userData);
      if (res && res.user) {
        finalUser = { ...finalUser, ...res.user };
      }
    } catch (err) {
      console.warn('Backend sync failed, saving locally:', err);
    }

    setCurrentUser(finalUser);
    try {
      localStorage.setItem('veloop_user', JSON.stringify(finalUser));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  };

  const loginUser = async (userData) => {
    let finalUser = {
      ...userData,
      isRegistered: true,
      lastLogin: new Date().toISOString()
    };

    try {
      const res = await streakApi.login(userData);
      if (res && res.user) {
        finalUser = { ...finalUser, ...res.user };
      }
    } catch (err) {
      console.warn('Backend sync failed, saving locally:', err);
    }

    setCurrentUser(finalUser);
    try {
      localStorage.setItem('veloop_user', JSON.stringify(finalUser));
    } catch (e) {
      console.error('Failed to save user', e);
    }
  };

  const logoutUser = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('veloop_user');
    } catch (e) {
      console.error('Failed to remove user', e);
    }
    showToast('👋 You have logged out.', 'info');
  };

  // Helper to ensure user is registered before performing any action
  const requireAuth = (callback) => {
    if (!currentUser) {
      setAuthPendingAction(() => callback);
      setAuthModalOpen(true);
      showToast('👋 Please register or log in first to continue!', 'info');
      return false;
    }
    if (callback) callback();
    return true;
  };

  const executePendingAction = () => {
    if (authPendingAction && typeof authPendingAction === 'function') {
      const act = authPendingAction;
      setAuthPendingAction(null);
      act();
    }
  };

  // Load streak state from API / server
  const refreshStreak = useCallback(async () => {
    try {
      const data = await streakApi.getStreak();
      if (data && data.success) {
        setStreakData(data);
        if (data.user) {
          setWallet({
            vesBalance: data.user.vesBalance ?? 100,
            giftCardBalance: data.user.giftCardBalance ?? 0,
            totalPoints: data.user.totalPoints ?? 100,
            longestStreak: data.user.longestStreak ?? 14,
            rank: data.user.rank ?? 18,
            level: data.user.level ?? 3,
            levelProgress: data.user.levelProgress ?? 72
          });
        }
      }
    } catch (err) {
      console.error('Error fetching streak data', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStreak();
  }, [refreshStreak]);

  // Real-time server-relative countdown timer (Specs #10, #46, #47)
  useEffect(() => {
    if (!streakData || !streakData.streak?.nextClaimAt) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(streakData.streak.nextClaimAt).getTime();
      const diff = Math.max(0, Math.floor((target - now) / 1000));

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      const formatted = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;

      setCountdown({
        hours: h,
        minutes: m,
        seconds: s,
        totalSeconds: diff,
        formatted
      });

      // When countdown reaches 0, fetch fresh state from server (Specs #48)
      if (diff === 0 && streakData.streak.status === 'LOCKED') {
        refreshStreak();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [streakData, refreshStreak]);

  const showToast = (msg, type = 'info') => {
    setToastMessage({ msg, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Start claim flow -> Guarded by Auth & Shows CPA Ad Demo State (Specs #7, #68, #91)
  const initiateClaim = (dayNum) => {
    if (claiming) return; // Double-click protection (Specs #41)
    requireAuth(() => {
      setCpaTargetDay(dayNum);
      setCpaModalOpen(true);
    });
  };

  // Callback once CPA ad verification completes
  const handleCpaComplete = async () => {
    setCpaModalOpen(false);
    setClaiming(true);

    try {
      const response = await streakApi.claimStreak({ day: cpaTargetDay });

      if (response.success) {
        // Confetti celebration
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#76ff03', '#58cc02', '#ffd700', '#ffffff']
        });

        setClaimSuccessModal({
          reward: response.reward,
          transaction: response.transaction,
          day: cpaTargetDay
        });

        // Always refresh state directly from backend (Specs #6, #93)
        await refreshStreak();
        showToast(`🎉 Reward Claimed: +${response.reward.amount} ${response.reward.currency}!`, 'success');
      } else {
        showToast(response.error || 'Claim failed.', 'danger');
      }
    } catch {
      showToast('Network error processing claim.', 'danger');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <StreakContext.Provider
      value={{
        loading,
        streakData,
        wallet,
        activeTab,
        setActiveTab,
        countdown,
        cpaModalOpen,
        setCpaModalOpen,
        initiateClaim,
        handleCpaComplete,
        claiming,
        claimSuccessModal,
        setClaimSuccessModal,
        antiCheatOpen,
        setAntiCheatOpen,
        refreshStreak,
        showToast,
        toastMessage,
        currentUser,
        authModalOpen,
        setAuthModalOpen,
        registerUser,
        loginUser,
        logoutUser,
        requireAuth,
        authPendingAction,
        executePendingAction
      }}
    >
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const context = useContext(StreakContext);
  if (!context) throw new Error('useStreak must be used within StreakProvider');
  return context;
}

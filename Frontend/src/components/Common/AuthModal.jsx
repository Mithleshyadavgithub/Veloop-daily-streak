import React, { useState } from 'react';
import styles from './AuthModal.module.css';
import { 
  X, Sparkles, Flame, User, Mail, Lock, CheckCircle2, 
  ArrowRight, ShieldCheck, Zap, Gift, LogIn, UserPlus 
} from 'lucide-react';
import { useStreak } from '../../context/StreakContext';
import confetti from 'canvas-confetti';

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, currentUser, loginUser, registerUser, showToast, authPendingAction, executePendingAction } = useStreak();
  const [tab, setTab] = useState('register'); // 'register' | 'login'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleClose = () => {
    setAuthModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      showToast('Please enter your email and password.', 'danger');
      return;
    }

    if (tab === 'register' && !name.trim()) {
      showToast('Please enter your full name to register.', 'danger');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const userData = {
        name: tab === 'register' ? name.trim() : (email.split('@')[0] || 'Student Explorer'),
        email: email.trim(),
        userId: 'USER_' + Math.floor(1000 + Math.random() * 9000),
        isRegistered: true,
        registeredAt: new Date().toISOString()
      };

      if (tab === 'register') {
        registerUser(userData);
        showToast(`🎉 Welcome ${userData.name}! Your account is registered.`, 'success');
      } else {
        loginUser(userData);
        showToast(`👋 Welcome back, ${userData.name}!`, 'success');
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff9100', '#ffd700', '#8b5cf6', '#10b981']
      });

      setLoading(false);
      setAuthModalOpen(false);

      if (authPendingAction) {
        executePendingAction();
      }
    }, 500);
  };

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        
        {/* Top Header */}
        <div className={styles.modalHeader}>
          <div className="d-flex align-items-center gap-3">
            <div className={styles.flameIconBox}>
              <Flame size={24} color="#ffffff" className={styles.flameSpin} />
            </div>
            <div>
              <div className="d-flex align-items-center gap-2">
                <span className={styles.authBadge}>VELOOP REWARDS</span>
                <span className={styles.freeBadge}>100% FREE</span>
              </div>
              <h3 className={styles.modalTitle}>
                {tab === 'register' ? 'Create Free Student Account' : 'Welcome Back to VELoop'}
              </h3>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={handleClose} title="Close">
            <X size={18} />
          </button>
        </div>

        {/* Motivational Prompt Banner */}
        <div className={styles.promptBanner}>
          <Sparkles size={18} color="#ffd700" className="flex-shrink-0" />
          <span>
            {tab === 'register' 
              ? 'Register now to save your daily streak, earn free coins & unlock real Amazon Gift Cards!'
              : 'Log in to continue your active streak and collect today\'s rewards!'}
          </span>
        </div>

        {/* Tab Switcher */}
        <div className={styles.tabSwitcher}>
          <button 
            type="button" 
            className={`${styles.tabBtn} ${tab === 'register' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('register')}
          >
            <UserPlus size={16} />
            <span>New User (Register)</span>
          </button>
          <button 
            type="button" 
            className={`${styles.tabBtn} ${tab === 'login' ? styles.tabBtnActive : ''}`}
            onClick={() => setTab('login')}
          >
            <LogIn size={16} />
            <span>Existing User (Login)</span>
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {tab === 'register' && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Full Name</label>
              <div className={styles.inputWrapper}>
                <User size={16} className={styles.inputIcon} />
                <input 
                  type="text" 
                  className={styles.formInput} 
                  placeholder="e.g. Alex Johnson"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={tab === 'register'}
                />
              </div>
            </div>
          )}

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={16} className={styles.inputIcon} />
              <input 
                type="email" 
                className={styles.formInput} 
                placeholder="e.g. alex@student.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={16} className={styles.inputIcon} />
              <input 
                type="password" 
                className={styles.formInput} 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Primary Submit Button */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <Zap size={18} />
            <span>
              {loading 
                ? 'Processing...' 
                : tab === 'register' 
                  ? '⚡ Register & Start Claiming' 
                  : '🔓 Log In to Account'}
            </span>
          </button>
        </form>

        {/* Benefits Footer */}
        <div className={styles.modalFooter}>
          <div className={styles.perkTag}>
            <CheckCircle2 size={13} color="#10b981" />
            <span>Free 100 Coins on Register</span>
          </div>
          <div className={styles.perkTag}>
            <ShieldCheck size={13} color="#06b6d4" />
            <span>Safe &amp; Anti-Cheat Protected</span>
          </div>
          <div className={styles.perkTag}>
            <Gift size={13} color="#ff9100" />
            <span>Day 7 Amazon Voucher</span>
          </div>
        </div>

      </div>
    </div>
  );
}

import React from 'react';

export const CrownIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF176" />
        <stop offset="40%" stopColor="#FFD700" />
        <stop offset="80%" stopColor="#FF9800" />
        <stop offset="100%" stopColor="#F57C00" />
      </linearGradient>
      <linearGradient id="gemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#E040FB" />
        <stop offset="100%" stopColor="#7C4DFF" />
      </linearGradient>
      <filter id="crownGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Base Crown Shape */}
    <path 
      d="M8 48L14 20L26 34L32 14L38 34L50 20L56 48H8Z" 
      fill="url(#crownGrad)" 
      filter="url(#crownGlow)"
      stroke="#FFE082" 
      strokeWidth="2" 
      strokeLinejoin="round" 
    />
    {/* Crown Base Band */}
    <rect x="8" y="46" width="48" height="8" rx="3" fill="url(#crownGrad)" stroke="#FFB300" strokeWidth="1.5" />
    {/* Embedded Jewels */}
    <circle cx="14" cy="20" r="3.5" fill="#FFFFFF" stroke="#FFD700" strokeWidth="1.5" />
    <circle cx="32" cy="14" r="4.5" fill="#FFFFFF" stroke="#FFD700" strokeWidth="1.5" />
    <circle cx="50" cy="20" r="3.5" fill="#FFFFFF" stroke="#FFD700" strokeWidth="1.5" />
    <circle cx="20" cy="50" r="2.5" fill="url(#gemGrad)" />
    <circle cx="32" cy="50" r="3" fill="#00E5FF" />
    <circle cx="44" cy="50" r="2.5" fill="url(#gemGrad)" />
    {/* Shimmer Highlight */}
    <path d="M12 46L18 26L24 35" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const CoinStackIcon = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="coinGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF59D" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFA000" />
      </linearGradient>
      <linearGradient id="coinGradSide" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFB300" />
        <stop offset="100%" stopColor="#E65100" />
      </linearGradient>
      <filter id="coinGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Coin 1 Bottom */}
    <ellipse cx="32" cy="46" rx="22" ry="7" fill="url(#coinGradSide)" />
    <ellipse cx="32" cy="43" rx="22" ry="7" fill="url(#coinGradTop)" stroke="#FFF9C4" strokeWidth="1" />
    {/* Coin 2 Middle */}
    <ellipse cx="32" cy="36" rx="22" ry="7" fill="url(#coinGradSide)" />
    <ellipse cx="32" cy="33" rx="22" ry="7" fill="url(#coinGradTop)" stroke="#FFF9C4" strokeWidth="1" />
    {/* Coin 3 Top */}
    <ellipse cx="32" cy="26" rx="22" ry="7" fill="url(#coinGradSide)" />
    <ellipse cx="32" cy="23" rx="22" ry="7" fill="url(#coinGradTop)" stroke="#FFF9C4" strokeWidth="1.5" filter="url(#coinGlow)" />
    {/* Inner ring on top coin */}
    <ellipse cx="32" cy="23" rx="16" ry="5" fill="none" stroke="#FFA000" strokeWidth="1.5" strokeDasharray="2 2" />
    <text x="32" y="26" fill="#794B02" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">VR</text>
  </svg>
);

export const AmazonGiftCardIcon = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#2A1B4E" />
        <stop offset="50%" stopColor="#1C1035" />
        <stop offset="100%" stopColor="#100720" />
      </linearGradient>
      <linearGradient id="amazonSmile" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF9900" />
        <stop offset="100%" stopColor="#FFB84D" />
      </linearGradient>
    </defs>
    {/* Card Body */}
    <rect x="6" y="14" width="52" height="36" rx="6" fill="url(#cardGrad)" stroke="#7C4DFF" strokeWidth="1.5" />
    <rect x="6" y="20" width="52" height="6" fill="#3D2968" opacity="0.6" />
    {/* Amazon 'a' Logo */}
    <text x="32" y="34" fill="#FFFFFF" fontSize="18" fontWeight="bold" fontFamily="sans-serif" textAnchor="middle">a</text>
    {/* Amazon Smile Curve */}
    <path d="M22 38 Q 32 44 42 38" stroke="url(#amazonSmile)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    <polygon points="41,36 44,38 41,41" fill="#FF9900" />
    {/* Chip / Accent */}
    <rect x="10" y="28" width="6" height="5" rx="1" fill="#FFD700" opacity="0.8" />
  </svg>
);

export const GiftBoxIcon = ({ size = 48, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="boxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#8A2BE2" />
        <stop offset="100%" stopColor="#4A0E80" />
      </linearGradient>
      <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FF9100" />
      </linearGradient>
    </defs>
    {/* Box Body */}
    <rect x="12" y="24" width="40" height="30" rx="4" fill="url(#boxGrad)" stroke="#B388FF" strokeWidth="1.5" />
    {/* Lid */}
    <rect x="9" y="18" width="46" height="8" rx="2" fill="url(#boxGrad)" stroke="#B388FF" strokeWidth="1.5" />
    {/* Vertical Ribbon */}
    <rect x="28" y="18" width="8" height="36" fill="url(#ribbonGrad)" />
    {/* Horizontal Ribbon */}
    <rect x="9" y="20" width="46" height="4" fill="url(#ribbonGrad)" opacity="0.5" />
    {/* Ribbon Bow */}
    <circle cx="28" cy="14" r="5" fill="none" stroke="url(#ribbonGrad)" strokeWidth="3" />
    <circle cx="36" cy="14" r="5" fill="none" stroke="url(#ribbonGrad)" strokeWidth="3" />
    <circle cx="32" cy="16" r="3" fill="#FFD700" />
  </svg>
);

export const SparkleStar = ({ size = 16, color = "#FFD700" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export const CalendarHeroIcon = ({ size = 64, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="calGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7C4DFF" />
        <stop offset="100%" stopColor="#3F1D8C" />
      </linearGradient>
      <linearGradient id="calHeader" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF9100" />
        <stop offset="100%" stopColor="#FF3D00" />
      </linearGradient>
    </defs>
    {/* Calendar Body */}
    <rect x="8" y="14" width="48" height="42" rx="10" fill="url(#calGrad)" stroke="#B388FF" strokeWidth="2" />
    {/* Header Strip */}
    <rect x="8" y="14" width="48" height="12" rx="8" fill="url(#calHeader)" />
    {/* Binder Rings */}
    <rect x="18" y="8" width="4" height="10" rx="2" fill="#FFE082" stroke="#FFA000" strokeWidth="1" />
    <rect x="42" y="8" width="4" height="10" rx="2" fill="#FFE082" stroke="#FFA000" strokeWidth="1" />
    {/* Glowing Checkmark */}
    <path d="M22 36L28 42L42 28" stroke="#76FF03" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Coin Badge in Corner */}
    <circle cx="46" cy="46" r="8" fill="#FFD700" stroke="#FF9800" strokeWidth="1.5" />
    <text x="46" y="50" fill="#794B02" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">v3</text>
  </svg>
);


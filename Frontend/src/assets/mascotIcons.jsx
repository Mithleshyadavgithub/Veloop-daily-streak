import React from 'react';

// Cool 3D Green Flame Mascot with Sunglasses (Central Screen 2)
export const MascotFlameHero = ({ size = 120, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="mascotBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#99FF33" />
        <stop offset="40%" stopColor="#58CC02" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
      <linearGradient id="flameBackGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#CCFF00" />
        <stop offset="60%" stopColor="#76FF03" />
        <stop offset="100%" stopColor="#388E3C" />
      </linearGradient>
      <linearGradient id="shadesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#2A2A2A" />
        <stop offset="100%" stopColor="#0B0B0B" />
      </linearGradient>
      <filter id="greenGlow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>

    {/* Ambient Glow */}
    <circle cx="60" cy="60" r="48" fill="#58CC02" opacity="0.3" filter="url(#greenGlow)" />

    {/* Spiky Flame Hair */}
    <path 
      d="M60 8C60 8 78 24 74 42C80 32 90 38 88 50C97 46 100 58 94 70C102 86 86 108 60 108C34 108 18 86 26 70C20 58 23 46 32 50C30 38 40 32 46 42C42 24 60 8 60 8Z" 
      fill="url(#flameBackGrad)" 
      stroke="#B2FF59" 
      strokeWidth="3" 
    />

    {/* Main Round Body */}
    <ellipse cx="60" cy="74" rx="30" ry="26" fill="url(#mascotBodyGrad)" stroke="#AEEA00" strokeWidth="2" />

    {/* Cool Dark Sunglasses */}
    <path 
      d="M34 62C34 58 39 56 47 56H56C58 56 60 58 60 60C60 58 62 56 64 56H73C81 56 86 58 86 62V69C86 76 79 81 72 81H65C62 81 60 79 60 76C60 79 58 81 55 81H48C41 81 34 76 34 69V62Z" 
      fill="url(#shadesGrad)" 
      stroke="#FFFFFF" 
      strokeWidth="2" 
    />
    {/* Sunglasses Lens Reflections */}
    <line x1="41" y1="60" x2="48" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
    <line x1="72" y1="60" x2="79" y2="78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.75" />

    {/* Beak / Mouth */}
    <path d="M54 82L60 90L66 82Z" fill="#FF9100" stroke="#FFE082" strokeWidth="1.5" />

    {/* Cheerful Blush Circles */}
    <circle cx="36" cy="78" r="4.5" fill="#FF5252" opacity="0.75" />
    <circle cx="84" cy="78" r="4.5" fill="#FF5252" opacity="0.75" />
  </svg>
);

// Monthly Quest Mascot with Headphones & Microphone (Screen 1 Reference)
export const QuestSingerMascot = ({ size = 70, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className}>
    <defs>
      <linearGradient id="turbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#76FF03" />
        <stop offset="100%" stopColor="#2E7D32" />
      </linearGradient>
    </defs>
    {/* Head & Hat */}
    <circle cx="40" cy="42" r="26" fill="#8D6E63" stroke="#FFCC80" strokeWidth="2" />
    {/* Green Cap/Turban */}
    <ellipse cx="40" cy="24" rx="24" ry="16" fill="url(#turbanGrad)" stroke="#AEEA00" strokeWidth="2" />
    <circle cx="40" cy="18" r="4" fill="#FFD700" />
    {/* Face Eyes */}
    <circle cx="32" cy="40" r="3.5" fill="#000000" />
    <circle cx="48" cy="40" r="3.5" fill="#000000" />
    <circle cx="33" cy="39" r="1.2" fill="#FFFFFF" />
    <circle cx="49" cy="39" r="1.2" fill="#FFFFFF" />
    {/* Big Smile & Beard */}
    <path d="M33 48Q40 56 47 48" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M30 46Q40 60 50 46" stroke="#2E7D32" strokeWidth="2.5" fill="#1B5E20" />
    {/* Singing Mic */}
    <rect x="52" y="44" width="10" height="18" rx="5" fill="#424242" stroke="#BDBDBD" strokeWidth="1.5" />
    <rect x="55" y="62" width="4" height="12" fill="#212121" />
    {/* Musical Notes */}
    <text x="64" y="24" fill="#76FF03" fontSize="16" fontWeight="bold">♪</text>
    <text x="14" y="30" fill="#FFD700" fontSize="14" fontWeight="bold">♫</text>
  </svg>
);

// Friends Quest Podium with 3D Mascot and 2 Friends (Screen 1 Reference)
export const FriendsPodiumScene = ({ size = 160 }) => (
  <svg width={size * 1.6} height={size} viewBox="0 0 240 150" fill="none">
    {/* Podium Platform */}
    <rect x="70" y="86" width="100" height="40" rx="10" fill="#37474F" stroke="#78909C" strokeWidth="2.5" />
    {/* Caution stripes */}
    <line x1="82" y1="88" x2="94" y2="124" stroke="#FFD600" strokeWidth="4" />
    <line x1="110" y1="88" x2="122" y2="124" stroke="#FFD600" strokeWidth="4" />
    <line x1="138" y1="88" x2="150" y2="124" stroke="#FFD600" strokeWidth="4" />

    {/* Left Friend (Brown Hair Girl) */}
    <circle cx="44" cy="74" r="24" fill="#8D6E63" stroke="#D7CCC8" strokeWidth="2" />
    <circle cx="44" cy="78" r="18" fill="#FFCCBC" />
    {/* Hair bangs */}
    <path d="M26 68Q44 54 62 68" fill="#5D4037" />
    <circle cx="38" cy="78" r="2.5" fill="#3E2723" />
    <circle cx="50" cy="78" r="2.5" fill="#3E2723" />
    <path d="M40 86Q44 90 48 86" stroke="#D84315" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Purple Shirt */}
    <path d="M24 102C24 96 34 94 44 94C54 94 64 96 64 102V130H24V102Z" fill="#7E57C2" />

    {/* Right Friend (Pink Hair Girl) */}
    <circle cx="196" cy="74" r="24" fill="#EC407A" stroke="#F8BBD0" strokeWidth="2" />
    <circle cx="196" cy="78" r="18" fill="#FFE0B2" />
    {/* Hair bangs */}
    <path d="M178 68Q196 54 214 68" fill="#C2185B" />
    <circle cx="190" cy="78" r="2.5" fill="#3E2723" />
    <circle cx="202" cy="78" r="2.5" fill="#3E2723" />
    <path d="M192 86Q196 90 200 86" stroke="#D84315" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Red Shirt */}
    <path d="M176 102C176 96 186 94 196 94C206 94 216 96 216 102V130H176V102Z" fill="#E53935" />

    {/* Center Green Dragon / Mascot on Podium */}
    <ellipse cx="120" cy="74" rx="26" ry="22" fill="#58CC02" stroke="#AEEA00" strokeWidth="2.5" />
    {/* Cute dragon ears / fins */}
    <polygon points="100,54 108,66 98,68" fill="#76FF03" />
    <polygon points="140,54 132,66 142,68" fill="#76FF03" />
    {/* Eyes */}
    <circle cx="112" cy="72" r="3.5" fill="#000000" />
    <circle cx="128" cy="72" r="3.5" fill="#000000" />
    <circle cx="113" cy="70" r="1.2" fill="#FFFFFF" />
    <circle cx="129" cy="70" r="1.2" fill="#FFFFFF" />
    {/* Happy Smile */}
    <path d="M115 78Q120 84 125 78" stroke="#1B5E20" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Blush */}
    <circle cx="106" cy="77" r="3" fill="#FF5252" opacity="0.6" />
    <circle cx="134" cy="77" r="3" fill="#FF5252" opacity="0.6" />
  </svg>
);

// 2026 Year In Review Mascot (Screen 3 Reference)
export const MascotYearReview = ({ size = 110 }) => (
  <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
    <defs>
      <linearGradient id="yearMascotGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#76FF03" />
        <stop offset="100%" stopColor="#33691E" />
      </linearGradient>
      <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    {/* Stars in background */}
    <polygon points="20,24 22,30 28,32 22,34 20,40 18,34 12,32 18,30" fill="#FFD700" filter="url(#starGlow)" />
    <polygon points="98,18 100,22 104,23 100,25 98,29 96,25 92,23 96,22" fill="#FFD700" filter="url(#starGlow)" />
    <polygon points="102,68 104,72 108,73 104,75 102,79 100,75 96,73 100,72" fill="#76FF03" />

    {/* Mascot Face Head */}
    <ellipse cx="60" cy="46" rx="30" ry="26" fill="url(#yearMascotGrad)" stroke="#AEEA00" strokeWidth="2.5" />
    {/* Ears */}
    <polygon points="38,24 46,38 34,40" fill="#76FF03" />
    <polygon points="82,24 74,38 86,40" fill="#76FF03" />
    {/* Big Happy Anime Eyes */}
    <ellipse cx="50" cy="44" rx="4.5" ry="6" fill="#000000" />
    <ellipse cx="70" cy="44" rx="4.5" ry="6" fill="#000000" />
    <circle cx="51" cy="42" r="2" fill="#FFFFFF" />
    <circle cx="71" cy="42" r="2" fill="#FFFFFF" />
    {/* Open Joyful Mouth */}
    <path d="M53 54Q60 62 67 54" stroke="#1B5E20" strokeWidth="2" fill="#D32F2F" />
    {/* Cheek Blush */}
    <ellipse cx="42" cy="52" rx="4" ry="2.5" fill="#FF5252" opacity="0.8" />
    <ellipse cx="78" cy="52" rx="4" ry="2.5" fill="#FF5252" opacity="0.8" />

    {/* Big Shiny 3D "2026" Badge */}
    <rect x="18" y="74" width="84" height="34" rx="17" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2" filter="url(#starGlow)" />
    <text x="60" y="98" fill="#1B5E20" fontSize="22" fontWeight="900" fontFamily="'Nunito', sans-serif" textAnchor="middle">2026</text>
  </svg>
);

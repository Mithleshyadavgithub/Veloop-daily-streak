# 🏆 VELoop Rewards — Daily Streak & Rewards System (Full-Stack MERN)

A production-grade, authoritative **Daily Streak & Rewards System** built for **VELoop Rewards**, engineered to meet all 122 checklist specifications from the Full-Stack MERN Internship document.

---

## 🌟 Architecture & Core Principles

```
AUTHENTICATED USER (React 19 + Bootstrap + CSS Modules)
       │
       ▼
EXPRESS.JS REST API (Port 5001)
       │
       ▼
AUTHORITATIVE MONGODB LEDGER
 ┌──────────────┼──────────────┐
 ▼              ▼              ▼
Streak State  Rewards Config  Wallet & Transaction Ledger
 │              │              │
 └──────────────┼──────────────┘
       │
       ▼
SERVER VALIDATION ➔ CPA AD DEMO ➔ ATOMIC CREDIT ➔ AUDIT LOG ➔ 24H COUNTDOWN
```

### 🔒 100% Backend Authority
* **No Client Trust**: Client cannot change streak, jump days, or alter reward values.
* **Server Time Control**: Real-time server timestamps (`serverTime`, `nextClaimAt`) prevent device clock cheating.
* **Idempotent & Race-Condition Safe**: Unique MongoDB compound index (`userId + cycleId + day`) guarantees that concurrent requests or double-clicks never grant duplicate rewards.
* **Missed Day Detection**: Genuinely missed days (>48 hours) trigger a server-side streak reset to Day 1.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### 2. Backend Setup
```bash
cd Backend
npm install
npm run seed     # Seeds 7-day reward configuration & initial test data
npm start        # Starts server on http://localhost:5001
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev      # Starts Vite client on http://localhost:5173
```

---

## 📁 Repository Structure

```
veloop-daily-streak/
├── Backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection (db.js)
│   │   ├── controllers/     # Streak, Wallet, Auth, Testing controllers
│   │   ├── middleware/      # JWT auth, rate limiter, error handler
│   │   ├── models/          # User, StreakConfig, StreakReward, StreakClaim, Wallet, AuditLog
│   │   ├── routes/          # Express API route declarations
│   │   ├── seed/            # 7-day database seeder script
│   │   ├── services/        # Authoritative streak, wallet, and audit services
│   │   └── server.js        # Main Express server entry point
│   ├── .env.example
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── assets/          # Custom SVG illustrations (Crown, Coins, Gift Card, Mascots)
│   │   ├── components/      # CPA Ad modal, Claim celebration modal, Anti-cheat drawer
│   │   ├── context/         # StreakContext state management
│   │   ├── pages/           # Gamified Duolingo Hub, Wallet Ledger, Leaderboard
│   │   ├── services/        # Centralized streakApi.js service
│   │   ├── App.jsx
│   │   └── index.css        # Velvet-purple & amber design tokens
│   └── package.json
│
├── docs/
│   ├── API_DOCUMENTATION.md # Full REST endpoint specifications
│   ├── DATABASE.md          # Schema designs and MongoDB indexes
│   ├── SECURITY.md          # Anti-cheat architecture and attack prevention
│   └── TESTING.md           # Evaluation test suite guide
│
├── postman/
│   └── veloop_rewards.postman_collection.json
│
└── README.md
```

---

## 🧪 Anti-Cheat Evaluation Suite

Click the **Shield Icon (🛡️)** in the application navbar to run live tests:

1. **⏱️ Advance Server Time (+24h)**: Tests server-side unlock of Day 2 / Day 3 without device clock dependence.
2. **⚡ Concurrent Request Attack**: Simulates simultaneous double claims to test MongoDB idempotent constraints.
3. **🛡️ Fake Reward Injection Attack**: Proves that client payloads (e.g. `1,000,000 VES`) are completely ignored.
4. **🔒 Day Skipping Exploit**: Proves that jumping directly to Day 7 is rejected with `INVALID_DAY`.
5. **🔄 Reset Streak**: Resets to Day 1 for a fresh evaluation demonstration.

---

## 📑 Specification Checklist Coverage (122 Items)

| Category | Coverage | Key Details |
|---|---|---|
| **Architecture** | 100% | Full-stack MERN with Node.js, Express, MongoDB, React 19, Bootstrap & CSS Modules. |
| **Streak Logic** | 100% | 7-day cycle, server-calculated day states, missed-day reset (>48h), 24h countdown. |
| **Security** | 100% | Rate limiting, JWT authentication, anti-cheat validation, idempotent compound indexes. |
| **UI & Assets** | 100% | Exact Velvet-Purple & Amber color theme, 3D Gold Crown, Amazon Gift Card, Coin Stacks, Mascot animations. |
| **Responsive** | 100% | Fluid layout tested across Mobile (320px–480px), Tablet (768px–1024px), and Desktop (1024px–1920px+). |
| **Deliverables** | 100% | Complete documentation (`API`, `DATABASE`, `SECURITY`, `TESTING`), Postman Collection, and DB seeders. |

---

## 👨‍💻 Founder & Project Lead

* **Founder & Full-Stack Developer**: **Mithlesh Kumar**
* **Live Portfolio**: [portfolio-three-green-51.vercel.app](https://portfolio-three-green-51.vercel.app)
* **LinkedIn**: [linkedin.com/in/mithlesh-kumar-4ab73929a](https://www.linkedin.com/in/mithlesh-kumar-4ab73929a)
* **GitHub**: [github.com/Mithleshyadavgithub](https://github.com/Mithleshyadavgithub/Mithleshyadavgithub)
* **Email**: `my2387569@gmail.com`
* **Collaboration**: Open to building custom full-stack web applications, interactive gamified dashboards, and high-performance websites.



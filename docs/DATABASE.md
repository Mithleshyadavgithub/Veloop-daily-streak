# 🗄️ Database Architecture & Schemas

## 1. Overview
The database layer is built on **MongoDB** with **Mongoose ODM**, engineered for high write throughput, transactional consistency, and idempotent operations.

---

## 2. Collections & Schemas

### 2.1 `User`
```javascript
{
  userId: { type: String, required: true, unique: true, index: true },
  name: { type: String, default: 'Explorer' },
  rank: { type: Number, default: 18 },
  level: { type: Number, default: 5 },
  levelProgress: { type: Number, default: 72 },
  longestStreak: { type: Number, default: 14 },
  currentStreak: { type: Number, default: 1 },
  currentCycle: { type: String, default: 'CYCLE_001' },
  lastClaimAt: { type: Date, default: null },
  nextClaimAt: { type: Date, default: () => new Date() },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### 2.2 `StreakReward`
```javascript
{
  day: { type: Number, required: true, unique: true, min: 1, max: 7 },
  rewardType: { type: String, enum: ['VES', 'GIFT_CARD', 'ULTIMATE'], required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  assetType: { type: String, enum: ['coin', 'gift-card', 'gift-box', 'crown'], required: true },
  badge: { type: String, default: null },
  active: { type: Boolean, default: true }
}
```

### 2.3 `StreakClaim` (Authoritative Idempotent Ledger)
```javascript
{
  claimId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  cycleId: { type: String, default: 'CYCLE_001', required: true },
  day: { type: Number, required: true, min: 1, max: 7 },
  rewardAmount: { type: Number, required: true },
  rewardCurrency: { type: String, required: true },
  rewardType: { type: String, required: true },
  transactionId: { type: String, required: true },
  status: { type: String, enum: ['CLAIMED', 'REVOKED'], default: 'CLAIMED' },
  claimedAt: { type: Date, default: Date.now }
}
```
**Compound Unique Index**:
`{ userId: 1, cycleId: 1, day: 1 }` with `{ unique: true }` guarantees that no race condition or concurrent request can ever double-award points for the same streak day.

### 2.4 `Wallet` & `WalletTransaction`
```javascript
// Wallet
{
  userId: { type: String, required: true, unique: true, index: true },
  vesBalance: { type: Number, default: 100, min: 0 },
  giftCardBalance: { type: Number, default: 0, min: 0 },
  totalPoints: { type: Number, default: 100, min: 0 }
}

// WalletTransaction
{
  transactionId: { type: String, required: true, unique: true, index: true },
  userId: { type: String, required: true, index: true },
  currency: { type: String, required: true },
  type: { type: String, enum: ['CREDIT', 'DEBIT'], default: 'CREDIT' },
  amount: { type: Number, required: true },
  source: { type: String, default: 'DAILY_STREAK' },
  referenceId: { type: String, required: true },
  streakDay: { type: Number, default: null },
  balanceBefore: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
  status: { type: String, enum: ['SUCCESS', 'PENDING', 'FAILED'], default: 'SUCCESS' },
  createdAt: { type: Date, default: Date.now }
}
```

### 2.5 `AuditLog`
```javascript
{
  logId: { type: String, required: true, unique: true },
  action: { type: String, required: true },
  userId: { type: String, required: true },
  day: { type: Number, default: null },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
}
```

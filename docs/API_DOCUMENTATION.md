# 📖 VELoop Rewards — API Documentation

Comprehensive REST API documentation for the **VELoop Rewards Daily Streak & Rewards System**.

---

## 1. Authentication
All endpoints support JWT Bearer token authentication via the `Authorization` header:
```http
Authorization: Bearer <JWT_TOKEN>
```
*In local development / demo mode, if no token is passed, requests automatically authenticate as default test user `USER_MEMBER_9921`.*

---

## 2. Daily Streak Endpoints

### 2.1 Get Daily Streak Status
**`GET /api/daily-streak`** or **`GET /api/daily-streak/status`**

Returns authoritative server time, user streak state, cycle stats, and calculated states for all 7 reward days.

#### Response: `200 OK`
```json
{
  "success": true,
  "serverTime": "2026-10-09T00:00:00.000Z",
  "user": {
    "userId": "USER_MEMBER_9921",
    "name": "Explorer",
    "rank": 18,
    "level": 5,
    "levelProgress": 72,
    "longestStreak": 14,
    "vesBalance": 100,
    "giftCardBalance": 0,
    "totalPoints": 100
  },
  "streak": {
    "currentStreak": 1,
    "currentDay": 2,
    "checkedIn": 1,
    "totalRewards": 7,
    "status": "ACTIVE",
    "nextClaimAt": "2026-10-09T00:00:00.000Z",
    "longestStreak": 14
  },
  "rewards": [
    {
      "day": 1,
      "rewardType": "VES",
      "currency": "VES",
      "amount": 5,
      "title": "+5",
      "subtitle": "5 VES",
      "assetType": "coin",
      "badge": null,
      "status": "CLAIMED",
      "nextClaimAt": null
    },
    {
      "day": 2,
      "rewardType": "VES",
      "currency": "VES",
      "amount": 10,
      "title": "+10",
      "subtitle": "10 VES",
      "assetType": "coin",
      "badge": "Today",
      "status": "TODAY",
      "nextClaimAt": null
    },
    {
      "day": 7,
      "rewardType": "ULTIMATE",
      "currency": "INR",
      "amount": 5,
      "title": "₹5",
      "subtitle": "Amazon Gift Card",
      "assetType": "crown",
      "badge": "VIP",
      "status": "LOCKED",
      "nextClaimAt": null
    }
  ]
}
```

---

### 2.2 Claim Daily Streak Reward
**`POST /api/daily-streak/claim`**

Claims the eligible daily reward with server-side validation, 24h timer enforcement, sequential checks, wallet ledger updates, and idempotency protection.

#### Request Body (Minimal - Server is Authoritative):
```json
{
  "day": 2
}
```

#### Response: `200 OK`
```json
{
  "success": true,
  "day": 2,
  "reward": {
    "day": 2,
    "rewardType": "VES",
    "currency": "VES",
    "amount": 10,
    "title": "+10",
    "subtitle": "10 VES",
    "assetType": "coin",
    "badge": "Today"
  },
  "transaction": {
    "transactionId": "TX_1791487136556_JY21J",
    "userId": "USER_MEMBER_9921",
    "currency": "VES",
    "type": "CREDIT",
    "amount": 10,
    "source": "DAILY_STREAK",
    "referenceId": "TX_STREAK_D2_1791487136556",
    "streakDay": 2,
    "balanceBefore": 105,
    "balanceAfter": 115,
    "status": "SUCCESS",
    "createdAt": "2026-10-09T00:00:00.000Z"
  },
  "updatedStreak": 2,
  "nextClaimAt": "2026-10-10T00:00:00.000Z",
  "wallet": {
    "userId": "USER_MEMBER_9921",
    "vesBalance": 115,
    "giftCardBalance": 0,
    "totalPoints": 115
  }
}
```

#### Error Responses:
* `400 Bad Request` — `{"success": false, "error": "Invalid streak day. You are currently on Day 2.", "errorCode": "INVALID_DAY"}`
* `400 Bad Request` — `{"success": false, "error": "Your next streak reward is still locked. Please wait for the countdown timer.", "errorCode": "STILL_LOCKED"}`
* `400 Bad Request` — `{"success": false, "error": "This streak reward has already been claimed.", "errorCode": "ALREADY_CLAIMED"}`

---

## 3. Wallet Endpoints

### 3.1 Get Wallet & Transaction Ledger
**`GET /api/wallet`**

#### Response: `200 OK`
```json
{
  "success": true,
  "wallet": {
    "userId": "USER_MEMBER_9921",
    "vesBalance": 115,
    "giftCardBalance": 0,
    "totalPoints": 115
  },
  "transactions": [
    {
      "transactionId": "TX_1791487136556_JY21J",
      "currency": "VES",
      "type": "CREDIT",
      "amount": 10,
      "source": "DAILY_STREAK",
      "streakDay": 2,
      "balanceBefore": 105,
      "balanceAfter": 115,
      "status": "SUCCESS",
      "createdAt": "2026-10-09T00:00:00.000Z"
    }
  ]
}
```

---

## 4. Evaluator & Testing Endpoints

### 4.1 Advance Server Time (+24h Time Travel)
**`POST /api/testing/time-travel`**
```json
{ "hours": 24 }
```

### 4.2 Reset Streak to Day 1
**`POST /api/testing/reset`**
```json
{ "userId": "USER_MEMBER_9921" }
```

### 4.3 Get Audit Logs Stream
**`GET /api/testing/audit-logs`**

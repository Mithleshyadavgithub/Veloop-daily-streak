# 🛡️ Security & Anti-Cheat Architecture

## 1. Core Principles (Specs #2, #18, #36, #95)
1. **Frontend is Never the Source of Truth**: All streak states, day progressions, reward amounts, timers, and balances are computed authoritatively on the backend.
2. **Never Trust Client Payloads**: Client-supplied reward values, days, currencies, or streak counts in `POST /claim` are completely ignored. The server retrieves strictly configured values from the database.
3. **Server Time Authority**: Device clock manipulation is rendered ineffective because timers count down to server-provided timestamps (`nextClaimAt`), and the claim validation checks actual server system time.

---

## 2. Attack Vectors & Protections

| Attack Vector | Attacker Action | Backend Protection & Result |
|---|---|---|
| **Timer Manipulation** | User changes PC/Phone clock forward by 24 hours | `POST /claim` checks `getServerTime()`. If unlock timestamp is in future, request is rejected with `STILL_LOCKED`. |
| **Day Skipping** | Malicious request `{"day": 7}` on Day 2 | Server validates sequential progression. Rejected with `INVALID_DAY`. |
| **Fake Reward Injection** | Attacker injects `{"reward": 1000000}` | Server looks up DB reward config for current day. Ignored. Exactly 10 VEs awarded. |
| **Double-Click / Race Condition** | 2 simultaneous `POST /claim` requests dispatched | MongoDB compound unique constraint `{ userId: 1, cycleId: 1, day: 1 }` ensures exactly one write succeeds. Second is rejected. |
| **Cross-User Tampering** | Attacker sends `{"userId": "user_victim"}` | `req.user` identity is derived securely from signed JWT header. Ignored. |
| **Missed Day Reset** | User returns after >48 hours without claiming | Server calculates `hoursSinceLastClaim > 48` and resets streak to Day 1. |

---

## 3. Rate Limiting & Audit Trail
- **Rate Limiter**: Maximum 30 claim attempts per minute per IP via `express-rate-limit`.
- **Immutable Audit Log**: Every claim request, success, rejected exploit attempt, and streak reset is logged with timestamp, user ID, and IP address.

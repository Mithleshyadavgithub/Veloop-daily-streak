# 🧪 Testing & Anti-Cheat Validation Guide

Comprehensive testing instructions covering all **122 Internship Specification checklist items**.

---

## 1. Automated Anti-Cheat Evaluator Suite
The application includes an interactive **Evaluator Drawer** accessible by clicking the **Shield Icon (🛡️)** in the top navigation bar.

### Available Live Test Scenarios:
1. **Simulate Server Time Advance (+24h)**:
   - Advances backend clock by 24 hours.
   - Tests automatic unlocking of Day 2 / Day 3 without manipulating local PC clock.
2. **Concurrent Claim / Double-Click Test**:
   - Dispatches two concurrent `POST /claim` requests at the exact same millisecond.
   - Proves that exactly 1 claim succeeds and 0 duplicate rewards are awarded.
3. **Fake Reward Injection Attack**:
   - Sends payload `{"day": 2, "reward": 1000000, "currency": "VES"}`.
   - Proves backend ignores client payload and awards only the configured 10 VEs.
4. **Skip-to-Day-7 Attack**:
   - Sends `{"day": 7}` while eligible for Day 2.
   - Proves server rejects illegal skipping with `INVALID_DAY`.
5. **Missed Day (>48h) Reset Test**:
   - Advances time by +49 hours.
   - Verifies streak resets to Day 1 with fresh cycle ID.
6. **Reset Streak to Day 1**:
   - Initializes streak and wallet for fresh demonstration.

---

## 2. CLI / Postman Verification

### Normal Claim Flow:
```bash
# 1. Fetch current status
curl -s http://localhost:5001/api/daily-streak

# 2. Claim Day 1
curl -s -X POST http://localhost:5001/api/daily-streak/claim -H "Content-Type: application/json" -d '{"day": 1}'

# 3. Verify duplicate rejected
curl -s -X POST http://localhost:5001/api/daily-streak/claim -H "Content-Type: application/json" -d '{"day": 1}'

# 4. Advance time by 24h
curl -s -X POST http://localhost:5001/api/testing/time-travel -H "Content-Type: application/json" -d '{"hours": 24}'

# 5. Claim Day 2
curl -s -X POST http://localhost:5001/api/daily-streak/claim -H "Content-Type: application/json" -d '{"day": 2}'
```

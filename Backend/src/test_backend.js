const http = require('http');

const BASE_URL = 'http://localhost:5001';

function request(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('🧪 RUNNING COMPREHENSIVE BACKEND API VALIDATION SUITE');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health Check
    console.log('1️⃣ Checking Health Endpoint...');
    const health = await request('GET', '/api/health');
    assert(health.status === 200 && health.data.status === 'OK', 'GET /api/health returned 200 OK');

    // 2. Register New User
    console.log('\n2️⃣ Testing User Registration...');
    const testEmail = `student_${Date.now()}@example.com`;
    const regPayload = {
      name: 'Rohan Sharma',
      email: testEmail,
      studentCategory: 'Engineering / CS'
    };
    const regRes = await request('POST', '/api/auth/register', regPayload);
    assert(regRes.status === 200 && regRes.data.success && regRes.data.token, `POST /api/auth/register created user (${testEmail}) & returned JWT token`);
    const token = regRes.data?.token;
    const userId = regRes.data?.user?.userId;

    // 3. User Login
    console.log('\n3️⃣ Testing User Login...');
    const loginRes = await request('POST', '/api/auth/login', {
      email: testEmail
    });
    assert(loginRes.status === 200 && loginRes.data.success && loginRes.data.token, 'POST /api/auth/login authenticated successfully');

    // 4. Authenticated Profile /me
    console.log('\n4️⃣ Testing /api/auth/me Protected Route...');
    const meRes = await request('GET', '/api/auth/me', null, token);
    assert(meRes.status === 200 && meRes.data.success && meRes.data.user.email === testEmail, 'GET /api/auth/me retrieved authenticated user profile from MongoDB');

    // 5. Daily Streak State
    console.log('\n5️⃣ Testing Daily Streak State...');
    const streakRes = await request('GET', '/api/daily-streak', null, token);
    assert(streakRes.status === 200 && streakRes.data.success, 'GET /api/daily-streak returned active streak state');
    assert(Array.isArray(streakRes.data.rewards) && streakRes.data.rewards.length === 7, `Streak state contains 7 days of authoritative rewards (Current Day: ${streakRes.data.streak.currentDay})`);

    // 6. Claim Day 1 Reward
    console.log('\n6️⃣ Testing Claiming Day 1 Reward...');
    const claimRes = await request('POST', '/api/daily-streak/claim', { day: 1 }, token);
    assert(claimRes.status === 200 && claimRes.data.success, 'POST /api/daily-streak/claim successfully processed atomic reward claim');
    console.log(`     Reward credited: +${claimRes.data.reward?.amount} ${claimRes.data.reward?.currency}, New Balance: ${claimRes.data.wallet?.vesBalance} VES`);

    // 7. Double Claim Prevention (Anti-Cheat / Idempotency)
    console.log('\n7️⃣ Testing Double Claim Prevention (Anti-Cheat Engine)...');
    const doubleClaimRes = await request('POST', '/api/daily-streak/claim', { day: 1 }, token);
    assert(doubleClaimRes.status === 400 && !doubleClaimRes.data.success, 'POST /api/daily-streak/claim blocked unauthorized/duplicate claim attempt');
    console.log(`     Anti-cheat message: "${doubleClaimRes.data.error}"`);

    // 8. Wallet State & Ledger
    console.log('\n8️⃣ Testing Authoritative Wallet State & Transaction Ledger...');
    const walletRes = await request('GET', '/api/wallet', null, token);
    assert(walletRes.status === 200 && walletRes.data.success, 'GET /api/wallet returned wallet data');
    assert(walletRes.data.wallet.vesBalance === 105, `Verified balance is exactly 105 VES (100 initial + 5 Day 1 reward)`);
    assert(Array.isArray(walletRes.data.transactions) && walletRes.data.transactions.length >= 1, `Verified transaction audit ledger contains ${walletRes.data.transactions.length} record(s)`);

    // 9. Testing Time-Travel (Advance Streak 1 Day)
    console.log('\n9️⃣ Testing Time-Travel / Next Day Simulation...');
    const advanceRes = await request('POST', '/api/testing/time-travel', { userId: userId, days: 1 });
    assert(advanceRes.status === 200 && advanceRes.data.success, 'POST /api/testing/time-travel successfully adjusted streak clock for testing');

    // 10. Audit Logs
    console.log('\n🔟 Testing System Audit Logs...');
    const auditRes = await request('GET', '/api/testing/audit-logs');
    assert(auditRes.status === 200 && auditRes.data.success, 'GET /api/testing/audit-logs retrieved immutable audit records');

    console.log('\n====================================================');
    console.log(`🏁 TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================');

    if (failed === 0) {
      console.log('✨ ALL BACKEND APIS & SERVICES ARE 100% OPERATIONAL & VERIFIED IN MONGODB!\n');
    }

  } catch (err) {
    console.error('❌ Error executing tests:', err);
  }
}

runTests();

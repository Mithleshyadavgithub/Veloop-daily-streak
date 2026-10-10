require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const streakRoutes = require('./routes/streak.routes');
const walletRoutes = require('./routes/wallet.routes');
const testingRoutes = require('./routes/testing.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
connectDB();

// Global Middlewares
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, curl, Postman, mobile requests
    if (!origin) return callback(null, true);
    // Allow local development and specified CLIENT_URL
    if (allowedOrigins.includes(origin)) return callback(null, true);
    // Allow all Vercel deployments (*.vercel.app)
    if (origin.endsWith('.vercel.app') || origin.includes('localhost')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// Root & Health Check Endpoints (for Render health monitoring)
app.get('/', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'VELoop Daily Streak Backend API',
    version: '1.0.0',
    documentation: '/api/daily-streak'
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'VELoop Daily Streak Backend',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/daily-streak', streakRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/testing', testingRoutes);
app.use('/api/auth', authRoutes);

// Central Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 VELoop Rewards Backend running on http://localhost:${PORT}`);
});

module.exports = app;

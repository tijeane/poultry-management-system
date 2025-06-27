const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Initialize app
const app = express();

// Connect Database
connectDB();

// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'fallback_dev_secret_only', // Never use in production
  expiresIn: process.env.JWT_EXPIRE || '24h'
};

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  jwt.verify(token, jwtConfig.secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Example login route
app.post('/api/login', (req, res) => {
  // In a real app, you would:
  // 1. Validate credentials against database
  // 2. Then issue token
  const user = { id: 1, role: 'admin' }; // Replace with your user DB lookup
  
  const token = jwt.sign(
    { userId: user.id }, 
    jwtConfig.secret, 
    { expiresIn: jwtConfig.expiresIn }
  );
  
  res.json({ token });
});

// API Routes (protected routes should use authenticateToken)
app.use('/api/lots', authenticateToken, require('./routes/lots'));
app.use('/api/production', authenticateToken, require('./routes/production'));
app.use('/api/feeding', authenticateToken, require('./routes/feeding'));
app.use('/api/sales', authenticateToken, require('./routes/sales'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

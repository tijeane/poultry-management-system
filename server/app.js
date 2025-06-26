const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Initialize app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/lots', require('./routes/lots'));
app.use('/api/production', require('./routes/production'));
app.use('/api/feeding', require('./routes/feeding'));
app.use('/api/sales', require('./routes/sales'));

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
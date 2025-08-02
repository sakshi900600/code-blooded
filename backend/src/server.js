// src/server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./api/routes/authRoutes');
const categoryRoutes = require('./api/routes/categoryRoutes');
const ticketRoutes = require('./api/routes/ticketRoutes'); // Import ticket routes

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('QuickDesk API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/tickets', ticketRoutes); // Use ticket routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
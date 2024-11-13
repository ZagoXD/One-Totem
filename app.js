require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

connectDB();

const app = express();
app.use(express.json());

// Serve static files to public
app.use(express.static(path.join(__dirname, 'public')));

// Configure API routes
app.use('/api', taskRoutes);

module.exports = app;

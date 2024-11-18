//configure MongoDB
require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  console.log("DB_URI from env:", process.env.DB_URI);
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
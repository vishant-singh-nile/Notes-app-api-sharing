const mongoose = require('mongoose');

const connectDB = async (url) => {   
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1); // Exit the app if connection fails
  }
};

module.exports = connectDB;
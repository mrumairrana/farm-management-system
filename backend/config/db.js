const mongoose = require("mongoose");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/farm_builder_db";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout fallback
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn("ℹ️ Server will continue running. Ensure MongoDB service is started or configure MONGO_URI in .env");
  }
};

module.exports = connectDB;

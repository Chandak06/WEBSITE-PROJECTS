const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("MongoDB connected");
  } catch (error) {
    console.log("DB connection error:", error);
  }
};

module.exports = connectDB;

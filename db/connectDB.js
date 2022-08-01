const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.mongoDB_URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = connectDB;

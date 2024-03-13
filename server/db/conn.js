const mongoose = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const uri = process.env.ATLAS_URI;

const connectToServer = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = { connectToServer };


const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("Error connecting to database", error.message);
    });
};

module.exports = connectDB;
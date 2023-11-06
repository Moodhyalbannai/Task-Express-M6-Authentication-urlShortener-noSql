const mongoose = require("mongoose");
const config = require("./config");
require("dotenv").config();

const connectDb = async () => {
  const conn = await mongoose.connect(config.MONGO_URL);
  console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDb;

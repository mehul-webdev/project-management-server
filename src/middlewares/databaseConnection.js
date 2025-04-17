const mongoose = require("mongoose");

async function handleConnectDB() {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    return;
  }
  const url = process.env.mongoDB_url;
  try {
    const connection = await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (connection) {
      console.log("Connected to MongoDB successfully");
    } else {
      throw new Error("Failed to connect to MongoDB");
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = handleConnectDB;

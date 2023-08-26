const express = require("express");
const { default: mongoose } = require("mongoose");
const config = require("config");
const app = express();

const PORT = 5000 || process.env.PORT;

const start = async () => {
  try {
    await mongoose.connect(config.get("mongourl"));
    app.listen(PORT, () => {
      console.log("Server was started");
    });
  } catch (error) {
    console.log(`Error while starting server: ${error.message}`);
  }
};

start();

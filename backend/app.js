const express = require("express");
const { default: mongoose } = require("mongoose");
const config = require("config");
const app = express();
const authrouter = require("./routes/auth.routes");
const userrouter = require("./routes/user.routes");
const cors = require("cors");

const PORT = 5000 || process.env.PORT;

app.use(cors());
app.use(express.json({ extended: true }));
app.use("/api/auth", authrouter);
app.use("/api", userrouter);

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

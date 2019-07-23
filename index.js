const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// ! connection to database

mongoose.connect(process.env.DB_CONNECT, () => {
  console.log("connected to the datase");
});

// ! import Routers
const authRouter = require("./routes/auth");

app.use(express.json());
app.use("/api/user", authRouter);
app.listen(3000, () => {
  console.log("Server is running at 3000");
});

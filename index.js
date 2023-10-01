require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI);

const taskRoutes = require("./routes/task");
app.use(taskRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log("server is working");
});

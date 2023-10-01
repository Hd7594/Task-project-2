const mongoose = require("mongoose");

const Task = mongoose.model("task-two", {
  name: String,
  description: String,
  account: {
    user: String,
    password: String,
    email: String,
    socialsNetworks: Boolean,
  },
  token: String,
  salt: String,
  hash: String,
});
module.exports = Task;

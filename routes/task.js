const express = require("express");
const router = express.Router();

const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const Task = require("../models/Task");

router.post("/task-two/create", async (req, res) => {
  try {
    const { name, description, user, password, email, socialsNetworks } =
      req.body;
    const token = uid2(8);
    const salt = uid2(8);
    const hash = SHA256(password + salt).toString(encBase64);

    const newTask = new Task({
      name: name,
      description: description,
      account: {
        user: user,
        password: password,
        email: email,
        socialsNetworks: socialsNetworks,
      },
      token: token,
      salt: salt,
      hash: hash,
    });
    // console.log(newTask);
    await newTask.save();
    res.status(201).json({ message: "Task successfully created " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/task-two/list", async (req, res) => {
  try {
    /*
    const taskList = await Task.find();
    if (taskList) {
      res.json(taskList);
    } else {
      res.json({ message: "bad request" });
    }
    */
    const taskList = await Task.findById(req.query.id);
    if (!req.query.id) {
      res.json({ message: "missing id" });
    } else {
      res.json(taskList);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/task-two/update", async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.body.id, {
      description: req.body.description,
    });
    if (!req.body.id || !req.body.description) {
      res.json({ message: "missing parameters" });
    } else {
      res.json({ message: "Task updated" });
    }
    await updateTask.save();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/task-two/delete", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body.id);
    if (!req.body.id) {
      res.status(400).json({ message: "missing id" });
    } else {
      res.status(200).json({ message: "task deleted" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

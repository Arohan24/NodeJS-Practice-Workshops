const express = require("express");
const mongoose = require("mongoose");
const UserModel = require("./models/users");
const app = express();
const port = 8080;

app.use(express.json());

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Database connected");
});
mongoose.connection.on("error", (error) => {
  console.log("Database error");
});

// HTTP GET method
app.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.post("/users", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    const extUser = await UserModel.findOne({ username: newUser.username })
    if (extUser) {
      res.send("The User already exist");
    }
    else {
      const savedUser = await newUser.save();
      res.send(savedUser);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// HTTP PUT method
app.put("/users/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const updatedUser = await UserModel.findOneAndUpdate(
      { username },
      req.body
    );
    if (!updatedUser) {
      res.status(404).send("User not found");
    }
    res.send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// HTTP DELETE method
app.delete("/users/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const deletedUser = await UserModel.findOneAndDelete({ username });
    if (!deletedUser) {
      res.status(404).send("User not found");
    } else { res.send(deletedUser); }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// HTTP OPTIONS method
app.options("/users", (req, res) => {
  res.send("Server is ready");
});

app.listen(port, () => {
  console.log("Running on port 8080");
});


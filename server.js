const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./config");
const User = require("./model");
require("dotenv").config();

const app = express();

// Connect to the database
connectDB();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((field) => ({
        field,
        message: error.errors[field].message,
      }));
      res.status(400).json({ message: "Error saving user", errors });
    } else {
      res
        .status(400)
        .send({ message: "Error saving user", error: error.message });
    }
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error fetching users", error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

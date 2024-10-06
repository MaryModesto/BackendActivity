const model = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

exports.getAllUser = (req, res) => {
  const users = model.findAllUser();

  if (!users) {
    return res.status(404).json({ message: "No users found so far..." });
  }

  res.json(users);
};

exports.findOneUser = (req, res) => {
  const user = model.findByID(req.body.id);

  if (!user) {
    return res
      .status(404)
      .json({ message: "No user with this id found so far..." });
  }

  res.json({ id: user.id, username: user.username, email: user.email });
};

exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({
      message: "I'm sorry, but username, email, and password are required...",
    });
  }

  const users = model.findAllUser();
  const newUserId = users.length + 1;

  const newUser = {
    id: newUserId,
    username: username,
    password: password,
    email: email,
  };

  model.addNewUser(newUser);
  res
    .status(201)
    .json({ message: "User registered successfully", user: newUser });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const user = model.findByUsername(username);

  if (!user) {
    return res.status(404).json({ message: "User does not exist..." });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Wrong Password!..." });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: "9h",
  });

  res.status(200).json({
    message: "Congratulations! You have logged in successfully!...",
    token: token,
  });
};

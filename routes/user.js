const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

// GET REQUEST - Get all users
router.get("/", controller.getAllUser);

//GET REQUEST - Find by ID
router.get("/user", controller.findOneUser);

//POST REQUEST - Register new account
router.post("/register", controller.register);

//POST REQUEST - Login to account
router.post("/login", controller.login);

module.exports = router;

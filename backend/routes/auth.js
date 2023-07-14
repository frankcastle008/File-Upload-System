const express = require("express");
const { encryptPassword } = require("../middlewares/middlewares");
const { signup, login } = require("../controllers/controllers");
const auth = express.Router();

auth.post("/signup", encryptPassword, signup);
auth.post("/login", login);
module.exports = auth;

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

app.use(express.json());

const errorMiddleware = (err, req, res, next) => {
  res.json({
    message: "Failed",
    error: err.toString(),
  });
};

const encryptPassword = (req, res, next) => {
  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    console.log(hash);
    req.body.password = hash;
    next();
  });
};

module.exports = {
  errorMiddleware,
  encryptPassword,
};

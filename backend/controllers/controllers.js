const { createUser, getUserByUsername } = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signup = (req, res, next) => {
  const user = req.body;
  let result = createUser(user)
    .then((data) => {
      res.json({
        status: "success",
        message: "user created",
      });
    })
    .catch((err) => {
      next(new Error("User Already Exist"));
    });
};

const login = (req, res, next) => {
  getUserByUsername(req.body.username)
    .then((user) => {
      if (user) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (err, result) {
            if (!result) {
              next(new Error("Please enter correct username or password"));
            } else {
              const token = jwt.sign({ username: req.body.username }, "shhhhh");
              res.json({
                status: "Success",
                token: token,
                id: user.id,
                message: "User Logged In",
              });
            }
          }
        );
      }
    })
    .catch((err) => {
      next(new Error("User Not Found"));
    });
};

module.exports = {
  signup,
  login,
};

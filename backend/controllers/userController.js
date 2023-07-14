const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  // console.log(authorizationToken);
  if (authorizationToken) {
    try {
      var decoded = jwt.verify(authorizationToken, "shhhhh");
      if (decoded) {
        // res.json({
        // status: "Success",
        // message: "Token Verified"
        // })
        next();
      }
    } catch (err) {
      res.status(401).json({
        status: "Failed",
        message: "Token Malformed...",
      });
    }
  } else {
    res.status(401).json({
      status: "Failed",
      message: "Authorization Required",
    });
  }
};

module.exports = {
  verifyToken,
};

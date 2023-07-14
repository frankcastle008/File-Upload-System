const express = require("express");
const app = express();
const user = express.Router();

const { verifyToken } = require("../controllers/userController");
const {
  fileUpload,
  GetUploads,
  delFile,
  pinCheck,
} = require("../controllers/fileController");
const multipart = require("connect-multiparty");
const path = require("path");

const multipartMiddleware = multipart({
  uploadDir: `${path.join(__dirname, "../uploads")}`,
});

app.use(verifyToken);

user.post("/upload/:id", multipartMiddleware, fileUpload);
user.get("/getupload/:id", GetUploads);
user.post("/pincheck/:id", pinCheck);
user.delete("/delete/:id", delFile);

module.exports = user;

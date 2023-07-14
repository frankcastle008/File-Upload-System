const express = require("express");
const {
  UserFileData,
  getUserByUserId,
  deleteFile,
  checkpin,
} = require("../db/db");

const path = require("path");

const fileUpload = (req, res, next) => {
  // console.log(req.headers.pin,req.params);
  // console.log(req.files.file.path.split("uploads\\")[1])
  let fileUploads = `http://localhost:7090/${
    req.files.file.path.split("uploads/")[1]
  }`;
  //DEPENDENCY ERROR can be faced in above line so in that case use this route (`http://localhost:7090/${req.files.file.path.split("uploads\\")[1]}`)

  UserFileData(req.params.id, req.headers.pin, fileUploads)
    .then((data) => {
      res.json({
        message: "File Upload Success",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const GetUploads = (req, res, next) => {
  getUserByUserId(req.params.id)
    .then((data) => {
      // console.log(data);
      res.json({
        message: "files",
        data: data.files,
      });
    })
    .catch((err) => {
      next(err);
    });
};
const delFile = (req, res, next) => {
  deleteFile(req.params.id, req.headers.file)
    .then((data) => {
      res.json({
        message: "file deleted",
      });
    })
    .catch((err) => {
      next(err);
    });
};

const pinCheck = (req, res, next) => {
  //   console.log(req.headers.pin,req.params)
  checkpin(req.params.id, req.headers.file, req.headers.pin)
    .then((data) => {
      // console.log(data);
      if (data) {
        res.json({
          message: true,
          data,
        });
      } else {
        res.json({
          message: false,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = {
  fileUpload,
  GetUploads,
  delFile,
  pinCheck,
};

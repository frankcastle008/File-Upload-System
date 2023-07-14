const User = require("./schemas/schemas");
const { v4: uuidv4 } = require("uuid");

const createUser = (userdata) => {
  return new Promise((res, rej) => {
    User.findOne({ username: userdata.username })
      .then((data) => {
        if (data) {
          rej("Username already exists");
        } else {
          const user = new User(userdata);
          user.id = uuidv4();
          res(user.save());
        }
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const getUserByUsername = (username) => {
  return User.findOne({ username: username });
};
const getUserByUserId = (id) => {
  return User.findOne({ id: id });
};

const UserFileData = async (id, PIN, path) => {
  try {
    let find = await User.findOne({ id: id });
    if (find) {
      let existfiles = [...find.files];
      let obj = {
        name: path,
        PIN: PIN,
      };
      existfiles.push(obj);
      await User.updateOne({ id: id }, { $set: { files: existfiles } });
    }
  } catch (err) {
    console.log(err);
  }

  // console.log(id,PIN,path)
};

const checkpin = (id, file, pin) => {
  // console.log(id,file,pin)
  return new Promise((res, rej) => {
    User.findOne({ id: id })
      .then((data) => {
        // console.log(data)
        let newdata = [...data.files];
        // console.log(newdata)
        newdata = newdata.filter((ele) => JSON.stringify(ele.name) === file);
        // console.log(newdata)
        if (newdata[0].PIN.toString() === pin) {
          res(newdata[0].name);
        } else {
          res(false);
        }
      })
      .catch((err) => {
        console.log(err);
        rej(err);
      });
  });
};

const deleteFile = (id, file) => {
  return new Promise((res, rej) => {
    User.findOne({ id: id })
      .then((data) => {
        let newdata = [...data.files];
        // console.log(file);
        newdata = newdata.filter((ele) => ele.name !== file);
        // console.log(newdata);
        data.files = newdata;
        User.updateOne({ id: id }, { $set: { ...data } });
        res(data.save());
      })
      .catch((err) => {
        rej(err);
      });
  });
};

module.exports = {
  createUser,
  getUserByUsername,
  UserFileData,
  getUserByUserId,
  deleteFile,
  checkpin,
};

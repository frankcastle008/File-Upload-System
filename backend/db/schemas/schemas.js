const mongoose = require("mongoose");

const { Schema } = require("mongoose");

const schema = new Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  id: String,
  files: [
    {
      name: String,
      PIN: Number,
    },
  ],
});

const User = mongoose.model("User2", schema);

module.exports = User;

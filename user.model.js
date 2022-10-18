const { Schema, model } = require("mongoose");

const UserShcema = new Schema({
  username: String,

  age: Number,
  role: {
    type: String,
    enum: ["writer","user", "admin"],
  },
});

const UserModel = model("user", UserShcema);

module.exports = UserModel;

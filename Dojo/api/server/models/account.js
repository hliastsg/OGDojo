const mongoose = require("mongoose");
const Schema = mongoose.Schema

//Create user schema
const account = new Schema ({
  name: {
    type: String,

  },
  surname: {
    type: String,

  },
  email: {
    type: String,

  },
  password: {
    type: String,

  },
  dateofbirth: {
    type: Date,

  },
  token: { 
    type: String },
})

module.exports = mongoose.model("account", account);
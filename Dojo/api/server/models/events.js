const mongoose = require("mongoose");
const Schema = mongoose.Schema

//Create user schema
const event = new Schema ({
  name: {
    type: String,

  },
  date: {
    type: Date,

  },
  description: {
    type: String,

  },
  location: {
    type: String,

  },
})

module.exports = mongoose.model("account", account);
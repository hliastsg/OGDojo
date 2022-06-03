const mongoose = require("mongoose");
const Schema = mongoose.Schema

//Create user schema
const tag = new Schema ({
  name: {
    type: String,

  }
})

module.exports = mongoose.model("tag", tag);
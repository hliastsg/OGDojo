const mongoose = require("mongoose");
const Schema = mongoose.Schema

//Create tags schema
const tag = new Schema ({
  tag: {
    type: Array,

  }
})

module.exports = mongoose.model("tag", tag);
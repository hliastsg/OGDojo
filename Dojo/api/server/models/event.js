const mongoose = require("mongoose");
const Schema = mongoose.Schema

//Create event schema
const event = new Schema ({
  author: {
    type: String
  },
  name: {
    type: String,

  },
  startDate: {
    type: Date,

  },
  startTime: {
    type: String
  },
  description: {
    type: String,

  },
  location: {
    type: String,

  },
  image: { 
        data: Buffer, 
        contentType: String 
  },
  tags: {
    type: Array,
  },
  attendees: {
    type: Number,
  } 
},{ timestamps: true })

module.exports = mongoose.model("event", event);
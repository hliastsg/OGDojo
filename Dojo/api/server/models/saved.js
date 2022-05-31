const mongoose = require("mongoose");
const Schema = mongoose.Schema

//Create event schema
const savedEvent = new Schema ({
  userName: {
    type: String
  },
  userSurname: {
    type: String
  },
  userEmail: {
    type: String
  },
  eventId: {
    type: String
  },
  attending: {
    type: Boolean
  }
},{ timestamps: true })

module.exports = mongoose.model("savedEvent", savedEvent);
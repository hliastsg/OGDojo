import express from "express";
import Event from "../models/event"
import savedEvent from "../models/saved";
import auth from "../middlewear/auth";

var router = express.Router();

router.post("/attend-event", auth, async (req,res) => {

  try {
    const saveEvent = {
      userName: req.body.name,
      userSurname: req.body.surname,
      userEmail: req.body.email,
      eventId: req.body.id,
      attending: true
    }
    
    const event = await Event.findOne({ _id: { $eq: saveEvent.eventId } });

    const attended = await savedEvent.findOne({userEmail: {$eq: saveEvent.userEmail}})
    console.log(attended.eventId);
    console.log(saveEvent.eventId);
    if (attended.eventId != saveEvent.eventId) {
      event.attendees = event.attendees + 1;
      await event.save();

      savedEvent.create(saveEvent, (err, item) => {
        if (err) {
          console.log(err);
        }
      });

      return res
      .status(200)
      .json("Attending Event")

    } else {
      return res
      .status(409)
      .json("You're already attending this event")

    }
  } catch (err) {
    return res
    .status(500)
    .json(err);
  }
})

router.get("/get-attending-ids", auth, async (req,res) => {
  try {
    const email = req.query.userEmail;
    console.log(email);
    const attending_events = await savedEvent.find({userEmail: {$eq: email}})

    if (attending_events) {
      return res
      .status(200)
      .json(attending_events)
    } else {
      return res
      .status(404)
      .json("You aren't attending any events yet")
    }
  } catch(err) {
    console.log(err);
    return res
    .status(500)
    .json(err);
  }
})

router.get("/get-attending-events", auth, async (req,res) => {
  const id = req.query.id;
  try {

    const events = await Event.findOne({ _id: { $eq: id } });
    return res
    .status(200)
    .json(events);
  } catch (err) {
    return res
    .status(500)
    .send(err);
  }
})

export default router;
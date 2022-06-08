import express from "express";
import Event from "../models/event"
import SavedEvent from "../models/saved";
import Account from "../models/account.js"
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

    const attended = await SavedEvent.find({userEmail: {$eq: saveEvent.userEmail}})
    var exists = false;
    if(attended) {
      Object.values(attended).map(event => {
        if (event.eventId === saveEvent.eventId) {
          exists = true;
       }
      })
      if (exists) {
        return res
        .status(409)
        .json("You're already attending this event");
      } else {
          SavedEvent.create(saveEvent, (err, item) => {
          if (err) {
            console.log(err);
          }
          });
          event.attendees = event.attendees + 1;
          await event.save();
          return res
          .status(200)
          .json("Attending Event")
      }
    }
    else {
      SavedEvent.create(saveEvent, (err, item) => {
        if (err) {
          console.log(err);
        }
        });
        event.attendees = event.attendees + 1;
        await event.save();
        return res
        .status(200)
        .json("Attending Event")
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
    const attending_events = await SavedEvent.find({userEmail: {$eq: email}})

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

router.post("/remove-event", auth, async (req,res) => {
  try {
    const id = req.body.id;
    const attending_event = await SavedEvent.deleteOne({eventId: {$eq: id}});
    const event = await Event.findOne({_id: {$eq: id}});
    if (event) {
      console.log(event.attendees);
      event.attendees = event.attendees - 1;
      event.save();
    } else {
      return res
      .status(404)
      .json("Event doesn't exists")
    }
    return res
    .status(200)
    .json("Event removed succesfully")
  } catch (error) {
    console.log(error);
    return res
    .status(500)
    .json(error);
  }
})

router.get("/get-owner", auth, async (req,res) => {
  try {
    const email = req.query.email;
    const owner = await Account.findOne({ email: {$eq: email}})

    if (owner) {
      const data = {
        name: owner.name,
        surname: owner.surname
      }
      return res
      .status(200)
      .json(data);
    } else {
      return res
      .status(404)
      .json("Event owner not found!");
    }
  } catch (error) {
    console.log(error);
    return res
    .status(500)
    .json(error);
  }
})

router.get("/get-favorite-tags", auth, async (req,res) => {
  try {
    const email = req.query.author;

    const user = await Account.findOne({email: {$eq: email}})
    if (user) {
      return res
      .status(200)
      .json(user.interests);
    } else {
      return res
      .status(404)
      .json("User Not Found");
    }
  } catch (err) {
    console.log(err);
    return res 
    .status(500)
    .json(err)
  }
})

// work in progress
router.get("/get-events-attending", async (req, res) => {

  const username = req.body.username;
  try {
    const events = await Event.find({ username });
    const favorite_tag = await SavedEvent.aggregate([
      {$project:{ username: username, count: {tag} }}, 
    {$sort : {count : -1}}, 
    {$limit : 1 }
    ])
    console.log(favorite_tag);
    return res
    .status(200)
    .json(events);
  } catch (err) {
    return res
    .status(500)
    .send(err);
  }
});

export default router;

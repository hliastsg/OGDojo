import express from "express";
import Event from "../models/event.js";
import auth from "../middlewear/auth";
import { upload, uploadImage } from "../controllers/uploadController";
import fs from "fs";
import path from "path";
import axios from "axios";

var router = express.Router();

//Controllers-Endpoints
router.post("/create-event", uploadImage, auth, async (req, res) => {
  try {
    //const { name, startDate, startTime, description, location } = req.body;

    const event = {
      author: req.body.author,
      name: req.body.name,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      description: req.body.description,
      location: req.body.location,
      image: {
        data: fs.readFileSync(
          path.join(
            "/Users/eliastsg/Desktop/OGDojo/Dojo/api/uploads/" +
              req.file.filename
          )
        ),
        contentType: "image/jpeg",
      },
      tags: req.body.tags.split(','),
      attendees: 0
    };
    //const tags = req.body.tags.split(',');

    const exists = await Event.findOne({ name: { $eq: event.name } });

    if (exists) {
      return res.status(409).send("Event title already exists");
    }

    Event.create(event, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Event created");
      }
    });

    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
});

router.get("/get-events", auth, async (req, res) => {
  const author = req.query.author;
  try {
    const events = await Event.find({ author });
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.get("/get-recommended-events", auth, async (req, res) => {
  const author = req.query.author;
  const tag = req.query.tag;

  try {
    const events = await Event.find({ author :{$ne: author}, tags : tag });

    return res
    .status(200)
    .json(events);
  } catch (err) {
    return res
    .status(500)
    .send(err);
  }
});

router.get("/get-event-details", auth, async (req, res) => {
  const id = req.query.id;
  try {
    const eventDetails = await Event.findOne({ _id: { $eq: id } });
    return res.status(200).json(eventDetails);
  } catch (err) {
    return res.status(500).send(err);
  }
});

router.post("/edit-event", uploadImage, auth, async (req, res) => {
  try {
    const new_values = {
      id: req.body.id,
      name: req.body.name,
      startDate: req.body.startDate,
      startTime: req.body.startTime,
      description: req.body.description,
      location: req.body.location,
      image: {},
    };
    var existsNewImage = false;
    if (req.file) {
      new_values.image = {
        data: fs.readFileSync(
          path.join(
            "/Users/eliastsg/Desktop/thesis/OGDojo/Dojo/api/uploads/" +
              req.file.filename
          )
        ),
        contentType: "image/jpeg",
      };
      existsNewImage = true;
    }
    const event = await Event.findOne({ _id: { $eq: new_values.id } });
    if (event.name !== new_values.name) {
      const nameExists = await Event.findOne({
        $or: [{ name: new_values.name }],
      });
      if (nameExists) {
        return res.status(409).json("Event name already in use");
      }
    }
    if (
      new_values.name === null ||
      new_values.startDate === null ||
      new_values.startTime === null ||
      new_values.description === null ||
      new_values.location === null ||
      new_values.image === null
    ) {
      return res.status(401).json("Event details cannot be empty");
    } else {
      event.name = new_values.name;
      event.startDate = new_values.startDate;
      event.startTime = new_values.startTime;
      event.description = new_values.description;
      event.location = new_values.location;
      if (existsNewImage) {
        event.image = new_values.image;
      }
      await event.save();
      return res.status(201).send(event);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});


router.post("/delete-event", auth, async (req, res) => {
  const id = req.body.id;
  try {
    const event = await Event.deleteOne({ _id: { $eq: id } });
    return res.status(200).json({ message: "Event deleted succersfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
});


export default router;

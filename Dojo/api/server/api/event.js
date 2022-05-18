import express from "express";
import Event from "../models/event.js";
import auth from "../middlewear/auth";
import {upload, uploadImage} from '../controllers/uploadController'
import fs from 'fs';
import path from 'path';

var router = express.Router();

//Controllers-Endpoints
router.post("/create-event",uploadImage, auth, async (req, res) => {
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
        data: fs.readFileSync(path.join('/Users/eliastsg/Desktop/thesis/OGDojo/Dojo/api/uploads/' + req.file.filename)), 
        contentType: 'image/jpeg'
      } 
    }
    const exists = await Event.findOne({ name: { $eq: event.name }});

    if (exists) {
      return res.status(409).send("Event title already exists");
    }

    Event.create(event, (err, item) => {
      if (err) { 
        console.log(err); 
     } 
      else { 
        res
        .send("Event created")
      } 
    })

    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
});



router.get("/get-events", async (req, res) => {
    const author = req.query.author;
    console.log(author);
    try {
      const events = await Event.find({ author })
      return res
      .status(200)
      .json(events)
    }catch(err) {
      return res
      .status(500)
      .send(err)
    }
    
});

export default router;

import express from "express";
import Event from "../models/event.js";
import auth from "../middlewear/auth";

var router = express.Router();

//Controllers-Endpoints
router.post("/create-event", auth, async (req, res) => {
  try {
    const { name, startDate, startTime, description, location, image } = req.body;

    const exists = await Event.findOne({ name });

    if (exists) {
      return res.status(409).send("Event title already exists");
    }

    const newEvent = await Event.create({
      name,
      startDate,
      startDate,
      startTime,
      description,
      location,
      image
    });

    return res.json(newEvent).status(200);
  } catch (e) {
    console.log(e);
    return res.json(e);
  }
});

router.get("/get-events", async (req, res) => {
  console.log("get events");
  try {
    const event = await Event.find();
    res
    .status(200)
    .json(event);
  } catch (error) {
    res
    .status(404)
    .json({ message: error.message });
  }
});

export default router;

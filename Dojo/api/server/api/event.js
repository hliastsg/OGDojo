import express from 'express';
import Event from '../models/event.js';

var router = express.Router();

router.post('/create-event', async (req,res) => {
  try{

    const {name, startDate, startTime, description, location} = req.body;

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
      location
    });

    return res
    .json(newEvent)
    .status(200);
    
  }catch (e) {
    console.log(e);
    return res
    .json(e);
  }
  
});


export default router;
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { growl } from "@crystallize/react-growl";
import Tags from "./Tags.js"

const NewEvent = () => {

  window.scrollTo(0, 0);
  
  const initialValues = {
    name: "",
    startDate: "",
    startTime: "",
    description: "",
    location: "",
    img: null,
  };
  const [eventDetails, setEventDetails] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([
    "Music", "Theatre", "Party"
  ]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
    setIsSubmit(false);
    setErrors(validate(eventDetails));
  };

  const discardOnClick = (e) => {
    setEventDetails(initialValues);
    setImage(null);
    setIsSubmit(false);
    setErrors({});
  };

  const uploadImage = (e) => {
    setImage(e.target.files[0]);
  }

  const validate = (values) => {
    const error = {};

    if (!values.name) {
      error.name = "Event Name is required!";
    }
    if (!values.startDate) {
      error.startDate = "Start Date is required!";
    }
    if (!values.startTime) {
      error.startTime = "Start Time is required!";
    }
    if (!values.description) {
      error.description = "Description is required!";
    }
    if (!values.location) {
      error.location = "Location is required!";
    }
    return error;
  };

  const createOnClick = (e) => {
    e.preventDefault();
    setErrors(validate(eventDetails));
    setIsSubmit(true);
  };

  const getTags = (e) => {
    e.preventDefault();
    
  };

  useEffect(() => {
    const createOnClick = (e) => {
      e.preventDefault();
      setErrors(validate(eventDetails));
      setIsSubmit(true);
    };
    if (Object.keys(errors).length === 0 && isSubmit) {

      const data = new FormData();
      data.append('author', localStorage.getItem("email"));
      data.append('name', eventDetails.name);
      data.append('startDate', eventDetails.startDate);
      data.append('startTime', eventDetails.startTime);
      data.append('description', eventDetails.description);
      data.append('location', eventDetails.location);
      data.append('tags', tags);
      data.append('photo', image);
     
      axios
        .post("api/event/create-event", data)
        .then((response) => {
          console.log(response.data);
          growl({
            title: "Dojo",
            message: "Event created succesfully! ",
          });
        })
        .catch((error) => {
          console.log(error.response.data);
          if (error.response.status === 409) {
            growl({
              title: "Dojo",
              message: error.response.data,
              type: "error",
            });
          }
        });
    } else if (Object.keys(errors).length != 0 && isSubmit) {
      growl({
        title: "Dojo",
        message: "Complete all the fields to create an event ",
        type: "warning",
      });
    }
  }, [errors]);

  return (
    <div style={{ display: "inline-flex" }}>
      <div className="new-event-container">
        <h1>Create New Event</h1>
        <h3>Event Details</h3>
        <form className="event-form">
          <input
            className={errors.name && isSubmit ? "event-form error" : ""}
            placeholder="Event Name"
            type="text"
            name="name"
            value={eventDetails.name}
            onChange={handleOnChange}
          />
          <div className="inline-date">
            <input
              className={errors.startDate && isSubmit ? "event-form error" : ""}
              type="text"
              name="startDate"
              value={eventDetails.startDate}
              onFocus={(e) => (e.target.type = "date")}
              placeholder="Start Date"
              onChange={handleOnChange}
            />
            <input
              className={errors.startTime && isSubmit ? "event-form error" : ""}
              type="text"
              name="startTime"
              value={eventDetails.startTime}
              onFocus={(e) => (e.target.type = "time")}
              placeholder="Start Time"
              onChange={handleOnChange}
            />
          </div>
          <textarea
            style={{ height: "100px" }}
            className={errors.description && isSubmit ? "event-form error" : ""}
            type="text"
            name="description"
            value={eventDetails.description}
            placeholder="Event Description"
            onChange={handleOnChange}
          />
          <input
            className={errors.location && isSubmit ? "event-form error" : ""}
            placeholder="Location"
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleOnChange}
          />
        </form>
      </div>
      <div className="side-container">
        <h3>Event Image</h3>
        <input 
          type="file" 
          id="photo"
          name="photo"
          style={{maxWidth: "400px"}}
          className={!image && isSubmit ? "event-form error" : ""}
          onChange={uploadImage}
          required/> 
          <div>
            <h3>Select categories</h3>
            <Tags tags={tags} setTags={setTags}/>
          </div>
      </div>
      <div className="overview">
        <h1>Overview</h1>
        <table>
          <tbody>
            <tr>
              <td>Event Name:</td>
              <td>{eventDetails.name}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Start Date:</td>
              <td>{eventDetails.startDate}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Start Time:</td>
              <td>{eventDetails.startTime}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Location:</td>
              <td>{eventDetails.location}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody id="description">
            <tr>
              <td>Description:</td>
              <td>{eventDetails.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="create-btn" onClick={createOnClick}>
        create event
      </button>
      <button className="create-btn discard" onClick={discardOnClick}>
        discard
      </button>
    </div>
  );
};

export default NewEvent;

import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { growl } from "@crystallize/react-growl";
import {useParams} from "react-router-dom";

const EditEvent = () => {
  //const {id} = useParams();
  const id = localStorage.getItem("id");
  const initialValues = {
    name: "",
    startDate: "",
    startTime: "",
    location: "",
    description: "",
    image: ""
  }
  const [event, setEvent] = useState(initialValues);

  useEffect(() => {
    fetchEventDetails();
  },[]);

  const fetchEventDetails = () => {
    axios
    .get("http://localhost:3006/api/event/get-event-details", {
      params: { id },
    })
    .then((response) => {
      setEvent(response.data);
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  const [updatedValues, setUpdatedValues] = useState(event);
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {

      const data = new FormData();
      data.append('id', id);
      data.append('name', event.name);
      data.append('startDate', event.startDate);
      data.append('startTime', event.startTime);
      data.append('description', event.description);
      data.append('location', event.location);
      data.append('photo', image);
      axios
        .post("api/event/edit-event", data)
        .then((response) => {
          console.log(response.data);
          growl({
            title: "Dojo",
            message: "Event details updated succesfully! ",
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
        message: "Complete the fields to update your event's details ",
        type: "warning",
      });
    }
  }, [errors]);

  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
    setIsSubmit(false);
    setErrors(validate(event));
  };

  const discardOnClick = (e) => {
    setEvent(initialValues);
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
    setErrors(validate(event));
    setIsSubmit(true);
  };

 

  return (
    <div style={{ display: "inline-flex" }}>
      <div className="new-event-container">
        <h1>Update Event Details</h1>
        <h3>Event Details</h3>
        <form className="event-form">
          <input
            className={errors.name && isSubmit ? "event-form error" : ""}
            placeholder="Event Name"
            type="text"
            name="name"
            value={event.name}
            onChange={handleOnChange}
          />
          <div className="inline-date">
            <input
              className={errors.startDate && isSubmit ? "event-form error" : ""}
              type="text"
              name="startDate"
              value={new Date(event.startDate).toDateString()}
              onFocus={(e) => (e.target.type = "date")}
              placeholder="Start Date"
              onChange={handleOnChange}
            />
            <input
              className={errors.startTime && isSubmit ? "event-form error" : ""}
              type="text"
              name="startTime"
              value={event.startTime}
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
            value={event.description}
            placeholder="Event Description"
            onChange={handleOnChange}
          />
          <input
            className={errors.location && isSubmit ? "event-form error" : ""}
            placeholder="Location"
            type="text"
            name="location"
            value={event.location}
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
          onChange={uploadImage}
          required/> 
      </div>
      <div className="overview">
        <h1>Overview</h1>
        <table>
          <tbody>
            <tr>
              <td>Event Name:</td>
              <td>{event.name}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Start Date:</td>
              <td>{new Date(event.startDate).toDateString()}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Start Time:</td>
              <td>{event.startTime}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>Location:</td>
              <td>{event.location}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody id="description">
            <tr>
              <td>Description:</td>
              <td>{event.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <span>
        <i className="fas fa-calendar" />
      </span>
      <button className="create-btn" onClick={createOnClick}>
        update event details
      </button>
      <button style= {{right: "390px"}} className="create-btn discard" onClick={discardOnClick}>
        discard
      </button>
    </div>
  );
};

export default EditEvent;

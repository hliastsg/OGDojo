import React, { useEffect } from "react";
import axios from 'axios';
import { useState } from "react";
import { growl } from '@crystallize/react-growl';

const NewEvent = () => {

  const initialValues = {name: "", startDate: "", startTime: "", description: "", location: ""};
  const [eventDetails, setEventDetails] = useState(initialValues); 
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  }
  const discardOnClick = (e) => {
    setEventDetails(initialValues);
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
  }

  const createOnClick = (e) => {
    e.preventDefault();
    setErrors(validate(eventDetails));
    setIsSubmit(true);
  } 

  useEffect(() => {
    if ( Object.keys(errors).length === 0 && isSubmit ) {
      axios.post('api/event/create-event', {
          name: eventDetails.name, startDate: eventDetails.startDate, startTime: eventDetails.startTime,
          description: eventDetails.description, location: eventDetails.location}) 
          .then((response) => {
            console.log(response.data);
            growl({
              title: 'Dojo',
              message: 'Event created succesfully! '
          });
          })
          .catch((error) => {
            console.log(error.response.data); 
            if (error.response.status === 409) {
              growl({
                title: 'Dojo',
                message: error.response.data,
                type: 'error'
            });
            }
          })
    }
    // if (Object.keys(errors).length != 0 ) {
    //   if (errors.name) {
    //     growl({
    //       title: 'Dojo',
    //       message: 'Event Name is required!',
    //       type: 'warning' 
    //   });
    // } if (errors.startDate) {
    //     growl({
    //       title: 'Dojo',
    //       message: 'Start Date is required!',
    //       type: 'warning'
    //   });
    // } if (errors.startTime) {
    //   growl({
    //     title: 'Dojo',
    //     message: 'Event Name is required!',
    //     type: 'warning' 
    // });
    // } if (errors.description) {
    //   growl({
    //     title: 'Dojo',
    //     message: 'Description is required!',
    //     type: 'warning' 
    // });
    // } if (errors.location) {
    //   growl({
    //     title: 'Dojo',
    //     message: 'Location is required!',
    //     type: 'warning' 
    //     });
    //   }
    // }
  },[errors])

  return (
    <div style={{ display: "inline-flex" }}>
      <div className="new-event-container">
        <h1>Create New Event</h1>
        <h3>Event Details</h3>
        <form id="event-form">
          <input 
            placeholder="Event Name" 
            type="text" 
            name="name"
            value={eventDetails.name}
            onChange={handleOnChange}
          />
          <div className="inline-date">
            <input
              type="text"
              name="startDate"
              value={eventDetails.startDate}
              onFocus={(e) => (e.target.type = "date")}
              placeholder="Start Date"
              onChange={handleOnChange}
            />
            <input
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
            type="text"
            name="description"
            value={eventDetails.description}
            placeholder="Event Description"
            onChange={handleOnChange}
          />
          <input 
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
        <input type="file" />
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
      <span>
        <i className="fas fa-calendar"/>
      </span>
      <ul className="event-form-errors">
        <li>{errors.name}</li>
        <li>{errors.startDate}</li>
        <li>{errors.startTime}</li>
        <li>{errors.description}</li>
        <li>{errors.location}</li>
      </ul>
      <button className="create-btn" onClick={createOnClick}>create event</button>
      <button className="create-btn discard" onClick={discardOnClick} >discard</button>
    </div>
  );
};

export default NewEvent;

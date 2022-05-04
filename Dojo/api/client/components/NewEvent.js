import React from "react";
import { useState } from "react";

const NewEvent = () => {

  const initialValues = {name: "", startDate: "", startTime: "", description: "", location: ""};
  const [eventDetails, setEventDetails] = useState(initialValues); 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  }
  const discardOnClick = (e) => {
    setEventDetails(initialValues);
  }

  const createOnClick = () => {
    if (eventDetails === initialValues) { 
      axios.post('api/event/create-event', {
        name: eventDetails.name, startDate: eventDetails.startDate, startTime: eventDetails.startTime,
        description: eventDetails.description, location: eventDetails.location}) 
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
    }
  } 

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
      <button className="create-btn" onClick={createOnClick}>create event</button>
      <button className="create-btn discard" onClick={discardOnClick} >discard</button>
    </div>
  );
};

export default NewEvent;

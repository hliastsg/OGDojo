import React from "react";

const NewEvent = () => {

  return (
    <div style={{display:"inline-block"}}>
      <div className="new-event-container">
        <h1>Create New Event</h1>
        <h3>Event Details</h3>
        <form className="event-form">
          <input placeholder="Event Name" type="text" />
          <div className="inline-date">
            <input
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              placeholder="Start Date"
            />
            <input
              type="text"
              onFocus={(e) => (e.target.type = "time")}
              placeholder="Start Time"
            />
          </div>
          <textarea
            style={{ height: "100px"}}
            type="text"
            placeholder="Event Description"
          />
        </form>
      </div>
      <div className="side-container">
        <h1>trapapapapap</h1>
      </div>
    </div>
  );
};

export default NewEvent;

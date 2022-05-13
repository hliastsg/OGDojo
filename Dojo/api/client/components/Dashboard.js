import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const itemList = {};
  const [userEvents,setUserEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserEvents();
  }, [])

  const fetchUserEvents = () => {
    axios.get("api/event/get-events")
    .then((response) => {
      setUserEvents(response.data);
      setIsLoading(false);
    })
      .catch((error) => {
        console.log(error);
    });
  }

  console.log(userEvents);
  Object.values(userEvents).map(event => {
    console.log(event._id);
  })
  const createOnClick = (e) => {
    navigate("/create-event");
  };

  return isLoading ? (
      <div className="loader">
      </div>
  ) : (
    <div>
      <div className="d-header">
      <h1>{localStorage.getItem("name")}'s Events</h1><br />
      </div>
    <div className="feed">
    {
      Object.values(userEvents).map(event => (
      <div className="card">
        <img src={event.image} style={{ width: "100%" }} />
        <div className="container">
          <h2 key={event._id}>{event.name} </h2>
          <p key={event._id + 1}>{event.startDate.toString().split('T')[0]} </p>
          <p key={event._id + 99}>{event.startTime}</p>
        </div>
    </div>
      ))
    }
  </div>
  <div className="expl-header">
    <h1>Explore other events</h1>
  </div>
    <button className="new-event-btn" onClick={createOnClick}>
      <i className="fas fa-plus"></i>
    </button>
  </div>
  );
}

export default Dashboard;

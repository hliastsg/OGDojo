import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";
import arrayBufferToBase64 from "base64-arraybuffer";
import EventDetails from './EventDetails.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const author = localStorage.getItem("email");
  const [userEvents, setUserEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const arrayBufferToBase64 = (buffer) => {
    let binaryStr = "";
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(byteArray[i]);
    }
    return btoa(binaryStr);
  };

  useEffect(() => {
    console.log(author);
    fetchUserEvents();
  }, []);

  const fetchUserEvents = () => {
    axios
      .get("api/event/get-events", {
        params: { author },
      })
      .then((response) => {
        setUserEvents(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createOnClick = (e) => {
    navigate("/create-event");
  };

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="d-header">
        <h1>{localStorage.getItem("name")}'s Events</h1>
        <br />
      </div>
      <div className="feed">
        {Object.values(userEvents).map(function (event, i) {
          return (
            <div className="card" key={i} onClick={(e) => {
              <EventDetails id={event._id}/>
              navigate("/event-details/")
            }}>
              <img
                src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(
                  event.image.data.data
                )}`}
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2 key={event._id}>{event.name} </h2>
                <p key={event._id + 1}>
                  {event.startDate.toString().split("T")[0]}{" "}
                </p>
                <p key={event._id + 99}>{event.startTime}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="expl-header">
        <h1>Explore other events</h1>
      </div>
      <button className="new-event-btn" onClick={createOnClick}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};
//.toString().split('T')[0]
export default Dashboard;

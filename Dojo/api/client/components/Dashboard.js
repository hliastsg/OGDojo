import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const itemList = {};
  const [userEvents,setUserEvents] = useState([itemList]);

  // const isAuth = useSelector(state => state.auth.isAuthenticated);
  // const cookie = new Cookies();
  // // if (isAuth) {const isLogged = cookie.get("access_token")}
  // else {navigate("/")}
  
  useEffect(() => {
    axios.get("api/event/get-events")
  .then((response) => {
      for(let i=0; i < response.data.length; i++){
        setUserEvents(userEvents.push({
          name: response.data[i].name,
          startDate: response.data[i].startDate,
          startTime: response.data[i].startTime,
          description: response.data[i].description,
          location: response.data[i].location,
          image: response.data[i].image
        }))
      }
      console.log(userEvents);
  })
  .catch((error) => {
    console.log(error);
  });
  Object
  }, [])

  const createOnClick = (e) => {
    navigate("/create-event");
  };

  Object.keys(userEvents).map(event => {
	})

  return (
    <div>
      <div className="d-header">
        <h1>{localStorage.getItem("name")}'s Events</h1>

        <h1>Explore Events</h1>
        {/* (
      for (var i = 0; i =< events.length; i++) {
        ObjectRow()
      } 
    ) */}
      
        <div className="card">
          <img src="img_avatar.png" alt="Avatar" style={{ width: "100%" }} />
          <div className="container">
            <h4>Jean Doe</h4>
            {/* {listItems} */}
            <p>Architect & Engineer</p>
          </div>
        </div>
        </div>
        <button className="new-event-btn" onClick={createOnClick}>
          <i className="fas fa-plus"></i>
        </button>
      
    </div>
  )
}

export default Dashboard;

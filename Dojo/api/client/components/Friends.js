import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Friends = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userEvents, setUserEvents] = useState([]);
  const [id, setId] = useState();
  const author = location.state.email;

  const arrayBufferToBase64 = (buffer) => {
    let binaryStr = "";
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(byteArray[i]);
    }
    return btoa(binaryStr);
  };

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = () => {
    axios
      .get("http://localhost:3006/api/event/get-events", {
        params: { author },
      })
      .then((response) => {
        setUserEvents(response.data);
        setIsLoading(false);
        //window.location.href = "https://www.eventbrite.com/oauth/authorize?response_type=code&client_id=OKMZG5JZFV2ZR7V4SY&redirect_uri=http://localhost"
      })
      .catch((error) => {
        console.log(error); 
      });
  };

  const handlerProceed = (id) => {
    navigate(`/friends-events-details/${id}`, {state: {id}})
  }

  return isLoading ? ( 
    <div className="loader"></div>
  ) : (
    <div> 
      <div className="d-header">
      <h1>{location.state.name}'s Events</h1>
    </div>
    <div className="feed">
        {Object.values(userEvents).map(function (event, i) {
          return (
            <div
              className="card"
              key={i}
              onClick={(e) => {
                setId(event._id);
                handlerProceed(event._id);
              }}
            >
              <img
                src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(event.image.data.data)}`}
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2 key={event._id}>{event.name} </h2>
                <p key={event._id + 1}>
                {new Date(event.startDate).toDateString()}
                </p>
                <p key={event._id + 99}>{event.startTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    
    
  )
}
export default Friends;
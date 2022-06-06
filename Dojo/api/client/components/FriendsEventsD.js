import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { growl } from "@crystallize/react-growl";
import arrayBufferToBase64 from "base64-arraybuffer";

const FriendsEventDetails = () => {

  const {id} = useParams();
  const [event, setEvent] = useState({});
  const [owner, setOwner] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const arrayBufferToBase64 = (buffer) => {
    let binaryStr = "";
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(byteArray[i]);
    }
    return btoa(binaryStr);
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchEventDetails();
  },[])

  const fetchEventDetails = () => {
    axios
    .get("http://localhost:3006/api/event/get-event-details", {
      params: { id },
    })
    .then((response) => {
      setEvent(response.data);
      fetchOwnerOfEvent(response.data.author);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // useEffect(() => {
  //   fetchOwnerOfEvent();
  // },[isLoading])

  const fetchOwnerOfEvent = (email) => {

    if(isLoading) {
      axios
      .get("http://localhost:3006/api/user/get-owner", {
        params: { email: email}
      })
      .then((res) => {
        console.log(res.data);
        setOwner(res.data.name + " " + res.data.surname);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  }

  const attendEventHandler = (e) => {

    axios
    .post("/api/user/attend-event", {
      id: id,
      name: localStorage.getItem("name"),
      surname: localStorage.getItem("surname"),
      email: localStorage.getItem("email")
    })
    .then((response) => {
      growl({
        title: 'Dojo',
        message: 'You are attending ' + event.name,
        type: 'success'
    });

    })
    .catch((err) => {
      if (err.response.status === 409) {
        growl({
          title: 'Dojo',
          message: err.response.data,
          type: 'warning'
      });
      }
      
    });
  }

  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <img
        className="details-image"
        src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(event.image.data.data)}`}
      />
      <div className="event-overview">
        <h1>Event Details</h1>
        <table>
        <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Owner:</td>
              <td>{owner}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Event Name:</td>
              <td>{event.name}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Start Date:</td>
              <td>{new Date(event.startDate).toDateString()}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Start Time:</td>
              <td>{event.startTime}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Location:</td>
              <td>{event.location}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Category:</td>
              <td>{event.tags.join(",")}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "320"}}>Atendees:</td>
              <td>{event.attendees}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody id="description">
            <tr>
              <td style={{fontWeight: "320"}}>Description:</td>
              <td>{event.description}</td>
            </tr>
          </tbody>
        </table>
        <div style={{margin: "30px"}}>
          <button 
            className="create-btn"
            onClick={attendEventHandler}>attend event</button>
        </div>
       
      </div>
    </div>
  );
};

export default FriendsEventDetails;

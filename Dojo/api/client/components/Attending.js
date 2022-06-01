import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { growl } from "@crystallize/react-growl";
import arrayBufferToBase64 from "base64-arraybuffer";
import EditEvent from "./EditEvent"

const Attending = () => {

  const {id} = useParams();
  const [event, setEvent] = useState({});
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
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      navigate("/*")
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
          <tbody>
            <tr>
              <td>Atendees:</td>
              <td>{event.attendees}</td>
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
        <div style={{margin: "30px"}}>
          <button 
            className="create-btn"
            >edit event details</button>
          <button 
            style= {{right: "330px"}} 
            className="create-btn discard"
            >delete event</button>
        </div>
       
      </div>
    </div>
  );
};

export default Attending;

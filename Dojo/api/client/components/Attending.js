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
      navigate("/*")
    });
  }
  const fetchOwnerOfEvent = (email) => {
      axios
      .get("http://localhost:3006/api/user/get-owner", {
        params: { email: email}
      })
      .then((res) => {
        setOwner(res.data.name + " " + res.data.surname);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    
  const removeHandler = (e) => {
    window.confirm('Are you sure you wish to remove this event from your attending events?') ? removeEvent() : ""
  }


  const removeEvent = () => {
    axios
    .post("/api/user/remove-event", {id: id})
    .then((res) => {
      console.log(res.data);
      navigate("/myevents")
    })
    .catch((err) => {
      console.log(err);
    })
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
            style= {{right: "20px"}} 
            className="create-btn discard"
            onClick={removeHandler}
            >remove event</button>
        </div>
       
      </div>
    </div>
  );
};

export default Attending;

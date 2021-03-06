import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { growl } from "@crystallize/react-growl";
import arrayBufferToBase64 from "base64-arraybuffer";
import EditEvent from "./EditEvent";

const EventDetails = () => {
  const { id } = useParams();
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
  }, []);

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
        navigate("/*");
      });
  };

  const deleteEventHandler = (e) => {
    window.confirm("Are you sure you wish to delete this event?")
      ? deleteEvent()
      : "";
  };
  const editEventHandler = (e) => {
    console.log(id);
    localStorage.setItem("id", id);
    navigate("/edit-event", { state: { id: id } });
  };

  const deleteEvent = () => {
    axios
      .post("http://localhost:3006/api/event/delete-event", {
        id: id,
      })
      .then((response) => {
        navigate("/dashboard");
        growl({
          title: "Dojo",
          message: "Event deleted successfully",
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(event.tags);
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <img
        className="details-image"
        src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(
          event.image.data.data
        )}`}
      />
      <div className="event-overview">
        <h1>Event Details</h1>
        <table>
          <tbody>
            <tr>
              <td style={{fontWeight: "400"}}>Event Name:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{event.name}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "400"}}>Start Date:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{new Date(event.startDate).toDateString()}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "400"}}>Start Time:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{event.startTime}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "400"}}>Location:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{event.location}</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td style={{fontWeight: "400"}}>Category:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{event.tags.join(",")}</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td style={{fontWeight: "400"}}>Atendees:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{event.attendees}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody id="description">
            <tr>
              <td style={{fontWeight: "400"}}>Description:</td>
              <td style={{fontWeight: "300",paddingLeft: "30px"}}>{event.description}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ margin: "30px" }}>
          <button className="create-btn" onClick={editEventHandler}>
            edit event details
          </button>
          <button
            style={{ right: "330px" }}
            className="create-btn discard"
            onClick={deleteEventHandler}
          >
            delete event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

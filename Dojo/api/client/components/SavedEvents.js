import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const SavedEvents = () => {

  const userEmail = localStorage.getItem("email");
  const [eventIds, setEventIds] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState();
  const navigate = useNavigate();

  const arrayBufferToBase64 = (buffer) => {
    let binaryStr = "";
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(byteArray[i]);
    }
    return btoa(binaryStr);
  };

  const fetchAttendingIds = async () => {
    await axios
    .get('/api/user/get-attending-ids', {
      params: {userEmail}
    })
    .then((res) => {
      setEventIds(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }
  const fetchAttendingEvents = async (id) => {
    await axios
    .get("api/user/get-attending-events", {
      params: {id}
    })
    .then((res) => {
      setEvents((prev) => [...prev, res.data])
    })
    .catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    fetchAttendingIds()
  },[])

  useEffect(() => {
    const exec = async () => {
      const getEvents = await Promise.all(eventIds.map(event => {
        fetchAttendingEvents(event.eventId)
      }))
    };
    exec()
    .then(() => {
      setIsLoading(false);
    });
  },[eventIds])

  const handlerProceed = (id) => {
    navigate(`/attending-event/${id}`, {state: {id: id}})
  }

  if (isLoading) {
    return (
      <div className="loader"></div>
    )
  } else if (events.length === 0) {
    return (
      <div className="d-header">
      <div className="no-events">
        <i className="far fa-grimace"></i>
        <h1>You aren't attending any events yet.</h1>
        <p>To find events that might interest you, visit your dashboard or explore {" "}</p>
        <a className="create-link" style={{paddingLeft:"10px"}} href="/explore">
          here
        </a>
      </div>
      </div>
    )
  } else {
    return (
      <div>
      <div className="d-header">
      <h1>Events that you are attending</h1>
      </div>
      <div className="feed">
      {Object.values(events).map(function (event, i) {
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

  // return isLoading ? (
  //   <div className="loader"></div>
  // ) : (
  //   <div>
  //     <div className="d-header">
  //         <h1>Events that you are attending</h1>
  //          <div className="feed" style={{right: "300px"}}>
  //         {Object.values(events).map(function (event, i) {
  //           return (
  //             <div
  //               className="card"
  //               key={i}
  //               onClick={(e) => {
  //                 setId(event._id);
  //                 handlerProceed(event._id);
  //               }}
  //             >
  //               <img
  //                 src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(event.image.data.data)}`}
  //                 style={{ width: "100%" }}
  //               />
  //               <div className="container">
  //                 <h2 key={event._id}>{event.name} </h2>
  //                 <p key={event._id + 1}>
  //                 {new Date(event.startDate).toDateString()}
  //                 </p>
  //                 <p key={event._id + 99}>{event.startTime}</p>
  //               </div>
  //             </div>
  //           );
  //         })}
  //       </div>  
  //     </div>
  //   </div>
  // )
}
export default SavedEvents;
import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LoginError } from "../store/actions/authAction";
import Cookies from "universal-cookie";
import arrayBufferToBase64 from "base64-arraybuffer";


const Dashboard = () => {

  const navigate = useNavigate();
  const author = localStorage.getItem("email");
  const [userEvents, setUserEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch;
  const [id, setId] = useState();
  const [friendId, setFriendId] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [noResult, setNoResult] = useState();

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  
  useEffect(() => {
    if (!isAuth) {
      dispatch(LoginError());
      navigate("/401");
    }
  },[isAuth])

  const AuthString = 'Bearer ' + 'OKMZG5JZFV2ZR7V4SY  '; 
  let config = {
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3006',
      'Authorization': AuthString,
    }
  }
//   axios
//   .get("https://www.eventbriteapi.com/v3/users/me/?token=RKON5J4YRP3YX637WGCL/")
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log('error ' + error);
//  });
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
      .get("api/event/get-events", {
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

  const createOnClick = (e) => {
    navigate("/create-event");
  };

  const handlerProceed = (id) => {
    navigate(`/event-details/${id}`, {state: {id}})
  }

  const searchFriendsHandler = (e) => {
    setSearch(e.target.value);
    axios
    .get("/api/account/search-friends", {
      params: { search }
    })
    .then((response) => {
      setSearchResult(response.data);
      setFriendId(response.data._id);
    })
    .catch((error) => {
      setNoResult(error.response.data);
    });
  }
  const searchFoundHandler = (e) => {
    navigate(`/friends-events/${friendId}`, {state: {email: searchResult.email, name: searchResult.name} });
  }
  return isLoading ? (
    <div className="loader"></div>
  ) : (
    <div>
      <div className="search-friends">
        <h1>Search for friends</h1>
        <p>You can search and find other public events from friends</p>
        <input 
        type="text" 
        placeholder="Search by name, last name or email." 
        onChange={searchFriendsHandler}
        />
        <div>
          { searchResult ? (
            <a onClick={searchFoundHandler}>{searchResult.name + " " + searchResult.surname}</a>
          ) : (
            <p>{noResult}</p>
          )}
        </div>
      </div>
      <div className="d-header">
        {userEvents.length === 0 ? (
          <div className="no-events">
            <i className="far fa-grimace"></i>
            <h1>You haven't created any events yet.</h1>
            <p>To create an event, click on the button at the bottom right corner, or </p>
            <a className="create-link" href="/create-event">here</a>
          </div>
        ) : (
          <h1>{localStorage.getItem("name")}'s Events</h1>
        )}
        <br />
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
      <button className="new-event-btn" onClick={createOnClick}>
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};
//.toString().split('T')[0]
export default Dashboard;

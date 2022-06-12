import React, { useEffect, useState } from "react";
import { Link, useNavigate, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { LoginError } from "../store/actions/authAction";
import Cookies from "universal-cookie";
import arrayBufferToBase64 from "base64-arraybuffer";

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const author = localStorage.getItem("email");
  const [userEvents, setUserEvents] = useState([]);
  const [userRecommendedEvents, setUserRecommendedEvents] = useState([]);
  const [secondRecommendedEvents, setSecondRecommendedEvents] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [id, setId] = useState();
  const [friendId, setFriendId] = useState();
  const [search, setSearch] = useState();
  const [searchResult, setSearchResult] = useState();
  const [noResult, setNoResult] = useState();
  const [isClicked, setIsClicked] = useState(false);

  const arrayBufferToBase64 = (buffer) => {
    let binaryStr = "";
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(byteArray[i]);
    }
    return btoa(binaryStr);
  };

  function getUserEvents() {
    return axios.get("api/event/get-events", {
      params: { author },
    });
  }

  function getFavoriteTags() {
    return axios.get("api/user/get-favorite-tags", {
      params: {author}
    })
  }

  useEffect(() => {
    fetchUserEvents();
  }, []);

  useEffect(() => {
     if (isFetched) {
       axios.all([
        axios.get("api/event/get-recommended-events", {
          params: { author , tag: favorites[0]},
        }),
        axios.get("api/event/get-recommended-events", {
          params: { author , tag: favorites[1]},
        })
       ])
       .then(axios.spread((data1, data2) => {
         setUserRecommendedEvents(data1.data);
         setSecondRecommendedEvents(data2.data);
         setIsLoading(false);
       }))
     }
  }, [isFetched])

  const fetchUserEvents = () => {
  
    Promise.all([getUserEvents(), getFavoriteTags()])
      .then(function (results) {
        setUserEvents(results[0].data);
        setFavorites(results[1].data);
        setIsFetched(true);
      })
  
  };

  const createOnClick = (e) => {
    navigate("/create-event");
  };

  const handlerProceed = (id) => {
    navigate(`/event-details/${id}`, { state: { id } });
  };

  const handlerProceedRecommended = (id) => {
    navigate(`/friends-events-details/${id}`, { state: {id}});
  }

  const searchFriendsHandler = async (e) => {
    e.preventDefault();
    if (e.target.value.length === 0) {
      setIsClicked(false);
    }
   if (e.target.value.length >= 3) {
    setSearch(e.target.value);
    await axios
      .get("/api/account/search-friends", {
        params: { search },
      })
      .then((response) => {
        setSearchResult(response.data);
        setFriendId(response.data.id);
        setIsClicked(true);

      })
      .catch((error) => {
        setNoResult(error.response.data);
      });
    }
  };
  
  const searchFoundHandler = (id, email, name, surname) => {
    navigate(`/friends-events/${id}`, {
      state: { email: email, name: name , surname: surname},
    });
  };

  const renderCssClass = () => {
    let classes = "categories";

    if (isClicked) {
      classes += " active-drop";
    }
    return classes;
  };

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
          {searchResult ? (
            <div style={{marginTop:"0px",marginLeft:"10px",minHeight:"5vh", maxWidth:"400px"}} 
            className={renderCssClass()}>
              {searchResult.ok === 0 ? (
                <p style={{padding: "8px", alignSelf:"center", paddingBottom: "10px"}}>No result</p>
              ) : (
                <ul>
                {Object.values(searchResult).map(function (result, i) {
                  return (
                    <li
                      key={i}
                      className="list"
                      value={result}
                      onClick={() => {
                        searchFoundHandler(result.id, result.email, result.name, result.surname);
                      }}
                    >
                      {result.name + " " + result.surname}
                    </li>
                  );
                })}
              </ul>
              )}
          </div>
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
            <p>
              To create an event, click on the button at the bottom right
              corner, or{" "}
            </p>
            <a className="create-link" href="/create-event">
              here
            </a>
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
                handlerProceed(event._id, e);
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
      <div className="suggestions">
        <h1>Suggested for you</h1>
      </div>
      <div className="d-header">
        <h1>Explore {favorites[0]} Events</h1>
      </div>
      <div className="feed">
        {Object.values(userRecommendedEvents).map(function (e, i) {
          return (
            <div
              className="card"
              key={i}
              onClick={() => {
                handlerProceedRecommended(e._id);
              }}
            >
              <img
                src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(e.image?.data.data)}`}
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2 key={e._id}>{e.name} </h2>
                <p key={e._id + 1}>
                  {new Date(e.startDate).toDateString()}
                </p>
                <p key={e._id + 99}>{e.startTime}</p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-header">
        <h1>Explore {favorites[1]} Events</h1>
      </div>
      <div className="feed">
        {Object.values(secondRecommendedEvents).map(function (e, i) {
          return (
            <div
              className="card"
              key={i}
              onClick={() => {
                handlerProceedRecommended(e._id);
              }}
            >
              <img
                src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(e.image?.data.data)}`}
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2 key={e._id}>{e.name} </h2>
                <p key={e._id + 1}>
                  {new Date(e.startDate).toDateString()}
                </p>
                <p key={e._id + 99}>{e.startTime}</p>
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
export default Dashboard;

import React from "react";
import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Explore = () => {

  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [tags, setTags] = useState([
    "Music",
    "Concert",
    "Theatre",
    "Party",
    "Arts",
    "Performance",
    "Photography",
    "Conference",
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(false);
  const [events, setEvents] = useState([]);
  const [category, setCategory] = useState("")

  const isDropdownClicked = () => {
    setIsClicked(!isClicked);
  };

  const renderCssClass = () => {
    let classes = "categories";

    if (isClicked) {
      classes += " active-drop";
    }
    return classes;
  };
  const arrayBufferToBase64 = (buffer) => {
    let binaryStr = "";
    const byteArray = new Uint8Array(buffer);
    for (let i = 0; i < byteArray.byteLength; i++) {
      binaryStr += String.fromCharCode(byteArray[i]);
    }
    return btoa(binaryStr);
  };
  const handleonClick = (c) => {
    setIsLoading(true);
    setCategoryClicked(true);
    setCategory(c);
    axios
      .get("api/event/get-recommended-events", {
        params: { author: localStorage.getItem("email"), tag: c },
      })
      .then((res) => {
        setEvents(res.data);
        setIsClicked(false);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  const handlerProceed = (id) => {
    navigate(`/friends-events-details/${id}`, { state: {id}});
  }

  return isLoading ? (<div className="loader"></div>) : 
  (
    <div>
      <div className="d-header">
        <div onClick={isDropdownClicked} className="categories-header">
          <h1>Choose a Category</h1>
          {isClicked ? (
            <i className="fas fa-caret-down"></i>
          ) : (
            <i className="fas fa-caret-up"></i>
          )}
        </div>
        <div className={renderCssClass()}>
          <ul>
            {tags.map(function (category, i) {
              return (
                <li
                  key={i}
                  className="list"
                  value={category}
                  onClick={() => {
                    handleonClick(category);
                  }}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {categoryClicked && !isLoading ? <h1 id="title">{category} Events</h1> : <></>}
      <div className="categories-feed">
        {Object.values(events).map(function (e, i) {
          return (
            <div
              className="card"
              key={i}
              onClick={() => {
                handlerProceed(e._id);
              }}
            >
              <img
                src={`data:image/jpeg;charset=utf-8;base64,${arrayBufferToBase64(
                  e.image?.data.data
                )}`}
                style={{ width: "100%" }}
              />
              <div className="container">
                <h2 key={e._id}>{e.name} </h2>
                <p key={e._id + 1}>{new Date(e.startDate).toDateString()}</p>
                <p key={e._id + 99}>{e.startTime}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Explore;

import React, { useEffect } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import { Logout } from "../store/actions/authAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Cookies from "universal-cookie";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const cookie = new Cookies();
  const isLogged = cookie.get("access_token");

  // const logoutHandler = (e) => {
  //   e.preventDefault();
  //   axios
  //   .get('api/account/logout')
  //   .then((response) => {
  //     console.log(response.data);
  //   })
  //   .catch((e) => {
  //     console.log(e.response.data);
  //   })
  //   navigate("/");
  //   dispatch(Logout());
  //   localStorage.clear();
  // }

  const createOnClick = (e) => {
    navigate("/create-event");
  };

  return  (
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
            <h4>
              <b>John Doe</b>
            </h4>
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

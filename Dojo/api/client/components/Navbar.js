import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import {Logout} from "../store/actions/authAction";
import axios from 'axios';

const Navbar = ({nav, setNav}) => {

  //Get authentication from Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const dispatch = new useDispatch();
  const navigate = new useNavigate();

  const LogoutHandler = (e) => {
    e.preventDefault();
    axios
    .post('/api/account/logout')
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.log(e.response.data);
    })
    navigate("/");
    dispatch(Logout());
    localStorage.clear();
  }
  //On click the burger menu, disapear rest of components
  const navOnClick = () => {
    setNav(!nav);
  }

  const linkOnClick = () => {
    setNav(false);
  }

  //Render classes in order to change the menu bar when burger menu clicked, activate the menu
  const renderCssClasses = () => {
    let classes = "navlinks";

    if (nav) {
      classes += " activenav"; 
    }
    return classes;
  }
  return (
    !isAuthenticated ? (
      <nav className="navbar welcome">
      <Link to="/">
        <div className="logo">
            <i className="fas fa-cat"></i>
            <h4>Dojo</h4>
        </div>
       </Link>
       <ul className={renderCssClasses()}>
         <Link to="/">
          <li onClick={linkOnClick} className="link">Home</li>
         </Link>
         <Link to="/about">
          <li onClick={linkOnClick} className="link">About</li>
         </Link>
       </ul>
       <div className="bar-toggle" onClick={navOnClick}>
         <i className="fas fa-bars fa-lg"></i>
       </div>
    </nav>
    )
    : (
      <nav className="navbar home">
        <Link to="/dashboard">
        <div className="logo-logged">
            <i className="fas fa-cat"></i>
            <h4>Dojo</h4>
        </div>
       </Link>
       <ul className={renderCssClasses()}>
         <Link to="/dashboard">
          <li onClick={linkOnClick} className="link-logged">Home</li>
         </Link>
         <Link to="/myevents">
          <li onClick={linkOnClick} className="link-logged">My Events</li>
         </Link>
         <Link to="/explore">
          <li onClick={linkOnClick} className="link-logged">Explore</li>
         </Link>
       </ul>
       <div className="user-options">
        <i className="fa fa-user-circle menu-icon"></i>
        <span>&nbsp;{localStorage.getItem("name")}</span>
        <div className="dropdown">
          <Link to="/account/usr-config"> 
           <li className="drop-link">Settings</li>
          </Link>
        <li className="drop-link" onClick={LogoutHandler}>Log out</li>
        </div>
        </div>
       <div className="bar-toggle" onClick={navOnClick}>
         <i className="fas fa-bars fa-lg"></i>
       </div>
      </nav>
    )
  
  )
}

export default Navbar;
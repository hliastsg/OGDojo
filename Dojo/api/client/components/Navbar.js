import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({nav, setNav}) => {

  //Get authentication from Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  
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
        <div className="logo">
            <i className="fas fa-cat"></i>
            <h4>Dojo</h4>
        </div>
       </Link>
       <ul className={renderCssClasses()}>
         <Link to="/dashboard">
          <li onClick={linkOnClick} className="link">Home</li>
         </Link>
         <Link to="/account/usr-config">
          <li onClick={linkOnClick} className="link">Account</li>
         </Link>
       </ul>
       <div className="bar-toggle" onClick={navOnClick}>
         <i className="fas fa-bars fa-lg"></i>
       </div>
      </nav>
    )
  
  )
}

export default Navbar;
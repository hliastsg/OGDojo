import React from "react";
import { Link, Navigate} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";
import { getDate }from '../store/actions/getDateAction.js'

const Header = () => {
 
  const dispatch = useDispatch();
  dispatch(getDate());

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  const date = useSelector(state => state.date.today);

  const cookie = new Cookies();
  const isLogged = cookie.get("access_token");
  
  return !isAuth ? (
    <div className="showcase welcome">
      <nav className="header">
        <h1>Welcome to Dojo</h1>
        <h2>Dojo is a platform where you can explore a variety of cultural events. To get started, create an account.</h2>
        <Link to="/register">
          <button className="signup_btn">REGISTER</button>
        </Link>
        <p>Already have an account? Sign in instead.</p>
        <Link to="/login">
          <button className="signup_btn">SIGN IN</button>
        </Link>
      </nav>
    </div>
  ) : (
    <Navigate to='/dashboard'/>
  )
}

export default Header;
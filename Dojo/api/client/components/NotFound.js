import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NotFound = () => {

  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return isAuth ? (
    <div className='showcase home'>
      <h1>404</h1>
      <h2>Sorry, looks like the page you are looking for doesn't exist, or the link may be broken.</h2>
        <Link to="/dashboard">
        <button className='login_btn'>HOME PAGE</button>
      </Link>
    </div>
      ) : (
        <div className='showcase welcome'>
      <h1>404</h1>
      <h2>Sorry, looks like the page you are looking for doesn't exist, or the link may be broken.</h2>
        <Link to="/">
        <button className='login_btn'>HOME PAGE</button>
      </Link>
    </div>
  )
}
export default NotFound;
import React from 'react';
import { Link } from 'react-router-dom';

const NotAuth = () => {

  return (
    <div className='showcase welcome'>
      <h1>Permission Denied.</h1>
      <h2>You are not authorized to access this page, please log in first.</h2>
      <Link to="/login">
        <button className='login_btn'>LOG IN</button>
      </Link>
    </div>
  )
}
export default NotAuth;
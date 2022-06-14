import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';


const About = () => {

  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return !isAuth ? (
    <div className="showcase header welcome">
      <h1>About Dojo</h1>
      <h2>Dojo is an app where you can explore happenings and ongoing events based on your interests.</h2>
      <p style={{padding: "20px", lineHeight: "30px"}}>With Dojo you can explore events of your friends and let them know whether you're going or not,
        you can also explore other events based on a category you choose and then access all the events that you're interested in.
        In your dashboard you will find suggested events for you, based on your preferences and every time you visit it
        you will find different categories of your interests.</p><br />
        <p style={{marginBottom: "20px"}}>All you have to do is to create an account and you're in!</p>
        <Link to='/register'>
          <button className="signup_btn">
            GET STARTED
          </button>
        </Link>
    </div>
  ) : <Navigate to='/dashboard'/>
}

export default About;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


const About = () => {

  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return !isAuth ? (
    <div className="showcase header welcome">
      <h1>About Dojo</h1>
      <h2>Dojo is an app where you can explore happenings and ongoing events in a location that you specify.</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium, enim dolore doloremque, quis minima libero itaque odit qui distinctio ipsum, dicta quidem quod dolorem? Mollitia obcaecati earum delectus cumque accusamus.</p>
    </div>
  ) : <Navigate to='/dashboard'/>
}

export default About;
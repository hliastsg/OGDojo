import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Logout } from '../store/actions/authAction';
import { useSelector,useDispatch } from 'react-redux';

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    e.preventDefault();
    axios
    .get('api/account/logout')
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

  return (
      <div className='dashboard'>
      <h1>This is your dashboard!</h1>
      <button className='login_btn' onClick={logoutHandler}>LOGOUT</button>
    </div>
  )
}
export default Dashboard;
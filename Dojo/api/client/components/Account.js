import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Logout } from '../store/actions/authAction';

const Account = () => {
  
  const dispatch = new useDispatch();
  const navigate = new useNavigate();

  const logoutHandler = (e) => {
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

  return (
    <div>
      <nav className="menubar">  
      <ul className="fa-ul">
        <Link to="/account/usr-config"><li >
          <i className="fa fa-user-cog menu-icon"></i>
          <span className='settings-btn'>Account</span></li>
        </Link>
        <li style={{padding:"5px"}} onClick={logoutHandler}>
          <i className="fa fa-sign-out-alt menu-icon"></i>
          <span className='settings-btn'>Logout</span></li>
       </ul>
     </nav>
    </div>
  )
}



export default Account;
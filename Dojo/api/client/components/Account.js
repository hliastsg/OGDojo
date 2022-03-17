import React from 'react';
import { Link ,Navigate} from 'react-router-dom';

const Account = () => {

  return (
    <div>
      <nav className="menubar">
      <Link to="/account/usr-config">
        <li className="menu-acc">
        <i className="fas fa-user-cog"></i>
        <h4>Account</h4>
        </li>
        </Link>
     </nav>
    </div>
  )
}



export default Account;
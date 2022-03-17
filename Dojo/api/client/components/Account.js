import React from 'react';
import { Link ,Navigate} from 'react-router-dom';

const Account = () => {

  return (
    <div>
      <nav className="menubar">  
      <ul className='menu-icon'>
      <Link to="/account/usr-config">
        <li className="menu-icon">
        <i className="fas fa-user-cog"></i>
        <h4>&nbsp;Account</h4>
        </li>
      </Link>
      </ul>
     </nav>
    </div>
  )
}



export default Account;
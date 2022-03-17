import axios from 'axios';
import React from 'react';
import Account from './Account';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const AccConfig = () => {

  //Get user credentials from redux getUser reducer
  const user = {
    email : useSelector(state => state.auth.user),
    name : useSelector(state => state.getUser.name),
    surname : useSelector(state => state.getUser.surname),
    dob : useSelector(state => state.getUser.dob)
  }
  //Initialise state when the user changes his credentials
  const [updateValues,setUpdateValues] = useState(user);
  
  //Make a post request to the server with new updated user credentials to update data to the database
  const handleOnChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUpdateValues({ ...updateValues, [name]: value });
    console.log(updateValues);
    // axios
    // .post(("/api/account/edit"), { email: email })
    // .then((response) => {
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  }
  
  
  return (
    <div>
      <Account/>
      <div className="config">
        <h1>User Configuration</h1>
        <p>In this section, you can edit your credentials, in case that you made a mistake when you created your account. <br />
          Click the save button to update your credentials.
        </p>
        <form className="config-form">
          <label >First Name</label>
          <input 
            id="usr-input" 
            type="text" 
            name="name"
            // placeholder={user.name}
            value={updateValues.name}
            onChange={handleOnChange}/>
          <label>Last Name</label>
          <input
           id="usr-input" 
           type="text" 
           name="surname"
           value={updateValues.surname}
           onChange={handleOnChange}/>
          <label>E-mail</label>
          <input 
            id="usr-input" 
            type="text" 
            name="email"
            value={updateValues.email}
            onChange={handleOnChange}/>
          <label>Date of birth</label>
          <input 
            id="usr-input" 
            type="text" 
            name="dob"
            value={updateValues.dob}
            onChange={handleOnChange}/>
          <input id="input-submit" type="submit" value="SAVE" className="signup_btn"/>
        </form>
      </div>
    </div>
  )
}

export default AccConfig;
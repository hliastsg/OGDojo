import axios from 'axios';
import React from 'react';
import Account from './Account';
import { useEffect, useState } from 'react';
import { growl } from '@crystallize/react-growl';

const AccConfig = () => {


  const user = {
    email: localStorage.getItem("email"),
    name: localStorage.getItem("name"),
    surname: localStorage.getItem("surname"),
    dob: localStorage.getItem("dob")
  }

  
  //Initialise state when the user changes his credentials
  const [updateValues,setUpdateValues] = useState(user);
  //Initialise errors for form validation
  const [errors, setErrors] = useState({});
  //Did user submit the form?
  const [isSubmit, setIsSubmit] = useState(false);
  const [result, setResult] = useState("");

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexDate = /^\d{4}-\d{2}-\d{2}$/;
    if (!values.name) {
      error.name = "First Name is required!";
    }
    if (!values.surname) {
      error.surname = "Surname is required!";
    }
    if (!values.email) {
      error.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      error.email = "This is not a valid email format!";
    }
    if (!values.dob) {
      error.dob = "Date of Birth is required!";
    } else if (!regexDate.test(values.dob)) {
      error.dob = "Date format should be like this: YYYY-MM-DD"
    }
    return error;
  }
  
  //Make a post request to the server with new updated user credentials to update data to the database
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUpdateValues({ ...updateValues, [name]: value });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(updateValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(errors). length === 0 && isSubmit) {
      axios
      .post(('/api/account/edit'), updateValues, {
        headers: {
          'email': user.email}
        })
      .then((response) => {
        localStorage.setItem("name", response.data.name);
        localStorage.setItem("surname", response.data.surname);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("dob", response.data.dateofbirth.toString().split('T')[0]);
        const { name, value } = response.data;
        setUpdateValues({ ...updateValues, [name]: value });
        growl({
          title: 'Dojo',
          message: 'Update sauccess'
      });
    
        setResult("Credentials updated succesfully!");
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 409) {
          setResult("Email already in use!");
        }
      });
    }
  }, [errors]);
  
  return (
    <div>
      <Account/>
      <div className="config">
        <h1>User Configuration</h1>
        <p>In this section, you can edit your credentials, in case that you made a mistake when you created your account. <br />
          Click the save button to update your credentials.
        </p>
        <form onSubmit={onSubmit} className="config-form">
          <label >First Name</label>
          <input 
            className={errors.name ? "config-form error" : ""}
            type="text" 
            name="name"
            placeholder='First Name'
            value={updateValues.name}
            onChange={handleOnChange}/>
          {/* <i className={errors.name ? "fas fa-exclamation-circle" : ""}></i> */}
          <small>{errors.name}</small>
          <label>Last Name</label>
          <input
           className={errors.surname ? "config-form error" : ""}
           type="text" 
           name="surname"
           placeholder='Last Name'
           value={updateValues.surname}
           onChange={handleOnChange}/>
          {/* <i className={errors.surname ? "fas fa-exclamation-circle" : ""}></i> */}
          <small>{errors.surname}</small>
          <label>E-mail</label>
          <input 
            className={errors.email ? "config-form error" : ""}
            type="text" 
            name="email"
            placeholder='E-Mail'
            value={updateValues.email}
            onChange={handleOnChange}/>
          {/* <i className={errors.email ? "fas fa-exclamation-circle" : ""}></i> */}
          <small>{errors.email}</small>
          <label>Date of birth</label>
          <input 
            className={errors.dob ? "config-form error" : ""}
            type="text" 
            name="dob"
            placeholder='YYYY-MM-DD'
            value={updateValues.dob}
            onChange={handleOnChange}/>
          {/* <i className={errors.dob ? "fas fa-exclamation-circle" : ""}></i> */}
          <small>{errors.dob}</small>
          <input id="save_btn" type="submit" value="SAVE"/>
          <small id={result === "Credentials updated succesfully!" ? "update-result" : "update-result.error"}>{result}</small>
        </form>
      </div>
    </div>
  )
}

export default AccConfig;
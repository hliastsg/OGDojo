import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { LoginSuccess, LoginError } from '../store/actions/authAction';
import { growl } from '@crystallize/react-growl';

const Register = ({ nav }) => {

  const [matchPass, setMatchPass] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const initialValues = { name: "", surname: "", email: "", password: "", dob: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerUser = (e) => {
    e.preventDefault();
    setErrors(validate(formValues));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmit) {
      axios
        .post('http://localhost:3006/api/account/register', {
          name: formValues.name, surname: formValues.surname, email: formValues.email,
          password: formValues.password, dateofbirth: formValues.dob})
        .then((response) => {
          localStorage.setItem("email",response.data.email);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("surname", response.data.surname);
          localStorage.setItem("dob", response.data.dateofbirth.toString().split('T')[0]);
          console.log(localStorage.getItem("dob"));
          dispatch(LoginSuccess());
          navigate("/dashboard");
          growl({
            title: 'Dojo',
            message: 'Signed up succesfully'
        });
        })
        .catch((err) => {
          alert(err.response.data);
          if (err.response.status === 409) {
            dispatch(LoginError());
            navigate("/login");
          }
        })
      
    }
  }, [errors]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }
  
  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
    if (!values.password) {
      error.password = "Password is required!";
    } else if (matchPass != values.password) {
      error.password = "Passwords do not match!";
    } else if (values.password.length < 4) {
      error.password = "Password must be at least 5 characters!"
    } else if (values.password.length > 12) {
      error.password = "Password cannot exceed more than 12 characters!"
    }
    if (!values.dob) {
      error.dob = "Date of Birth is required!";
    }
    return error;
  }
  const isAuth = useSelector(state => state.auth.isAuthenticated);

  return !isAuth ? (
    <form onSubmit={registerUser}
      className={nav ? "forms active__ welcome" : "forms welcome"}
    >
      {Object.keys(errors).length === 0 && isSubmit ? (<p id="rgstr">Signed up succesfully!</p>)
        : <pre id="rgstr">Complete the fields to register</pre>}
      <div className="form_control">
        <input
          className={errors.name ? "form_control error" : ""}
          type="text"
          name="name"
          value={formValues.name}
          placeholder="First Name"
          onChange={handleOnChange}
        />
        <i className={errors.name ? "fas fa-exclamation-circle" : ""}></i>
        <small>{errors.name}</small>
      </div>

      <div className="form_control">
        <input
          className={errors.surname ? "form_control error" : ""}
          type="text"
          name="surname"
          value={formValues.surname}
          placeholder="Surname"
          onChange={handleOnChange}
        />
        <i className={errors.surname ? "fas fa-exclamation-circle" : ""}></i>
        <small>{errors.surname}</small>
      </div>

      <div className="form_control">
        <input
          className={errors.email ? "form_control error" : ""}
          type="email"
          name="email"
          value={formValues.email}
          placeholder="E-Mail"
          onChange={handleOnChange}
        />
        <i className={errors.email ? "fas fa-exclamation-circle" : ""}></i>
        <small>{errors.email}</small>
      </div>

      <div className="form_control">
        <input
          className={errors.password ? "form_control error" : ""}
          type="password"
          name="password"
          value={formValues.password}
          placeholder="Create Password"
          onChange={handleOnChange}
        />
        <i className={errors.password ? "fas fa-exclamation-circle" : ""}></i>
        <small>{errors.password}</small>
      </div>

      <div className="form_control">
        <input
          className={errors.password ? "form_control error" : ""}
          type="password"
          value={matchPass}
          placeholder="Confirm Password"
          onChange={(e) => setMatchPass(e.target.value)}
        />
        <i className={errors.password ? "fas fa-exclamation-circle" : ""}></i>
        <small>{errors.password}</small>
      </div>

      <div className="form_control">
        <input
          className={errors.dob ? "form_control error" : ""}
          type="date"
          name="dob"
          value={formValues.dob}
          placeholder="Date of Birth"
          onChange={handleOnChange}
        />
        <i className={errors.dob ? "fas fa-exclamation-circle" : ""}></i>
        <small>{errors.dob}</small>
      </div>
      <input id="input-submit" className="login_btn" type="submit" value="REGISTER" disabled={Object.keys(errors).length === 0 && isSubmit} />
      <Link to="/">
        <button className='back_btn'>BACK</button>
      </Link>
    </form>
  ) : <Navigate to='/dashboard'/>
}
export default Register;
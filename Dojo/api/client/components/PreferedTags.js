import React from 'react';
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { LoginSuccess, LoginError } from '../store/actions/authAction';
import {useDispatch, useSelector} from 'react-redux';
import { growl } from '@crystallize/react-growl';
import Tags from './Tags.js'

const PreferedTags = ({formValues}) => {

  const [tags, setTags] = useState([
    'Music', 'Theatre', 'Party', 'Cinema', 'Performance', 'Conference', 'Seminar', 'Photography'
  ])
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerOnClick = () => {
    axios
    .post('http://localhost:3006/api/account/register', {
      name: formValues.name, surname: formValues.surname, email: formValues.email,
      password: formValues.password, dateofbirth: formValues.dob, interests: tags})
    .then((response) => {
      localStorage.setItem("email",response.data.email);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("surname", response.data.surname);
      localStorage.setItem("dob", response.data.dateofbirth.toString().split('T')[0]);

      dispatch(LoginSuccess());
      navigate("/dashboard");
      
      growl({
        title: 'Dojo',
        message: 'Signed up succesfully'
    });
    })
    .catch((err) => {
      alert(err);
      if (err.response.status === 409) {
        dispatch(LoginError());
        navigate("/login");
      }
    })
  }

  return (
    <div className="prefered-tags welcome">
      <h1>Select or type some event categories that you're interested in</h1>
    <Tags tags={tags} setTags={setTags} />
    <button className="signup_btn " onClick={registerOnClick}> REGISTER</button>
    </div>
    
  )
}
export default PreferedTags;
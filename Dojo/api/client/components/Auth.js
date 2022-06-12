import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { LoginError } from "../store/actions/authAction";
import Cookies from 'universal-cookie';

const Auth = ({children}) => {
  
  const auth = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const cookie = cookies.get("access_token");

  if (auth && cookie) {
    return children;
  }
  else {
    dispatch(LoginError());
    return  <Navigate to ='/401'/>;
  }
} 
export default Auth;
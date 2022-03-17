import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Auth = ({children}) => {
  const auth = useSelector(state => state.auth.isAuthenticated);
  return auth ? children : <Navigate to ='/401'/>;
} 
export default Auth;
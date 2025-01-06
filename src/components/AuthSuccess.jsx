import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../features/authSlice/authSlice';
const AuthSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    if (token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', token);
      dispatch(setAuth(true))
      // Redirect to the CreateEvent page
      navigate('/create-event');
    } else {
      // Handle the case where there is no token
      console.error('No token found in URL');
      // Optionally redirect to an error page or show a message
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AuthSuccess;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    console.log(token)
    if (token) {
      // Store the token in localStorage
      localStorage.setItem('authToken', token);

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

import React from 'react';
import axios from 'axios';

const GoogleAuth = () => {
  const handleAuth = async () => {
    try {
      const response = await axios.get(`https://afternoon-coast-61757-490898156666.herokuapp.com/api/google/google-auth`);
      window.location.href = response.data.url; // Redirect user to Google auth URL
    } catch (error) {
      console.error('Error generating auth URL', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <button
        onClick={handleAuth}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300 ease-in-out"
      >
        Authenticate with Google
      </button>
    </div>
  );
};

export default GoogleAuth;

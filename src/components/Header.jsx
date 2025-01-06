import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { toggleAuth, setAuth } from '../features/authSlice/authSlice';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const authValue = useSelector((state) => state.auth.isAuthenticated);
  console.log(authValue)
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log(!!authToken)
    console.log(authToken)
    dispatch(setAuth(!!authToken))
    setIsAuthenticated(!!authToken); // Set authentication status based on presence of authToken in local storage
  }, []);

  const handleAuth = async () => {
    try {
      const response = await axios.get(`https://afternoon-coast-61757-490898156666.herokuapp.com/api/google/google-auth`);
      dispatch(toggleAuth())
      console.log(authValue)
      window.location.href = response.data.url; // Redirect user to Google auth URL
      console.log(authValue)
    } catch (error) {
      console.error('Error generating auth URL', error);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem('authToken')
      setIsAuthenticated(false)
      dispatch(toggleAuth())
    } catch (error) {
      console.error('Error generating auth URL', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
  <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
    {/* Left Side: Home */}
    <nav className="text-lg font-semibold">
      <a href="/" className="hover:text-indigo-400 transition">Home</a>
    </nav>
    
    {/* Right Side: Conditional Navigation */}
    <div className="flex space-x-4">
      {!isAuthenticated ? (
        <nav onClick={handleAuth} className="text-lg font-semibold cursor-pointer hover:text-indigo-400 transition">
          Login Using Google
        </nav>
      ) : (
        <>
          <nav className="text-lg font-semibold">
            <a href="/create-event" className="hover:text-indigo-400 transition">Create Event</a>
          </nav>
          <nav onClick={logout} className="text-lg font-semibold cursor-pointer hover:text-indigo-400 transition">
            Logout
          </nav>
        </>
      )}
    </div>
  </div>
</header>

  );
}

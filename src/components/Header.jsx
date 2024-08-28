import axios from "axios";
import { useEffect, useState } from "react";

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(!!authToken); // Set authentication status based on presence of authToken in local storage
  }, []);

  const handleAuth = async () => {
    try {
      const response = await axios.get(`https://afternoon-coast-61757-490898156666.herokuapp.com/api/google/google-auth`);
      window.location.href = response.data.url; // Redirect user to Google auth URL
    } catch (error) {
      console.error('Error generating auth URL', error);
    }
  };

  return (
    <header className="bg-gray-800 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <nav className="text-lg font-semibold">
          <a href="/" className="hover:text-indigo-400 transition">Home</a>
        </nav>
        <nav className="text-lg font-semibold">
          <a href="/create-event" className="hover:text-indigo-400 transition">Create Event</a>
        </nav>
        {!isAuthenticated && (
          <nav onClick={handleAuth} className="text-lg font-semibold cursor-pointer hover:text-indigo-400 transition">
            Login
          </nav>
        )}
      </div>
    </header>
  );
}

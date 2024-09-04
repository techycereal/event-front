import React, { useEffect, useState } from 'react';
import axios from 'axios';
import crowd from '../assets/crowd.jpeg'
const JoinEvent = () => {
  const [events, setEvents] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const query = await axios.get(`http://localhost:3000/api/database/all-events`);
        console.log(query.data);
        setEvents(query.data);
      } catch (error) {
        console.error('Error fetching events', error);
      }
    };

    // Check authentication status
    const checkAuth = () => {
      const authToken = localStorage.getItem('authToken');
      setIsAuthenticated(!!authToken); // Set authentication status based on presence of authToken in local storage
    };

    checkAuth(); // Check authentication status on component mount
    getEvents(); // Fetch events
  }, []);

  const handleJoin = async (eventId, start, end) => {
    try {
      // Perform any additional actions you need when joining an event
      console.log('Joining event with ID:', eventId);
      // Call your API to join the event here if needed
    } catch (error) {
      console.error('Error joining event', error);
    }
  };

  return (
<div className="w-full text-white">
<section
        id="hero"
        className="text-white h-[50vh] flex items-center justify-center px-6 md:px-10 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${crowd})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-start z-10">
          <h1 className="text-5xl font-bold mb-4 text-shadow">Join the Excitement</h1>
          <p className="text-xl mb-6 text-shadow">Discover and participate in events happening around you.</p>
        </div>
      </section>

  <div className="max-w-7xl mx-auto p-6 text-white">
    <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events ? (
        events.map((event) => (
          <div key={event.eventId} className="bg-white text-black p-4 rounded-md shadow-md flex flex-col items-center space-y-4">
            {event.imageUrl && (
              <img
                src={event.imageUrl}
                alt="Event"
                className="w-full h-32 object-cover rounded-md"
              />
            )}
            <div className="flex flex-col space-y-2 text-center">
              <p className="text-lg font-medium text-gray-800">Summary: {event.summary}</p>
              <p className="text-sm text-gray-600">Description: {event.description}</p>
              <p className="text-sm text-gray-600">Start: {formatDateTime(event.start)}</p>
              <p className="text-sm text-gray-600">End: {formatDateTime(event.end)}</p>
            </div>
              <a
                href={`${event.inviteLink}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleJoin(event.eventId, event.start, event.end)}
                className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Join Event
              </a>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading events...</p>
      )}
    </div>
  </div>
</div>
  );
};

// Helper function to format date-time objects
const formatDateTime = (dateTimeObj) => {
  if (dateTimeObj) {
    const { dateTime, timeZone } = dateTimeObj;
    return `${new Date(dateTime).toLocaleString()} (${timeZone})`;
  }
  return 'N/A';
};

export default JoinEvent;

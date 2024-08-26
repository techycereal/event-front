import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JoinEvent = () => {
  const [events, setEvents] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const query = await axios.get(`${BASE_URL}/api/database/all-events`);
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
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      {events ? (
        events.map((event) => (
          <div key={event.eventId} className="p-4 bg-gray-50 rounded-md shadow-sm flex items-center justify-between space-x-4">
            <div className="flex flex-1 items-center space-x-4">
              {/* Display the image if available */}
              {event.imageUrl && (
                <img
                  src={event.imageUrl}
                  alt="Event"
                  className="w-32 h-32 object-cover rounded-md"
                />
              )}
              <div className="flex flex-col space-y-2">
                <p className="text-lg font-medium text-gray-800">Summary: {event.summary}</p>
                <p className="text-sm text-gray-600">Description: {event.description}</p>
                <p className="text-sm text-gray-600">Start: {formatDateTime(event.start)}</p>
                <p className="text-sm text-gray-600">End: {formatDateTime(event.end)}</p>
              </div>
              {isAuthenticated ? (
                <a
                  href={`${event.inviteLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleJoin(event.eventId, event.start, event.end)}
                  className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Join Event
                </a>
              ) : (
                <p className="text-lg font-medium text-red-600">Log in to join this event</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Loading events...</p>
      )}
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

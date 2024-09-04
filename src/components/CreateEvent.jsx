import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
const CreateEvent = () => {
  const [event, setEvent] = useState({
    summary: '',
    location: '',
    description: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    attendees: [],
  });
  const authValue = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authValue == false) {
      window.location.pathname = '/'
    }
  }, [authValue])

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage

    try {
      const startDateTime = new Date(`${event.startDate}T${event.startTime}:00${getTimeZoneOffset()}`);
      const endDateTime = new Date(`${event.endDate}T${event.endTime}:00${getTimeZoneOffset()}`);

      const formattedEvent = {
        summary: event.summary,
        location: event.location,
        description: event.description,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: event.timeZone,
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: event.timeZone,
        },
      };

      const formData = new FormData();
      formData.append('event', JSON.stringify(formattedEvent));
      if (file) {
        formData.append('image', file);
      }

      const response = await axios.post(`http://localhost:3000/api/google/create-event`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Event created:', response.data);
    } catch (error) {
      console.error('Error creating event', error);
    }
  };

  // Get timezone offset in format "+hh:mm"
  const getTimeZoneOffset = () => {
    const offset = -new Date().getTimezoneOffset();
    const sign = offset >= 0 ? '+' : '-';
    const paddedOffset = String(Math.abs(offset)).padStart(4, '0');
    return `${sign}${paddedOffset.slice(0, 2)}:${paddedOffset.slice(2)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Summary</label>
        <input
          type="text"
          name="summary"
          placeholder="Event Summary"
          value={event.summary}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Location</label>
        <input
          type="text"
          name="location"
          placeholder="Event Location"
          value={event.location}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Description</label>
        <textarea
          name="description"
          placeholder="Event Description"
          value={event.description}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={event.startDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            name="startTime"
            value={event.startTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={event.endDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            name="endTime"
            value={event.endTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
        />
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Event
      </button>
    </form>
  );
};

export default CreateEvent;

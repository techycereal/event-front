import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GoogleAuth from './components/GoogleAuth'; // Replace with your component
import AuthSuccess from './components/AuthSuccess';
import CreateEvent from './components/CreateEvent';
import JoinEvent from './components/JoinEvent';
import './index.css'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/" element={<JoinEvent />} />
      </Routes>
    </Router>
  );
};

export default App;

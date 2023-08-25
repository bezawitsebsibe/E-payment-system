import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home';
import UserLogin from './pages/userLogin';
import RegistrationForm from './pages/userRegistration';
import ServiceProvidersDetails  from './pages/chooseServiceProvider';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/login" element={<UserLogin />} />
          <Route path="/" element={<HomePage />} />
         
        </Routes>
      </Router>
    </div>
  );
}
export default App;


import './App.css';
import HomePage from './pages/home';
import UserLogin from './pages/userLogin';
import RegistrationForm from './pages/userRegistration';
import ServiceProvidersDetails  from './pages/chooseServiceProvider';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './Admin/adminLogin.js';
import Dashboard from './Admin/dashboard.js';
import AgentsList from './Admin/agentList.js';
import ServiceProvidersList from './Admin/serviceProviderList.js';
import UsersList from './Admin/userList.js';
import ServiceProviderRegistrationForm from './Admin/serviceProviderRegistration.js';
import AdminRegistrationForm from './Admin/adminRegistration.js';
import AgentRegistrationForm from './Admin/agentRegistration.js';
import AgentDetail from './pages/agentDetail.js'; 
import AboutUsPage from './pages/aboutUs.js';
import ContactUs from './pages/contactUs.js';
import Payment from './pages/payment.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);

  const handleServiceProviderClick = (serviceProvider) => {
    setSelectedServiceProvider(serviceProvider);
  };
  return (
    <Router> 
      <Routes>
         
       <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<UserLogin />} />
         <Route path="/login/serviceProviders" element={< ServiceProvidersDetails/>} />
           <Route path="/signup" element={<RegistrationForm />} />
         <Route path="/signup/serviceProviders" element={< ServiceProvidersDetails/>} />
         <Route path="/payment" element={<  Payment/>} />
         <Route path="/aboutUs" element={< AboutUsPage />} />
         <Route path="/contactUs" element={<  ContactUs />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard/:adminId" element={<Dashboard />} />
        <Route
          path="/admin/agents"
          element={<AgentsList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/agents/registration"
          element={<AgentRegistrationForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/service-providers"
          element={<ServiceProvidersList
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            onServiceProviderClick={handleServiceProviderClick}
          />}
        />
        <Route
          path="/admin/users"
          element={<UsersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/service-providers/registration"
          element={<ServiceProviderRegistrationForm />}
        />
        <Route
          path="/admin/user/registration"
          element={<AdminRegistrationForm />}
        />
          <Route
          path="/agents"
          element={
            <AgentDetail
            /> 
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

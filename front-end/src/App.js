
import './App.css';
import HomePage from './pages/home';
import UserLogin from './pages/userLogin';
import RegistrationForm from './pages/userRegistration';
import ServiceProvidersDetails  from './pages/chooseServiceProvider';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/Admin/adminLogin';
import Dashboard from './pages/Admin/dashboard';
import AgentsList from './pages/Admin/agentsList';
import ServiceProvidersList from './pages/Admin/serviceProviderList';
import UsersList from './pages/Admin/usersList';
import PaymentList from './pages/Admin/Transactions';
import ServiceProviderRegistrationForm from './pages/Admin/serviceProvidersRegistration';
import AdminsList from './pages/Admin/AdminsList.js';
import AdminRegistrationForm from './pages/Admin/adminRegistration';
import AgentRegistrationForm from './pages/Admin/agentRegistration';
import AgentDetail from './pages/agentDetail.js'; 
import AboutUsPage from './pages/aboutUs.js';
import Services from './pages/chooseServiceProvider.js';
import ContactUs from './pages/contactUs.js';
import Payment from './pages/payment.js';
import ResetPasswordForm from './pages/resetPassword';
import ServiceNumber from './pages/serviceNumber.js';
import Home from './pages/Admin/index.js';

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
       <Route path="/users" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
      
         <Route path="/Users/resetpassword" element={< ResetPasswordForm />} />
           <Route path="/signup" element={<RegistrationForm />} />
         <Route path="/signup/user" element={< HomePage/>} />
         <Route path="/serviceNumber" element={<  ServiceNumber/>} />
         <Route path="/aboutUs" element={< AboutUsPage />} />
         <Route path="/contactUs" element={<  ContactUs />} />
         {/* <Route path="/services" element={<   Services/>} /> */}
      
         <Route path="/payment" element ={<Services />}/>
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin/dashboard/:adminId" element={<Home />} />
        <Route
          path="/admin/agents/:adminId"
          element={<AgentsList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/agents/registration/:adminId"
          element={<AgentRegistrationForm isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/service-providers/:adminId"
          element={<ServiceProvidersList
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            onServiceProviderClick={handleServiceProviderClick}
          />}
        />
         <Route 
        path="/admin/usersList/:adminId"
        element= {<UsersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
         <Route 
        path="/admin/adminsList/:adminId"
        element= {<AdminsList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  />}
        />
        <Route
          path="/admin/users/:adminId"
          element={<UsersList isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/admin/service-providers/registration/:adminId"
          element={<ServiceProviderRegistrationForm />}
        />
        <Route
          path="/admin/user/registration/:adminId"
          element={<AdminRegistrationForm />}
        />
        <Route 
        path="/admin/transactions/:adminId"
        element= {<PaymentList />}
        />
        <Route
        
          path="/agents"
          element={
            <AgentDetail/>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
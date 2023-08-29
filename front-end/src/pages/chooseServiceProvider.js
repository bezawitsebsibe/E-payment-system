import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './homePage.css';
import axios from 'axios';

const ServiceProvidersDetails = () => {
  const navigate = useNavigate();
  const [serviceProviderData, setServiceProviderData] = useState([]);

  useEffect(() => {
    fetchServiceProviders();
  }, []);

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get('http://localhost:3001/serviceprovider');
      setServiceProviderData(response.data);
    } catch (error) {
      message.error('Failed to fetch service providers.');
    }
  };

  const handleServiceProviderClick = (serviceProvider) => {
    console.log('Selected service provider:', serviceProvider);
    navigate('/payment'); // Navigate to 'payment' page
  };

  return (
    <div className="list-container">
    <div className='class'>
    <h1 className='list-header'>Choose the Service Providers you want </h1>
      <ul>
        {serviceProviderData.map((serviceProvider) => (
          <li key={serviceProvider.id}>
            <button type="primary" onClick={() => handleServiceProviderClick(serviceProvider)}>
              {serviceProvider.serviceProviderName}
            </button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default ServiceProvidersDetails;

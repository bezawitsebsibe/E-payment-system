import React, { useState, useEffect } from 'react';
import { Table, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './styles.css';

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
    navigate('/agents'); // Navigate to '/agents' page
  };

  const columns = [
    {
      dataIndex: 'serviceProviderName',
      key: 'serviceProviderName',
      render: (text, record) => (
        <Button type="primary" onClick={() => handleServiceProviderClick(record)}>
          {text}
        </Button>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Service Providers List</h1>
      <Table dataSource={serviceProviderData} columns={columns} className="ant-table" />
    </div>
  );
};

export default ServiceProvidersDetails;
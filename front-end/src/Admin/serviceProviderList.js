import React, { useState, useEffect } from 'react';
import { Table, Upload, Button, message, Modal, Form, Input,  } from 'antd';
import { DeleteOutlined, EditOutlined,UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Dashboard from './dashboard';
const ServiceProvidersList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [serviceProviderData, setServiceProviderData] = useState([]);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [serviceProvider, setServiceProvider] = useState(null);
  const [searchInput, setSearchInput] = useState('');


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

  

  // const handleEdit = (serviceProvider) => {
  //   const { serviceProviderAuthorizationLetter, ...otherFields } = serviceProvider;
  //   form.setFieldsValue(otherFields);
  //   setEditMode(true);
  //   setServiceProvider(serviceProvider);
  // };

  const handleEdit = (serviceProvider) => {
    form.setFieldsValue(serviceProvider);
    setEditMode(true);
    setServiceProvider(serviceProvider);
  };


  const handleSave = () => {
    Modal.confirm({
      title: 'Confirm Edit',
      content: 'Are you sure you want to edit this service provider?',
      okText: 'Edit',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        
       // Get form values
       form.validateFields().then((values) => {
        const updatedserviceProvider = { ...values, id: serviceProvider.id };

        // Create FormData object
        const formData = new FormData();
        formData.append('serviceProviderAuthorizationLetter', values.serviceProviderAuthorizationLetter[0]); // Assuming only one file is selected

        // Update serviceProvider data
        axios
          .put(`http://localhost:3001/serviceprovider/${updatedserviceProvider.id}`, updatedserviceProvider)
          .then((response) => {
            if (response.status === 200) {
              // Upload file separately
              axios
                .put(`http://localhost:3001/serviceprovider/${updatedserviceProvider.id}`, formData)
                .then((uploadResponse) => {
                  if (uploadResponse.status === 200) {
                    message.success('serviceProvider data and file updated successfully.');
                    const updatedData = serviceProviderData.map((serviceProvider) =>
                      serviceProvider.id === updatedserviceProvider.id ? updatedserviceProvider : serviceProvider
                    );
                    setServiceProviderData(updatedData);
                    setEditMode(false);
                    form.resetFields();
                  } else {
                    message.error('Failed to upload file.');
                  }
                })
                .catch((error) => {
                  message.error('Failed to upload file.');
                });
            } else {
              message.error('Failed to update serviceProvider data.');
            }
          })
          .catch((error) => {
            message.error('Failed to update serviceProvider data.');
          });
      });
    },
  });
};
  const handleDelete = (serviceProviderId) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this service provider?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        axios
          .delete(`http://localhost:3001/serviceprovider/${serviceProviderId}`)
          .then((response) => {
            if (response.status === 200) {
              message.success('Service provider deleted successfully.');
              const updatedData = serviceProviderData.filter((sp) => sp.id !== serviceProviderId);
              setServiceProviderData(updatedData);
            } else {
              message.error('Failed to delete service provider.');
            }
          })
          .catch((error) => {
            message.error('Failed to delete service provider.');
          });
      },
    });
  };

  const columns = [
    {
      title: 'Service Provider BIN',
      dataIndex: 'serviceProviderBIN',
      key: 'serviceProviderBIN',
    },
    {
      title: 'Service Provider Name',
      dataIndex: 'serviceProviderName',
      key: 'serviceProviderName',
    },
    {
      title: 'Services Offered',
      dataIndex: 'servicesOffered',
      key: 'servicesOffered',
    },
    {
      title: 'Bank Name',
      dataIndex: 'BankName',
      key: 'BankName',
    },
    {
      title: 'Bank Account Number',
      dataIndex: 'BankAccountNumber',
      key: 'BankAccountNumber',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Authorization Letter',
      dataIndex: 'serviceProviderAuthorizationLetter',
      key: 'serviceProviderAuthorizationLetter',
      render: (_, serviceProvider) => (
        <div>
          {serviceProvider.serviceProviderAuthorizationLetter && (
            <div>
              <a href={`http://localhost:3001/${serviceProvider.serviceProviderAuthorizationLetter}`} download>
                Authorization Letter
              </a>
              <Button
                type="primary"
                onClick={() => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href = `http://localhost:3001/${serviceProvider.serviceProviderAuthorizationLetter}`;
                  downloadLink.download = 'Authorization Letter';
                  downloadLink.target = '_blank';
                  downloadLink.click();
                }}
              >
                Download
              </Button>
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, serviceProvider) => (
        <div>
          <Button onClick={() => handleEdit(serviceProvider)} icon={<EditOutlined />} type="danger">
            Edit
          </Button>
          <Button onClick={() => handleDelete(serviceProvider.id)} icon={<DeleteOutlined />} type="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

   const handleSearch = (value) => {
    setSearchInput(value);

    // Filter serviceData based on search input
    const filteredServiceProviders = serviceProviderData.filter((serviceProvider) => {
      const serviceProviderName = serviceProvider.serviceProviderName.toLowerCase();
      const phoneNumber = serviceProvider.phoneNumber.toLowerCase();
      const searchValue = value.toLowerCase();

      return (
        serviceProviderName.includes(searchValue) ||
        phoneNumber.includes(searchValue)
      );
    });

    setServiceProviderData(filteredServiceProviders);
  };

  return (
    <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} content={
      <div>
        <h1>Service Providers List</h1>
         <Input.Search
          placeholder="Search Service provider"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: '16px' }}
        />
        <Table dataSource={serviceProviderData} columns={columns} scroll={{ x: true }} />
        <Modal
          title={editMode ? 'Edit Service Provider' : 'Create Service Provider'}
          visible={editMode}
          onCancel={() => {
            setEditMode(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form}>
            <Form.Item name="serviceProviderBIN" label="Service Provider BIN">
              <Input />
            </Form.Item>
            <Form.Item name="serviceProviderName" label="Service Provider Name">
              <Input />
            </Form.Item>
            <Form.Item name="servicesOffered" label="Services Offered">
              <Input />
            </Form.Item>
            <Form.Item name="BankName" label="Bank Name">
              <Input />
            </Form.Item>
            <Form.Item name="BankAccountNumber" label="Bank Account Number">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>


<Form.Item name="serviceProviderAuthorizationLetter" label="Service Provider Authorization Letter">
  <Upload
    accept=".jpeg, .jpg, .png, .gif"
    beforeUpload={() => false}
    onChange={(info) => {
      if (info.fileList.length > 0) {
        form.setFieldsValue({ serviceProviderAuthorizationLetter: [info.fileList[0]] });
      } else {
        form.setFieldsValue({ serviceProviderAuthorizationLetter: [] });
      }
    }}
  >
    <Button icon={<UploadOutlined />}>Select File</Button>
  </Upload>
</Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal>
      </div>}
    />
  );
};

export default ServiceProvidersList;
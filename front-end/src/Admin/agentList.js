import React, { useState, useEffect } from 'react';
import { Table, Button, message, Modal, Form, Input, Upload } from 'antd';
import { DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import Dashboard from './dashboard';

const AgentsList = ({ isLoggedIn, setIsLoggedIn }) => {
  const [agentData, setAgentData] = useState([]);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [agent, setAgent] = useState(null);
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/agent');
      setAgentData(response.data);
    } catch (error) {
      message.error('Failed to fetch agents.');
    }
  };

  const handleEdit = (agent) => {
    form.setFieldsValue(agent);
    setEditMode(true);
    setAgent(agent);
  };
  

  const handleSave = () => {
    Modal.confirm({
      title: 'Confirm Edit',
      content: 'Are you sure you want to edit this agent?',
      okText: 'Edit',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        // Get form values
        form.validateFields().then((values) => {
          const updatedAgent = { ...values, id: agent.id };

          // Create FormData object
          const formData = new FormData();
          formData.append('agentAuthorizationLetter', values.agentAuthorizationLetter[0]); // Assuming only one file is selected

          // Update agent data
          axios
            .put(`http://localhost:3001/agent/${updatedAgent.id}`, updatedAgent)
            .then((response) => {
              if (response.status === 200) {
                // Upload file separately
                axios
                  .put(`http://localhost:3001/agent/${updatedAgent.id}`, formData)
                  .then((uploadResponse) => {
                    if (uploadResponse.status === 200) {
                      message.success('Agent data and file updated successfully.');
                      const updatedData = agentData.map((agent) =>
                        agent.id === updatedAgent.id ? updatedAgent : agent
                      );
                      setAgentData(updatedData);
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
                message.error('Failed to update agent data.');
              }
            })
            .catch((error) => {
              message.error('Failed to update agent data.');
            });
        });
      },
    });
  };

  const handleDelete = (agentId) => {
    Modal.confirm({
      title: 'Confirm Delete',
      content: 'Are you sure you want to delete this agent?',
      okText: 'Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: () => {
        axios
          .delete(`http://localhost:3001/agent/${agentId}`)
          .then((response) => {
            if (response.status === 200) {
              message.success('Agent deleted successfully.');
              const updatedData = agentData.filter((agent) => agent.id !== agentId);
              setAgentData(updatedData);
            } else {
              message.error('Failed to delete agent.');
            }
          })
          .catch((error) => {
            message.error('Failed to delete agent.');
          });
      },
    });
  };

  const columns = [
    {
      title: 'Agent BIN',
      dataIndex: 'agentBIN',
      key: 'agentBIN',
    },
    {
      title: 'Agent Name',
      dataIndex: 'agentName',
      key: 'agentName',
    },
    {
      title: 'Agent Email',
      dataIndex: 'agentEmail',
      key: 'agentEmail',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Authorization Letter',
      dataIndex: 'agentAuthorizationLetter',
      key: 'agentAuthorizationLetter',
      render: (_, agent) => (
        <div>
          {agent.agentAuthorizationLetter && (
            <div>
              <a href={`http://localhost:3001/${agent.agentAuthorizationLetter}`} download>
                Authorization Letter
              </a>
              <Button
                type="primary"
                onClick={() => {
                  const downloadLink = document.createElement('a');
                  downloadLink.href = `http://localhost:3001/${agent.agentAuthorizationLetter}`;
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
      render: (_, agent) => (
        <div>
          <Button onClick={() => handleEdit(agent)} icon={<EditOutlined />} type="danger">Edit</Button>
          <Button onClick={() => handleDelete(agent.id)} icon={<DeleteOutlined />} type="danger">Delete</Button>
        </div>
      ),
    },
  ];
  const handleSearch = (value) => {
    setSearchInput(value);

    // Filter agentData based on search input
    const filteredAgents = agentData.filter((agent) => {
      const agentName = agent.agentName.toLowerCase();
      const agentEmail = agent.agentEmail.toLowerCase();
      const phoneNumber = agent.phoneNumber.toLowerCase();
      const searchValue = value.toLowerCase();

      return (
        agentName.includes(searchValue) ||
        agentEmail.includes(searchValue) ||
        phoneNumber.includes(searchValue)
      );
    });

    setAgentData(filteredAgents);
  };



  return (
    <Dashboard isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} content={
      <div>
        <h1>Agents List</h1>
        <Input.Search
          placeholder="Search agents"
          value={searchInput}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: '16px' }}
        />

        <Table dataSource={agentData} columns={columns} scroll={{ x: true }} />

        <Modal
          title={editMode ? 'Edit Agent' : 'Create Agent'}
          visible={editMode}
          onCancel={() => {
            setEditMode(false);
            form.resetFields();
          }}
          footer={null}
        >
          <Form form={form}>
            <Form.Item name="agentBIN" label="Agent BIN">
              <Input />
            </Form.Item>
            <Form.Item name="agentName" label="Agent Name">
              <Input />
            </Form.Item>
            <Form.Item name="agentEmail" label="Agent Email">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input />
            </Form.Item>
            <Form.Item name="agentAuthorizationLetter" label="Agent Authorization Letter">
              <Upload accept=".jpeg, .jpg, .png, .gif" beforeUpload={() => false}>
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

export default AgentsList;
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Menu, Avatar, Button, message, Form, Input, Upload, Modal } from 'antd';
import {
  UserOutlined,
  BankOutlined,
  SolutionOutlined,
  TransactionOutlined,
  LogoutOutlined,
  UploadOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const Dashboard = ({ isLoggedIn, setIsLoggedIn, content }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState([]);
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { adminId } = useParams();


  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Users/${adminId}`);
        setAdminData(response.data);
      } catch (error) {
        message.error('Failed to fetch admin.');
      }
    };
    if (adminId) {
      fetchAdmin();
    }
  }, [adminId]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('adminId'); // Remove admin ID from local storage
    navigate('/admin/login');
  };

  const handleEdit = (admin) => {
    form.setFieldsValue(admin);
    setEditMode(true);
    setAdmin(admin);
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
          const updatedAdmin = { ...values };

          // Create FormData object
          // Create FormData object
          const formData = new FormData();
          formData.append('ProfilePicture', values.ProfilePicture[0]); // Assuming only one file is selected

          // Update admin data
          axios
            .put(`http://localhost:3001/Users/${adminId}`, updatedAdmin)
            .then((response) => {
              if (response.status === 200) {
                // Upload file separately
                axios
                  .put(`http://localhost:3001/Users/${adminId}`, formData)
                  .then((uploadResponse) => {
                    if (uploadResponse.status === 200) {
                      message.success('Agent data and file updated successfully.');
                      const updatedData = adminData.map((admin) =>
                        admin.id === updatedAdmin.id ? updatedAdmin : admin
                      );
                      setAdminData(updatedData);
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
  }
  const getAvatarContent = () => {
    if (user && user.ProfilePicture) {
      return (
        <Avatar
          className="header-icon"
          src={user.ProfilePicture}
          size={40}
          shape="circle"
        />
      );
    } else {
      const initials = user && user.UserName ? user.UserName.charAt(0).toUpperCase() : '';
      return (
        <Avatar className="header-icon" size={40} shape="circle">
          {initials}
        </Avatar>
      );
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" selectedKeys={[]} className="sidebar-menu">
          <Menu.Item key="1" icon={getAvatarContent()}>
            <Link
              onClick={() => {
                const downloadLink = document.createElement('a');
                downloadLink.href = user.ProfilePicture;
                downloadLink.download = 'Profile Picture';
                downloadLink.target = '_blank';
                downloadLink.click();
              }}
            >
              Profile
            </Link>
          </Menu.Item>
          <Menu.SubMenu key="submenu" icon={<BankOutlined />} title="E-Payment System">
          <Menu.Item key="2" icon={<SolutionOutlined />}>
              <Link to="/admin/agents/registration">Agents Registeration</Link>
          </Menu.Item>
            
         <Menu.Item key="3" icon={<SolutionOutlined />}>
              <Link to="/admin/agents">Agents List</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<SolutionOutlined />}>
              <Link to="/admin/service-providers/registration">Service Providers Registered</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<SolutionOutlined />}>
              <Link to="/admin/service-providers">Service Providers List</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />}>
              <Link to="/admin/users">Users List</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<TransactionOutlined />}>
              <Link to="/admin/transactions">Transactions</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<TransactionOutlined />}>
              <Link to="/admin/user/registration">Admin Registration</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className="header-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '20px' }}>
            <Link className="header-icon-container" onClick={() => handleEdit(admin)} icon={getAvatarContent()}>
              {getAvatarContent()}
              <span className="header-username">{user && user.UserName}</span>
            </Link>
            <Link to="/admin/login" onClick={handleLogout}>
              <LogoutOutlined className="header-icon" />
              Logout
            </Link>
          </div>
        </Header>
        <Content style={{ margin: '16px' }}>{content}
        </Content>
        <Modal
          title={editMode ? 'Edit Admin' : 'Create Admin'}
          visible={editMode}
          onCancel={() => {
            setEditMode(false);
            form.resetFields();
          }}
        >
          <Form form={form} initialValues={adminData}>
            <Form.Item name="UserID" label="UserID">
              <Input />
            </Form.Item>
            <Form.Item name="FirstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="LastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="Gender" label="Gender">
              <Input />
            </Form.Item>
            <Form.Item name="UserName" label="User Name">
              <Input />
            </Form.Item>
            <Form.Item name="Email" label="Email">
              <Input type="email" />
            </Form.Item>
            <Form.Item name="PhoneNumber" label="Phone Number">
              <Input type="tel" />
            </Form.Item>
            <Form.Item name="Address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="Role" label="Role">
              <Input />
            </Form.Item>
            <Form.Item name="ProfilePicture" label="Profile Picture">
              <Upload accept=".jpeg, .jpg, .png, .gif" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </Form>
        </Modal>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
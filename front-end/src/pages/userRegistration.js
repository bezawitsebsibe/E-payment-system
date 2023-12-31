import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import companyLogo from '../image/logoimage.jpg';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    UserName: '',
    Password: '',
    ConfirmPassword: '',
    Email: '',
    PhoneNumber: '+251',
    Address: '',
  });

  const [errors, setErrors] = useState({});
  const [selectedGender, setSelectedGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};


    if (!formData.FirstName) {
      newErrors.FirstName = 'First Name is required';
    } else if (!/^[A-Za-z]+$/.test(formData.FirstName)) {
      newErrors.FirstName = 'First Name should only contain letters';
    }
     
    if (!formData.LastName) {
      newErrors.LastName = 'Last Name is required';
    } else if (!/^[A-Za-z]+$/.test(formData.LasttName)) {
      newErrors.LastName = 'Last Name should only contain letters';
    }

    if (!selectedGender) {
      newErrors.Gender = 'Gender is required';
    }
    if (!formData.UserName) {
      newErrors.UserName = 'User name is required';
    }

    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    }

    if (!formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Confirm password is required';
    } else if (formData.Password !== formData.ConfirmPassword) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    if (!formData.Email) {
      newErrors.Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
      newErrors.Email = 'Email is invalid';
    }

    if (!formData.Address) {
      newErrors.Address = 'Address is required';
    }

    if (!formData.PhoneNumber) {
      newErrors.PhoneNumber = 'Phone number is required';
      
    } else if (!/^\+[0-9\s-()]+$/.test(formData.PhoneNumber)) {
      newErrors.PhoneNumber = 'Phone number is invalid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.get('http://localhost:3001/Users');
      const users = response.data;
      const userExists = users.some((user) => user.Email === email);
      return userExists;
    } catch (error) {
      console.error('Error checking user existence:', error);
      throw error;
    }
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()&& selectedGender) {
      setIsLoading(true);
      try {
        const userExists = await checkUserExists(formData.Email);
        if (userExists) {
          setErrors({ Email: 'User already exists' });
          console.log('Existing user:', formData.Email);
        } else {
          const formDataToSend = new FormData();
          formDataToSend.append('FirstName', formData.FirstName);
          formDataToSend.append('LastName', formData.LastName);
          formDataToSend.append('Gender', selectedGender);
          formDataToSend.append('UserName', formData.UserName);
          formDataToSend.append('Password', formData.Password);
          formDataToSend.append('PhoneNumber', formData.PhoneNumber);
          formDataToSend.append('Email', formData.Email);
          formDataToSend.append('Address', formData.Address);
  
          await axios.post('http://localhost:3001/Users', formDataToSend);
  
         
          // Perform navigation to the service providers
          navigate('/signup/serviceProviders');
        // Display success message using Toastify
        toast.success('Registered successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
console.log('registration successful');
        setIsSubmitted(true);
      }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className='container'>
    <div className='header'>
      <div className='logo'>
        <img src={companyLogo} alt='company logo' />
        <div className='company-name'>
          E-payment-system
          <div className='slogan'>your trusted online payment system</div>
        </div>
      </div>
</div>
    
<div className='user-body'>
  <ToastContainer />

  <form onSubmit={handleSubmit}>
    <div className="form">
      <div className='title'>Register</div>
      <div className='user-detail'>
        <div className='item'>
          <label className='user-input'>First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            placeholder="Enter first name"
          />
          {errors.FirstName && <span>{errors.FirstName}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Last Name:</label>
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            placeholder="Enter last name"
          />
          {errors.LastName && <span>{errors.LastName}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>User Name:</label>
          <input
            type="text"
            name="UserName"
            value={formData.UserName}
            onChange={handleChange}
            placeholder="Enter user name"
          />
          {errors.UserName && <span>{errors.UserName}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Password:</label>
          <input
            type="password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          {errors.Password && <span>{errors.Password}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Confirm Password:</label>
          <input
            type="password"
            name="ConfirmPassword"
            value={formData.ConfirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          {errors.ConfirmPassword && <span>{errors.ConfirmPassword}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          {errors.Email && <span>{errors.Email}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Phone Number:</label>
          <input
            type="tel"
            name="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
          {errors.PhoneNumber && <span>{errors.PhoneNumber}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Address:</label>
          <input
            type="text"
            name="Address"
            value={formData.Address}
            onChange={handleChange}
            placeholder="Enter address"
          />
          {errors.Address && <span>{errors.Address}</span>}
        </div>
        <div className='item'>
          <label className='user-input'>Gender:</label>
          <div className='category'>
            <label htmlFor='dot-1'>
              <span className='dot one'></span>
              <span className='gender'>Male</span>
              <input
                   type='radio'
                  name='gender'
                   id='dot-1'
                   value='male'
                checked={selectedGender === 'male'}
                onChange={handleGenderChange}
               />
            </label>
            <label htmlFor='dot-2'>
              <span className='dot two'></span>
              <span className='gender'>Female</span>
              <input
                  type='radio'
                  name='gender'
                  id='dot-2'
                  value='female'
                  checked={selectedGender === 'female'}
                  onChange={handleGenderChange}
               />
            </label>
          </div>
          {errors.Gender && <span className="error">{errors.Gender}</span>}
        </div>
      </div>
      <button className="button" type="submit" disabled={isLoading}>
        {isLoading ? 'Submitting..' : 'Submit'}
      </button>
    </div>
  </form>
  {isSubmitted && <div>Registration successful!</div>}

    </div>
    </div>
  );
};

export default RegistrationForm;

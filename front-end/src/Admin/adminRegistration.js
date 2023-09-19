import React, { useState } from 'react';
import axios from 'axios';
import Dashboard from './dashboard';


const AdminRegistrationForm = () => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Gender: '',
    UserName: '',
    Password: '',
    Email:'',
    PhoneNumber: '+251',
    Address:'',
    Role:'Admin',
    ProfilePicture:''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const validateForm = () => {
    const newErrors = {};

    if (!formData.FirstName) {
      newErrors.FirstName = 'First Name is required';
    }

    if (!formData.LastName) {
      newErrors.LastName = 'LastName is required';
    }

    if (!formData.Gender) {
      newErrors.Gender = 'Gender is required';
    }

    if (!formData.UserName) {
      newErrors.UserName = 'UserName is required';
    }

    if (!formData.Password) {
      newErrors.Password = 'Password is required';
    }
    if (!formData.Email) {
        newErrors.Email = 'Email is required';
      }
      else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
        newErrors.Email = "Email is invalid";
      }
      if (!formData.Address) {
        newErrors.Address = 'Address is required';
      }
      if (!formData.ProfilePicture) {
        newErrors.ProfilePicture = "Profile picture is required";
      }else if (!isFileValid(formData.ProfilePicture)) {
        newErrors.ProfilePicture = "Invalid file format. Only JPG, JPEG, PNG, or PDF files are allowed.";
      }

    if (!formData.PhoneNumber) {
      newErrors.PhoneNumber = "Phone Number is required";
    } else if (!/^\+[0-9\s-()]+$/.test(formData.PhoneNumber)) {
      newErrors.PhoneNumber = "Phone Number is invalid";
    } else if (formData.PhoneNumber.replace(/[^\d]/g, "").length < 12) {
      newErrors.PhoneNumber = "Phone Number must have at least 12 digits";
    }
   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const isFileValid = (file) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    return allowedFileTypes.includes(file.type);
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


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const formDataToSend = new FormData();
        formDataToSend.append('FirstName', formData.FirstName);
        formDataToSend.append('LastName', formData.LastName);
        formDataToSend.append('Gender', formData.Gender);
        formDataToSend.append('UserName', formData.UserName);
        formDataToSend.append('Password', formData.Password);
        formDataToSend.append('PhoneNumber', formData.PhoneNumber);
        formDataToSend.append('Email', formData.Email);
        formDataToSend.append('Address', formData.Address);
        formDataToSend.append('Role', formData.Role);
        formDataToSend.append('ProfilePicture', formData.ProfilePicture);




        await axios.post('http://localhost:3001/Users', formDataToSend);
        setIsSubmitted(true);

        console.log('Registered successfully!');
      } catch (error)
   
      {   // show an error message
        if (checkUserExists(formData.Email)) {
          setErrors({ Email: 'User already exists' });
          console.log('Existing user:', formData.Email);
        } else {
          console.error('Error submitting form:', error);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      ProfilePicture: file,
    }));
  };
  return (
   
    <form onSubmit={handleSubmit}>
      <div className="form-box">
        <h1>Admin Registration</h1>
        <div>
          <label>FirstName</label>
          <input
            type="text"
            name="FirstName"
            className="input-field"
            value={formData.FirstName}
            onChange={handleChange}
          />
          {errors.FirstName && <span>{errors.FirstName}</span>}
        </div>
        <div>
          <label>LastName:</label>
          <input
            type="text"
            name="LastName"
            className="input-field"
            value={formData.LastName}
            onChange={handleChange}
          />
          {errors.LastName && <span>{errors.LastName}</span>}
        </div>
        <div>
          <label>Gender:</label>
          <input
            type="text"
            name="Gender"
            className="input-field"
            value={formData.Gender}
            onChange={handleChange}
          />
          {errors.Gender && <span>{errors.Gender}</span>}
        </div>
        <div>
          <label>UserName:</label>
          <input
            type="text"
            name="UserName"
            className="input-field"
            value={formData.UserName}
            onChange={handleChange}
          />
          {errors.UserName && <span >{errors.UserName}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="Password"
            className="input-field"
            value={formData.Password}
            onChange={handleChange}
          />
          {errors.Password && <span>{errors.Password}</span>}
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="PhoneNumber"
            className="input-field"
            value={formData.PhoneNumber}
            onChange={handleChange}
          />
          {errors.PhoneNumber && <span>{errors.PhoneNumber}</span>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="Email"
            className="input-field"
            value={formData.Email}
            onChange={handleChange}
          />
          {errors.Email && <span>{errors.Email}</span>}
        </div>
       
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="Address"
            className="input-field"
            value={formData.Address}
            onChange={handleChange}
          />
          {errors.Address && <span>{errors.Address}</span>}
        </div>
        <div>
        <label>Authorization Letter:</label>
        <input
          type="file"
          name="ProfilePicture"
         class="input-field"
          //value={formData.ProfilePicture}
          onChange={handleFileChange}
          placeholder="attach profile picture"
        />
        {errors.ProfilePicture && <span>{errors.ProfilePicture}</span>}
      </div>
      <br></br>
      { /*<button type="submit">Submit</button>*/}
        {errors.submitError&& <span>{errors.submitError}</span>}
         {isSubmitted?(
            <div className="msg">Registration successfull!'</div>
          ):(
            <button type = "submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        )}
        
    </div>
  </form>
);
};

export default AdminRegistrationForm;
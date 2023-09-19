import React, { useState } from "react";
//import {Form,Button}from 'antd';
import axios from "axios";
import "./agentRegistration.css";




const AgentRegistrationForm = () => {
  const [formData, setFormData] = useState({
    agentBIN: "",
   agentName: "",
    agentEmail: "",
    servicesOffered: "",
    phoneNumber: "+251",
    agentAuthorizationLetter: null,//changed to null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};

   // Business Identification Number validation
if (!formData.agentBIN) {
  newErrors.agentBIN = "Business Identification Number is required";
} 


    // Bank Name validation
    if (!formData.agentName) {
      newErrors.agentName = "Bank Name is required";
    }

    // Email validation
    if (!formData.agentEmail) {
      newErrors.agentEmail = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.agentEmail)) {
      newErrors.agentEmail = "Email is invalid";
    }

    // Services Offered validation
    if (!formData.servicesOffered) {
      newErrors.servicesOffered = "Services Offered is required";
    }

    // Phone Number validation

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!/^\+[0-9\s-()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number is invalid";
    } else if (formData.phoneNumber.replace(/[^\d]/g, "").length < 12) {
      newErrors.phoneNumber = "Phone Number must have at least 12 digits";
    }

    // Agent Authorization Letter validation
    if (!formData.agentAuthorizationLetter) {
      newErrors.agentAuthorizationLetter = "Agent Authorization Letter is required";
    }else if (!isFileValid(formData.agentAuthorizationLetter)) {
      newErrors.agentAuthorizationLetter = "Invalid file format. Only JPG, JPEG, PNG, or PDF files are allowed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if there are no errors
  };

  const isFileValid = (file) => {
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    return allowedFileTypes.includes(file.type);
  };
  
const checkAgentExists = async (agentBIN) => {
    try {
      const response = await axios.get('http://localhost:3001/agent');
      return response.data.exists;
    } catch (error) {
      console.error("Error checking agent existence:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try{
        const formDataToSend = new FormData();
        formDataToSend.append('agentBIN', formData.agentBIN);
        formDataToSend.append('agentName', formData.agentName);
        formDataToSend.append('agentEmail', formData.agentEmail);
        formDataToSend.append('servicesOffered', formData.servicesOffered);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('agentAuthorizationLetter',formData.agentAuthorizationLetter );
            
        //make an HTTP post request to the backend
        await axios.post('http://localhost:3001/agent', formDataToSend);
       setIsSubmitted(true);

        console.log('Registered successfully!');
      } catch (error) {
        // show an error message
        if (checkAgentExists(formData.agentBIN)) {
          setErrors({ agentBIN: "agent with this Business Identification Number already exists" });
          console.log("Existing agent:", formData.agentBIN);
        }
        else {
          // show an error message
        console.error('Error submitting form:', error);
        }
      }
      finally{
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
      agentAuthorizationLetter: file,
    }));
  };
return (
  <form onSubmit={handleSubmit}>
    <div className="form-box">
    <h1>Agent Registration</h1>

    <short id="msg" ></short>
      <div>
         <label>Business Identification Number:</label>
        <input
          type="text"
          name="agentBIN"
          class="input-field"
          value={formData.agentBIN}
          onChange={handleChange}
          placeholder="Enter business identification number "
        />
        {errors.agentBIN && <span>{errors.agentBIN}</span>}
      </div>
      <div>
        <label>Bank Name:</label>
        <input
          type="text"
          name="agentName"
          class="input-field"
          value={formData.agentName}
          onChange={handleChange}
          placeholder="Enter bank name"
        />
        {errors.agentName && <span>{errors.agentName}</span>}
      </div>
      <div>
         <label>Email:</label>
        <input
          type="email"
          name="agentEmail"
          class="input-field"
          value={formData.agentEmail}
          onChange={handleChange}
          placeholder="Enter email address"
        />
        {errors.agentEmail && <span>{errors.agentEmail}</span>}
      </div>
  
      <div>
        <label>Services Offered:</label>
        <input
          type="text"
          name="servicesOffered"
          class="input-field"
          value={formData.servicesOffered}
          onChange={handleChange}
          placeholder="Enter services you offer"
        />
        {errors.servicesOffered && <span>{errors.servicesOffered}</span>}
      </div>
      <div>
         <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          class="input-field"
          value={formData.phoneNumber} 
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
      </div>
      <div>
        <label>Authorization Letter:</label>
        <input
          type="file"
          name="agentAuthorizationLetter"
         class="input-field"
          //value={formData.agentAuthorizationLetter}
          onChange={handleFileChange}
          placeholder="attach authorization letter"
        />
        {errors.agentAuthorizationLetter && <span>{errors.agentAuthorizationLetter}</span>}
      </div>
      <br></br>
      { /*<button type="submit">Submit</button>*/}
        {errors.submitError&& <span>{errors.submitError}</span>}
         {isSubmitted?(
            <div className="success-message">Registration successfull!'</div>
          ):(
            <button type = "submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        )}
        
    </div>
  </form>
);
};

export default AgentRegistrationForm;
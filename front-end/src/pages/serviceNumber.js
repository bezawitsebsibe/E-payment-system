import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homePage.css';
import axios from 'axios';
import companyLogo from '../image/logoimage.jpg';

const ServiceNumber = () => {
  const [paymentFor, setPaymentFor] = useState('');
  const [serviceNumber, setServiceNumber] = useState('');
  const [errors, setErrorMessage] = useState('');

  const handlePaymentForChange = (event) => {
    setPaymentFor(event.target.value);
  };

  const handleServiceNumberChange = (event) => {
    setServiceNumber(event.target.value);
  };

  const handlePaymentSubmit = (event) => {
    event.preventDefault();

    if (!serviceNumber) {
      setErrorMessage('Service number is required');
      return;
    }

    // Process payment based on paymentFor and serviceNumber values
    console.log('Payment processed');
    console.log('Payment For:', paymentFor);
    console.log('Service Number:', serviceNumber);

    // Reset form
    setPaymentFor('');
    setServiceNumber('');
    setErrorMessage('');

    // Navigate to '/payment'
    navigate('/payment');
  };

  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="header">
        <div className="logo">
          <img src={companyLogo} alt="company logo" />
          <div className="company-name">
            E-payment-system
            <div className="slogan">your trusted online payment system</div>
          </div>
        </div>
      </div>
      <div className="bodyy">
        <div className="form-container">
          <form onSubmit={handlePaymentSubmit}>
            <div>
              <label>
                <input
                  type="radio"
                  value="self"
                  checked={paymentFor === 'self'}
                  onChange={handlePaymentForChange}
                />
                Make payment for myself
              </label>
              <label>
                <input
                  type="radio"
                  value="other"
                  checked={paymentFor === 'other'}
                  onChange={handlePaymentForChange}
                />
                Make payment for someone else
              </label>
            </div>

            {paymentFor && (
              <div>
                <label>
                  Please enter the service number:
                  <input
                    type="text"
                    value={serviceNumber}
                    onChange={handleServiceNumberChange}
                  />
                </label>
              </div>
            )}

            {errors && <span> {errors}</span>}
        
            <button type="submit" disabled={!paymentFor || !serviceNumber}>
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceNumber;

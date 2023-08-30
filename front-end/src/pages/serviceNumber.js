import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import './homePage.css';
import axios from 'axios';
import companyLogo from '../image/logoimage.jpg';

const ServiceNumber=()=>{


return(
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
  <div className='body'>

  </div>
  </div>
  )
};
export default ServiceNumber;
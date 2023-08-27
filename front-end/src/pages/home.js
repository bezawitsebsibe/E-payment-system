import React from 'react';
import './homePage.css';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import companyLogo from '../image/logoimage.jpg';
import BodyPhoto from '../image/pimage1.jpg';
import USER from '../image/himage3.jpg';
import Bill from '../image/bimage2.png';
import Security from '../image/simage.png';
import Cash from '../image/mimage.png';


function HomePage() {
  return (
    
      <div className='container'>
        <div className="overlay-curve"></div>
        <div className='header'>
          <div className='logo'>
            <img src={companyLogo} alt='company logo' />
            <div className='company-name'>
              E-payment-system
              <div className='slogan'>your trusted online payment system</div>
            </div>
          </div>

          <div className='nav'>
            <Link to="/contactUs" className='nav-item'>Contact Us</Link>
            <Link to="/services" className='nav-item'>Services</Link>
            <Link to="/aboutUs" className='nav-item'>About Us</Link>
          </div>

          <div className='login-box'>
            <img src={USER} alt='login-icon' className='login-icon'></img>
            <Link to="/login" className='login'>Log in</Link>
          </div>
        </div>

        <div className='body'>
          <div className='body-1'>
            <div className='side-one'>
              <img src={BodyPhoto} alt='bodyphoto' className='body-image'></img>
            </div>
            <div className='side-two'>
              <div className='note1'>
                <h2> E-<span style={{ color: 'rgb(5, 145, 246)' }}>Payment</span> System</h2>
              </div>
              <div className='note2'>
                <h1>  <pre>Make Your Life </pre>
                  <pre>Easier With <span style={{ color: 'rgb(5, 145, 246)' }}>....</span></pre></h1>
              </div>
              <br />
              <hr className='horizontal-line' />
              <div className='note3'>
                <h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Fusce tincidunt ante et feugiat fringilla.
                  Mauris vel purus in leo rhoncus auctor quis at ligula.
                  Suspendisse potenti. Nulla facilisi.</h4>
              </div>
            </div>
          </div>

          <div className='body-2'>
            <div className='msg'>
              <img src={Bill} alt="billimage" className='bill-icon'></img>
              <h5>Effortlessly settle bills digitally, saving time and eliminating physical transactions.</h5>
            </div>
            <div className='msg'>
              <img src={Cash} alt="cashimage" className='cash-icon'></img>
              <h5>Encrypting financial data ensures secure transactions, providing peace of mind.</h5>
            </div>
            <div className='msg'>
              <img src={Security} alt="Securityimage" className='security-icon'></img>
              <h5>Revolutionize payments with our secure, convenient, and innovative e-payment system.</h5>
            </div>
          </div>
        </div>

      
      </div>
   
  );
}

export default HomePage;
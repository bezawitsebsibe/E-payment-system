// Import dependencies and components
import React, { useState } from 'react';
import axios from './api/axios';

// Define the ResetPassword functional component
const ResetPassword = () => {
  // Define state variables using the useState hook
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Define the event handler for resetting the password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the server to reset the password
      const response = await axios.post('http://localhost:3000/Users/resetPassword', {
        email,
        newPassword,
        confirmPassword,
      });
      // Update the success message and clear the error message
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      // Update the error message and clear the success message
      setErrorMessage(error.response.data.error);
      setSuccessMessage('');
    }
  };

  // Render the ResetPassword component
  return (
    <div>
      <h2>Reset Password</h2>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}

      <form onSubmit={handleResetPassword}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

// Export the ResetPassword component as the default export
export default ResetPassword;
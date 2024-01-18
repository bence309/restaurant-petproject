// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css'; // Include the external CSS file

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [notification, setNotification] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/login', formData);
      console.log('Login API Response:', response);

      const welcomeMessage = response.data.message;

      // Display notification
      setNotification('Successful login!');

      // Delay for 3 seconds before navigating to home page
      setTimeout(() => {
        // Redirect to home page
        navigate('/');
        console.log('Navigation to home page triggered.');
      }, 3000);
    } catch (error) {
      console.error('Error logging in user:', error);
      // Handle error or display an error message
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} method="post">
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>

      {/* Display notification */}
      {notification && (
        <div className="notification-box">
          {notification}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
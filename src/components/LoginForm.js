// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/login', formData);
      console.log(response.data);

      const { username } = response.data;

      // Call onLogin function with an object containing the username
      onLogin({ username });

      // Redirect to home page with welcome message
      navigate('/', { state: { welcomeMessage: `Welcome, ${username}!` } });

      console.log('Navigation to home page triggered.');
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
    </div>
  );
};

export default LoginForm;

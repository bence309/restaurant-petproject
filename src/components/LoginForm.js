import React, { useState } from 'react';
import axios from 'axios';
import Notification from './Notification'; // Import the Notification component

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/login', {
        email: username,
        password,
      });

      setSuccessMessage(response.data.message);

      const token = 'your_generated_token';
      localStorage.setItem('token', token);

      onLogin(token);
    } catch (error) {
      console.error('Login failed:', error);
      setError(error.response?.data?.message || 'Login failed');
      setSuccessMessage(null); // Clear any previous success message
    }
  };

  const closeNotification = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Display success message */}
      {successMessage && (
        <Notification message={successMessage} type="success" onClose={closeNotification} />
      )}
      {/* Display error message */}
      {error && (
        <Notification message={error} type="error" onClose={closeNotification} />
      )}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

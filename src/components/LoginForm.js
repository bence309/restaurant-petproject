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
    }
  };

  const closeNotification = () => {
    setSuccessMessage(null);
    setError(null);
  };

  return (
    <div>
      <h2>Login</h2>
      {/* Display success message */}
      {successMessage && (
        <Notification message={successMessage} onClose={closeNotification} />
      )}
      {/* Display error message */}
      {error && <div className="error">{error}</div>}
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

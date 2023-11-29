import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    
    username: '',
    email: '',
    password: '',
    
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('http://localhost:3002/api/register', formData);
      console.log(response.data); 
    } catch (error) {
      console.error('Error registering user:', error); 
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Render your form fields here, and connect them to the state with onChange */}
      <input type="text" name="username" value={formData.username} onChange={handleChange} />
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
      <input type="password" name="password" value={formData.password} onChange={handleChange} />
      {/* Add more fields as needed */}
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;

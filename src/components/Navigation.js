// Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Add this line

const Navigation = ({ isAuthenticated }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/pizza">Pizzas</Link>
        </li>
        <li>
          <Link to="/drinks">Drinks</Link>
        </li>
        <li>
          <Link to="/dessert">Desserts</Link>
        </li>
        <li>
          <Link to="/sauces">Sauces</Link>
        </li>
        <li>
          <Link to="/pasta">Pastas</Link>
        </li>
        <li>
          <Link to="/sides">Side Dishes</Link>
        </li>
        <li>
          <Link to="/salads">Salads</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
        <li>{isAuthenticated ? 'Welcome, User!' : 'Please Sign In'}
        <Link to="/login"></Link></li>
        {/* Add more links for other categories as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;

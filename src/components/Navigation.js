// Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/menu">Menu</Link>
        </li>
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
        {isAuthenticated ? (
          <>
            <li className="right-link">
              <Link to="/" onClick={onLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className="right-link register-login">
              <Link to="/register">Register</Link>
            </li>
            <li className="right-link register-login">
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

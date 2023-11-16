import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css'; // Add this line

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/pizza">Pizzas</Link>
        </li>
        <li>
          <Link to="/drinks">Drinks</Link>
        </li>
        {/* Add more links for other categories as needed */}
      </ul>
    </nav>
  );
};

export default Navigation;

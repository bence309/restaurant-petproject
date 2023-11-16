import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/pizzas">Pizzas</Link></li>
        {/* Add more links for other sections */}
      </ul>
    </nav>
  );
};

export default Navigation;
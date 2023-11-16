import React, { useState, useEffect } from 'react';
import { getSides } from '../api';
import './ItemList.css';

const SideList = () => {
  const [sides, setSides] = useState([]);

  useEffect(() => {
    const fetchSides = async () => {
      try {
        const sideData = await getSides();
        setSides(sideData);
      } catch (error) {
        console.error('Error fetching sides:', error);
      }
    };

    fetchSides();
  }, []);

  return (
    <div className="item-list">
      {sides.map((side) => (
        <div key={side.id} className="item-card">
          <h3>{side.name}</h3>
          <p>Description: {side.description}</p>
          <p>Price: ${side.price}</p>
          <img src={side.image} alt={side.name} style={{ maxWidth: '200px' }} />
        </div>
      ))}
    </div>
  );
};

export default SideList;

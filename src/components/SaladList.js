import React, { useState, useEffect } from 'react';
import { getSalads } from '../api';
import './ItemList.css';

const SaladList = ({ addToCart }) => {
  const [salads, setSalads] = useState([]);

  useEffect(() => {
    const fetchSalads = async () => {
      try {
        const saladData = await getSalads();
        setSalads(saladData);
      } catch (error) {
        console.error('Error fetching salads:', error);
      }
    };

    fetchSalads();
  }, []);

  return (
    <div className="item-list">
      {salads.map((salad) => (
        <div key={salad.id} className="item-card">
          <h3>{salad.name}</h3>
          <p>Description: {salad.description}</p>
          <p>Price: ${salad.price}</p>
          <img src={salad.image} alt={salad.name} style={{ maxWidth: '200px' }} />
          <br/>
          <button onClick={() => addToCart(salad, 'salad')}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SaladList;

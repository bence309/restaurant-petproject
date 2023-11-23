import React, { useState, useEffect } from 'react';
import { getSauces } from '../api';
import './ItemList.css';

const SauceList = ({ addToCart }) => {
  const [sauces, setSauces] = useState([]);

  useEffect(() => {
    const fetchSauces = async () => {
      try {
        const sauceData = await getSauces();
        setSauces(sauceData);
      } catch (error) {
        console.error('Error fetching sauces:', error);
      }
    };

    fetchSauces();
  }, []);

  return (
    <div className="item-list">
      {sauces.map((sauce) => (
        <div key={sauce.id} className="item-card">
          <h3>{sauce.name}</h3>
          <p>Ingredients: {sauce.ingredients.join(', ')}</p>
          <p>Price: ${sauce.price}</p>
          <img src={sauce.image} alt={sauce.name} style={{ maxWidth: '200px' }} />
          <br/>
          <button onClick={() => addToCart(sauce, 'sauce')}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SauceList;

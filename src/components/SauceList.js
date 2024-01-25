import React, { useState, useEffect } from 'react';
import { getSauces } from '../api';
import './ItemList.css';

const SauceList = ({ addToCart }) => {
  const [sauces, setSauces] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchSauces = async () => {
      try {
        const sauceData = await getSauces();
        setSauces(sauceData);
        const initialQuantity = sauceData.reduce((acc, sauce) => {
          acc[sauce.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
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
          <br />
          {/* Quantity chooser */}
          <div>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [sauce.id]: Math.max(prev[sauce.id] - 1, 1) }))}>-</button>
            <span>{quantity[sauce.id]}</span>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [sauce.id]: prev[sauce.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(sauce, 'sauce', quantity[sauce.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SauceList;

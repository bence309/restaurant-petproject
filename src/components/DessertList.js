import React, { useState, useEffect } from 'react';
import { getDesserts } from '../api';
import './ItemList.css';

const DessertList = ({ addToCart }) => {
  const [desserts, setDesserts] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const dessertData = await getDesserts();
        setDesserts(dessertData);

        const initialQuantity = dessertData.reduce((acc, dessert) => {
          acc[dessert.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
      } catch (error) {
        console.error('Error fetching desserts:', error);
      }
    };

    fetchDesserts();
  }, []);

  return (
    <div className="item-list">
      {desserts.map((dessert) => (
        <div key={dessert.id} className="item-card">
          <h3>{dessert.name}</h3>
          <p>Ingredients: {dessert.ingredients.join(', ')}</p>
          <p>Price: ${dessert.price}</p>
          <img src={dessert.image} alt={dessert.name} style={{ maxWidth: '200px' }} />
          <br />
          {/* Quantity chooser */}
          <div>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [dessert.id]: Math.max(prev[dessert.id] - 1, 1) }))}>-</button>
            <span>{quantity[dessert.id]}</span>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [dessert.id]: prev[dessert.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(dessert, 'dessert', quantity[dessert.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default DessertList;

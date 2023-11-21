import React, { useState, useEffect } from 'react';
import { getDesserts } from '../api';
import './ItemList.css';

const DessertList = ({ addToCart }) => {
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    const fetchDesserts = async () => {
      try {
        const dessertData = await getDesserts();
        setDesserts(dessertData);
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
          <br/>
          <button onClick={() => addToCart(dessert)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default DessertList;

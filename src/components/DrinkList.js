import React, { useState, useEffect } from 'react';
import { getDrinks } from '../api';
import './ItemList.css';

const DrinkList = ({ addToCart }) => {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinkData = await getDrinks();
        setDrinks(drinkData);
      } catch (error) {
        console.error('Error fetching drinks:', error);
      }
    };

    fetchDrinks();
  }, []);

  return (
    <div className="item-list">
      {drinks.map((drink) => (
        <div key={drink.id} className="item-card">
          <h3>{drink.name}</h3>
          <p>Price: ${drink.price}</p>
          <img src={drink.image} alt={drink.name} style={{ maxWidth: '200px' }} />
          <br/>
          <button onClick={() => addToCart(drink, 'drink')}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default DrinkList;

import React, { useState, useEffect } from 'react';
import { getDrinks } from '../api';
import './ItemList.css';

const DrinkList = ({ addToCart }) => {
  const [drinks, setDrinks] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchDrinks = async () => {
      try {
        const drinkData = await getDrinks();
        setDrinks(drinkData);

        // Initialize quantity for each drink
        const initialQuantity = drinkData.reduce((acc, drink) => {
          acc[drink.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
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
          <br />
          {/* Quantity chooser */}
          <div>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [drink.id]: Math.max(prev[drink.id] - 1, 1) }))}>-</button>
            <span>{quantity[drink.id]}</span>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [drink.id]: prev[drink.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(drink, 'drink', quantity[drink.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default DrinkList;

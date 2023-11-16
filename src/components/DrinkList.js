import React, { useState, useEffect } from 'react';
import { getDrinks } from '../api';

const DrinkList = () => {
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
    <div>
      <h2>Drink List</h2>
      <ul>
        {drinks.map((drink) => (
          <li key={drink.id}>
            <h3>{drink.name}</h3>
            <p>Price: ${drink.price}</p>
            <img src={drink.image} alt={drink.name} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DrinkList;
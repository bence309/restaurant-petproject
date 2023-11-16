import React, { useState, useEffect } from 'react';
import { getPizzas } from '../api';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch pizza data when the component mounts
    const fetchPizzas = async () => {
      try {
        const pizzaData = await getPizzas();
        setPizzas(pizzaData);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchPizzas();
  }, []); 

  return (
    <div>
      <h2>Pizza List</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza.id}>
            <h3>{pizza.name}</h3>
            <p>Ingredients: {pizza.ingredients.join(', ')}</p>
            <p>Price: ${pizza.price}</p>
            <img src={pizza.image} alt={pizza.name} style={{ maxWidth: '200px' }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
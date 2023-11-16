import React, { useState, useEffect } from 'react';
import { getPizzas } from '../api';
import './ItemList.css';


const PizzaList = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
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
    <div className="item-list">
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="item-card">
          <h3>{pizza.name}</h3>
          <p>Ingredients: {pizza.ingredients.join(', ')}</p>
          <p>Price: ${pizza.price}</p>
          <img src={pizza.image} alt={pizza.name} style={{ maxWidth: '200px' }} />
          <button onClick={() => addToCart(pizza)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

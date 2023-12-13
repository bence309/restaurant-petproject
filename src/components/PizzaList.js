import React, { useState, useEffect } from 'react';
import { getPizzas } from '../api'; 

const PizzaList = ({ addToCart }) => {
  const [pizzas, setPizzas] = useState([]);
  const [quantity, setQuantity] = useState({}); 

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const pizzaData = await getPizzas(); 
        setPizzas(pizzaData);
        const initialQuantity = pizzaData.reduce((acc, pizza) => {
          acc[pizza.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
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
          <br/>
          {/* Add quantity chooser */}
          <div>
            <button onClick={() => setQuantity(prev => ({ ...prev, [pizza.id]: Math.max(prev[pizza.id] - 1, 1) }))}>-</button>
            <span>{quantity[pizza.id]}</span>
            <button onClick={() => setQuantity(prev => ({ ...prev, [pizza.id]: prev[pizza.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(pizza, 'pizza', quantity[pizza.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default PizzaList;

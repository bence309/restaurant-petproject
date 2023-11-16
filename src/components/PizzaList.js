import React, { useState, useEffect } from 'react';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    // Fetch pizza data from your JSON server
    fetch('http://localhost:3001/pizza')
      .then(response => response.json())
      .then(data => setPizzas(data))
      .catch(error => console.error('Error fetching pizza data:', error));
  }, []);

  return (
    <div>
      <h2>Pizza Menu</h2>
      <ul>
        {pizzas.map(pizza => (
          <li key={pizza.id}>
            {pizza.name} - ${pizza.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PizzaList;
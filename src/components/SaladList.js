import React, { useState, useEffect } from 'react';
import { getSalads } from '../api';
import './ItemList.css';

const SaladList = ({ addToCart }) => {
  const [salads, setSalads] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchSalads = async () => {
      try {
        const saladData = await getSalads();
        setSalads(saladData);
        const initialQuantity = saladData.reduce((acc, salad) => {
          acc[salad.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
      } catch (error) {
        console.error('Error fetching salads:', error);
      }
    };

    fetchSalads();
  }, []);

  return (
    <div className="item-list">
      {salads.map((salad) => (
        <div key={salad.id} className="item-card">
          <h3>{salad.name}</h3>
          <p>Description: {salad.description}</p>
          <p>Price: ${salad.price}</p>
          <img src={salad.image} alt={salad.name} style={{ maxWidth: '200px' }} />
          <br />
          {/* Quantity chooser */}
          <div>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [salad.id]: Math.max(prev[salad.id] - 1, 1) }))}>-</button>
            <span>{quantity[salad.id]}</span>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [salad.id]: prev[salad.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(salad, 'salad', quantity[salad.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SaladList;

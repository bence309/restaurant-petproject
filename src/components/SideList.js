import React, { useState, useEffect } from 'react';
import { getSides } from '../api';
import './ItemList.css';

const SideList = ({ addToCart }) => {
  const [sides, setSides] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchSides = async () => {
      try {
        const sideData = await getSides();
        setSides(sideData);

        // Initialize quantity for each side
        const initialQuantity = sideData.reduce((acc, side) => {
          acc[side.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
      } catch (error) {
        console.error('Error fetching sides:', error);
      }
    };

    fetchSides();
  }, []);

  return (
    <div className="item-list">
      {sides.map((side) => (
        <div key={side.id} className="item-card">
          <h3>{side.name}</h3>
          <p>Description: {side.description}</p>
          <p>Price: ${side.price}</p>
          <img src={side.image} alt={side.name} style={{ maxWidth: '200px' }} />
          <br />
          {/* Quantity chooser */}
          <div>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [side.id]: Math.max(prev[side.id] - 1, 1) }))}>-</button>
            <span>{quantity[side.id]}</span>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [side.id]: prev[side.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(side, 'side', quantity[side.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default SideList;

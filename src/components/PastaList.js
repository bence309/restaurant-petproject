import React, { useState, useEffect } from 'react';
import { getPastas } from '../api';
import './ItemList.css';

const PastaList = ({ addToCart }) => {
  const [pastas, setPastas] = useState([]);
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    const fetchPastas = async () => {
      try {
        const pastaData = await getPastas();
        setPastas(pastaData);
        const initialQuantity = pastaData.reduce((acc, pasta) => {
          acc[pasta.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantity);
      } catch (error) {
        console.error('Error fetching pastas:', error);
      }
    };

    fetchPastas();
  }, []);

  return (
    <div className="item-list">
      {pastas.map((pasta) => (
        <div key={pasta.id} className="item-card">
          <h3>{pasta.name}</h3>
          <p>Ingredients: {pasta.ingredients.join(', ')}</p>
          <p>Price: ${pasta.price}</p>
          <img src={pasta.image} alt={pasta.name} style={{ maxWidth: '200px' }} />
          <br />
          {/* Quantity chooser */}
          <div>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [pasta.id]: Math.max(prev[pasta.id] - 1, 1) }))}>-</button>
            <span>{quantity[pasta.id]}</span>
            <button onClick={() => setQuantity((prev) => ({ ...prev, [pasta.id]: prev[pasta.id] + 1 }))}>+</button>
          </div>
          <button onClick={() => addToCart(pasta, 'pastas', quantity[pasta.id])}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default PastaList;
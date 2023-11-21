import React, { useState, useEffect } from 'react';
import { getPastas } from '../api';
import './ItemList.css';

const PastaList = () => {
  const [pastas, setPastas] = useState([]);

  useEffect(() => {
    const fetchPastas = async () => {
      try {
        const pastaData = await getPastas();
        setPastas(pastaData);
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
        </div>
      ))}
    </div>
  );
};

export default PastaList;

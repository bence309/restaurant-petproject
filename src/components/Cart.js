import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  return (
    <div className="item-list">
      {cart.map((item) => (
        <div key={item.id} className="item-card">
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <img src={item.image} alt={item.name} style={{ maxWidth: '200px' }} />
          <br/>
          <button onClick={() => removeFromCart(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Cart;

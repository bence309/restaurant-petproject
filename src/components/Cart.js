import React from 'react';

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="item-list">
        {cart.map((item) => (
          <div key={item.id} className="item-card">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <img src={item.image} alt={item.name} style={{ maxWidth: '200px' }} />
            <br></br>
            <button onClick={() => removeFromCart(item.id)}>Delete</button>
          </div>
        ))}
      </div>
      {/* Display the total price with styling */}
      <div style={{
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        marginTop: '20px',
        padding: '10px',
        border: '2px solid #333',
        borderRadius: '5px',
      }}>
        Total Price: ${total}
      </div>
    </div>
  );
};

export default Cart;

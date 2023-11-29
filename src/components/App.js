import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PizzaList from './PizzaList';
import DrinkList from './DrinkList';
import DessertList from './DessertList';
import SauceList from './SauceList';
import PastaList from './PastaList';
import SideList from './SideList';
import SaladList from './SaladList';
import Navigation from './Navigation';
import Cart from './Cart';
import RegistrationForm from './RegistrationForm';

const App = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [message, setMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item, category) => {
    const uniqueId = `${category}_${item.id}`;
    setCart([...cart, { ...item, id: uniqueId }]);
    setMessage(`${item.name} added to cart!`);

    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const removeFromCart = (itemId) => {
    console.log('Removing item with id:', itemId);
    const updatedCart = cart.filter((item) => item.id !== itemId);
    console.log('Updated cart:', updatedCart);
    setCart(updatedCart);
    setMessage('Item removed from cart!');
  
    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  return (
    <Router>
      <Navigation /> {/* Move inside the Router */}
      <Routes>
        <Route path="/pizza" element={<PizzaList addToCart={addToCart} />} /> {/* Pass addToCart prop */}
        <Route path="/drinks" element={<DrinkList addToCart={addToCart} />} />
        <Route path="/dessert" element={<DessertList addToCart={addToCart} />} />
        <Route path="/sauces" element={<SauceList addToCart={addToCart} />} />
        <Route path="/pasta" element={<PastaList addToCart={addToCart} />} />
        <Route path="/sides" element={<SideList addToCart={addToCart} />} />
        <Route path="/salads" element={<SaladList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
      <div>
        {/* Display the message with styling */}
        {message && (
          <div
            style={{
              position: 'fixed',
              top: '70%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'lightgreen',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              zIndex: 999,
            }}
          >
            <p>{message}</p>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;

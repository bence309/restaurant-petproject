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
import ScrollToTop from './ScrollToTop';
import './ScrollToTop.css';
import Menu from './Menu';
import './App.css';

const App = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/db');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setPizzas(data.pizza);
        setDrinks(data.drinks);
        setDesserts(data.dessert);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    

    fetchData();
  }, []);

  const addToCart = (item, category, quantity) => {
    const uniqueId = `${category}_${item.id}`;
    const itemsToAdd = Array.from({ length: quantity }, () => ({ ...item, id: uniqueId }));
    setCart([...cart, ...itemsToAdd]);
    setMessage(`${item.name} (Quantity: ${quantity}) added to cart!`);

    setTimeout(() => {
      setMessage('');
    }, 1000);
  };

  const removeFromCart = (itemId) => {
    const indexToRemove = cart.findIndex((item) => item.id === itemId);
  
    if (indexToRemove !== -1) {
      const updatedCart = [...cart];
      updatedCart.splice(indexToRemove, 1);
      setCart(updatedCart);
      setMessage('Item removed from cart!');
  
      setTimeout(() => {
        setMessage('');
      }, 1000);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <Router>
      <div className={darkMode ? 'app-container dark-mode' : 'app-container light-mode'}>
        <Navigation />
        <div className="dark-mode-toggle">
          <button onClick={toggleDarkMode} className="dark-mode-button">
            {darkMode ? 'Toggle Light Mode' : 'Toggle Dark Mode'}
          </button>
        </div>
        <Routes>
          <Route path="/pizza" element={<PizzaList addToCart={addToCart} />} />
          <Route path="/drinks" element={<DrinkList addToCart={addToCart} />} />
          <Route path="/dessert" element={<DessertList addToCart={addToCart} />} />
          <Route path="/sauces" element={<SauceList addToCart={addToCart} />} />
          <Route path="/pasta" element={<PastaList addToCart={addToCart} />} />
          <Route path="/sides" element={<SideList addToCart={addToCart} />} />
          <Route path="/salads" element={<SaladList addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/menu" element={<Menu pizzas={pizzas} drinks={drinks} desserts={desserts} />} />
        </Routes>
        <div>
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
          <ScrollToTop />
        </div>
      </div>
    </Router>
  );
};

export default App;

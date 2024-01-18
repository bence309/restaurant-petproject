// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import LoginForm from './LoginForm';
import ScrollToTop from './ScrollToTop';
import './ScrollToTop.css';
import Menu from './Menu';
import './App.css';
import './LoginForm.css'; // Include the LoginForm.css file

const Home = ({ location }) => {
  console.log('Location:', location);
  const welcomeMessage = location.state && location.state.welcomeMessage;

  return (
    <div>
      <h2>Home</h2>
      {welcomeMessage && <p>{welcomeMessage}</p>}
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [message, setMessage] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [pizzas, setPizzas] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [desserts, setDesserts] = useState([]);
  const [username, setUsername] = useState(''); // New state to store the username
  const [locationState, setLocationState] = useState({}); // New state to manage location state

  useEffect(() => {
    // Fetch pizzas, drinks, and desserts data
    const fetchData = async () => {
      try {
        const pizzasResponse = await fetch('https://api.example.com/pizzas');
        const drinksResponse = await fetch('https://api.example.com/drinks');
        const dessertsResponse = await fetch('https://api.example.com/desserts');

        const pizzasData = await pizzasResponse.json();
        const drinksData = await drinksResponse.json();
        const dessertsData = await dessertsResponse.json();

        setPizzas(pizzasData);
        setDrinks(drinksData);
        setDesserts(dessertsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update local storage when the cart changes
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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

  const handleLogin = (loggedInUser) => {
    console.log('loggedInUser:', loggedInUser); // Add this line for debugging
    setIsAuthenticated(true);
    setLocationState({ welcomeMessage: `Welcome, ${loggedInUser.username}!` }); // Set the welcome message in the state
  };
  

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUsername(''); // Clear the username on logout
  };

  return (
    <Router>
      <div className={darkMode ? 'app-container dark-mode' : 'app-container light-mode'}>
        <Navigation isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/menu" /> : <RegistrationForm />}
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" state={locationState} />
              ) : (
                <LoginForm onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/menu"
            element={<Menu pizzas={pizzas} drinks={drinks} desserts={desserts} />}
          />
          <Route path="/" element={<Home location={{ state: locationState }} />} />
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

import React, { useState } from 'react';
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

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
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
        <Route path="/cart" element={<Cart cart={cart} />} />
      </Routes>
      
    </Router>
  );
};

export default App;

// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PizzaList from './PizzaList';
import DrinkList from './DrinkList';
import DessertList from './DessertList';
import SauceList from './SauceList';
import PastaList from './PastaList';
import SideList from './SideList';
import Navigation from './Navigation';

const App = () => {
  return (
    <Router>
      <Navigation /> {/* Add this line */}
      <Routes>
        <Route path="/pizza" element={<PizzaList />} />
        <Route path="/drinks" element={<DrinkList />} />
        <Route path="/dessert" element={<DessertList />} />
        <Route path="/sauces" element={<SauceList />} />
        <Route path="/pasta" element={<PastaList />} />
        <Route path="/sides" element={<SideList />} />
      </Routes>
    </Router>
  );
};

export default App;

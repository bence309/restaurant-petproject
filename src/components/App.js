// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PizzaList from './PizzaList';
import DrinkList from './DrinkList';
import DessertList from './DessertList';
import Navigation from './Navigation'; // Add this line

const App = () => {
  return (
    <Router>
      <Navigation /> {/* Add this line */}
      <Routes>
        <Route path="/pizza" element={<PizzaList />} />
        <Route path="/drinks" element={<DrinkList />} />
        <Route path="/dessert" element={<DessertList />} />
      </Routes>
    </Router>
  );
};

export default App;

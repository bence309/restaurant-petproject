// src/components/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PizzaList from './PizzaList';
import DrinkList from './DrinkList';
import Navigation from './Navigation'; // Add this line

const App = () => {
  return (
    <Router>
      <Navigation /> {/* Add this line */}
      <Routes>
        <Route path="/pizza" element={<PizzaList />} />
        <Route path="/drinks" element={<DrinkList />} />
      </Routes>
    </Router>
  );
};

export default App;

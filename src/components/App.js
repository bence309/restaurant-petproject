import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PizzaList from './PizzaList'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Example Pizza route */}
        <Route path="/pizza" element={<PizzaList />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
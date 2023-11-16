import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import PizzaList from './PizzaList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Route path="/pizzas" component={PizzaList} />
        {/* Add more routes for other sections */}
      </div>
    </Router>
  );
};

export default App;
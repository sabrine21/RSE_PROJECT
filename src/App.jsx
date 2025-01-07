import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Shipping from './pages/Shipping';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-brand">EcoWear</Link>
          <Link to="/cart" className="cart-link">
            Cart ({cartItems.length})
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} 
          />
          <Route path="/shipping" element={<Shipping />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
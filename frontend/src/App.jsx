import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Footer from './components/Footer';
import ShippingInfo from './pages/ShippingInfo';
import ShippingMethod from './components/ShippingMethod';
import Payment from './pages/Payment';

import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [shippingData, setShippingData] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-brand">EcoWear</Link>
          <div className="nav-links">
            {!isLoggedIn && (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}
            <Link to="/cart" className="cart-link">
              <ShoppingBagIcon className="cart-icon" />
              <span>Panier ({cartItems.length})</span>
            </Link>
          </div>
          {isLoggedIn && (
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
          <Route path="/shipping-info" element={<ShippingInfo onSubmit={setShippingData} />} />
          <Route path="/shipping-method" element={
            <ShippingMethod 
              onSelect={setSelectedShipping} 
              selected={selectedShipping}
            />
          } />
          <Route path="/payment" element={
            <Payment 
              cartItems={cartItems}
              shippingData={shippingData}
              shippingMethod={selectedShipping}
            />
          } />          
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

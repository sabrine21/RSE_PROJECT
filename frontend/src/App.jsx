import React, { useState, useContext } from 'react';
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
import ScrollToTop from './components/ScrollToTop'; // Import du composant ScrollToTop
import './App.css';

// Import du AuthContext
import AuthContext from './contexts/AuthContext';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [shippingData, setShippingData] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState(null);

  // On récupère isAuthenticated et logout du context
  const { isAuthenticated, logout } = useContext(AuthContext);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Fonction logout
  const handleLogout = () => {
    logout();
  };

  return (
    <Router>
      {/* Intégration de ScrollToTop ici */}
      <ScrollToTop />
      <div className="app">
        <nav className="navbar">
          <Link to="/" className="nav-brand">EcoWear</Link>
          
          <div className="nav-links">
            {/* Si pas authentifié, on propose le lien "Login" */}
            {!isAuthenticated && (
              <Link to="/login" className="login-link">
                Login
              </Link>
            )}

            {/* Lien du Panier */}
            <Link to="/cart" className="cart-link">
              <ShoppingBagIcon className="cart-icon" />
              <span>Panier ({cartItems.length})</span>
            </Link>

            {/* Si l'utilisateur est authentifié, on affiche le bouton Logout */}
            {isAuthenticated && (
              <button onClick={handleLogout} className="logout-link">
                Logout
              </button>
            )}
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} 
          />
          <Route 
            path="/shipping-info" 
            element={<ShippingInfo onSubmit={setShippingData} />} 
          />
          <Route 
            path="/shipping-method" 
            element={
              <ShippingMethod 
                onSelect={setSelectedShipping} 
                selected={selectedShipping}
              />
            } 
          />
          <Route 
            path="/payment" 
            element={
              <Payment 
                cartItems={cartItems}
                shippingData={shippingData}
                shippingMethod={selectedShipping}
              />
            } 
          />

          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

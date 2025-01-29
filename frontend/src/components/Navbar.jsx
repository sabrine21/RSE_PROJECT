import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import '../App.css';

const Navbar = ({ cartItemsCount }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">EcoWear</Link>
      <div className="nav-links">
        {!isAuthenticated ? (
          <Link to="/login" className="login-link">Login</Link>
        ) : (
          <button onClick={logout} className="logout-button">Logout</button>
        )}
        <Link to="/cart" className="cart-link">
          <ShoppingBagIcon className="cart-icon" />
          <span>Panier ({cartItemsCount})</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

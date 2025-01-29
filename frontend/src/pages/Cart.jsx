import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

import AuthContext from '../contexts/AuthContext'; // importer le contexte

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();

  // Récupérer isAuthenticated
  const { isAuthenticated } = useContext(AuthContext);

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);
  const totalweight = cartItems.reduce((sum, item) => sum + parseFloat(item.weight), 0);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // L'utilisateur n'est pas connecté, on l'envoie vers /login
      navigate('/login');
    } else {
      // L'utilisateur est connecté, on peut poursuivre
      navigate('/shipping-info');
    }
  };

  return (
    <div className="cart">
      <h1>Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`€{item.id}-€{index}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>{item.weight}kg</p>
                  <p>€{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Supprimer
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total weight of the package: {totalweight} kg</h3>
            <h3>Total price: €{total.toFixed(2)}</h3>
            <button onClick={handleCheckout} className="checkout-btn">
              Valider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

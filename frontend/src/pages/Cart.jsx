import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h1>Votre Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
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
            <h3>Total: ${total.toFixed(2)}</h3>
            <button 
              onClick={() => navigate('/shipping-info')}
              className="checkout-btn"
            >
              Valider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// Ensure the component is exported as a named export as well
export { Cart };

// Default export remains for flexibility
export default Cart;

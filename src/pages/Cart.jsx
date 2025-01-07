import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

const Cart = ({ cartItems, removeFromCart }) => {
  const navigate = useNavigate();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>${item.price}</p>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${total.toFixed(2)}</h3>
            <button 
              onClick={() => navigate('/shipping')}
              className="checkout-btn"
            >
              Proceed to Shipping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
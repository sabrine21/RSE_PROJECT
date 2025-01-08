import React, { useState } from 'react';
import '../styles/Payment.css';

const Payment = ({ cartItems, shippingData, shippingMethod }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shippingCost = shippingMethod ? shippingMethod.price : 0;
  const total = subtotal + shippingCost;

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Intégrer avec un système de paiement
    console.log('Commande finalisée:', {
      items: cartItems,
      shipping: shippingData,
      shippingMethod,
      payment: paymentData,
      total
    });
  };

  return (
    <div className="payment">
      <h1>Paiement</h1>
      
      <div className="payment-container">
        <div className="payment-form">
          <h2>Informations de paiement</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="cardNumber">Numéro de carte</label>
              <input
                type="text"
                id="cardNumber"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName">Nom sur la carte</label>
              <input
                type="text"
                id="cardName"
                value={paymentData.cardName}
                onChange={(e) => setPaymentData({...paymentData, cardName: e.target.value})}
                required
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="expiryDate">Date d'expiration</label>
                <input
                  type="text"
                  id="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={(e) => setPaymentData({...paymentData, expiryDate: e.target.value})}
                  placeholder="MM/AA"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="order-summary">
              <h3>Récapitulatif</h3>
              <div className="summary-row">
                <span>Sous-total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Livraison ({shippingMethod?.name})</span>
                <span>${shippingCost.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Payer ${total.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="order-details">
          <h2>Détails de la commande</h2>
          <div className="shipping-details">
            <h3>Adresse de livraison</h3>
            <p>{shippingData?.firstName} {shippingData?.lastName}</p>
            <p>{shippingData?.address}</p>
            <p>{shippingData?.city}, {shippingData?.postalCode}</p>
            <p>{shippingData?.country}</p>
          </div>
          
          <div className="shipping-method-details">
            <h3>Mode de livraison</h3>
            <p>{shippingMethod?.name}</p>
            <p>Délai: {shippingMethod?.deliveryTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Payment;
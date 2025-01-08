import React, { useState } from 'react';
import '../styles/Checkout.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    // Informations de livraison
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    // Informations de paiement
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Intégrer avec un système de paiement
    console.log('Commande soumise:', formData);
  };

  return (
    <div className="checkout">
      <h1>Finaliser la commande</h1>
      
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-section">
          <h2>Adresse de livraison</h2>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Nom</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group full-width">
              <label htmlFor="address">Adresse</label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="postalCode">Code postal</label>
              <input
                type="text"
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="country">Pays</label>
              <select
                id="country"
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                required
              >
                <option value="">Sélectionnez un pays</option>
                <option value="FR">France</option>
                <option value="BE">Belgique</option>
                <option value="CH">Suisse</option>
                <option value="CA">Canada</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Informations de paiement</h2>
          <div className="form-grid">
            <div className="form-group full-width">
              <label htmlFor="cardNumber">Numéro de carte</label>
              <input
                type="text"
                id="cardNumber"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cardName">Nom sur la carte</label>
              <input
                type="text"
                id="cardName"
                value={formData.cardName}
                onChange={(e) => setFormData({...formData, cardName: e.target.value})}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="expiryDate">Date d'expiration</label>
              <input
                type="text"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                placeholder="MM/AA"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                type="text"
                id="cvv"
                value={formData.cvv}
                onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h2>Récapitulatif de la commande</h2>
          <div className="summary-row">
            <span>Sous-total</span>
            <span>89.99 €</span>
          </div>
          <div className="summary-row">
            <span>Livraison</span>
            <span>5.99 €</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>95.98 €</span>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Confirmer la commande
        </button>
      </form>
    </div>
  );
};

export default Checkout;
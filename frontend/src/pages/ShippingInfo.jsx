import React, { useState  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/ShippingInfo.css';

const ShippingInfo = ({ onSubmit }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  console.log("formData",formData);
  console.log('total weight in shipping info',location.state?.totalWeight);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/shipping-method', { state: { address: formData.address, totalWeight: location.state?.totalWeight } });
  };

  return (
    <div className="shipping-info">
      <h1>Informations de livraison</h1>
      
      <form onSubmit={handleSubmit} className="shipping-form">
        <div className="form-grid">
          {/* First Name */}
          <div className="form-group">
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group">
            <label htmlFor="lastName">Nom</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group">
            <label htmlFor="phone">Téléphone</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          {/* Address */}
          <div className="form-group full-width">
            <label htmlFor="address">Adresse</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">Ville</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              required
            />
          </div>

          {/* Postal Code */}
          <div className="form-group">
            <label htmlFor="postalCode">Code postal</label>
            <input
              type="text"
              id="postalCode"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
              required
            />
          </div>

          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">Pays</label>
            <select
              id="country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
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

        {/* Submit Button */}
        <button type="submit" className="continue-btn">
          Continuer vers le mode de livraison
        </button>
      </form>
    </div>
  );
};


export default ShippingInfo;

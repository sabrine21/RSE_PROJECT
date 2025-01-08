import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ShippingMethod.css';

// Shipping Methods Data
const shippingMethods = [
  {
    id: 1,
    type: 'eco',
    name: 'Eco-Friendly Delivery',
    price: 5.99,
    carbonFootprint: 0.5,
    deliveryTime: '3-5 days',
  },
  {
    id: 2,
    type: 'standard',
    name: 'Standard Delivery',
    price: 7.99,
    carbonFootprint: 2.1,
    deliveryTime: '2-3 days',
  },
  {
    id: 3,
    type: 'express',
    name: 'Express Delivery',
    price: 12.99,
    carbonFootprint: 4.5,
    deliveryTime: '1-2 days',
  },
];

const ShippingMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0]); // Default to the first method
  const navigate = useNavigate(); // React Router's navigation hook

  const handleContinue = () => {
    console.log('Selected Shipping Method:', selectedMethod);

    // Redirect to the payment page
    navigate('/payment', { state: { selectedMethod } }); // Pass selectedMethod as state
  };

  return (
    <div className="shipping-methods-container">
      <h1>Modes de livraison</h1>
      <p>Sélectionnez un mode de livraison. 🌱 L'option éco est mise en valeur pour son impact minimal sur l'environnement.</p>
      <div className="shipping-methods">
        {shippingMethods.map((method) => (
          <div
            key={method.id}
            className={`shipping-method ${selectedMethod.id === method.id ? 'selected' : ''} ${method.type === 'eco' ? 'eco' : ''}`}
            onClick={() => setSelectedMethod(method)}
          >
            <div className="method-header">
              <h3>{method.name}</h3>
              <span className="carbon-footprint">CO2: {method.carbonFootprint}kg</span>
            </div>
            <p className="delivery-time">Délai de livraison : {method.deliveryTime}</p>
            <p className="price">Prix : ${method.price.toFixed(2)}</p>
            {method.type === 'eco' && (
              <p className="eco-message">
                🌱 Option écologique : Ce mode utilise des transports verts pour minimiser l'impact environnemental.
              </p>
            )}
          </div>
        ))}
      </div>
      <button className="continue-btn" onClick={handleContinue}>
        Continuer avec {selectedMethod.name}
      </button>
    </div>
  );
};

export default ShippingMethod;

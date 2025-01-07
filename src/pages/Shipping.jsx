import React, { useState } from 'react';
import ShippingMethod from '../components/ShippingMethod';
import '../styles/Shipping.css';

const shippingMethods = [
  {
    id: 1,
    type: 'eco',
    name: 'Eco-Friendly Delivery',
    price: 5.99,
    carbonFootprint: 0.5,
    deliveryTime: '3-5 days'
  },
  {
    id: 2,
    type: 'standard',
    name: 'Standard Delivery',
    price: 7.99,
    carbonFootprint: 2.1,
    deliveryTime: '2-3 days'
  },
  {
    id: 3,
    type: 'express',
    name: 'Express Delivery',
    price: 12.99,
    carbonFootprint: 4.5,
    deliveryTime: '1-2 days'
  }
];

const Shipping = () => {
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0]);

  return (
    <div className="shipping">
      <h1>Choose Shipping Method</h1>
      <div className="shipping-methods">
        {shippingMethods.map(method => (
          <ShippingMethod
            key={method.id}
            method={method}
            selected={selectedMethod.id === method.id}
            onSelect={setSelectedMethod}
          />
        ))}
      </div>
      <button className="continue-btn">
        Continue with {selectedMethod.name}
      </button>
    </div>
  );
};

export default Shipping;
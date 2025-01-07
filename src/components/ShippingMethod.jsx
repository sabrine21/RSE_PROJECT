import React from 'react';
import '../styles/ShippingMethod.css';

const ShippingMethod = ({ method, selected, onSelect }) => {
  const isEco = method.type === 'eco';
  
  return (
    <div 
      className={`shipping-method ${selected ? 'selected' : ''} ${isEco ? 'eco' : ''}`}
      onClick={() => onSelect(method)}
    >
      <div className="method-header">
        <h3>{method.name}</h3>
        <span className="carbon-footprint">
          CO2: {method.carbonFootprint}kg
        </span>
      </div>
      <p className="delivery-time">Delivery time: {method.deliveryTime}</p>
      <p className="price">Price: ${method.price}</p>
      {isEco && (
        <p className="eco-message">
          🌱 Eco-friendly option: This method uses mixed green transportation 
          to minimize environmental impact
        </p>
      )}
    </div>
  );
};

export default ShippingMethod;
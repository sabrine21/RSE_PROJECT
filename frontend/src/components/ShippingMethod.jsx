import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/ShippingMethod.css';
import axios from 'axios';
const shippingMethods = [
  {
    id: 1,
    type: 'eco',
    name: 'Eco-Friendly Delivery',
    price: 10,
    carbonFootprint: 0.5,
    deliveryTime: '3-5 days',
  },
  {
    id: 2,
    type: 'standard',
    name: 'Standard Delivery',
    price: 5,
    carbonFootprint: 2.1,
    deliveryTime: '2-3 days',
  },
  {
    id: 3,
    type: 'express',
    name: 'Express Delivery',
    price: 7,
    carbonFootprint: 4.5,
    deliveryTime: '1-2 days',
  },
];

const ShippingMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const totalWeight = location.state?.totalWeight || 0;
  const [selectedMethod, setSelectedMethod] = useState(shippingMethods[0]);
  const [CalculatedcarbonFootprint, setCalculatedcarbonFootprint] = useState(0);
  const [loading, setLoading] = useState(true); 

  console.log("total weight",totalWeight);

  useEffect(() => {
    const calculateCarbonFootprint = async () => {
      try {
        setLoading(true);
        console.log("sending request to calculate");
        const response = await axios.post('http://localhost:8080/api/emissions/calculate', {
          sellerAddress: "15 Rue de la Gare, 76300 Sotteville-lès-Rouen", // Adresse du vendeur
          clientAddress: location.state?.address || "5 Avenue du Mont Riboudet, 76000 Rouen", // Adresse du client
          packageWeight: totalWeight
        });
        setCalculatedcarbonFootprint(response.data.totalEmissions);
      } catch (error) {
        console.error("Error calculating carbon footprint:", error);
      } finally {
        setLoading(false); 
      }
    };

    calculateCarbonFootprint();
  }, [totalWeight, location.state?.address]);
  console.log("carbon footprint",CalculatedcarbonFootprint);

  const handleContinue = () => {
    navigate('/payment', { state: { selectedMethod, totalWeight } });
  };


  return (
    <div className="shipping-methods-container">
      <h1>Modes de livraison</h1>
      <p>Sélectionnez un mode de livraison. 🌱 L'option éco est mise en valeur pour son impact minimal sur l'environnement.</p>
      {loading ? (
        // Afficher un indicateur de chargement pendant le calcul
        <div className="loading-message">
          <p>Calcul de l'empreinte carbone en cours...</p>
          <div className="spinner"></div> {/* Optionnel : Ajouter une animation de chargement */}
        </div>
      ) : (
        // Afficher les méthodes de livraison une fois le calcul terminé
        <>
      <div className="shipping-methods">

{/* Méthode Eco-Friendly */}
<div
          className={`shipping-method €{selectedMethod.id === 1 ? 'selected' : ''} eco`}
          onClick={() => setSelectedMethod(shippingMethods[0])}
        >
          <div className="method-header">
            <h3>{shippingMethods[0].name}</h3>
            <span className="carbon-footprint">CO2: {CalculatedcarbonFootprint.toFixed(2)}g</span>
          </div>
          <p className="delivery-time">Délai de livraison : {shippingMethods[0].deliveryTime}</p>
          <p className="price">Prix : €{shippingMethods[0].price.toFixed(2)}</p>
          <p className="eco-message">
                🌱 Option écologique : Ce mode utilise des transports verts pour minimiser l'impact environnemental.
              </p>
        </div>

        {/* Méthode Standard */}
        <div
          className={`shipping-method €{selectedMethod.id === 2 ? 'selected' : ''}`}
          onClick={() => setSelectedMethod(shippingMethods[1])}
        >
          <div className="method-header">
            <h3>{shippingMethods[1].name}</h3>
            <span className="carbon-footprint">CO2: {shippingMethods[1].carbonFootprint.toFixed(2)}g</span>
          </div>
          <p className="delivery-time">Délai de livraison : {shippingMethods[1].deliveryTime}</p>
          <p className="price">Prix : €{shippingMethods[1].price.toFixed(2)}</p>
        </div>

        {/* Méthode Express */}
        <div
          className={`shipping-method €{selectedMethod.id === 3 ? 'selected' : ''}`}
          onClick={() => setSelectedMethod(shippingMethods[2])}
        >
          <div className="method-header">
            <h3>{shippingMethods[2].name}</h3>
            <span className="carbon-footprint">CO2: {shippingMethods[2].carbonFootprint.toFixed(2)}g</span>
          </div>
          <p className="delivery-time">Délai de livraison : {shippingMethods[2].deliveryTime}</p>
          <p className="price">Prix : €{shippingMethods[2].price.toFixed(2)}</p>
        </div>

      </div>
      <div className="buttons-container">
        <Link to="/carbon-info" className="continue-btn">
          En savoir plus sur l'empreinte carbone
        </Link>
        <button className="continue-btn" onClick={handleContinue}>
          Continuer avec {selectedMethod.name}
        </button>
      </div>
        </>
      )}
    </div>
  );
};

export default ShippingMethod;
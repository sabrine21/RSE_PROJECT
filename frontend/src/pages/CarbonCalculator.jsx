import React, { useState, useEffect } from 'react';

const CarbonCalculator = ({ cartItems, shippingMethod, onCalculationComplete }) => {
    const [address, setAddress] = useState('');
    const [ecoOption, setEcoOption] = useState(false);
    const [totalWeight, setTotalWeight] = useState(0);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (cartItems.length > 0) {
            calculateWeight();
        }
    }, [cartItems]);

    const calculateWeight = () => {
        const weight = cartItems.reduce((sum, item) => sum + item.weight, 0);
        setTotalWeight(weight);
    };

    const handleCalculate = async () => {
        const savedShippingInfo = JSON.parse(localStorage.getItem("shippingInfo"));

        const response = await fetch('http://localhost:8080/api/shipping/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                address: savedShippingInfo.address,
                weight: totalWeight,
                ecoOption,
                deliveryMethod: savedShippingInfo.deliveryMethod
            }),
        });

        const data = await response.json();
        setResult(data);
        onCalculationComplete(data);
    };

    return (
        <div className="calculator-container">
            <h2>Calculateur d'empreinte carbone</h2>

            <label>Adresse :</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />

            <h3>Poids du colis : {totalWeight.toFixed(2)} kg</h3>

            <label>Option écologique :</label>
            <input type="checkbox" checked={ecoOption} onChange={() => setEcoOption(!ecoOption)} />

            <button onClick={handleCalculate}>Calculer</button>

            {result && (
                <div className="result">
                    <h3>Résultats</h3>
                    <p>Centre de distribution : {result.center}</p>
                    <p>Mode de transport : {result.transportMode}</p>
                    <p>Distance totale : {result.totalDistance.toFixed(2)} km</p>
                    <p>Empreinte carbone : {result.carbonFootprint.toFixed(2)} g CO₂</p>
                </div>
            )}
        </div>
    );
};

export default CarbonCalculator;

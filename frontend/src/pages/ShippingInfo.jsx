import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ShippingInfo.css";
import MapView from "../components/MapView";

// 📍 Coordonnées de l'entrepôt
const WAREHOUSE_COORDS = [49.433, 1.083];

// 📦 Points relais avec leurs coordonnées et distances finales
const pickupPoints = {
  "Rouen": { address: "174 Rue Saint-Sever, 76100 Rouen", coords: [49.4432, 1.0999], finalDistance: 8.3 },
  "Toulouse": { address: "7 Rue Baour Lormian, 31000 Toulouse", coords: [43.6047, 1.4442], finalDistance: 795 },
  "Caen": { address: "24 rue Lanfranc, 14000 Caen", coords: [49.1829, -0.3707], finalDistance: 136.6 },
};

// 📦 Centres de distribution
const distributionCenters = {
  "Rouen": { address: "5 Avenue du Mont Riboudet, 76000 Rouen", coords: [49.4432, 1.0999] },
  "Caen": { address: "Boulevard Georges Pompidou, 14000 Caen", coords: [49.1829, -0.3707] },
  "Toulouse": { address: "4 Rue des Cosmonautes, 31000 Toulouse", coords: [43.6047, 1.4442] },
};

const ShippingInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    deliveryType: "home",
    selectedPickupPoint: "",
  });

  const [selectedCenter, setSelectedCenter] = useState(null);
  const [totalDistance, setTotalDistance] = useState(null);
  const [totalWeight, setTotalWeight] = useState(Math.floor(Math.random() * 5) + 1);
  const [mapCoords, setMapCoords] = useState({
    warehouse: WAREHOUSE_COORDS,
    center: null,
    relay: null,
    customer: null,
  });

  // 🎯 Récupération des données du backend
  useEffect(() => {
    if (formData.deliveryType === "home" && formData.address) {
      fetch("http://localhost:8080/api/shipping/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: formData.address,
          weight: totalWeight,
          deliveryMethod: "home",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectedCenter(data.center);
          setTotalDistance(data.totalDistance);
          setMapCoords({
            warehouse: WAREHOUSE_COORDS,
            center: distributionCenters[data.center]?.coords,
            customer: getCoordinates(formData.address),
          });
        })
        .catch((err) => console.error("Erreur lors de la récupération des données :", err));
    } else if (formData.deliveryType === "pickup" && formData.selectedPickupPoint) {
      const selectedRelay = pickupPoints[formData.selectedPickupPoint];
      setMapCoords({
        warehouse: WAREHOUSE_COORDS,
        center: distributionCenters[formData.selectedPickupPoint]?.coords,
        relay: selectedRelay.coords,
      });
      setSelectedCenter(formData.selectedPickupPoint);
      setTotalDistance(selectedRelay.finalDistance);
    }
  }, [formData.address, formData.selectedPickupPoint, formData.deliveryType]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/shipping-method");
  };

  return (
    <div className="shipping-info">
      <h1>🚚 Informations de livraison</h1>

      <form onSubmit={handleSubmit} className="shipping-form">
        {/* Champs du formulaire */}
        <div className="form-group">
          <label>Prénom</label>
          <input type="text" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input type="text" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
        </div>

        <div className="form-group">
          <label>Mode de livraison :</label>
          <select value={formData.deliveryType} onChange={(e) => setFormData({ ...formData, deliveryType: e.target.value })}>
            <option value="home">🏠 Livraison à domicile</option>
            <option value="pickup">📍 Point Relais</option>
          </select>
        </div>

        {formData.deliveryType === "home" && (
          <div className="form-group">
            <label>Adresse</label>
            <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} required />
          </div>
        )}

        {formData.deliveryType === "pickup" && (
          <div className="form-group">
            <label>Point relais</label>
            <select value={formData.selectedPickupPoint} onChange={(e) => setFormData({ ...formData, selectedPickupPoint: e.target.value })}>
              <option value="">Choisissez un point relais</option>
              {Object.keys(pickupPoints).map((city) => (
                <option key={city} value={city}>{pickupPoints[city].address}</option>
              ))}
            </select>
          </div>
        )}

        {/* Carte de la livraison */}
        <MapView {...mapCoords} />

        {/* 🎯 Récapitulatif de la commande */}
        <div className="recap-container">
          <h2>📦 Récapitulatif de votre commande</h2>
          <div className="recap-card">
            {selectedCenter && <p> <strong>Centre de Distribution :</strong> {selectedCenter}</p>}
            <p> <strong>Poids du colis :</strong> {totalWeight} kg</p>
            {totalDistance && <p> <strong>Distance totale :</strong> {totalDistance} km</p>}
          </div>
        </div>

        <button type="submit" className="continue-btn">✅ Confirmer la Livraison</button>
      </form>
    </div>
  );
};

export default ShippingInfo;

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// 📍 Icône par défaut de Leaflet
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapView = ({ warehouse, center, relay, customer }) => {
  return (
    <MapContainer center={warehouse} zoom={6} style={{ height: "400px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 🏭 Entrepôt */}
      <Marker position={warehouse} icon={defaultIcon}>
        <Popup>Entrepôt</Popup>
      </Marker>

      {/* 📦 Centre de distribution */}
      {center && (
        <Marker position={center} icon={defaultIcon}>
          <Popup>Centre de Distribution</Popup>
        </Marker>
      )}

      {/* 📍 Point Relais */}
      {relay && (
        <Marker position={relay} icon={defaultIcon}>
          <Popup>Point Relais</Popup>
        </Marker>
      )}

      {/* 🏠 Adresse du client */}
      {customer && (
        <Marker position={customer} icon={defaultIcon}>
          <Popup>Adresse du Client</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapView;

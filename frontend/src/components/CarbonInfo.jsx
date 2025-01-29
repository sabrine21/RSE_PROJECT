import React from "react";
import "../styles/CarbonInfo.css";

const CarbonInfo = () => {
  return (
    <div className="carbon-info">
      <h1>Comment se calcule l'empreinte carbone ?</h1>
      <p>
        L'empreinte carbone d'un produit ou d'un service est calculée en prenant en compte :
      </p>
      <ul>
        <li>Le mode de transport utilisé (camion, avion, train, etc.).</li>
        <li>Le poids du produit ou de la cargaison transportée.</li>
        <li>La distance parcourue (en kilomètres).</li>
      </ul>
      <p>
        Par exemple, l'émission de CO₂ pour un camion diesel est calculée à l'aide de la formule suivante :
      </p>
      <div className="formula">
        <strong>Émissions (g) = Distance (km) × Poids (kg) × Facteur d'émission</strong>
      </div>

      <h2>Tableau des émissions carbone</h2>
      <table>
        <thead>
          <tr>
            <th>Mode de Transport</th>
            <th>Émission carbone (gCO₂/km.kg)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Avion cargo</td>
            <td>1.9</td>
          </tr>
          <tr>
            <td>Camion diesel</td>
            <td>0.35</td>
          </tr>
          <tr>
            <td>Camion hybride</td>
            <td>0.308</td>
          </tr>
          <tr>
            <td>Voiture diesel</td>
            <td>0.25</td>
          </tr>
          <tr>
            <td>Camion électrique</td>
            <td>0.144</td>
          </tr>
          <tr>
            <td>Voiture électrique</td>
            <td>0.1</td>
          </tr>
          <tr>
            <td>Transport fluvial</td>
            <td>0.096</td>
          </tr>
          <tr>
            <td>Train à traction diesel</td>
            <td>0.031</td>
          </tr>
          <tr>
            <td>Vélo cargo électrique</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>

      <h2>Modes de transport recommandés</h2>
      <p>
        Voici une répartition des modes de transport recommandés selon la distance et la taille des colis :
      </p>
      <table>
        <thead>
          <tr>
            <th>Catégorie</th>
            <th>Mode de Transport</th>
            <th>Taille des Colis</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Local</td>
            <td>Vélo électrique</td>
            <td>Petits à Moyens (0-50 kg)</td>
            <td>0-5 km</td>
          </tr>
          <tr>
            <td>Local</td>
            <td>Scooter électrique</td>
            <td>Petits (0-20 kg)</td>
            <td>5-15 km</td>
          </tr>
          <tr>
            <td>Régional</td>
            <td>Camion électrique</td>
            <td>Moyens à Grands (50-500 kg)</td>
            <td>50-300 km</td>
          </tr>
          <tr>
            <td>National</td>
            <td>Fret ferroviaire</td>
            <td>Grands (10,000-20,000 kg)</td>
            <td>300-1,000 km</td>
          </tr>
        </tbody>
      </table>

      <h2>Sources et Références</h2>
      <ul>
        <li>
          <a href="https://impactco2.fr/outils/livraison" target="_blank" rel="noopener noreferrer">
            Outil de calcul : impactco2.fr
          </a>
        </li>
        <li>
          <a href="https://www.groupe-sncf.com/fr/engagements/developpement-durable/preserver-planete/calcul-empreinte-carbone" target="_blank" rel="noopener noreferrer">
            Calcul de l’empreinte carbone - SNCF
          </a>
        </li>
        <li>
          <a href="https://www.axaprevention.fr/fr/article/empreinte-carbone-colis-et-livraisons-conseils-pour-minimiser-limpact" target="_blank" rel="noopener noreferrer">
            Réduction de l’impact des livraisons - AXA Prévention
          </a>
        </li>
      </ul>

      <button
        className="cta-button"
        onClick={() =>
          window.open("https://impactco2.fr/outils/livraison", "_blank")
        }
      >
        Calculer votre empreinte carbone
      </button>
    </div>
  );
};

export default CarbonInfo;

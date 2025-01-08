import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>À propos d'EcoWear</h3>
          <p>Votre destination pour la mode durable et éthique. Nous nous engageons à créer un avenir plus vert pour la mode.</p>
        </div>
        
        <div className="footer-section">
          <h3>Liens Rapides</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/cart">Panier</Link></li>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/signup">Inscription</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Service Client</h3>
          <ul>
            <li><Link to="/shipping">Livraison</Link></li>
            <li><Link to="/returns">Retours</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Newsletter</h3>
          <p>Inscrivez-vous pour recevoir nos offres</p>
          <div className="newsletter-form">
            <input type="email" placeholder="Votre email" />
            <button>S'inscrire</button>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 EcoWear. Tous droits réservés.</p>
        <div className="footer-links">
          <Link to="/privacy">Confidentialité</Link>
          <Link to="/terms">Conditions d'utilisation</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
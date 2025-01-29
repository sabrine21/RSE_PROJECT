import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

// On importe le contexte
import AuthContext from '../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();

  // On récupère la fonction `login` depuis le context
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Supposons que le backend renvoie un JSON du type { token: "xxx" }
      const data = await response.json();
      console.log('Login successful:', data);

      // On appelle la fonction login du context
      // Cette fonction va stocker le token et mettre isAuthenticated à true
      login(data.token);

      // Rediriger par exemple vers la page d'accueil
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="login-subtitle">Sign in to your EcoWear account</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>

        <p className="login-footer">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

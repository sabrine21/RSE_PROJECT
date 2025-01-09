// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

// On crée le contexte
const AuthContext = createContext();

// Le "Provider" qui va envelopper notre application
export const AuthProvider = ({ children }) => {
  // État local pour savoir si l'utilisateur est loggé
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };


  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Définit la position de défilement en haut
    window.scrollTo(0, 0);
  }, [pathname]); // Exécute cet effet à chaque changement de route

  return null;
};

export default ScrollToTop;

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Tracks page navigation for analytics — auth and base44 removed
export default function NavigationTracker() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on every route change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return null;
}
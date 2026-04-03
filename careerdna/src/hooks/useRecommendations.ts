import { useState, useEffect } from 'react';
import { CareerMatch } from '@/types';
import { MOCK_CAREERS } from '@/lib/constants';

export function useRecommendations() {
  const [careers, setCareers] = useState<CareerMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCareers(MOCK_CAREERS);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  return { careers, loading, favorites, toggleFavorite };
}

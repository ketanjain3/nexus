import { useState, useEffect } from 'react';

interface HeroStats {
  tvl: number;
  collateralRatio: number;
  marketSize: number;
  activeLoans: number;
}

export const useHeroStats = () => {
  const [stats, setStats] = useState<HeroStats>({
    tvl: 127000000,
    collateralRatio: 90,
    marketSize: 500000000000,
    activeLoans: 1247,
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setStats(prev => ({
        tvl: prev.tvl + Math.floor(Math.random() * 100000) - 50000,
        collateralRatio: 90 - Math.floor(Math.random() * 5),
        marketSize: prev.marketSize + Math.floor(Math.random() * 1000000000),
        activeLoans: prev.activeLoans + Math.floor(Math.random() * 10) - 5,
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

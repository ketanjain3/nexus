import { useState, useEffect } from 'react';

interface AnimatedStatsData {
  tvl: number;
  activeUsers: number;
  transactions: number;
  uptime: number;
}

export const useAnimatedStats = () => {
  const [stats, setStats] = useState<AnimatedStatsData>({
    tvl: 127000000,
    activeUsers: 48250,
    transactions: 892000,
    uptime: 99.9,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        tvl: prev.tvl + Math.floor(Math.random() * 200000) - 100000,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 5,
        transactions: prev.transactions + Math.floor(Math.random() * 100),
        uptime: +(Math.max(99.5, Math.min(100, prev.uptime + (Math.random() - 0.5) * 0.05))).toFixed(2),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

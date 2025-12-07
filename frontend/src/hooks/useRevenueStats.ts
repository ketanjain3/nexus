import { useState, useEffect } from 'react';

interface RevenueStats {
  originationFees: number;
  yieldSpreadEarnings: number;
  liquidationCount: number;
  liquidationFees: number;
  apiClientCount: number;
  currentTVL: number;
  targetTVL: number;
}

export const useRevenueStats = () => {
  const [stats, setStats] = useState<RevenueStats>({
    originationFees: 847000,
    yieldSpreadEarnings: 1240000,
    liquidationCount: 89,
    liquidationFees: 178000,
    apiClientCount: 12,
    currentTVL: 127000000,
    targetTVL: 200000000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        originationFees: prev.originationFees + Math.floor(Math.random() * 5000),
        yieldSpreadEarnings: prev.yieldSpreadEarnings + Math.floor(Math.random() * 8000),
        liquidationCount: prev.liquidationCount + (Math.random() > 0.7 ? 1 : 0),
        liquidationFees: prev.liquidationFees + Math.floor(Math.random() * 3000),
        apiClientCount: prev.apiClientCount + (Math.random() > 0.9 ? 1 : 0),
        currentTVL: prev.currentTVL + Math.floor(Math.random() * 200000) - 100000,
      }));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

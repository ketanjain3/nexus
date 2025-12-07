import { useState, useEffect } from 'react';

interface ProblemStats {
  aaveCollateral: number;
  compoundCollateral: number;
  avgOverCollateral: number;
  roscaFraudRate: number;
  scamsPrevented: number;
  fraudAmountBlocked: number;
}

export const useProblemStats = () => {
  const [stats, setStats] = useState<ProblemStats>({
    aaveCollateral: 150,
    compoundCollateral: 155,
    avgOverCollateral: 152,
    roscaFraudRate: 23,
    scamsPrevented: 847,
    fraudAmountBlocked: 12400000,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        scamsPrevented: prev.scamsPrevented + Math.floor(Math.random() * 3),
        fraudAmountBlocked: prev.fraudAmountBlocked + Math.floor(Math.random() * 50000),
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

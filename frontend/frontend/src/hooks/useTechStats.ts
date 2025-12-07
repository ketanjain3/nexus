import { useState, useEffect } from 'react';

interface TechStats {
  walletsAnalyzed: number;
  modelAccuracy: number;
  attestationsProcessed: number;
  avgAttestationTime: number;
  activeProviders: number;
  priceFeeds: number;
  oracleUptime: number;
  smartAccountsCreated: number;
  automatedRepayments: number;
  liquidationsPrevented: number;
}

export const useTechStats = () => {
  const [stats, setStats] = useState<TechStats>({
    walletsAnalyzed: 48250,
    modelAccuracy: 94.7,
    attestationsProcessed: 12847,
    avgAttestationTime: 2.3,
    activeProviders: 7,
    priceFeeds: 24,
    oracleUptime: 99.94,
    smartAccountsCreated: 3421,
    automatedRepayments: 8956,
    liquidationsPrevented: 247,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        walletsAnalyzed: prev.walletsAnalyzed + Math.floor(Math.random() * 10),
        modelAccuracy: +(prev.modelAccuracy + (Math.random() - 0.5) * 0.1).toFixed(2),
        attestationsProcessed: prev.attestationsProcessed + Math.floor(Math.random() * 5),
        smartAccountsCreated: prev.smartAccountsCreated + Math.floor(Math.random() * 3),
        automatedRepayments: prev.automatedRepayments + Math.floor(Math.random() * 4),
        liquidationsPrevented: prev.liquidationsPrevented + Math.floor(Math.random() * 2),
      }));
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

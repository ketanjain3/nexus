import { useState, useEffect } from 'react';

interface PrimeStats {
  currentAPR: number;
  collateralTiers: {
    score: string;
    ratio: number;
  }[];
  totalLoansIssued: number;
  avgLoanAmount: number;
}

interface CircleStats {
  activeCircles: number;
  totalParticipants: number;
  currentYield: number;
  fbtcPrice: number;
  fxrpPrice: number;
}

export const useProductStats = () => {
  const [primeStats, setPrimeStats] = useState<PrimeStats>({
    currentAPR: 5.8,
    collateralTiers: [
      { score: '750+', ratio: 110 },
      { score: '650-749', ratio: 125 },
      { score: '550-649', ratio: 140 },
    ],
    totalLoansIssued: 3847,
    avgLoanAmount: 45000,
  });

  const [circleStats, setCircleStats] = useState<CircleStats>({
    activeCircles: 284,
    totalParticipants: 5628,
    currentYield: 8.4,
    fbtcPrice: 96500,
    fxrpPrice: 2.34,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrimeStats(prev => ({
        ...prev,
        currentAPR: +(prev.currentAPR + (Math.random() - 0.5) * 0.2).toFixed(2),
        totalLoansIssued: prev.totalLoansIssued + Math.floor(Math.random() * 3),
        avgLoanAmount: prev.avgLoanAmount + Math.floor(Math.random() * 1000) - 500,
      }));

      setCircleStats(prev => ({
        ...prev,
        activeCircles: prev.activeCircles + Math.floor(Math.random() * 2),
        totalParticipants: prev.totalParticipants + Math.floor(Math.random() * 5),
        currentYield: +(prev.currentYield + (Math.random() - 0.5) * 0.1).toFixed(2),
        fbtcPrice: prev.fbtcPrice + Math.floor(Math.random() * 200) - 100,
        fxrpPrice: +(prev.fxrpPrice + (Math.random() - 0.5) * 0.05).toFixed(2),
      }));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return { primeStats, circleStats };
};

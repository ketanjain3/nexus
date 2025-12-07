import { useState, useEffect } from 'react';

interface Milestone {
  title: string;
  completed: boolean;
  eta?: string;
}

interface Phase {
  year: string;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  targetTVL: number;
  currentTVL: number;
  milestones: Milestone[];
}

export const useRoadmapStats = () => {
  const [phases, setPhases] = useState<Phase[]>([
    {
      year: 'Year 1',
      title: 'Build & Beta',
      status: 'current',
      targetTVL: 5000000,
      currentTVL: 3200000,
      milestones: [
        { title: 'Hackathon Win', completed: true },
        { title: 'Mainnet Launch', completed: true },
        { title: 'Security Audits', completed: false, eta: '2 weeks' },
        { title: 'Initial User Onboarding', completed: false, eta: '1 month' },
      ],
    },
    {
      year: 'Year 2',
      title: 'Growth',
      status: 'upcoming',
      targetTVL: 50000000,
      currentTVL: 0,
      milestones: [
        { title: 'B2B API Sales', completed: false, eta: '6 months' },
        { title: '10,000 Active Monthly Users', completed: false, eta: '8 months' },
        { title: 'Partnership Expansion', completed: false, eta: '10 months' },
        { title: 'Credit Score Marketplace', completed: false, eta: '12 months' },
      ],
    },
    {
      year: 'Year 3',
      title: 'Scale',
      status: 'upcoming',
      targetTVL: 200000000,
      currentTVL: 0,
      milestones: [
        { title: 'Cross-chain Credit Scoring', completed: false, eta: '18 months' },
        { title: 'Ethereum/Solana Integration', completed: false, eta: '20 months' },
        { title: 'Protocol Revenue $2M/year', completed: false, eta: '24 months' },
        { title: 'Institutional Partnerships', completed: false, eta: '30 months' },
      ],
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhases(prev => prev.map(phase => {
        if (phase.status === 'current') {
          return {
            ...phase,
            currentTVL: Math.min(phase.currentTVL + Math.floor(Math.random() * 50000), phase.targetTVL),
          };
        }
        return phase;
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return phases;
};

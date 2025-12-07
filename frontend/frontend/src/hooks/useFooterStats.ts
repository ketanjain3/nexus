import { useState, useEffect } from 'react';

interface FooterStats {
  systemStatus: 'operational' | 'degraded' | 'down';
  uptime: number;
  subscriberCount: number;
  twitterFollowers: number;
  githubStars: number;
  discordMembers: number;
  latestUpdate: {
    title: string;
    date: string;
  };
}

export const useFooterStats = () => {
  const [stats, setStats] = useState<FooterStats>({
    systemStatus: 'operational',
    uptime: 99.94,
    subscriberCount: 8247,
    twitterFollowers: 12500,
    githubStars: 847,
    discordMembers: 3421,
    latestUpdate: {
      title: 'Mainnet Launch Announcement',
      date: '2 days ago',
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        subscriberCount: prev.subscriberCount + Math.floor(Math.random() * 5),
        twitterFollowers: prev.twitterFollowers + Math.floor(Math.random() * 10),
        githubStars: prev.githubStars + (Math.random() > 0.8 ? 1 : 0),
        discordMembers: prev.discordMembers + Math.floor(Math.random() * 3),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return stats;
};

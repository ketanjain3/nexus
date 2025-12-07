import { useState, useEffect } from 'react';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  views: number;
  helpfulVotes: number;
  notHelpfulVotes: number;
}

export const useFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: 1,
      question: "What stops a user from faking their AI score?",
      answer: "The Flare Data Connector (FDC) requires consensus from multiple independent attestation providers. We decentralize the AI nodes so that multiple independent models must agree on the score before it is attested on-chain. This makes manipulation economically infeasible.",
      views: 1247,
      helpfulVotes: 89,
      notHelpfulVotes: 12
    },
    {
      id: 2,
      question: "What if the price of Bitcoin crashes during a Chit Fund cycle?",
      answer: "The FTSO (Flare Time Series Oracle) provides price updates every few seconds. If a user's security deposit (FAsset) drops below a safety threshold, the Smart Account automatically notifies them to top up or liquidates them to protect the rest of the pool. This real-time monitoring ensures pool safety.",
      views: 892,
      helpfulVotes: 76,
      notHelpfulVotes: 8
    },
    {
      id: 3,
      question: "How is NexusBank different from Aave or Compound?",
      answer: "Traditional DeFi protocols treat all wallets equally — a billionaire gets the same terms as a fresh wallet. NexusBank uses AI to analyze wallet history, behavior, and asset diversity to create a reputation score. High-score users can access under-collateralized loans (110% vs 150%), unlocking significant capital efficiency.",
      views: 2134,
      helpfulVotes: 156,
      notHelpfulVotes: 18
    },
    {
      id: 4,
      question: "What assets can I use as collateral?",
      answer: "NexusBank leverages Flare's FAssets system, allowing you to use bridged Bitcoin (FBTC) and XRP (FXRP) as collateral. This means you can access DeFi functionality without selling your Bitcoin or XRP holdings. Native Flare assets are also supported.",
      views: 1567,
      helpfulVotes: 112,
      notHelpfulVotes: 15
    },
    {
      id: 5,
      question: "How does the Nexus Circle (community savings) work?",
      answer: "Nexus Circle is a decentralized version of traditional Chit Funds/ROSCAs. Users pool funds monthly, and smart contracts handle the payout rotation. Unlike traditional chit funds, idle pool money is staked on Flare to earn yield for participants, and FAsset collateral prevents defaults.",
      views: 734,
      helpfulVotes: 64,
      notHelpfulVotes: 9
    },
    {
      id: 6,
      question: "Is my data private when using NexusBank?",
      answer: "Yes. The FDC verifies your reputation score on-chain without revealing the underlying data. Your wallet history and behavioral analysis remain private — only the final score is attested. This is achieved through cryptographic proofs that validate without exposing sensitive information.",
      views: 1089,
      helpfulVotes: 98,
      notHelpfulVotes: 7
    },
    {
      id: 7,
      question: "What are the fees for using NexusBank?",
      answer: "NexusBank charges a 0.5-1% origination fee on loans through Nexus Prime. For Nexus Circle, users receive 90% of staking rewards on idle funds, with 10% going to protocol sustainability. There are no hidden fees — all charges are transparent and on-chain.",
      views: 1823,
      helpfulVotes: 134,
      notHelpfulVotes: 21
    },
    {
      id: 8,
      question: "Has NexusBank been audited?",
      answer: "Security is our top priority. Our smart contracts undergo rigorous third-party security audits before mainnet deployment. All audit reports are published publicly, and we maintain an ongoing bug bounty program to ensure continuous security.",
      views: 945,
      helpfulVotes: 87,
      notHelpfulVotes: 6
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  const incrementView = (id: number) => {
    setFaqs(prev => prev.map(faq => 
      faq.id === id ? { ...faq, views: faq.views + 1 } : faq
    ));
  };

  const vote = (id: number, helpful: boolean) => {
    setFaqs(prev => prev.map(faq => 
      faq.id === id 
        ? { 
            ...faq, 
            helpfulVotes: helpful ? faq.helpfulVotes + 1 : faq.helpfulVotes,
            notHelpfulVotes: !helpful ? faq.notHelpfulVotes + 1 : faq.notHelpfulVotes
          } 
        : faq
    ));
  };

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return { faqs: filteredFaqs, searchQuery, setSearchQuery, incrementView, vote };
};

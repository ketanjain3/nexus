import { useState, useEffect, useCallback } from 'react';
import { blockchainService, PoolData } from '../services/blockchainService';
import { ethers } from 'ethers';
import { useToast } from './use-toast';

export interface Pool {
  id: number;
  name: string;
  contributionAmount: number;
  maxMembers: number;
  currentMembers: number;
  collateralPercent: number;
  currentRound: number;
  totalRounds: number;
  status: 'active' | 'full' | 'completed';
  yieldRate: number;
  creator: string;
  members: string[];
}

// Helper to convert blockchain pool data to UI format
const convertBlockchainPool = (poolData: PoolData): Pool => {
  const contributionAmountEth = Number(ethers.formatEther(poolData.contributionAmount));
  const isFull = poolData.memberCount >= poolData.maxMembers;
  const isCompleted = !poolData.isActive;

  return {
    id: poolData.poolId,
    name: `Pool #${poolData.poolId}`,
    contributionAmount: contributionAmountEth,
    maxMembers: poolData.maxMembers,
    currentMembers: poolData.memberCount,
    collateralPercent: poolData.collateralPercent,
    currentRound: poolData.currentRound + 1, // UI shows 1-indexed rounds
    totalRounds: poolData.maxMembers,
    status: isCompleted ? 'completed' : isFull ? 'full' : 'active',
    yieldRate: 8.5, // Default yield rate
    creator: poolData.creator,
    members: poolData.members || []
  };
};

export const usePools = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch pools from blockchain
  const fetchPools = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const blockchainPools = await blockchainService.getAllPools();
      const convertedPools = blockchainPools.map(convertBlockchainPool);
      setPools(convertedPools);
    } catch (err: any) {
      console.error('Error fetching pools:', err);
      setError(err.message || 'Failed to fetch pools');
      toast({
        title: 'Error fetching pools',
        description: err.message || 'Please make sure MetaMask is connected to Coston2 testnet',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load pools on mount
  useEffect(() => {
    fetchPools();
  }, [fetchPools]);

  const joinPool = async (poolId: number, userAddress: string) => {
    try {
      const pool = pools.find(p => p.id === poolId);
      if (!pool) throw new Error('Pool not found');

      const contributionWei = ethers.parseEther(pool.contributionAmount.toString());

      toast({
        title: 'Joining pool...',
        description: 'Please confirm the transaction in MetaMask'
      });

      const txHash = await blockchainService.joinPool(poolId, contributionWei);

      toast({
        title: 'Successfully joined pool!',
        description: `Transaction: ${txHash.slice(0, 10)}...`
      });

      // Refresh pools
      await fetchPools();
    } catch (err: any) {
      console.error('Error joining pool:', err);
      toast({
        title: 'Failed to join pool',
        description: err.message || 'Transaction failed',
        variant: 'destructive'
      });
      throw err;
    }
  };

  const createPool = async (poolData: { name: string; contributionAmount: number; creator: string }) => {
    try {
      toast({
        title: 'Creating pool...',
        description: 'Please confirm the transaction in MetaMask'
      });

      const result = await blockchainService.createPool(poolData.contributionAmount.toString());

      toast({
        title: 'Pool created successfully!',
        description: `Pool ID: ${result.poolId}, Transaction: ${result.txHash.slice(0, 10)}...`
      });

      // Refresh pools
      await fetchPools();

      // Return the newly created pool
      const pool = pools.find(p => p.id === result.poolId);
      return pool || {
        id: result.poolId,
        name: poolData.name,
        contributionAmount: poolData.contributionAmount,
        maxMembers: 6,
        currentMembers: 1,
        collateralPercent: 10,
        currentRound: 1,
        totalRounds: 6,
        status: 'active' as const,
        yieldRate: 8.5,
        creator: poolData.creator,
        members: [poolData.creator]
      };
    } catch (err: any) {
      console.error('Error creating pool:', err);
      toast({
        title: 'Failed to create pool',
        description: err.message || 'Transaction failed',
        variant: 'destructive'
      });
      throw err;
    }
  };

  return {
    pools,
    createPool,
    joinPool,
    loading,
    error,
    refetch: fetchPools
  };
};

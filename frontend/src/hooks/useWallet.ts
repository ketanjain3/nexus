import { useState, useEffect } from 'react';
import { COSTON2_CONFIG } from '@/utils/contract';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  reputationScore: number | null;
  networkStatus: 'online' | 'offline';
  notificationCount: number;
  chainId: string | null;
  isCorrectNetwork: boolean;
}

const WALLET_STORAGE_KEY = 'nexusbank_wallet';

const getStoredWallet = (): WalletState => {
  try {
    const stored = localStorage.getItem(WALLET_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading wallet from storage:', error);
  }
  return {
    address: null,
    isConnected: false,
    reputationScore: null,
    networkStatus: 'online',
    notificationCount: 0,
    chainId: null,
    isCorrectNetwork: false,
  };
};

export const useWallet = () => {
  const [wallet, setWallet] = useState<WalletState>(getStoredWallet);

  // Save to localStorage whenever wallet changes
  useEffect(() => {
    localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallet));
  }, [wallet]);

  // Check if already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window.ethereum !== 'undefined' && wallet.isConnected) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length === 0) {
            // Wallet was disconnected
            disconnectWallet();
          } else if (accounts[0] !== wallet.address) {
            // Account changed
            const chainId = await window.ethereum.request({ method: 'eth_chainId' });
            setWallet(prev => ({
              ...prev,
              address: accounts[0],
              chainId,
              isCorrectNetwork: chainId === COSTON2_CONFIG.chainId,
            }));
          }
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };
    checkConnection();
  }, []);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask to connect your wallet');
        return;
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });
      
      if (accounts.length > 0) {
        const address = accounts[0];
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        const mockScore = Math.floor(Math.random() * 100) + 700;
        
        setWallet({
          address: address,
          isConnected: true,
          reputationScore: mockScore,
          networkStatus: 'online',
          notificationCount: Math.floor(Math.random() * 5),
          chainId: chainId,
          isCorrectNetwork: chainId === COSTON2_CONFIG.chainId,
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert('Failed to connect wallet. Please try again.');
    }
  };

  const switchToCoston2 = async () => {
    try {
      if (typeof window.ethereum === 'undefined') {
        alert('Please install MetaMask');
        return;
      }

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: COSTON2_CONFIG.chainId }],
        });
      } catch (switchError: any) {
        // Chain not added, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [COSTON2_CONFIG],
          });
        } else {
          throw switchError;
        }
      }

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setWallet(prev => ({
        ...prev,
        chainId,
        isCorrectNetwork: chainId === COSTON2_CONFIG.chainId,
      }));
    } catch (error) {
      console.error('Error switching network:', error);
      alert('Failed to switch network. Please try again.');
    }
  };

  const disconnectWallet = () => {
    const emptyWallet = {
      address: null,
      isConnected: false,
      reputationScore: null,
      networkStatus: 'online',
      notificationCount: 0,
      chainId: null,
      isCorrectNetwork: false,
    };
    setWallet(emptyWallet);
    localStorage.removeItem(WALLET_STORAGE_KEY);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      // Listen for chain changes
      const handleChainChanged = (chainId: string) => {
        setWallet(prev => ({
          ...prev,
          chainId,
          isCorrectNetwork: chainId === COSTON2_CONFIG.chainId,
        }));
      };

      // Listen for account changes
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWallet(prev => ({
            ...prev,
            address: accounts[0],
          }));
        }
      };

      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      };
    }
  }, []);

  return { wallet, connectWallet, disconnectWallet, switchToCoston2 };
};

export const COSTON2_CONFIG = {
  chainId: '0x72',
  chainName: 'Flare Testnet Coston2',
  nativeCurrency: {
    name: 'Coston2 Flare',
    symbol: 'C2FLR',
    decimals: 18,
  },
  rpcUrls: ['https://coston2-api.flare.network/ext/C/rpc'],
  blockExplorerUrls: ['https://coston2-explorer.flare.network/'],
};

declare global {
  interface Window {
    ethereum?: any;
  }
}

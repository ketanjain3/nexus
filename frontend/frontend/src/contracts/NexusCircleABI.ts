export const NEXUS_CIRCLE_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "_ftsoAddress", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "member", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
    ],
    "name": "CollateralDeposited",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "member", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}
    ],
    "name": "ContributionMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "member", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "memberCount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "MemberJoined",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "recipient", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "round", "type": "uint256"}
    ],
    "name": "PayoutExecuted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "totalRounds", "type": "uint256"}
    ],
    "name": "PoolCompleted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "creator", "type": "address"},
      {"indexed": false, "internalType": "uint256", "name": "contributionAmount", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256"}
    ],
    "name": "PoolCreated",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "COLLATERAL_PERCENT",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_MEMBERS",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "areAllMembersContributed",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_poolId", "type": "uint256"},
      {"internalType": "address", "name": "_member", "type": "address"}
    ],
    "name": "checkIsMember",
    "outputs": [{"internalType": "bool", "name": "isMemberBool", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "contribute",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_contributionAmount", "type": "uint256"}],
    "name": "createPool",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "executePayout",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractInfo",
    "outputs": [
      {"internalType": "address", "name": "contractOwner", "type": "address"},
      {"internalType": "uint256", "name": "totalPools", "type": "uint256"},
      {"internalType": "uint256", "name": "deployedAt", "type": "uint256"},
      {"internalType": "uint256", "name": "maxMembersPerPool", "type": "uint256"},
      {"internalType": "uint256", "name": "collateralPercentage", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getContributionCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getCurrentRound",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getNextPayoutRecipient",
    "outputs": [{"internalType": "address", "name": "recipient", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getPool",
    "outputs": [
      {"internalType": "uint256", "name": "poolId", "type": "uint256"},
      {"internalType": "uint256", "name": "maxMembers", "type": "uint256"},
      {"internalType": "uint256", "name": "contributionAmount", "type": "uint256"},
      {"internalType": "uint256", "name": "collateralPercent", "type": "uint256"},
      {"internalType": "uint256", "name": "memberCount", "type": "uint256"},
      {"internalType": "uint256", "name": "currentRound", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "address", "name": "creator", "type": "address"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getPoolMemberCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "getPoolMembers",
    "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_poolId", "type": "uint256"},
      {"internalType": "address", "name": "_member", "type": "address"}
    ],
    "name": "hasMemberBeenPaid",
    "outputs": [{"internalType": "bool", "name": "paid", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "_poolId", "type": "uint256"},
      {"internalType": "uint256", "name": "_round", "type": "uint256"},
      {"internalType": "address", "name": "_member", "type": "address"}
    ],
    "name": "hasMemberContributed",
    "outputs": [{"internalType": "bool", "name": "contributed", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "isPoolFull",
    "outputs": [{"internalType": "bool", "name": "isFull", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_poolId", "type": "uint256"}],
    "name": "joinPool",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "poolCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

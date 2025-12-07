// Mock pool data for testing without deployed contract
export interface Pool {
  id: number;
  contributionAmount: string;
  members: string[];
  currentRound: number;
  isActive: boolean;
  memberCount: number;
}

export const mockPools: Pool[] = [
  {
    id: 0,
    contributionAmount: "100",
    members: ["0x1234567890123456789012345678901234567890"],
    currentRound: 0,
    isActive: true,
    memberCount: 1
  },
  {
    id: 1,
    contributionAmount: "50",
    members: [
      "0x1234567890123456789012345678901234567890",
      "0x2345678901234567890123456789012345678901",
      "0x3456789012345678901234567890123456789012"
    ],
    currentRound: 0,
    isActive: true,
    memberCount: 3
  },
  {
    id: 2,
    contributionAmount: "200",
    members: [
      "0x1234567890123456789012345678901234567890",
      "0x2345678901234567890123456789012345678901",
      "0x3456789012345678901234567890123456789012",
      "0x4567890123456789012345678901234567890123",
      "0x5678901234567890123456789012345678901234",
      "0x6789012345678901234567890123456789012345"
    ],
    currentRound: 2,
    isActive: true,
    memberCount: 6
  }
];

export const getMockPools = (): Pool[] => {
  return mockPools;
};

export const getMockPoolById = (id: number): Pool | undefined => {
  return mockPools.find(pool => pool.id === id);
};

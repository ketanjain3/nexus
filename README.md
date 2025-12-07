# NexusBank - Decentralized ROSCA Platform

**Bringing Traditional ROSCAs to Blockchain with Flare Network**

[![Flare Network](https://img.shields.io/badge/Flare-Coston2-red)](https://coston2-explorer.flare.network/)
[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-blue)](https://docs.soliditylang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.2-blue)](https://www.typescriptlang.org/)

---

## 🎯 Overview

NexusBank brings traditional ROSCAs (Rotating Savings and Credit Associations) to blockchain, eliminating trust issues and bringing transparency to the $500B global market. Built on Flare Network with FTSO price feeds and smart contract automation.

### Key Features

- 🔒 **Trustless Operations**: Smart contracts eliminate fraud
- 💰 **Collateral Protection**: 10% collateral locked via FTSO price feeds
- 🔄 **Automated Payouts**: Round-robin distribution
- 🌐 **Global Access**: Permissionless participation
- 📊 **Real-time UI**: React frontend with MetaMask integration

---

## 📁 Project Structure

```
nexusbank-mvp/
├── contracts/              # Solidity smart contracts
│   ├── NexusCircle.sol    # Main ROSCA contract
│   ├── FTSOPriceReader.sol
│   └── interfaces/
├── scripts/                # Deployment & utility scripts
│   ├── deployment/        # Contract deployment scripts
│   ├── testing/           # Test and demo scripts
│   └── utils/             # Utility scripts
├── test/                   # Smart contract tests
│   └── NexusCircle.test.js
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # Blockchain services
│   │   └── contracts/     # Contract ABIs
│   └── public/
├── docs/                   # Documentation
│   ├── QUICK_START.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT_GUIDE.md
│   └── TROUBLESHOOTING.md
├── deployments/            # Deployment artifacts
├── hardhat.config.js       # Hardhat configuration
└── package.json

```

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- npm or yarn
- MetaMask browser extension
- Git

### 1. Clone & Install

```bash
# Clone repository
git clone <your-repo-url>
cd nexusbank-mvp

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### 2. Environment Setup

Create `.env` file in root:

```bash
PRIVATE_KEY=your_private_key_here
```

### 3. Get Test Tokens

Visit [Flare Coston2 Faucet](https://faucet.flare.network/coston2) and request test C2FLR tokens.

### 4. Deploy Contracts

```bash
# Compile contracts
npx hardhat compile

# Deploy to Coston2 testnet
npx hardhat run scripts/deployment/deploy-nexus-circle.js --network coston2
```

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` and connect your MetaMask wallet!

---

## 🔧 Development

### Smart Contracts

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Deploy to Coston2
npx hardhat run scripts/deployment/deploy-nexus-circle.js --network coston2

# Verify contract on explorer
npx hardhat verify --network coston2 <CONTRACT_ADDRESS>
```

### Frontend

```bash
cd frontend

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Useful Scripts

```bash
# Get pool information
node scripts/utils/get-pool-id.js

# Test deployed contract
node scripts/utils/test-deployed-contract.js

# Run demo
node scripts/testing/demo-nexus-circle-epic4.js
```

---

## 🌐 Network Information

### Flare Coston2 Testnet

- **Network Name:** Flare Testnet Coston2
- **RPC URL:** `https://coston2-api.flare.network/ext/C/rpc`
- **Chain ID:** `114`
- **Currency:** `C2FLR`
- **Explorer:** https://coston2-explorer.flare.network/
- **Faucet:** https://faucet.flare.network/coston2

### Current Deployment

- **NexusCircle Contract:** `0x57af01c82C08dFcA050A8d7bc5477fc538aBD7D4`
- **Version:** Epic 5 (with 10% collateral)
- **Status:** ✅ Active

---

## 📖 Documentation

Comprehensive documentation is available in the `docs/` directory:

- **[Quick Start Guide](docs/QUICK_START.md)** - Get started quickly
- **[Architecture](docs/ARCHITECTURE.md)** - Technical architecture
- **[Blockchain Integration](docs/BLOCKCHAIN_INTEGRATION.md)** - Smart contract details
- **[Deployment Guide](docs/DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues & solutions
- **[ROSCA Concept](docs/ROSCA_CONCEPT.md)** - Understanding ROSCAs
- **[Project Status](docs/PROJECT_STATUS.md)** - Current development status

---

## 🧪 Testing

### Smart Contract Tests

```bash
# Run all tests
npx hardhat test

# Run specific test
npx hardhat test test/NexusCircle.test.js

# Generate coverage report
npx hardhat coverage
```

### Frontend Testing

```bash
cd frontend

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🔐 Security

### Development Best Practices

- ⚠️ **NEVER commit** `.env` file to Git
- ⚠️ **NEVER share** your private key
- ⚠️ **Use only testnet** wallets for development
- ✅ `.env` is already in `.gitignore`

### Smart Contract Security

- Uses Solidity 0.8.20 (built-in overflow protection)
- Collateral mechanism prevents defaults
- Comprehensive testing
- FTSO oracle integration for price feeds

---

## 🆘 Troubleshooting

Common issues and solutions:

### "Insufficient funds" error

Get test tokens from [Coston2 Faucet](https://faucet.flare.network/coston2)

### "Network not found" error

Manually add Coston2 to MetaMask:
- Network: `Flare Testnet Coston2`
- RPC: `https://coston2-api.flare.network/ext/C/rpc`
- Chain ID: `114`
- Symbol: `C2FLR`

### Frontend build errors

```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

For more solutions, see [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

---

## 📚 Resources

### Flare Network

- [Developer Docs](https://dev.flare.network/)
- [FTSO Guide](https://dev.flare.network/ftso/getting-started)
- [Discord Community](https://discord.gg/flarenetwork)

### Development Tools

- [Hardhat Documentation](https://hardhat.org/docs)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [React Documentation](https://reactjs.org/)
- [ethers.js Documentation](https://docs.ethers.org/v6/)

---

## 🗺️ Roadmap

- ✅ Epic 1: Environment Setup
- ✅ Epic 2: FTSO Integration
- ✅ Epic 3: ROSCA Foundation
- ✅ Epic 4: Core Logic Implementation
- ✅ Epic 5: Collateral & Security
- ✅ Epic 6: Testing & Deployment
- ✅ Epic 7: React Frontend
- 🚧 Epic 8: Polish & Optimization

---

## 👥 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 🚀 Current Status

**MVP Status:** ✅ Complete and functional

**Features Implemented:**
- ✅ Smart contract with collateral mechanism
- ✅ FTSO price feed integration
- ✅ React frontend with MetaMask
- ✅ Pool creation and joining
- ✅ Real-time blockchain data
- ✅ Responsive UI with Tailwind CSS

**Live Demo:** Available on Coston2 testnet

---

**Built with ❤️ for the Flare Network Ecosystem**

Last Updated: December 7, 2025

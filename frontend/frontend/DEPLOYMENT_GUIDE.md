# NexusBank ROSCA Pool - Deployment Guide

## 🚀 Quick Start

Your NexusBank ROSCA application is now ready! Here's what has been implemented:

### ✅ Completed Features

1. **Smart Contract** (`contracts/ROSCAPool.sol`)
   - Create pools
   - Join pools with collateral
   - Monthly contributions
   - Automatic payouts
   - Collateral return

2. **Frontend Pages**
   - Create Pool page
   - Browse Pools page
   - Pool Details page
   - Dashboard with pool management

3. **Wallet Integration**
   - MetaMask connection
   - Network switching (Coston2)
   - Account change detection

4. **Mock Data**
   - Hardcoded pools for testing
   - Works without deployed contract

---

## 📋 Next Steps to Deploy

### Step 1: Deploy Smart Contract

#### Option A: Using Remix IDE (Easiest)

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create new file: `ROSCAPool.sol`
3. Copy content from `contracts/ROSCAPool.sol`
4. Compile with Solidity 0.8.0+
5. Deploy:
   - Environment: "Injected Provider - MetaMask"
   - Network: Switch MetaMask to Flare Coston2
   - Click "Deploy"
6. Copy deployed contract address

#### Option B: Using Hardhat

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize Hardhat
npx hardhat

# Create deployment script
# (See hardhat-deploy.js below)

# Deploy
npx hardhat run scripts/deploy.js --network coston2
```

### Step 2: Update Contract Address

After deploying, update the contract address in:

**File:** `src/utils/contract.ts`

```typescript
// Replace this line:
export const CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000";

// With your deployed address:
export const CONTRACT_ADDRESS = "0xYourDeployedContractAddress";
```

### Step 3: Get Test Tokens

1. Visit [Flare Faucet](https://faucet.flare.network/coston2)
2. Enter your wallet address
3. Request 100 C2FLR
4. Wait 1-2 minutes for tokens

### Step 4: Test the Application

```bash
# Start development server
npm run dev

# Open browser
# http://localhost:5173
```

**Test Flow:**
1. Connect wallet
2. Switch to Coston2 network
3. Create a pool
4. Join pool with another account
5. Make contributions
6. Execute payouts

---

## 🔧 Configuration Files

### Hardhat Config (Optional)

Create `hardhat.config.js`:

```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    coston2: {
      url: "https://coston2-api.flare.network/ext/C/rpc",
      accounts: ["YOUR_PRIVATE_KEY_HERE"], // Never commit this!
      chainId: 114
    }
  }
};
```

### Deployment Script

Create `scripts/deploy.js`:

```javascript
async function main() {
  const ROSCAPool = await ethers.getContractFactory("ROSCAPool");
  const pool = await ROSCAPool.deploy();
  await pool.deployed();
  
  console.log("ROSCAPool deployed to:", pool.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

---

## 🧪 Testing Without Deployment

The app currently uses **mock data** and will work without a deployed contract:

- Browse existing mock pools
- Create pools (simulated)
- Join pools (simulated)
- View pool details

This is perfect for:
- UI/UX testing
- Demo purposes
- Development

---

## 🌐 Network Configuration

### Flare Coston2 Testnet

- **Chain ID:** 114 (0x72)
- **RPC URL:** https://coston2-api.flare.network/ext/C/rpc
- **Explorer:** https://coston2-explorer.flare.network
- **Faucet:** https://faucet.flare.network/coston2
- **Currency:** C2FLR

The app will automatically prompt users to add/switch to this network.

---

## 📱 User Journey (After Deployment)

### For Pool Creators:
1. Connect wallet → Switch to Coston2
2. Dashboard → Create Pool
3. Enter contribution amount (e.g., 100 C2FLR)
4. Confirm transaction (pays gas only)
5. Share pool ID with friends

### For Pool Members:
1. Connect wallet → Switch to Coston2
2. Browse Pools → Select pool
3. Click "Join Pool"
4. Pay collateral (10% of contribution)
5. Wait for pool to fill (6 members)
6. Contribute monthly
7. Receive payout in your round

---

## 🐛 Troubleshooting

### "MetaMask Not Detected"
- Install MetaMask extension
- Refresh page

### "Wrong Network"
- Click "Switch to Coston2" button
- Approve network addition in MetaMask

### "Insufficient Funds"
- Get test tokens from faucet
- Wait 1-2 minutes for confirmation

### Transaction Fails
- Check gas balance (need ~0.01 C2FLR for gas)
- Ensure correct network (Coston2)
- Try increasing gas limit

---

## 🚀 Production Deployment

### Frontend (Lovable/Vercel/Netlify)

```bash
# Build for production
npm run build

# Deploy to Lovable
# Use the Lovable dashboard: Share → Publish

# Or deploy to Vercel
vercel deploy

# Or deploy to Netlify
netlify deploy --prod
```

### Smart Contract (Mainnet)

⚠️ **Before mainnet deployment:**
- Audit smart contract
- Test thoroughly on testnet
- Consider using OpenZeppelin contracts
- Add emergency pause functionality
- Implement proper access controls

---

## 📚 Resources

- [Flare Documentation](https://docs.flare.network/)
- [MetaMask Guide](https://metamask.io/faqs/)
- [Remix IDE](https://remix.ethereum.org/)
- [Hardhat Docs](https://hardhat.org/docs)

---

## 🎉 You're All Set!

Your ROSCA pool application is ready to use. Start with mock data for testing, then deploy the contract when ready for real transactions.

**Questions?** Check the user journey document for detailed flow explanations.

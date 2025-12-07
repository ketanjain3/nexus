# 🏗️ NexusBank ROSCA - Architecture Overview

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER                                 │
│                      (Web Browser)                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    METAMASK WALLET                           │
│              (Wallet Connection Layer)                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  REACT FRONTEND                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages:                                               │  │
│  │  - Homepage (/)                                       │  │
│  │  - Connect Wallet (/connect-wallet)                  │  │
│  │  - Dashboard (/dashboard)                            │  │
│  │  - Create Pool (/create-pool)                        │  │
│  │  - Browse Pools (/browse-pools)                      │  │
│  │  - Pool Details (/pool/:id)                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Hooks:                                               │  │
│  │  - useWallet (wallet state + persistence)            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Utils:                                               │  │
│  │  - contract.ts (ABI + config)                        │  │
│  │  - mockData.ts (test data)                           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              FLARE COSTON2 NETWORK                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Smart Contract: ROSCAPool.sol                        │  │
│  │  - createPool()                                       │  │
│  │  - joinPool()                                         │  │
│  │  - contribute()                                       │  │
│  │  - executePayout()                                    │  │
│  │  - returnCollateral()                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### 1. Wallet Connection Flow
```
User clicks "Connect Wallet"
         ↓
MetaMask popup appears
         ↓
User approves connection
         ↓
useWallet hook updates state
         ↓
State saved to localStorage
         ↓
User redirected to Dashboard
```

### 2. Pool Creation Flow
```
User navigates to Create Pool
         ↓
Enters contribution amount
         ↓
Clicks "Create Pool"
         ↓
(Mock: Simulated creation)
(Real: Contract call to createPool())
         ↓
Pool added to state/blockchain
         ↓
Success message shown
         ↓
Redirect to Browse Pools
```

### 3. Pool Joining Flow
```
User browses available pools
         ↓
Selects pool to join
         ↓
Views pool details
         ↓
Clicks "Join Pool"
         ↓
(Mock: Simulated join)
(Real: Contract call to joinPool() with collateral)
         ↓
User added to members list
         ↓
Pool member count updated
```

### 4. Contribution Flow
```
Pool reaches 6 members
         ↓
Round begins
         ↓
User clicks "Contribute"
         ↓
(Mock: Simulated contribution)
(Real: Contract call to contribute() with amount)
         ↓
Contribution recorded
         ↓
When all 6 contribute → Payout ready
```

### 5. Payout Flow
```
All members contributed
         ↓
Any member clicks "Execute Payout"
         ↓
(Mock: Simulated payout)
(Real: Contract call to executePayout())
         ↓
Funds sent to round recipient
         ↓
Round incremented
         ↓
Next round begins
```

---

## 🗂️ Component Hierarchy

```
App
├── Router
│   ├── Index (Homepage)
│   │   ├── Navbar
│   │   ├── HeroSection
│   │   ├── ProblemSection
│   │   ├── ProductsSection
│   │   ├── TechnologySection
│   │   ├── AnimatedStats
│   │   ├── RevenueSection
│   │   ├── RoadmapSection
│   │   ├── FAQSection
│   │   └── Footer
│   │
│   ├── ConnectWallet
│   │   ├── MetaMask Detection
│   │   ├── Connection Button
│   │   ├── Network Warning
│   │   └── Wallet Info Display
│   │
│   ├── Dashboard
│   │   ├── Header (with wallet)
│   │   ├── Stats Cards
│   │   │   ├── Reputation Score
│   │   │   ├── Active Loans
│   │   │   └── Nexus Circles
│   │   ├── Quick Actions
│   │   │   ├── Nexus Prime Card
│   │   │   └── Nexus Circle Card
│   │   └── Recent Activity
│   │
│   ├── CreatePool
│   │   ├── Header
│   │   ├── Form
│   │   │   ├── Contribution Input
│   │   │   ├── Pool Details Preview
│   │   │   └── How It Works
│   │   └── Create Button
│   │
│   ├── BrowsePools
│   │   ├── Header
│   │   ├── Pool Grid
│   │   │   └── Pool Cards (multiple)
│   │   │       ├── Pool Info
│   │   │       ├── Member Count
│   │   │       ├── Status Badge
│   │   │       └── Action Button
│   │   └── Create Pool Button
│   │
│   └── PoolDetails
│       ├── Header
│       ├── Stats Cards
│       │   ├── Contribution
│       │   ├── Members
│       │   └── Round
│       ├── Pool Information Card
│       │   ├── Details
│       │   └── Join Button
│       ├── Members List Card
│       │   └── Member Items
│       └── Current Round Card
│           ├── Contribution Form
│           └── Payout Button
```

---

## 💾 State Management

### useWallet Hook State
```typescript
{
  address: string | null,           // Wallet address
  isConnected: boolean,             // Connection status
  reputationScore: number | null,   // User score
  networkStatus: 'online' | 'offline',
  notificationCount: number,
  chainId: string | null,           // Current network
  isCorrectNetwork: boolean         // Is Coston2?
}
```

### localStorage Persistence
```
Key: "nexusbank_wallet"
Value: JSON stringified wallet state
Persists across: page refresh, browser restart
```

### Mock Pool Data
```typescript
{
  id: number,                       // Pool ID
  contributionAmount: string,       // Monthly amount
  members: string[],                // Member addresses
  currentRound: number,             // 0-5
  isActive: boolean,                // Pool status
  memberCount: number               // 1-6
}
```

---

## 🔐 Security Architecture

### Frontend Security
```
User Input
    ↓
Validation (TypeScript types)
    ↓
Sanitization
    ↓
Display/Process
```

### Wallet Security
```
Private Keys → NEVER stored in app
    ↓
MetaMask handles all signing
    ↓
User approves each transaction
    ↓
Transaction sent to blockchain
```

### Smart Contract Security
```
Function Modifiers
    ↓
Require Statements
    ↓
State Checks
    ↓
Execute Logic
    ↓
Emit Events
```

---

## 🌐 Network Architecture

### Development
```
localhost:5173 (Vite dev server)
    ↓
MetaMask (browser extension)
    ↓
Flare Coston2 Testnet
```

### Production
```
Your Domain (Lovable/Vercel/Netlify)
    ↓
MetaMask (browser extension)
    ↓
Flare Mainnet (future)
```

---

## 📡 API Interactions

### MetaMask API
```javascript
// Request accounts
window.ethereum.request({ method: 'eth_requestAccounts' })

// Get chain ID
window.ethereum.request({ method: 'eth_chainId' })

// Switch network
window.ethereum.request({ 
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x72' }]
})

// Add network
window.ethereum.request({
  method: 'wallet_addEthereumChain',
  params: [COSTON2_CONFIG]
})
```

### Smart Contract Calls (Future)
```javascript
// Read (no gas)
contract.getPoolInfo(poolId)
contract.getPoolMembers(poolId)

// Write (requires gas)
contract.createPool(amount)
contract.joinPool(poolId, { value: collateral })
contract.contribute(poolId, { value: contribution })
contract.executePayout(poolId)
```

---

## 🔄 Event Flow

### User Actions → State Updates
```
User Action
    ↓
Event Handler
    ↓
State Update (useState/useWallet)
    ↓
localStorage Update
    ↓
UI Re-render
    ↓
User Sees Change
```

### Blockchain Events (Future)
```
Smart Contract Event Emitted
    ↓
Frontend Listener Catches Event
    ↓
State Updated
    ↓
UI Updated
    ↓
User Notified
```

---

## 📦 Build Architecture

### Development Build
```
Source Files (TypeScript/React)
    ↓
Vite Dev Server
    ↓
Hot Module Replacement
    ↓
Browser (with source maps)
```

### Production Build
```
Source Files
    ↓
TypeScript Compilation
    ↓
Vite Build (optimization)
    ↓
Bundle (minified)
    ↓
Static Files (dist/)
    ↓
Deploy to Hosting
```

---

## 🎯 Deployment Architecture

### Current (Mock Data)
```
User → Frontend → Mock Data → UI Update
```

### After Contract Deployment
```
User → Frontend → MetaMask → Blockchain → Event → Frontend → UI Update
```

---

## 📊 Performance Considerations

### Optimizations
- React hooks for efficient re-renders
- localStorage for state persistence
- Lazy loading with React Router
- Minimal bundle size
- Efficient event listeners

### Caching Strategy
- Wallet state: localStorage
- Pool data: State + future blockchain cache
- UI components: React memoization

---

## 🔮 Future Architecture

### Planned Enhancements
```
Current Architecture
    +
Real-time Updates (WebSocket)
    +
IPFS for Metadata
    +
Subgraph for Indexing
    +
Multi-chain Support
    =
Enhanced Architecture
```

---

This architecture provides a solid foundation for your ROSCA pool application with room for growth and enhancement! 🚀

# NexusBank - Data Integration Plan

## Overview
This document outlines where dynamic data can be integrated into each page/section of the NexusBank landing page.

---

## 1. **Navbar Component**
**Current State:** Static navigation links

### Data Integration Opportunities:
- **User Authentication Status**
  - Show "Connect Wallet" vs "0x1234...5678" (wallet address)
  - Display user's reputation score badge
  
- **Network Status**
  - Current Flare network status (Mainnet/Testnet)
  - Gas prices indicator

- **Notification Badge**
  - Unread announcements count
  - Active loan alerts

**API Endpoints Needed:**
```
GET /api/user/wallet-status
GET /api/network/status
GET /api/notifications/count
```

---

## 2. **HeroSection Component**
**Current State:** Static stats (90%, $500B+, 100%)

### Data Integration Opportunities:
- **Real-time Stats Cards**
  - Lower Collateral Requirements: Pull from protocol config
  - Global ROSCA Market: Update from market data API
  - Smart Contract Secured: Show actual security audit score

- **Live TVL Counter**
  - Total Value Locked across protocol
  - Number of active loans

- **Badge Status**
  - "Built on Flare Network" → Add network health indicator
  - Show current block number or last update time

**API Endpoints Needed:**
```
GET /api/stats/collateral-ratio
GET /api/stats/market-size
GET /api/stats/tvl
GET /api/network/block-number
```

---

## 3. **ProblemSection Component**
**Current State:** Static problem descriptions

### Data Integration Opportunities:
- **Live DeFi Comparison Data**
  - Current Aave/Compound collateral requirements (fetch from their APIs)
  - Average over-collateralization percentage across DeFi

- **ROSCA Market Statistics**
  - Regional fraud statistics
  - Market size by geography (India, SE Asia, LatAm)

- **Alert Counter**
  - Number of scams prevented by NexusBank
  - Total fraud amount blocked

**API Endpoints Needed:**
```
GET /api/defi/competitors-data
GET /api/market/rosca-statistics
GET /api/security/fraud-prevention-stats
```

---

## 4. **ProductsSection Component**
**Current State:** Static product features

### Data Integration Opportunities:

### **Nexus Prime Product:**
- **Dynamic Loan Terms**
  - Current interest rates (APR)
  - Available collateral ratio based on user score
  - Total loans issued to date
  - Average loan size

- **User Score Preview**
  - If wallet connected, show estimated score
  - Potential savings vs traditional DeFi

### **Nexus Circle Product:**
- **Active Circles Statistics**
  - Number of active circles
  - Total participants
  - Average yield percentage
  - Success rate

- **FAsset Prices**
  - Current FBTC price
  - Current FXRP price
  - Staking APY

**API Endpoints Needed:**
```
GET /api/products/prime/rates
GET /api/products/prime/statistics
GET /api/products/circle/active-circles
GET /api/products/circle/yield-rates
GET /api/fassets/prices
GET /api/user/estimated-score (if wallet connected)
```

---

## 5. **TechnologySection Component**
**Current State:** Static tech stack cards

### Data Integration Opportunities:
- **AI Engine Stats**
  - Number of wallets analyzed
  - Model accuracy percentage
  - Last model update timestamp

- **Flare Data Connector**
  - Number of attestations processed
  - Average attestation time
  - Active attestation providers count

- **FTSO Oracle**
  - Current update frequency
  - Number of price feeds
  - Oracle uptime percentage

- **Smart Accounts**
  - Total smart accounts created
  - Automated repayments processed
  - Liquidations prevented

**API Endpoints Needed:**
```
GET /api/tech/ai-engine-stats
GET /api/tech/fdc-stats
GET /api/tech/ftso-stats
GET /api/tech/smart-accounts-stats
```

---

## 6. **AnimatedStats Component**
**Current State:** Hardcoded stats (127M TVL, 48250 users, etc.)

### Data Integration Opportunities:
- **Total Value Locked (TVL)**
  - Real-time TVL from smart contracts
  - 24h change percentage
  - Historical chart data

- **Active Users**
  - Monthly active wallets
  - Daily active users
  - New users this week

- **Transactions**
  - Total transactions processed
  - 24h transaction volume
  - Average transaction size

- **Uptime**
  - Real protocol uptime percentage
  - Last incident timestamp
  - Average response time

**API Endpoints Needed:**
```
GET /api/metrics/tvl
GET /api/metrics/users
GET /api/metrics/transactions
GET /api/metrics/uptime
```

---

## 7. **RevenueSection Component**
**Current State:** Static revenue stream descriptions

### Data Integration Opportunities:
- **Revenue Streams with Real Data**
  - **Origination Fees:** Total fees collected, average fee per loan
  - **Yield Spread:** Total yield generated, user share vs protocol share
  - **Liquidation Arbitrage:** Number of liquidations, total penalty fees
  - **API Licensing:** Number of API clients, MRR (Monthly Recurring Revenue)

- **Market Opportunity Stats**
  - TAM: Update with latest market research
  - SAM: Calculate from current BTC/XRP holder data
  - SOM: Real-time Flare TVL percentage

**API Endpoints Needed:**
```
GET /api/revenue/origination-fees
GET /api/revenue/yield-spread
GET /api/revenue/liquidations
GET /api/revenue/api-licensing
GET /api/market/opportunity-stats
```

---

## 8. **RoadmapSection Component**
**Current State:** Static 3-year roadmap

### Data Integration Opportunities:
- **Progress Tracking**
  - Completion percentage for each phase
  - Current milestone status
  - Next milestone ETA

- **Dynamic Metrics**
  - Year 1: Current TVL vs $5M target (progress bar)
  - Year 2: Current users vs 10,000 target
  - Year 3: Revenue tracking vs $2M/year goal

- **Milestone Updates**
  - Recently completed items (checkmarks)
  - In-progress items (loading indicators)
  - Upcoming items (scheduled dates)

**API Endpoints Needed:**
```
GET /api/roadmap/progress
GET /api/roadmap/milestones
GET /api/roadmap/current-phase
```

---

## 9. **FAQSection Component**
**Current State:** Static FAQ accordion

### Data Integration Opportunities:
- **Dynamic FAQ Content**
  - Pull FAQs from CMS/database
  - Sort by most viewed/helpful
  - Add search functionality

- **FAQ Analytics**
  - View count per question
  - "Was this helpful?" voting
  - Related questions suggestions

- **Live Updates**
  - Add timestamp for last updated
  - Show "New" badge for recent FAQs
  - Trending questions section

**API Endpoints Needed:**
```
GET /api/faqs/list
GET /api/faqs/analytics
POST /api/faqs/vote
GET /api/faqs/search?q=query
```

---

## 10. **Footer Component**
**Current State:** Static links and social icons

### Data Integration Opportunities:
- **System Status**
  - "All systems operational" → Real status from monitoring
  - Link to status page with uptime history

- **Newsletter Signup**
  - Email capture form
  - Subscriber count display

- **Social Stats**
  - Twitter follower count
  - GitHub stars count
  - Discord member count

- **Latest Updates**
  - Last blog post title
  - Latest GitHub release version
  - Recent announcement

**API Endpoints Needed:**
```
GET /api/system/status
POST /api/newsletter/subscribe
GET /api/social/stats
GET /api/updates/latest
```

---

## Additional Cross-Component Data

### **Global State Management**
- **User Wallet Connection**
  - Wallet address
  - Network ID
  - Balance (FLR, FBTC, FXRP)
  - Reputation score

- **Price Feeds (FTSO)**
  - FLR/USD
  - FBTC/USD
  - FXRP/USD
  - Update every few seconds

- **Protocol Configuration**
  - Min/Max collateral ratios
  - Interest rate ranges
  - Fee percentages
  - Supported assets

**API Endpoints Needed:**
```
GET /api/user/wallet-info
GET /api/prices/live
GET /api/config/protocol-params
```

---

## Implementation Priority

### **Phase 1 - Critical (Launch MVP)**
1. AnimatedStats - Real TVL, users, transactions
2. ProductsSection - Current interest rates, active circles
3. HeroSection - Live stats cards
4. Footer - System status

### **Phase 2 - Enhanced (Post-Launch)**
5. TechnologySection - Tech stack metrics
6. RevenueSection - Revenue tracking
7. RoadmapSection - Progress tracking
8. Navbar - Wallet connection, notifications

### **Phase 3 - Advanced (Growth Phase)**
9. ProblemSection - Competitor data
10. FAQSection - Dynamic content, search
11. Social integrations
12. Analytics dashboard

---

## Data Sources

### **On-Chain Data (Flare Network)**
- Smart contract events
- FTSO price feeds
- FAsset balances
- Transaction history

### **Off-Chain Data**
- AI model outputs
- User analytics (Google Analytics, Mixpanel)
- Market research data
- Competitor APIs (Aave, Compound)

### **Third-Party APIs**
- CoinGecko/CoinMarketCap (price data)
- DeFiLlama (TVL comparisons)
- GitHub API (repo stats)
- Twitter API (social metrics)

---

## Database Schema Suggestions

### **Tables Needed:**
```sql
-- Protocol Metrics
metrics (id, tvl, active_users, transactions, uptime, timestamp)

-- User Scores
user_scores (wallet_address, score, last_updated, risk_tier)

-- Loans
loans (id, user_address, amount, collateral_ratio, status, created_at)

-- Circles
circles (id, name, participants, total_pool, yield_rate, status)

-- Revenue
revenue_streams (id, stream_type, amount, date)

-- FAQs
faqs (id, question, answer, views, helpful_votes, category, updated_at)

-- Roadmap
milestones (id, phase, title, status, completion_percentage, target_date)
```

---

## Real-Time Updates Strategy

### **WebSocket Connections**
- Live price feeds (FTSO)
- TVL updates
- New loan notifications
- Circle activity

### **Polling Intervals**
- Stats: Every 30 seconds
- Prices: Every 5 seconds
- User data: On wallet connection
- System status: Every 60 seconds

### **Caching Strategy**
- Cache static content (FAQs, roadmap) for 5 minutes
- Cache market data for 1 minute
- Cache user scores for 10 minutes
- No cache for live prices

---

## Next Steps

1. **Set up backend API** (Node.js/Express or Python/FastAPI)
2. **Connect to Flare Network** (Web3.js/Ethers.js)
3. **Implement data fetching hooks** (React Query/SWR)
4. **Create data context providers** (React Context API)
5. **Add loading states** (Skeleton screens)
6. **Implement error handling** (Error boundaries)
7. **Add data refresh mechanisms** (Pull-to-refresh, auto-refresh)


# 🚀 Quick Start Guide

## Get Your ROSCA Pool Running in 5 Minutes!

### Step 1: Start the App (30 seconds)

```bash
npm run dev
```

Open browser: http://localhost:5173

---

### Step 2: Connect Your Wallet (1 minute)

1. Click **"Connect Wallet"** button in navbar
2. Approve MetaMask connection
3. You'll be redirected to dashboard automatically

**Don't have MetaMask?**
- Install from: https://metamask.io/download/
- Refresh page after installation

---

### Step 3: Switch to Coston2 Network (30 seconds)

If you see a warning:
1. Click **"Switch to Coston2"** button
2. Approve network addition in MetaMask
3. Done! ✅

---

### Step 4: Test the App (3 minutes)

#### Browse Pools:
1. From dashboard, click **"Browse Circles"**
2. See 3 mock pools available
3. Click any pool to view details

#### Create a Pool:
1. Click **"Create Pool"** button
2. Enter contribution amount (e.g., 100)
3. Click **"Create Pool"**
4. Success! 🎉

#### Join a Pool:
1. Browse pools
2. Select a pool with < 6 members
3. Click **"Join Pool"**
4. Done! You're a member

---

## 🎯 What You Can Do Right Now

### ✅ Working Features (No Contract Needed):

- Connect/disconnect wallet
- Switch networks
- Browse mock pools
- View pool details
- Create pools (simulated)
- Join pools (simulated)
- View member lists
- See contribution status
- Execute payouts (simulated)

### 🔜 Coming Soon (After Contract Deployment):

- Real on-chain pool creation
- Real collateral deposits
- Real contributions
- Real payouts
- Real collateral returns
- Transaction history

---

## 🐛 Having Issues?

### Wallet Won't Connect?
- Make sure MetaMask is installed
- Refresh the page
- Try clicking "Connect Wallet" again

### Can't See Dashboard?
- Check if wallet is connected (address in navbar)
- Try navigating to `/dashboard` manually
- Clear localStorage and reconnect:
  ```javascript
  // In browser console (F12)
  localStorage.clear();
  location.reload();
  ```

### Wrong Network Warning?
- Click "Switch to Coston2" button
- Approve in MetaMask
- Should work immediately

### More Help?
- Check `TROUBLESHOOTING.md`
- Check browser console (F12) for errors

---

## 📖 Learn More

- **User Journey:** See complete flow in user journey document
- **Deployment:** See `DEPLOYMENT_GUIDE.md` for contract deployment
- **Implementation:** See `IMPLEMENTATION_SUMMARY.md` for what's built

---

## 🎉 You're All Set!

Your NexusBank ROSCA app is running! 

**Current Mode:** Testing with mock data
**Next Step:** Deploy smart contract for real transactions

Enjoy exploring! 🚀

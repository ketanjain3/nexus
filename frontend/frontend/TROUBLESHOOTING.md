# Troubleshooting Guide

## Common Issues and Solutions

### ❌ Issue: Can't Access Dashboard After Connecting Wallet

**Solution:**
The wallet state now persists in localStorage. Try these steps:

1. **Connect wallet from homepage:**
   - Click "Connect Wallet" button in navbar
   - Approve MetaMask connection
   - You'll be automatically redirected to dashboard

2. **If still stuck:**
   - Open browser console (F12)
   - Go to Application → Local Storage
   - Check if `nexusbank_wallet` exists
   - If corrupted, delete it and reconnect

3. **Manual navigation:**
   - After connecting, manually go to `/dashboard`
   - Or click your wallet address in navbar

---

### ❌ Issue: Wallet Disconnects on Page Refresh

**Fixed!** The wallet state now persists using localStorage. Your connection will remain even after:
- Page refresh
- Browser restart
- Navigation between pages

---

### ❌ Issue: MetaMask Not Detected

**Solutions:**
1. Install MetaMask extension from [metamask.io](https://metamask.io/download/)
2. Refresh the page after installation
3. Make sure MetaMask is enabled in your browser

---

### ❌ Issue: Wrong Network Warning

**Solution:**
1. Click "Switch to Coston2" button
2. Approve network addition in MetaMask
3. Network will automatically switch

**Manual Setup:**
- Network Name: Flare Testnet Coston2
- RPC URL: https://coston2-api.flare.network/ext/C/rpc
- Chain ID: 114
- Currency Symbol: C2FLR
- Block Explorer: https://coston2-explorer.flare.network

---

### ❌ Issue: Can't Create Pool

**Current Status:** Using mock data (hardcoded)

**To enable real pools:**
1. Deploy smart contract (see DEPLOYMENT_GUIDE.md)
2. Update contract address in `src/utils/contract.ts`
3. Restart dev server

**For now:** Pool creation is simulated and will work for testing UI

---

### ❌ Issue: Pools Not Showing

**Check:**
1. Wallet is connected
2. You're on the correct network (Coston2)
3. Mock pools are visible in Browse Pools page
4. Check browser console for errors

---

### ❌ Issue: Transaction Fails

**Common causes:**
1. **Insufficient gas:** Need ~0.01 C2FLR for gas fees
2. **Wrong network:** Must be on Coston2
3. **Contract not deployed:** Currently using mock data

**Get test tokens:**
- Visit: https://faucet.flare.network/coston2
- Enter your wallet address
- Request 100 C2FLR

---

### ❌ Issue: Page Shows Blank/White Screen

**Solutions:**
1. Check browser console (F12) for errors
2. Clear browser cache
3. Delete node_modules and reinstall:
   ```bash
   rmdir /s /q node_modules
   npm install
   npm run dev
   ```

---

### ❌ Issue: TypeScript Errors

**Solutions:**
1. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

2. Check if these files exist:
   - `src/utils/contract.ts`
   - `src/utils/mockData.ts`
   - All page files in `src/pages/`

3. Restart TypeScript server in VS Code:
   - Ctrl+Shift+P → "TypeScript: Restart TS Server"

---

## Testing Checklist

### ✅ Basic Flow Test

1. **Homepage:**
   - [ ] Page loads correctly
   - [ ] Navbar shows "Connect Wallet" button
   - [ ] All sections visible

2. **Connect Wallet:**
   - [ ] Click "Connect Wallet" in navbar
   - [ ] MetaMask popup appears
   - [ ] After approval, redirected to dashboard
   - [ ] Wallet address shows in navbar

3. **Dashboard:**
   - [ ] Shows wallet address
   - [ ] Shows reputation score
   - [ ] "Browse Circles" button works
   - [ ] Network warning shows if not on Coston2

4. **Browse Pools:**
   - [ ] Shows 3 mock pools
   - [ ] Pool cards display correctly
   - [ ] Can click "View Details" or "Join Pool"

5. **Create Pool:**
   - [ ] Form shows correctly
   - [ ] Can enter contribution amount
   - [ ] Shows calculated collateral
   - [ ] "Create Pool" button works

6. **Pool Details:**
   - [ ] Shows pool information
   - [ ] Shows member list
   - [ ] Join/Contribute buttons work
   - [ ] Status updates correctly

---

## Development Tips

### Hot Reload Not Working
```bash
# Restart dev server
npm run dev
```

### Port Already in Use
```bash
# Kill process on port 5173
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use different port
npm run dev -- --port 3000
```

### Clear All State
```javascript
// Run in browser console
localStorage.clear();
location.reload();
```

---

## Need More Help?

1. Check browser console for errors (F12)
2. Review DEPLOYMENT_GUIDE.md for setup steps
3. Verify all files are created correctly
4. Make sure npm dependencies are installed

---

## Quick Reset

If everything is broken, try this:

```bash
# 1. Clear node modules
rmdir /s /q node_modules

# 2. Clear package lock
del package-lock.json

# 3. Reinstall
npm install

# 4. Start fresh
npm run dev
```

Then in browser:
1. Clear localStorage (F12 → Application → Local Storage → Clear)
2. Hard refresh (Ctrl+Shift+R)
3. Reconnect wallet

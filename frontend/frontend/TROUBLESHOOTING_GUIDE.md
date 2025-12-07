# Troubleshooting Guide - Common Issues

## Issue 1: "missing revert data" / CALL_EXCEPTION Error

### Error Message
```
Error: missing revert data (action="estimateGas", data=null, reason=null,
transaction={...}, code=CALL_EXCEPTION)
```

### Root Causes & Solutions

#### 1. Insufficient C2FLR Balance
**Problem**: You don't have enough C2FLR tokens for collateral + gas fees

**Solution**:
1. Check your balance in MetaMask
2. For a 10 FLR contribution, you need:
   - 1 FLR collateral (10% of 10 FLR)
   - ~0.001-0.01 FLR for gas
   - **Total: ~1.01 FLR minimum**
3. Get more C2FLR from faucet: https://faucet.flare.network/coston2
4. Wait for faucet transaction to confirm (check block explorer)

#### 2. Wrong Network Selected
**Problem**: MetaMask is connected to wrong network (not Coston2)

**Solution**:
1. Check MetaMask network dropdown (top right)
2. Should say "Flare Testnet Coston2"
3. If not, the app will prompt you to switch
4. Approve the network switch in MetaMask
5. Refresh the page after switching

#### 3. Contract Address Mismatch
**Problem**: Contract not deployed at expected address

**Solution**:
1. Verify contract address: `0x3bE24594e9c7d3386AbFa26Ccc6E57e2A8EaAE4e`
2. Check on explorer: https://coston2-explorer.flare.network/address/0x3bE24594e9c7d3386AbFa26Ccc6E57e2A8EaAE4e
3. Ensure contract is verified and has code

## Issue 2: MetaMask Not Connecting

### Error Message
```
MetaMask is not installed
```

### Solution
1. Install MetaMask: https://metamask.io/download/
2. Create or import wallet
3. Refresh browser page
4. Click "Connect Wallet" in app

## Issue 3: Transaction Fails After Confirmation

### Possible Causes

#### A. Pool Already Full
- Check pool details before joining
- Pool shows "6/6 members"
- **Solution**: Choose a different pool

#### B. Already a Member
- You're trying to join a pool you're already in
- **Solution**: Check "Members" section on pool details page

#### C. Invalid Contribution Amount
- Contribution amount must be > 0
- **Solution**: Enter a valid amount (e.g., 10, 50, 100 FLR)

## Issue 4: Slow Loading / No Pools Showing

### Causes & Solutions

#### 1. RPC Node Slow
**Solution**:
- Wait 10-30 seconds for blockchain data
- Check browser console for errors
- Try refreshing the page

#### 2. No Pools Created Yet
**Solution**:
- Create the first pool!
- Click "Create Pool" button
- Fill out form and confirm transaction

#### 3. Network Error
**Solution**:
- Check internet connection
- Try different browser
- Clear browser cache

## Issue 5: Gas Estimation Failed

### Error Message
```
Internal JSON-RPC error
```

### Solutions

1. **Check Balance**:
   ```
   Minimum required = Collateral + Gas
   Example: 1 FLR collateral + 0.01 FLR gas = 1.01 FLR total
   ```

2. **Verify Network**:
   - Must be on Coston2 (Chain ID: 114)
   - RPC: https://coston2-api.flare.network/ext/C/rpc

3. **Check Transaction Parameters**:
   - Open browser console (F12)
   - Look for `Creating pool with:` log
   - Verify amounts look correct

4. **Try Lower Amount**:
   - If creating pool with 100 FLR contribution
   - Try 10 FLR instead (requires only 1 FLR collateral)

## Issue 6: React Router Warnings (Non-Critical)

### Warning Messages
```
⚠️ React Router Future Flag Warning: v7_startTransition
⚠️ React Router Future Flag Warning: v7_relativeSplatPath
```

### Impact
- **These are just warnings, not errors**
- App functions normally
- Will be addressed in future React Router update

### To Silence (Optional)
Add to your router configuration:
```typescript
future: {
  v7_startTransition: true,
  v7_relativeSplatPath: true
}
```

## Debugging Steps

### 1. Open Browser Console
1. Press F12 (or Cmd+Option+I on Mac)
2. Go to "Console" tab
3. Look for red error messages

### 2. Check Logs
Look for these console.log messages:
- `Current network:` - Shows connected network
- `Connected wallet:` - Shows your address
- `Creating pool with:` - Shows transaction details
- `User balance:` - Shows your C2FLR balance

### 3. Verify Contract Call
In console, you should see:
```
Creating pool with: {
  contributionAmount: "10",
  contributionWei: "10000000000000000000",
  collateralWei: "1000000000000000000"
}
User balance: 5.123 C2FLR
```

If balance < collateralWei, you'll get an error.

### 4. Check MetaMask Activity
1. Open MetaMask
2. Click "Activity" tab
3. Look for failed transactions
4. Click on transaction for details

## Quick Fixes Checklist

Before reporting an issue, try these:

- [ ] MetaMask installed and unlocked
- [ ] Connected to Coston2 testnet (Chain ID: 114)
- [ ] Have sufficient C2FLR balance (get from faucet)
- [ ] Refresh browser page
- [ ] Clear browser cache
- [ ] Try different browser
- [ ] Check browser console for errors
- [ ] Verify contract address on block explorer

## Getting Help

### Information to Provide

When asking for help, include:

1. **Error message** (exact text from console)
2. **Transaction hash** (if transaction was sent)
3. **Wallet address** (public address is safe to share)
4. **Screenshots** of error
5. **Browser console logs**
6. **What you were trying to do**

### Useful Links

- **Faucet**: https://faucet.flare.network/coston2
- **Block Explorer**: https://coston2-explorer.flare.network/
- **Contract Address**: https://coston2-explorer.flare.network/address/0x3bE24594e9c7d3386AbFa26Ccc6E57e2A8EaAE4e
- **Flare Docs**: https://dev.flare.network/

## Advanced Debugging

### Check Contract Manually

Using browser console:
```javascript
// Get contract instance
const contract = blockchainService.contract;

// Check pool count
const count = await contract.poolCount();
console.log('Pool count:', count.toString());

// Get specific pool
const pool = await contract.getPool(0);
console.log('Pool 0:', pool);

// Check your balance
const balance = await provider.getBalance(yourAddress);
console.log('Balance:', ethers.formatEther(balance));
```

### Verify Network Connection

```javascript
// Check network
const network = await provider.getNetwork();
console.log('Network:', {
  chainId: Number(network.chainId),
  name: network.name
});
// Should show: chainId: 114, name: "coston2"
```

## Error Code Reference

| Code | Meaning | Solution |
|------|---------|----------|
| `CALL_EXCEPTION` | Transaction would fail | Check balance, pool status, parameters |
| `INSUFFICIENT_FUNDS` | Not enough ETH/FLR for gas | Get more C2FLR from faucet |
| `UNPREDICTABLE_GAS_LIMIT` | Can't estimate gas | Transaction will likely fail, check inputs |
| `NETWORK_ERROR` | RPC connection failed | Check internet, try again |
| `USER_REJECTED` | User cancelled in MetaMask | Normal, no action needed |

## Performance Issues

### Slow Pool Loading

**Cause**: Fetching data from blockchain takes time

**Improvements Made**:
- Added loading spinners
- Shows "Loading pools from blockchain..." message
- Gracefully handles network delays

**Expected Load Time**: 2-10 seconds depending on:
- Number of pools
- RPC node speed
- Network congestion

### Large Bundle Size Warning

**Warning**: Some chunks are larger than 500 kB

**Impact**: Slightly slower initial load
**Status**: Non-critical, app works fine
**Future Fix**: Code splitting (low priority)

## Summary

Most issues are caused by:
1. **Insufficient balance** → Get C2FLR from faucet
2. **Wrong network** → Switch to Coston2
3. **MetaMask not connected** → Connect wallet first

The error handling has been improved to give you clear messages about what's wrong!

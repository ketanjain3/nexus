import { AlertTriangle, Lock, Users, ShieldCheck } from "lucide-react";
import { useProblemStats } from "@/hooks/useProblemStats";

const ProblemSection = () => {
  const stats = useProblemStats();

  const formatCurrency = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
    return `$${num}`;
  };
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">The Problem</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            DeFi is <span className="text-gradient-accent">Broken</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two massive inefficiencies are holding back the $100B+ DeFi market
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Problem 1 */}
          <div className="bg-glass rounded-2xl p-8 hover:border-destructive/30 transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Lock className="h-7 w-7 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Capital Inefficiency</h3>
            <p className="text-muted-foreground mb-6">
              Current DeFi protocols like Aave and Compound require <span className="text-foreground font-semibold">${stats.aaveCollateral} collateral to borrow $100</span>. 
              They treat a billionaire the same as a fresh wallet.
            </p>
            <div className="space-y-3">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Aave Collateral</span>
                  <span className="text-sm font-semibold text-foreground">{stats.aaveCollateral}%</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Compound Collateral</span>
                  <span className="text-sm font-semibold text-foreground">{stats.compoundCollateral}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Avg Over-Collateral</span>
                  <span className="text-sm font-semibold text-destructive">{stats.avgOverCollateral}%</span>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span>Zero reputation data = Massive over-collateralization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Problem 2 */}
          <div className="bg-glass rounded-2xl p-8 hover:border-destructive/30 transition-colors group">
            <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="h-7 w-7 text-destructive" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Trust Deficits</h3>
            <p className="text-muted-foreground mb-6">
              Informal savings circles (Chit Funds/ROSCAs) are a <span className="text-foreground font-semibold">$500B global market</span> plagued by fraud. 
              Zero yield on idle cash. High risk of organizers absconding.
            </p>
            <div className="space-y-3">
              <div className="bg-secondary/50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Fraud Rate</span>
                  <span className="text-sm font-semibold text-destructive">{stats.roscaFraudRate}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Annual Losses</span>
                  <span className="text-sm font-semibold text-destructive">$115B+</span>
                </div>
              </div>
              <div className="bg-secondary/50 rounded-lg p-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span>Popular in India, SE Asia, and LatAm – but risky</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Preview */}
        <div className="mt-16 space-y-6">
          <div className="text-center">
            <button 
              onClick={() => window.location.href = '#products'}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors cursor-pointer"
            >
              <span className="text-primary font-semibold">NexusBank solves both.</span>
              <span className="text-muted-foreground">AI + FDC = Verifiable Reputation</span>
            </button>
          </div>
          
          {/* Fraud Prevention Stats */}
          <div className="max-w-2xl mx-auto bg-glass rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold">NexusBank Protection</h3>
                <p className="text-sm text-muted-foreground">Real-time fraud prevention</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{stats.scamsPrevented}</p>
                <p className="text-xs text-muted-foreground mt-1">Scams Prevented</p>
              </div>
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-green-500">{formatCurrency(stats.fraudAmountBlocked)}</p>
                <p className="text-xs text-muted-foreground mt-1">Fraud Blocked</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;

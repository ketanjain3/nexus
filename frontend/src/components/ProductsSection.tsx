import { Sparkles, Users, ArrowUpRight, Shield, Coins, TrendingUp, Percent, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStats } from "@/hooks/useProductStats";

const ProductsSection = () => {
  const { primeStats, circleStats } = useProductStats();

  const formatCurrency = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };
  return (
    <section id="products" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Products</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Two Products. <span className="text-gradient-primary">One Mission.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Capital efficiency for power users. Financial inclusion for everyone.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Nexus Prime */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-glass rounded-3xl p-8 h-full border border-primary/10 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Sparkles className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Nexus Prime</h3>
                  <p className="text-primary text-sm font-medium">For Power Users</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-6">
                "The most <span className="text-foreground font-semibold">capital-efficient loans</span> in Crypto."
              </p>

              {/* Prime Stats */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Percent className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Current APR</span>
                    </div>
                    <p className="text-2xl font-bold text-primary">{primeStats.currentAPR}%</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Avg Loan</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{formatCurrency(primeStats.avgLoanAmount)}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-2">Collateral by Score</p>
                  <div className="space-y-1">
                    {primeStats.collateralTiers.map((tier) => (
                      <div key={tier.score} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{tier.score}</span>
                        <span className="font-semibold text-foreground">{tier.ratio}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border pt-3 mt-3 text-center">
                  <p className="text-xs text-muted-foreground">Total Loans Issued</p>
                  <p className="text-xl font-bold text-primary">{primeStats.totalLoansIssued.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Under-Collateralized Loans</p>
                    <p className="text-sm text-muted-foreground">High-score users borrow at 110% collateral instead of 150%</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">AI Risk Modeling</p>
                    <p className="text-sm text-muted-foreground">Analyzes wallet age, liquidation history, and asset diversity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Coins className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Smart Accounts</p>
                    <p className="text-sm text-muted-foreground">Automates repayment to mitigate default risk</p>
                  </div>
                </div>
              </div>

              <Button variant="hero" className="w-full group/btn" onClick={() => alert('Connect your wallet to check your reputation score!')}>
                Get Your Score
                <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Nexus Circle */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-glass rounded-3xl p-8 h-full border border-accent/10 hover:border-accent/30 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <Users className="h-7 w-7 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Nexus Circle</h3>
                  <p className="text-accent text-sm font-medium">For Everyone</p>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                "<span className="text-foreground font-semibold">Scam-proof</span> Community Savings."
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Shield className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">FAsset Collateral</p>
                    <p className="text-sm text-muted-foreground">Lock FBTC or FXRP as "Good Faith" security deposit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <TrendingUp className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Yield on Idle Funds</p>
                    <p className="text-sm text-muted-foreground">Pool money is staked on Flare – earn while you wait</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Coins className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">FTSO Price Feeds</p>
                    <p className="text-sm text-muted-foreground">Real-time accurate pricing of security deposits</p>
                  </div>
                </div>
              </div>

              <Button variant="accent" className="w-full group/btn" onClick={() => alert('Connect your wallet to create a Nexus Circle!')}>
                Start a Circle
                <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

import { Percent, TrendingUp, AlertTriangle, Code, DollarSign } from "lucide-react";
import { useRevenueStats } from "@/hooks/useRevenueStats";

const RevenueSection = () => {
  const stats = useRevenueStats();

  const formatCurrency = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };

  const tvlProgress = (stats.currentTVL / stats.targetTVL) * 100;
  const streams = [
    {
      icon: Percent,
      title: "Origination Fees",
      description: "0.5% - 1% fee on every loan taken by Nexus Prime users",
      margin: "High Volume, Low Margin",
      color: "primary",
      earned: stats.originationFees,
      metric: "Total Collected"
    },
    {
      icon: TrendingUp,
      title: "Yield Spread",
      description: "Nexus Circle funds earn staking rewards. We keep 10%, users get 90%",
      margin: "Pure Profit (High Margin)",
      color: "accent",
      highlight: true,
      earned: stats.yieldSpreadEarnings,
      metric: "Total Earnings"
    },
    {
      icon: AlertTriangle,
      title: "Liquidation Arbitrage",
      description: "When users default, we sell their FAsset collateral with a 2% penalty fee",
      margin: "Risk-Based Revenue",
      color: "primary",
      earned: stats.liquidationFees,
      metric: `${stats.liquidationCount} Liquidations`
    },
    {
      icon: Code,
      title: "API Licensing",
      description: "In Year 2, sell our 'Web3 Credit Score' API to other dApps via the FDC",
      margin: "Recurring SaaS Revenue",
      color: "accent",
      earned: stats.apiClientCount * 5000,
      metric: `${stats.apiClientCount} Clients`
    }
  ];

  return (
    <section id="revenue" className="py-24 relative">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Business Model</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Four <span className="text-gradient-accent">Revenue Streams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sustainable revenue beyond token speculation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {streams.map((stream, index) => (
            <div 
              key={stream.title}
              className={`group bg-glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                stream.highlight ? 'ring-2 ring-accent/30' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                  stream.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  <stream.icon className={`h-6 w-6 ${
                    stream.color === 'primary' ? 'text-primary' : 'text-accent'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{stream.title}</h3>
                    {stream.highlight && (
                      <span className="px-2 py-0.5 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-3">{stream.description}</p>
                  
                  {/* Revenue Metrics */}
                  <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">{stream.metric}</span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-green-500" />
                        <span className="text-sm font-bold text-green-500">{formatCurrency(stream.earned)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    stream.color === 'primary' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-accent/10 text-accent'
                  }`}>
                    {stream.margin}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Market Size & TVL Progress */}
        <div className="mt-16 max-w-4xl mx-auto space-y-6">
          {/* TVL Progress */}
          <div className="bg-glass rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">TVL Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current TVL</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(stats.currentTVL)}</span>
              </div>
              <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                  style={{ width: `${Math.min(tvlProgress, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Target (Year 3)</span>
                <span className="text-lg font-semibold text-foreground">{formatCurrency(stats.targetTVL)}</span>
              </div>
              <div className="text-center pt-2">
                <span className="text-sm text-accent font-semibold">{tvlProgress.toFixed(1)}% Complete</span>
              </div>
            </div>
          </div>

          {/* Market Opportunity */}
          <div className="bg-glass rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-6 text-center">Market Opportunity</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gradient-primary">$804B</p>
                <p className="text-sm text-muted-foreground mt-1">TAM by 2030</p>
                <p className="text-xs text-muted-foreground">Global P2P Lending</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-gradient-accent">$1T+</p>
                <p className="text-sm text-muted-foreground mt-1">SAM</p>
                <p className="text-xs text-muted-foreground">BTC & XRP holders seeking yield</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">1%</p>
                <p className="text-sm text-muted-foreground mt-1">SOM Target</p>
                <p className="text-xs text-muted-foreground">Flare TVL + Early Adopters</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueSection;

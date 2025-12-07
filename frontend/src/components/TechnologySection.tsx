import { Brain, Database, Link, ShieldCheck } from "lucide-react";
import { useTechStats } from "@/hooks/useTechStats";

const TechnologySection = () => {
  const stats = useTechStats();

  const techStack = [
    {
      icon: Brain,
      title: "AI Engine",
      description: "Proprietary Python risk modeling analyzes on-chain and off-chain user history",
      color: "primary",
      metrics: [
        { label: "Wallets Analyzed", value: stats.walletsAnalyzed.toLocaleString() },
        { label: "Model Accuracy", value: `${stats.modelAccuracy}%` },
      ]
    },
    {
      icon: Database,
      title: "Flare Data Connector",
      description: "Cryptographically proves reputation scores on-chain without revealing user privacy",
      color: "accent",
      metrics: [
        { label: "Attestations", value: stats.attestationsProcessed.toLocaleString() },
        { label: "Avg Time", value: `${stats.avgAttestationTime}s` },
        { label: "Providers", value: stats.activeProviders.toString() },
      ]
    },
    {
      icon: Link,
      title: "FTSO Oracle",
      description: "Real-time price feeds every few seconds for accurate collateral valuation",
      color: "primary",
      metrics: [
        { label: "Price Feeds", value: stats.priceFeeds.toString() },
        { label: "Uptime", value: `${stats.oracleUptime}%` },
      ]
    },
    {
      icon: ShieldCheck,
      title: "Smart Accounts",
      description: "Automated repayment and liquidation protection built into the protocol",
      color: "accent",
      metrics: [
        { label: "Accounts Created", value: stats.smartAccountsCreated.toLocaleString() },
        { label: "Auto Repayments", value: stats.automatedRepayments.toLocaleString() },
        { label: "Liquidations Prevented", value: stats.liquidationsPrevented.toString() },
      ]
    }
  ];

  return (
    <section id="technology" className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Technology</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            The <span className="text-gradient-primary">Moat</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            "Why can't Aave just copy you?" — Because they lack the <span className="text-foreground font-semibold">AI Verification Layer</span> and <span className="text-foreground font-semibold">Enshrined Data Oracles</span>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {techStack.map((tech, index) => (
            <div 
              key={tech.title}
              className="group bg-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${
                tech.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
              }`}>
                <tech.icon className={`h-6 w-6 ${
                  tech.color === 'primary' ? 'text-primary' : 'text-accent'
                }`} />
              </div>
              <h3 className="text-lg font-bold mb-2">{tech.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{tech.description}</p>
              
              {/* Live Metrics */}
              <div className="space-y-2 pt-4 border-t border-border">
                {tech.metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{metric.label}</span>
                    <span className={`text-sm font-semibold ${
                      tech.color === 'primary' ? 'text-primary' : 'text-accent'
                    }`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-glass rounded-3xl p-8 md:p-12">
            <h3 className="text-2xl font-bold text-center mb-8">How It Works</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <p className="font-semibold">User</p>
                <p className="text-sm text-muted-foreground">Connects wallet</p>
              </div>
              <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <p className="font-semibold">AI Analysis</p>
                <p className="text-sm text-muted-foreground">Calculates reputation</p>
              </div>
              <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-accent to-primary" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 mx-auto mb-4 flex items-center justify-center">
                  <Database className="h-8 w-8 text-accent" />
                </div>
                <p className="font-semibold">FDC Attestation</p>
                <p className="text-sm text-muted-foreground">Proves score on-chain</p>
              </div>
              <div className="hidden md:block w-16 h-0.5 bg-gradient-to-r from-primary to-accent" />
              <div className="flex-1 text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏦</span>
                </div>
                <p className="font-semibold">Access Unlocked</p>
                <p className="text-sm text-muted-foreground">Better rates & terms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;

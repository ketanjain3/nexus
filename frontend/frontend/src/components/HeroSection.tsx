import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, TrendingUp, DollarSign } from "lucide-react";
import { useHeroStats } from "@/hooks/useHeroStats";

const HeroSection = () => {
  const stats = useHeroStats();

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(1)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(0)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`;
    return num.toLocaleString();
  };
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">Built on Flare Network</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            The First{" "}
            <span className="text-gradient-primary">Reputation-Based</span>
            <br />
            Banking Protocol
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Combining AI with Flare's Data Connector to build the 
            <span className="text-foreground font-medium"> Credit Score of Web3</span>. 
            Under-collateralized loans for verified users. Scam-proof community savings for everyone.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="hero" size="xl" onClick={() => window.location.href = '/connect-wallet'}>
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => window.open('#', '_blank')}>
              Read Whitepaper
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <div className="bg-glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">{formatNumber(stats.tvl)}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Value Locked</p>
            </div>
            <div className="bg-glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">{stats.collateralRatio}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Lower Collateral</p>
            </div>
            <div className="bg-glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="text-3xl font-bold text-foreground">{formatNumber(stats.marketSize)}+</span>
              </div>
              <p className="text-sm text-muted-foreground">Global ROSCA Market</p>
            </div>
            <div className="bg-glass rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-3xl font-bold text-foreground">{stats.activeLoans.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Active Loans</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;

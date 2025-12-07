import { useWallet } from "@/hooks/useWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Users, Wallet, LogOut, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const { wallet, disconnectWallet, switchToCoston2 } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!wallet.isConnected) {
      navigate('/connect-wallet');
    }
  }, [wallet.isConnected, navigate]);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleDisconnect = () => {
    disconnectWallet();
    navigate('/');
  };

  if (!wallet.isConnected) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-glass sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-foreground">NexusBank</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary">
                <Wallet className="h-4 w-4 text-primary" />
                <span className="text-sm font-mono">{formatAddress(wallet.address!)}</span>
              </div>
              {!wallet.isCorrectNetwork && (
                <Button variant="destructive" size="sm" onClick={switchToCoston2}>
                  Switch to Coston2
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleDisconnect}>
                <LogOut className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Manage your loans and savings circles</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Reputation Score */}
          <Card className="bg-glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Reputation Score</h3>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary mb-2">{wallet.reputationScore}</p>
            <p className="text-xs text-muted-foreground">Excellent standing</p>
          </Card>

          {/* Active Loans */}
          <Card className="bg-glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Active Loans</h3>
              <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-accent" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">0</p>
            <p className="text-xs text-muted-foreground">No active loans</p>
          </Card>

          {/* Circles */}
          <Card className="bg-glass p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground">Nexus Circles</h3>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-4 w-4 text-primary" />
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">0</p>
            <p className="text-xs text-muted-foreground">Not in any circles</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Nexus Prime */}
          <Card className="bg-glass p-8 hover:border-primary/30 transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nexus Prime</h3>
                <p className="text-sm text-primary">Under-collateralized Loans</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Get loans with only 110% collateral based on your reputation score
            </p>
            <Button variant="hero" className="w-full group/btn" disabled>
              Apply for Loan
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
            <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
          </Card>

          {/* Nexus Circle */}
          <Card className="bg-glass p-8 hover:border-accent/30 transition-colors group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Nexus Circle</h3>
                <p className="text-sm text-accent">Community Savings</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              Join or create savings circles with automated payouts and yield
            </p>
            <Button variant="accent" className="w-full group/btn" onClick={() => navigate('/browse-pools')}>
              Browse Pools
              <ArrowUpRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </Button>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-glass p-8">
          <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-2">Your transactions will appear here</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

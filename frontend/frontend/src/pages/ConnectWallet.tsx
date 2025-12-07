import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useWallet } from "@/hooks/useWallet";
import { CheckCircle2, Copy, ExternalLink, Wallet, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ConnectWallet = () => {
  const { wallet, connectWallet, switchToCoston2 } = useWallet();
  const [copied, setCopied] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window.ethereum === 'undefined') {
      setIsMetaMaskInstalled(false);
    }
  }, []);

  useEffect(() => {
    if (wallet.isConnected) {
      // Auto redirect to dashboard after 2 seconds
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }
  }, [wallet.isConnected, navigate]);

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getScoreTier = (score: number) => {
    if (score >= 750) return { label: "Excellent", color: "text-green-500", bg: "bg-green-500" };
    if (score >= 650) return { label: "Good", color: "text-yellow-500", bg: "bg-yellow-500" };
    return { label: "Fair", color: "text-red-500", bg: "bg-red-500" };
  };

  const getScorePercentage = (score: number) => {
    return (score / 1000) * 100;
  };

  const getCollateralRatio = (score: number) => {
    if (score >= 750) return "110%";
    if (score >= 650) return "125%";
    return "140%";
  };

  const getEstimatedAPR = (score: number) => {
    if (score >= 750) return "5.8%";
    if (score >= 650) return "7.2%";
    return "9.5%";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">N</span>
            </div>
            <span className="text-2xl font-bold text-foreground">NexusBank</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">
            {wallet.isConnected ? "Wallet Connected!" : "Connect Your Wallet"}
          </h1>
          <p className="text-muted-foreground">
            {wallet.isConnected 
              ? "Your wallet is successfully connected" 
              : "Connect your wallet to access NexusBank"}
          </p>
        </div>

        {!wallet.isConnected ? (
          <Card className="bg-glass p-8">
            {/* MetaMask Not Installed Warning */}
            {!isMetaMaskInstalled && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-destructive mb-1">MetaMask Not Detected</p>
                  <p className="text-xs text-muted-foreground mb-2">Please install MetaMask to continue</p>
                  <a 
                    href="https://metamask.io/download/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline inline-flex items-center gap-1"
                  >
                    Install MetaMask <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Connect Button */}
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full mb-6"
              onClick={connectWallet}
              disabled={!isMetaMaskInstalled}
            >
              <Wallet className="mr-2 h-5 w-5" />
              Connect with MetaMask
            </Button>

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Secure wallet authentication</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>No passwords needed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Your keys, your crypto</span>
              </div>
            </div>

            {/* Network Info */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Connecting to <span className="text-primary font-semibold">Flare Network</span>
              </p>
            </div>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Connected Status */}
            <Card className="bg-glass p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Wallet Connected</p>
                  <p className="text-sm text-muted-foreground">Network: Flare</p>
                </div>
              </div>

              {/* Wallet Address */}
              <div className="bg-secondary/50 rounded-lg p-4 mb-4">
                <p className="text-xs text-muted-foreground mb-2">Wallet Address</p>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm text-foreground">{formatAddress(wallet.address!)}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={copyAddress}
                    className="h-8 w-8 p-0"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Network Warning */}
              {!wallet.isCorrectNetwork && (
                <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-destructive mb-1">Wrong Network</p>
                      <p className="text-xs text-muted-foreground">Please switch to Flare Coston2 testnet</p>
                    </div>
                  </div>
                  <Button onClick={switchToCoston2} size="sm" className="w-full">
                    Switch to Coston2
                  </Button>
                </div>
              )}

              {/* Balance */}
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground mb-1">Balance</p>
                <p className="text-2xl font-bold text-foreground">1,247 FLR</p>
              </div>
            </Card>

            {/* Reputation Score */}
            {wallet.reputationScore && (
              <Card className="bg-glass p-6">
                <h3 className="text-lg font-bold mb-4">Your Reputation Score</h3>
                
                {/* Score Display */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-3">
                    <span className="text-4xl font-bold text-primary">{wallet.reputationScore}</span>
                  </div>
                  <p className={`text-sm font-semibold ${getScoreTier(wallet.reputationScore).color}`}>
                    {getScoreTier(wallet.reputationScore).label}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>0</span>
                    <span>1000</span>
                  </div>
                  <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`absolute inset-y-0 left-0 ${getScoreTier(wallet.reputationScore).bg} transition-all duration-1000`}
                      style={{ width: `${getScorePercentage(wallet.reputationScore)}%` }}
                    />
                  </div>
                </div>

                {/* Benefits */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Collateral Required</span>
                    <span className="font-semibold text-primary">{getCollateralRatio(wallet.reputationScore)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated APR</span>
                    <span className="font-semibold text-accent">{getEstimatedAPR(wallet.reputationScore)}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Continue Button */}
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/dashboard')}
            >
              Continue to Dashboard
            </Button>

            {/* Auto Redirect Message */}
            <p className="text-xs text-center text-muted-foreground">
              Redirecting to dashboard in 2 seconds...
            </p>
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;

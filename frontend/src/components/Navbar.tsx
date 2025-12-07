import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Wallet, Bell, Wifi, WifiOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { wallet, connectWallet, disconnectWallet } = useWallet();

  const handleConnect = async () => {
    await connectWallet();
    navigate('/dashboard');
  };

  const handleWalletClick = () => {
    navigate('/dashboard');
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 750) return "bg-green-500";
    if (score >= 650) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-glass">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-bold text-xl">N</span>
            </div>
            <span className="text-xl font-bold text-foreground">NexusBank</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
              Products
            </a>
            <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
              Technology
            </a>
            <a href="#revenue" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
              Business Model
            </a>
            <a href="#roadmap" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
              Roadmap
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors" onClick={() => setIsOpen(false)}>
              FAQ
            </a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* Network Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
              {wallet.networkStatus === 'online' ? (
                <Wifi className="h-4 w-4 text-green-500" />
              ) : (
                <WifiOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-xs text-muted-foreground">
                {wallet.networkStatus === 'online' ? 'Flare' : 'Offline'}
              </span>
            </div>

            {/* Notifications */}
            {wallet.isConnected && (
              <button className="relative p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
                <Bell className="h-5 w-5 text-muted-foreground" />
                {wallet.notificationCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground text-xs">
                    {wallet.notificationCount}
                  </Badge>
                )}
              </button>
            )}

            {/* Wallet Connection */}
            {!wallet.isConnected ? (
              <Button variant="hero" size="default" onClick={handleConnect}>
                <Wallet className="mr-2 h-4 w-4" />
                Connect Wallet
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                {/* Reputation Score */}
                {wallet.reputationScore && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
                    <div className={`w-2 h-2 rounded-full ${getScoreColor(wallet.reputationScore)}`} />
                    <span className="text-sm font-semibold text-foreground">{wallet.reputationScore}</span>
                  </div>
                )}
                {/* Wallet Address */}
                <Button variant="heroOutline" size="default" onClick={handleWalletClick}>
                  {formatAddress(wallet.address!)}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <a href="#products" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsOpen(false)}>
              Products
            </a>
            <a href="#technology" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsOpen(false)}>
              Technology
            </a>
            <a href="#revenue" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsOpen(false)}>
              Business Model
            </a>
            <a href="#roadmap" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsOpen(false)}>
              Roadmap
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsOpen(false)}>
              FAQ
            </a>
            <div className="flex flex-col gap-2 pt-4">
              {/* Mobile Network Status */}
              <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary">
                <span className="text-sm text-muted-foreground">Network</span>
                <div className="flex items-center gap-2">
                  {wallet.networkStatus === 'online' ? (
                    <Wifi className="h-4 w-4 text-green-500" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-red-500" />
                  )}
                  <span className="text-sm text-foreground">
                    {wallet.networkStatus === 'online' ? 'Flare' : 'Offline'}
                  </span>
                </div>
              </div>

              {/* Mobile Wallet Connection */}
              {!wallet.isConnected ? (
                <Button variant="hero" className="w-full" onClick={handleConnect}>
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              ) : (
                <>
                  <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary">
                    <span className="text-sm text-muted-foreground">Score</span>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getScoreColor(wallet.reputationScore!)}`} />
                      <span className="text-sm font-semibold text-foreground">{wallet.reputationScore}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-secondary">
                    <span className="text-sm text-muted-foreground">Notifications</span>
                    <Badge className="bg-primary text-primary-foreground">{wallet.notificationCount}</Badge>
                  </div>
                  <Button variant="heroOutline" className="w-full" onClick={handleWalletClick}>
                    {formatAddress(wallet.address!)}
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

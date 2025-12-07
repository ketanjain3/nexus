import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Twitter, Github, FileText, MessageCircle, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { useFooterStats } from "@/hooks/useFooterStats";
import { useState } from "react";

const Footer = () => {
  const stats = useFooterStats();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const getStatusIcon = () => {
    switch (stats.systemStatus) {
      case 'operational':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'down':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (stats.systemStatus) {
      case 'operational':
        return 'bg-green-500';
      case 'degraded':
        return 'bg-yellow-500';
      case 'down':
        return 'bg-red-500';
    }
  };
  return (
    <footer className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Build the Future of <span className="text-gradient-primary">DeFi Banking</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join us in creating the credit score of Web3. Whether you're an investor, developer, or user — there's a place for you in the NexusBank ecosystem.
          </p>
          
          {/* Newsletter Signup */}
          <div className="max-w-md mx-auto mb-8">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-glass border-border"
                required
              />
              <Button type="submit" variant="hero">
                Subscribe
              </Button>
            </form>
            {subscribed && (
              <p className="text-sm text-green-500 mt-2">✓ Successfully subscribed!</p>
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Join {stats.subscriberCount.toLocaleString()}+ subscribers
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" onClick={() => window.location.href = '#products'}>
              Get Early Access
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="heroOutline" size="xl" onClick={() => window.location.href = 'mailto:team@nexusbank.io'}>
              Contact Team
            </Button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="border-t border-border pt-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-xl">N</span>
              </div>
              <span className="text-xl font-bold text-foreground">NexusBank</span>
            </div>

            {/* Links */}
            <div className="flex items-center gap-8">
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Documentation coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Documentation
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Whitepaper coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Whitepaper
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Audit reports will be published after mainnet launch'); }} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Audit Reports
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Brand kit coming soon!'); }} className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                Brand Kit
              </a>
            </div>

            {/* Social Links with Stats */}
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/nexusbank" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                title={`${stats.twitterFollowers.toLocaleString()} followers`}
              >
                <Twitter className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {(stats.twitterFollowers / 1000).toFixed(1)}K
                </span>
              </a>
              <a 
                href="https://github.com/nexusbank" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                title={`${stats.githubStars.toLocaleString()} stars`}
              >
                <Github className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {stats.githubStars}
                </span>
              </a>
              <a 
                href="https://discord.gg/nexusbank" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                title={`${stats.discordMembers.toLocaleString()} members`}
              >
                <MessageCircle className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  {(stats.discordMembers / 1000).toFixed(1)}K
                </span>
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); alert('Blog coming soon!'); }}
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
              >
                <FileText className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
              <p className="text-sm text-muted-foreground">
                © 2025 NexusBank. Built on Flare Network.
              </p>
              <div className="flex items-center gap-3">
                {/* System Status */}
                <a href="https://status.nexusbank.io" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-foreground transition-colors group">
                  <span className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`} />
                  <span className="text-muted-foreground group-hover:text-foreground">
                    {stats.systemStatus === 'operational' ? 'All systems operational' : 
                     stats.systemStatus === 'degraded' ? 'Degraded performance' : 'System down'}
                  </span>
                  {getStatusIcon()}
                </a>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{stats.uptime}% uptime</span>
              </div>
            </div>
            
            {/* Latest Update */}
            <div className="bg-secondary/50 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Latest:</span>
                <span className="text-sm text-foreground font-medium">{stats.latestUpdate.title}</span>
              </div>
              <span className="text-xs text-muted-foreground">{stats.latestUpdate.date}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

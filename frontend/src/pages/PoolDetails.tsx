import { useWallet } from "@/hooks/useWallet";
import { usePools } from "@/hooks/usePools";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users } from "lucide-react";

const PoolDetails = () => {
  const { wallet } = useWallet();
  const { pools, joinPool, loading } = usePools();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    if (!wallet.isConnected) {
      navigate('/connect-wallet');
    }
  }, [wallet.isConnected, navigate]);

  const pool = pools.find(p => p.id === parseInt(id || '0'));

  if (!wallet.isConnected) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading pool details...</p>
        </div>
      </div>
    );
  }

  if (!pool) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-6 py-12">
          <Button variant="ghost" onClick={() => navigate('/browse-pools')} className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pools
          </Button>
          <Card className="bg-glass p-12 text-center">
            <h1 className="text-2xl font-bold mb-2">Pool Not Found</h1>
            <p className="text-muted-foreground mb-6">The pool you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/browse-pools')}>Browse Pools</Button>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Active</Badge>;
      case 'full':
        return <Badge className="bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20">Full</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">Completed</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <Button variant="ghost" onClick={() => navigate('/browse-pools')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Pools
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">{pool.name}</h1>
              <p className="text-muted-foreground">Pool #{pool.id}</p>
            </div>
            {getStatusBadge(pool.status)}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-glass p-6">
              <h3 className="text-lg font-bold mb-4">Pool Information</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Contribution Amount</span>
                  <span className="font-semibold text-foreground">{pool.contributionAmount} FLR</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Members</span>
                  <span className="font-semibold text-foreground">{pool.currentMembers}/{pool.maxMembers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Current Round</span>
                  <span className="font-semibold text-foreground">{pool.currentRound}/{pool.totalRounds}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Collateral Required</span>
                  <span className="font-semibold text-primary">{pool.collateralPercent}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Yield Rate</span>
                  <span className="font-semibold text-accent">{pool.yieldRate}% APY</span>
                </div>
              </div>
            </Card>

            <Card className="bg-glass p-6">
              <h3 className="text-lg font-bold mb-4">Join This Pool</h3>
              <div className="space-y-4 mb-6">
                <div className="bg-secondary/50 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">Required to Join</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Monthly Contribution:</span>
                      <span className="font-semibold">{pool.contributionAmount} FLR</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Collateral (10%):</span>
                      <span className="font-semibold text-primary">{(pool.contributionAmount * 0.1).toFixed(1)} FLR</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t border-border pt-2">
                      <span>Total Required:</span>
                      <span className="text-accent">{(pool.contributionAmount * 1.1).toFixed(1)} FLR</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                variant="hero"
                className="w-full"
                disabled={isJoining || pool.status !== 'active' || pool.members?.some(m => m.toLowerCase() === wallet.address?.toLowerCase())}
                onClick={async () => {
                  if (wallet.address) {
                    try {
                      setIsJoining(true);
                      await joinPool(pool.id, wallet.address);
                    } catch (error) {
                      console.error('Error joining pool:', error);
                    } finally {
                      setIsJoining(false);
                    }
                  }
                }}
              >
                {isJoining
                  ? 'Joining...'
                  : pool.members?.some(m => m.toLowerCase() === wallet.address?.toLowerCase())
                  ? 'Already a Member'
                  : pool.status === 'active'
                  ? 'Join Pool'
                  : pool.status === 'full'
                  ? 'Pool Full'
                  : 'Pool Completed'}
              </Button>
            </Card>
          </div>

          <Card className="bg-glass p-6">
            <h3 className="text-lg font-bold mb-4">Pool Members ({pool.currentMembers}/{pool.maxMembers})</h3>
            <div className="space-y-2">
              {pool.members?.map((memberAddress, i) => {
                const isCreator = memberAddress.toLowerCase() === pool.creator.toLowerCase();
                const isCurrentUser = wallet.address?.toLowerCase() === memberAddress.toLowerCase();
                
                return (
                  <div key={memberAddress} className={`flex items-center gap-3 p-3 rounded-lg ${
                    isCurrentUser ? 'bg-primary/10 border-2 border-primary/30' : 'bg-secondary/50'
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">
                        {isCurrentUser ? 'You' : `Member ${i + 1}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {memberAddress.slice(0, 6)}...{memberAddress.slice(-4)}
                      </p>
                    </div>
                    {isCreator && <Badge variant="outline">Creator</Badge>}
                    {isCurrentUser && !isCreator && <Badge className="bg-primary/10 text-primary">You</Badge>}
                  </div>
                );
              })}
              {Array.from({ length: pool.maxMembers - pool.currentMembers }).map((_, i) => (
                <div key={`empty-${i}`} className="flex items-center gap-3 p-3 bg-secondary/20 rounded-lg border-2 border-dashed border-border">
                  <div className="w-8 h-8 rounded-full bg-muted/10 flex items-center justify-center">
                    <Users className="h-4 w-4 text-muted" />
                  </div>
                  <p className="text-sm text-muted-foreground">Empty Slot</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PoolDetails;

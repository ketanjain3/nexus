import { useEffect, useRef, useState } from "react";
import { TrendingUp, Users, Zap, Shield } from "lucide-react";
import { useAnimatedStats } from "@/hooks/useAnimatedStats";

interface StatProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  color: "primary" | "accent";
  delay: number;
}

const AnimatedCounter = ({ 
  value, 
  suffix, 
  prefix = "", 
  duration = 2000,
  isVisible 
}: { 
  value: number; 
  suffix: string; 
  prefix?: string;
  duration?: number;
  isVisible: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing function for smooth deceleration
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [value, duration, isVisible]);

  return (
    <span className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const StatCard = ({ stat, isVisible }: { stat: StatProps; isVisible: boolean }) => {
  const Icon = stat.icon;
  
  return (
    <div 
      className={`group relative overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${stat.delay}ms` }}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        stat.color === 'primary' ? 'bg-primary/20' : 'bg-accent/20'
      }`} />
      
      <div className="relative bg-glass rounded-3xl p-8 h-full border border-transparent hover:border-primary/20 transition-colors">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>

        <div className="relative z-10">
          {/* Icon */}
          <div className={`w-14 h-14 rounded-2xl mb-6 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
            stat.color === 'primary' ? 'bg-primary/10' : 'bg-accent/10'
          }`}>
            <Icon className={`h-7 w-7 ${
              stat.color === 'primary' ? 'text-primary' : 'text-accent'
            }`} />
          </div>

          {/* Counter */}
          <div className={`text-4xl md:text-5xl font-bold mb-2 ${
            stat.color === 'primary' ? 'text-gradient-primary' : 'text-gradient-accent'
          }`}>
            <AnimatedCounter 
              value={stat.value} 
              suffix={stat.suffix}
              prefix={stat.prefix}
              isVisible={isVisible}
              duration={2500}
            />
          </div>

          {/* Labels */}
          <p className="text-lg font-semibold text-foreground mb-1">{stat.label}</p>
          <p className="text-sm text-muted-foreground">{stat.sublabel}</p>
        </div>

        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 ${
          stat.color === 'primary' ? 'bg-primary' : 'bg-accent'
        }`} style={{
          clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
          borderRadius: '0 1.5rem 0 0'
        }} />
      </div>
    </div>
  );
};

const AnimatedStats = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const liveStats = useAnimatedStats();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatProps[] = [
    {
      value: Math.floor(liveStats.tvl / 1000000),
      suffix: "M",
      prefix: "$",
      label: "Total Value Locked",
      sublabel: "Across all protocols",
      icon: TrendingUp,
      color: "primary",
      delay: 0
    },
    {
      value: liveStats.activeUsers,
      suffix: "+",
      label: "Active Users",
      sublabel: "Monthly active wallets",
      icon: Users,
      color: "accent",
      delay: 150
    },
    {
      value: Math.floor(liveStats.transactions / 1000),
      suffix: "K",
      label: "Transactions",
      sublabel: "Processed to date",
      icon: Zap,
      color: "primary",
      delay: 300
    },
    {
      value: Math.floor(liveStats.uptime * 10) / 10,
      suffix: "%",
      label: "Uptime",
      sublabel: "Protocol reliability",
      icon: Shield,
      color: "accent",
      delay: 450
    }
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Protocol Metrics</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            Built for <span className="text-gradient-primary">Scale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time metrics powering the future of decentralized finance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} isVisible={isVisible} />
          ))}
        </div>

        {/* Live indicator */}
        <div className={`mt-12 flex items-center justify-center gap-2 transition-all duration-700 delay-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
          </span>
          <span className="text-sm text-muted-foreground">Live on Flare Network</span>
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats;

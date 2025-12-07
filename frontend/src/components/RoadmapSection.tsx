import { Check, Circle, ArrowRight, Clock } from "lucide-react";
import { useRoadmapStats } from "@/hooks/useRoadmapStats";

const RoadmapSection = () => {
  const phases = useRoadmapStats();

  const formatCurrency = (num: number) => {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(0)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
    return `$${num}`;
  };

  const getProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <section id="roadmap" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider">Roadmap</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6">
            The Path to <span className="text-gradient-primary">$200M TVL</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/50" />
              
              <div className="grid grid-cols-3 gap-8">
                {phases.map((phase, index) => (
                  <div key={phase.year} className="relative">
                    {/* Timeline Node */}
                    <div className={`w-6 h-6 rounded-full mx-auto mb-8 relative z-10 flex items-center justify-center ${
                      phase.status === 'current' 
                        ? 'bg-primary shadow-lg shadow-primary/50' 
                        : 'bg-secondary border-2 border-muted'
                    }`}>
                      {phase.status === 'current' && (
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />
                      )}
                    </div>

                    <div className={`bg-glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                      phase.status === 'current' ? 'ring-2 ring-primary/30' : ''
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          phase.status === 'current'
                            ? 'bg-primary/10 text-primary'
                            : phase.status === 'completed'
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-secondary text-muted-foreground'
                        }`}>
                          {phase.year}
                        </span>
                        <span className="text-xl font-bold text-gradient-accent">{formatCurrency(phase.targetTVL)}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                      
                      {/* Progress Bar */}
                      {phase.status === 'current' && (
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-muted-foreground">Progress</span>
                            <span className="text-xs font-semibold text-primary">
                              {formatCurrency(phase.currentTVL)} / {formatCurrency(phase.targetTVL)}
                            </span>
                          </div>
                          <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                            <div 
                              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                              style={{ width: `${getProgress(phase.currentTVL, phase.targetTVL)}%` }}
                            />
                          </div>
                          <div className="text-center mt-1">
                            <span className="text-xs text-accent font-semibold">
                              {getProgress(phase.currentTVL, phase.targetTVL).toFixed(1)}% Complete
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {/* Milestones */}
                      <ul className="space-y-2">
                        {phase.milestones.map((milestone, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            {milestone.completed ? (
                              <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <Circle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                phase.status === 'current' ? 'text-primary' : 'text-muted'
                              }`} />
                            )}
                            <div className="flex-1">
                              <span className={milestone.completed ? 'text-foreground line-through' : 'text-muted-foreground'}>
                                {milestone.title}
                              </span>
                              {!milestone.completed && milestone.eta && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="h-3 w-3 text-accent" />
                                  <span className="text-xs text-accent">ETA: {milestone.eta}</span>
                                </div>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden space-y-6">
            {phases.map((phase, index) => (
              <div key={phase.year} className="relative">
                <div className={`bg-glass rounded-2xl p-6 ${
                  phase.status === 'current' ? 'ring-2 ring-primary/30' : ''
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      phase.status === 'current'
                        ? 'bg-primary/10 text-primary'
                        : phase.status === 'completed'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {phase.year}
                    </span>
                    <span className="text-xl font-bold text-gradient-accent">{formatCurrency(phase.targetTVL)}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4">{phase.title}</h3>
                  
                  {/* Progress Bar */}
                  {phase.status === 'current' && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs font-semibold text-primary">
                          {formatCurrency(phase.currentTVL)} / {formatCurrency(phase.targetTVL)}
                        </span>
                      </div>
                      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                          style={{ width: `${getProgress(phase.currentTVL, phase.targetTVL)}%` }}
                        />
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-accent font-semibold">
                          {getProgress(phase.currentTVL, phase.targetTVL).toFixed(1)}% Complete
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Milestones */}
                  <ul className="space-y-2">
                    {phase.milestones.map((milestone, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        {milestone.completed ? (
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                            phase.status === 'current' ? 'text-primary' : 'text-muted'
                          }`} />
                        )}
                        <div className="flex-1">
                          <span className={milestone.completed ? 'text-foreground line-through' : 'text-muted-foreground'}>
                            {milestone.title}
                          </span>
                          {!milestone.completed && milestone.eta && (
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-accent" />
                              <span className="text-xs text-accent">ETA: {milestone.eta}</span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < phases.length - 1 && (
                  <div className="flex justify-center my-4">
                    <ArrowRight className="h-5 w-5 text-muted rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;

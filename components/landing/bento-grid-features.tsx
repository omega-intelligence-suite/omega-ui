'use client';

import { TrendingUp, Brain, Target, FileText, BarChart3, Shield, Zap, Activity } from 'lucide-react';

const features = [
  {
    title: 'Multi-Asset Tracking',
    description: 'Unified view of Crypto, PEA, Bank accounts, and ETFs. Track your entire wealth in one place with real-time synchronization.',
    icon: BarChart3,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderGradient: 'from-blue-500/50 to-cyan-500/50',
  },
  {
    title: 'AI News Correlation Engine',
    description: 'Groq analyzes thousands of news sources to correlate media noise with your portfolio volatility. Transform information into actionable insights.',
    icon: Brain,
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderGradient: 'from-purple-500/50 to-pink-500/50',
  },
  {
    title: '2035 Goal Projection',
    description: 'Visual roadmap to 1M€. Track your Net Worth Velocity and see exactly where you stand on your journey to financial freedom.',
    icon: Target,
    gradient: 'from-green-500/20 to-emerald-500/20',
    borderGradient: 'from-green-500/50 to-emerald-500/50',
  },
  {
    title: 'Tax-Aware Reporting',
    description: 'Real-time Flat Tax projection. Understand your true net capital after taxation. Make informed decisions with complete visibility.',
    icon: FileText,
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderGradient: 'from-orange-500/50 to-amber-500/50',
  },
  {
    title: 'Smart Rebalancing',
    description: 'Calculate deviation from your target allocation. Buy the dips, sell the tops with precision. Stay disciplined in any market condition.',
    icon: Activity,
    gradient: 'from-red-500/20 to-rose-500/20',
    borderGradient: 'from-red-500/50 to-rose-500/50',
  },
  {
    title: 'Privacy-First Architecture',
    description: 'Self-hostable or encrypted. Your data, your control. No third-party access, no compromises on security.',
    icon: Shield,
    gradient: 'from-indigo-500/20 to-blue-500/20',
    borderGradient: 'from-indigo-500/50 to-blue-500/50',
  },
];

export function BentoGridFeatures() {
  return (
    <section id="features" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Long-term Alpha
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Built for{' '}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              Strategic Accumulation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every feature designed to keep you on track. No distractions, no FOMO, just disciplined execution.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isLarge = index === 0 || index === 1;
            
            return (
              <div
                key={feature.title}
                className={`
                  group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8
                  transition-all duration-500 hover:scale-[1.02] hover:border-white/20
                  ${isLarge ? 'md:col-span-1 lg:col-span-1' : ''}
                `}
              >
                {/* Gradient border effect on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${feature.borderGradient} blur-xl -z-10`} />
                
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

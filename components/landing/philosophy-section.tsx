'use client';

import { Bitcoin, TrendingUp, Shield } from 'lucide-react';

export function PhilosophySection() {
  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
            <Bitcoin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              The Philosophy
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold">
            Built for the{' '}
            <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              2026-2030 Cycle
            </span>
          </h2>
        </div>

        {/* Main content card */}
        <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-lg p-8 sm:p-12">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-3xl blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-br-3xl blur-2xl" />
          
          <div className="relative space-y-6 text-lg leading-relaxed">
            <p className="text-foreground/90">
              We reject the noise of day trading and the illusion of market timing. 
              <span className="text-primary font-semibold"> Omega Suite</span> is engineered for one purpose: 
              <span className="text-foreground font-semibold"> disciplined, strategic accumulation</span>.
            </p>
            
            <p className="text-foreground/90">
              The 2026-2030 cycle represents a unique window of opportunity. While others chase volatile swings, 
              we focus on <span className="text-primary font-semibold">long-term alpha</span> through systematic 
              portfolio construction and intelligent rebalancing.
            </p>
            
            <p className="text-foreground/90">
              Bitcoin serves as our <span className="text-foreground font-semibold">reserve asset</span>—not for speculation, 
              but as the foundation of a multi-decade wealth strategy. Combined with diversified holdings across 
              crypto, equities, and traditional assets, we build resilience without sacrificing conviction.
            </p>

            <div className="pt-8 mt-8 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">Anti-Trading</div>
                  <div className="text-xs text-muted-foreground">Buy & Hold Strategy</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-3">
                    <Bitcoin className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">BTC Reserve</div>
                  <div className="text-xs text-muted-foreground">Long-term Foundation</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-sm font-semibold text-foreground mb-1">Discipline</div>
                  <div className="text-xs text-muted-foreground">Data-Driven Execution</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="mt-12 text-center">
          <blockquote className="text-xl sm:text-2xl font-medium text-muted-foreground italic">
            "The goal isn't to time the market.{' '}
            <span className="text-foreground not-italic font-bold">
              It's to stay in the market.
            </span>"
          </blockquote>
        </div>
      </div>
    </section>
  );
}

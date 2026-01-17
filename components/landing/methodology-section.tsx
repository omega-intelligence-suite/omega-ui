"use client";

import {
  TrendingUp,
  Brain,
  Target,
  ArrowRight,
  LineChart
} from "lucide-react";

import { colors } from "@/config";

const principles = [
  {
    title: "The 2026-2030 Cycle",
    description: "Macro-economic liquidity cycles are predictable. OMEGA is calibrated to capture the expansion phase of the 4-year cycle.",
    icon: TrendingUp,
    color: "text-omega-green",
    bgColor: "bg-omega-green/10",
    borderColor: "border-omega-green/20",
  },
  {
    title: "Math > Emotions",
    description: "Remove psychological bias. Your strategy is executed based on data, not fear or greed. The OS enforces your rules.",
    icon: Brain,
    color: "text-omega-purple",
    bgColor: "bg-omega-purple/10",
    borderColor: "border-omega-purple/20",
  },
  {
    title: "Asymmetric Bets",
    description: "Identify high-conviction opportunities with skewed risk/reward ratios. Protect the downside, uncapped upside.",
    icon: Target,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
];

export function MethodologySection() {
  return (
    <section id="methodology" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <LineChart className="w-4 h-4 text-zinc-400" />
              <span className="text-xs font-mono font-medium text-zinc-400 tracking-tight">
                STRATEGIC DOCTRINE
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white font-sans leading-tight">
              Engineered for the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-omega-green to-emerald-400">
                Liquidity Supercycle.
              </span>
            </h2>

            <p className="text-xl text-zinc-400 leading-relaxed font-sans">
              Most investors react. <span className="text-white font-medium">Accumulators anticipate.</span>
              OMEGA provides the framework to execute a disciplined accumulation strategy tailored to the 2026-2030 macro horizon.
            </p>

            <div className="space-y-6">
              {principles.map((item, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${item.bgColor} border ${item.borderColor} flex items-center justify-center mt-1 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 font-sans">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed font-sans">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Visual/Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-omega-green/20 to-omega-purple/20 rounded-2xl blur-xl opacity-20" />
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 backdrop-blur-sm">
              <div className="space-y-6 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <span className="text-zinc-500">CYCLE_PHASE</span>
                  <span className="text-omega-green font-bold">ACCUMULATION</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <span className="text-zinc-500">LIQUIDITY_INDEX</span>
                  <span className="text-white">RISING (M2 YOY &gt; 5%)</span>
                </div>
                <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
                  <span className="text-zinc-500">RISK_MODE</span>
                  <span className="text-omega-purple font-bold">ASYMMETRIC_ON</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-zinc-500">NEXT_HALVING</span>
                  <span className="text-white">
                    {Math.ceil((new Date("2028-04-17").getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} DAYS
                  </span>
                </div>
              </div>

              <div className="mt-8 p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-zinc-400 uppercase tracking-wider">Live Signal</span>
                </div>
                <p className="text-zinc-300 font-mono text-xs leading-relaxed">
                  &gt; DETECTED: GLOBAL LIQUIDITY INJECTION<br />
                  &gt; ACTION: INCREASE EXPOSURE TO HARD ASSETS<br />
                  &gt; CONFIDENCE: 87.4%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

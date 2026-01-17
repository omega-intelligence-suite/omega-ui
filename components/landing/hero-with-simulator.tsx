"use client";

import { useState } from "react";
import { TrendingUp, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

import { colors } from "@/config";

export function HeroWithSimulator() {
  const [targetGoal, setTargetGoal] = useState(1000000); // 1M€
  const [horizon, setHorizon] = useState(2035);

  // Calculate projection data
  const currentYear = 2026;
  const years = horizon - currentYear + 1;
  const currentNetWorth = 100000; // Starting point

  const generateProjection = () => {
    const data = [];
    const yearlyGrowthRate = Math.pow(targetGoal / currentNetWorth, 1 / years) - 1;

    for (let i = 0; i <= years; i++) {
      const year = currentYear + i;
      const value = currentNetWorth * Math.pow(1 + yearlyGrowthRate, i);
      data.push({
        year: year.toString(),
        value: Math.round(value),
        target: i === years ? targetGoal : null,
      });
    }
    return data;
  };

  const projectionData = generateProjection();
  const requiredGrowth = ((targetGoal / currentNetWorth - 1) / years * 100).toFixed(1);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-20 pb-12 bg-zinc-950">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-omega-green/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-omega-purple/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-omega-green/20 bg-omega-green/5 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-omega-green animate-pulse" />
              <span className="text-xs font-mono font-medium text-omega-green tracking-tight">
                SYSTEM STATUS: ONLINE
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-tight text-white font-sans">
                Stop Tracking.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-omega-green to-emerald-400">
                  Start Architecting.
                </span>
              </h1>
              <p className="text-xl text-zinc-400 leading-relaxed font-sans max-w-lg">
                The sovereign wealth operating system for <span className="text-white font-medium">The Accumulators</span>.
                Target €1M+ by 2035 with mathematical precision.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/app/overview"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-omega-green text-zinc-950 font-bold text-lg overflow-hidden transition-all hover:bg-emerald-400"
              >
                <Terminal className="w-5 h-5" />
                <span className="relative z-10">Deploy Your OS</span>
              </Link>

              <Link
                href="#methodology"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm font-medium text-lg text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white hover:border-zinc-700"
              >
                View Methodology
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-500 font-mono">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                Self-Hosted
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                Private by Design
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
                Docker Ready
              </div>
            </div>
          </div>

          {/* Right: Interactive Simulator */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-omega-green/20 to-omega-purple/20 rounded-2xl blur opacity-30" />
            <div className="relative rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1 tracking-tight font-sans">Trajectory Planner</h3>
                  <p className="text-xs text-zinc-400 font-mono">ESTIMATED NET WORTH VELOCITY</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-omega-green font-mono tracking-tight">
                    {(targetGoal / 1000000).toFixed(1)}M€
                  </div>
                  <div className="text-xs text-zinc-500 font-mono">TARGET GOAL</div>
                </div>
              </div>

              {/* Chart */}
              <div className="h-64 mb-8">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis
                      dataKey="year"
                      stroke="#52525b"
                      style={{ fontSize: "10px", fontFamily: "var(--font-geist-mono)" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#52525b"
                      style={{ fontSize: "10px", fontFamily: "var(--font-geist-mono)" }}
                      tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#18181b",
                        border: "1px solid #27272a",
                        borderRadius: "4px",
                        color: "#f4f4f5",
                        fontFamily: "var(--font-geist-mono)",
                        fontSize: "12px"
                      }}
                      formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M€`, "Net Worth"]}
                      labelStyle={{ color: "#a1a1aa" }}
                    />
                    <ReferenceLine y={targetGoal} stroke={colors.primary.green} strokeDasharray="3 3" opacity={0.5} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={colors.primary.green}
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 4, fill: colors.primary.green }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Sliders */}
              <div className="space-y-6">
                {/* Target Goal Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <label className="text-zinc-400">TARGET CAPITAL</label>
                    <span className="text-white">{(targetGoal / 1000000).toFixed(1)}M€</span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="5000000"
                    step="100000"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-omega-green hover:accent-emerald-400"
                  />
                </div>

                {/* Horizon Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <label className="text-zinc-400">TARGET YEAR</label>
                    <span className="text-white">{horizon}</span>
                  </div>
                  <input
                    type="range"
                    min="2028"
                    max="2040"
                    step="1"
                    value={horizon}
                    onChange={(e) => setHorizon(Number(e.target.value))}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-omega-purple hover:accent-purple-400"
                  />
                </div>
              </div>

              {/* Stats Footer */}
              <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                <div className="text-xs text-zinc-500 font-mono">
                  REQUIRED CAGR
                </div>
                <div className="text-lg font-bold text-white font-mono">
                  {requiredGrowth}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


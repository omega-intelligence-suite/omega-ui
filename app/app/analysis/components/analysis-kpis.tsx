"use client"

import { TrendingUp, Target } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { colors } from "@/config/colors";

interface AnalysisKPIsProps {
  netWorthVelocity: number
  distanceToGoal: number
  currentValue: number
  currentValueUsd: number
}

export function AnalysisKPIs({ netWorthVelocity, distanceToGoal, currentValue, currentValueUsd }: AnalysisKPIsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Current Net Worth */}
      <Card
        className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
        style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.card.border }}
              >
                <TrendingUp className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs font-mono text-slate-400 uppercase">Current Net Worth</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-semibold text-white">
                €{currentValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </span>
              <span className="text-sm font-mono text-slate-400">
                (${currentValueUsd.toLocaleString("en-US", { maximumFractionDigits: 0 })})
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500">Total Portfolio Value</p>
          </div>
        </CardContent>
      </Card>

      {/* Net Worth Velocity */}
      <Card
        className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
        style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.card.border }}
              >
                <TrendingUp
                  className="w-4 h-4"
                  style={{ color: netWorthVelocity >= 0 ? colors.primary.green : colors.primary.red }}
                />
              </div>
              <p className="text-xs font-mono text-slate-400 uppercase">Net Worth Velocity</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span
                className="text-2xl font-mono font-semibold"
                style={{ color: netWorthVelocity >= 0 ? colors.primary.green : colors.primary.red }}
              >
                {netWorthVelocity >= 0 ? "+" : ""}€{netWorthVelocity.toLocaleString("en-US", { maximumFractionDigits: 0 })}
              </span>
              <span className="text-xs font-mono text-slate-500">/month</span>
            </div>
            <p className="text-xs font-mono text-slate-500">Average Monthly Gain</p>
          </div>
        </CardContent>
      </Card>

      {/* Distance to Goal */}
      <Card
        className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
        style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{ backgroundColor: colors.card.border }}
              >
                <Target className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-xs font-mono text-slate-400 uppercase">Distance to Goal</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-semibold text-white">
                {distanceToGoal.toFixed(1)}%
              </span>
            </div>
            <p className="text-xs font-mono text-slate-500">of 1M€ Target (2035)</p>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min(distanceToGoal, 100)}%`,
                backgroundColor: colors.primary.green
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

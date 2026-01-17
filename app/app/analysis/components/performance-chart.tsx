"use client";

import { PortfolioLineChart } from "@/components/ui/line-chart";
import { TrendingUp } from "lucide-react";

import { colors } from "@/config";

import type { PortfolioSnapshot } from "@/types/models";

interface PerformanceChartProps {
  snapshots: PortfolioSnapshot[]
}

export function PerformanceChart({ snapshots }: PerformanceChartProps) {
  const chartData = snapshots.map(snap => ({
    date: new Date(snap.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    value: snap.total_value_eur
  }))

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded border"
          style={{
            backgroundColor: colors.background.main_0_85,
            borderColor: colors.card.border
          }}
        >
          <p className="text-xs font-mono text-slate-300">{payload[0].payload.date}</p>
          <p className="text-sm font-mono text-white font-semibold">
            €{payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <PortfolioLineChart
      title="Performance Historique"
      icon={TrendingUp}
      iconColor={colors.charts.green}
      data={chartData}
      lines={[
        { dataKey: "value", stroke: colors.charts.green }
      ]}
      xAxisKey="date"
      yAxisFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
      customTooltip={CustomTooltip}
    />
  )
}

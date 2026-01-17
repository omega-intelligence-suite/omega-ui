"use client";

import { Target } from "lucide-react";

import { PortfolioLineChart } from "@/components/ui/line-chart";

import { colors } from "@/config/colors";

import type { PortfolioSnapshot } from "@/types/models";

interface Target2035ChartProps {
  snapshots: PortfolioSnapshot[]
}

export function Target2035Chart({ snapshots }: Target2035ChartProps) {
  // Calculate theoretical progression to 1M€ in 2035
  const targetYear = 2035
  const targetAmount = 1000000

  const generateTheoreticalProgression = () => {
    if (snapshots.length === 0) return []

    const startValue = snapshots[0].total_value_eur
    const startDate = new Date(snapshots[0].created_at)
    const endDate = new Date(targetYear, 11, 31) // Dec 31, 2035

    // Calculate required growth rate
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    const growthRate = Math.pow(targetAmount / startValue, 1 / totalDays)

    const theoretical: any[] = []

    snapshots.forEach((snap, index) => {
      const snapDate = new Date(snap.created_at)
      const daysSinceStart = (snapDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      const theoreticalValue = startValue * Math.pow(growthRate, daysSinceStart)

      theoretical.push({
        date: snapDate.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        actual: snap.total_value_eur,
        theoretical: theoreticalValue
      })
    })

    return theoretical
  }

  const chartData = generateTheoreticalProgression()

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded border"
          style={{
            backgroundColor: colors.card.background,
            borderColor: colors.card.border
          }}
        >
          <p className="text-xs font-mono text-slate-300 mb-1">{payload[0].payload.date}</p>
          <p className="text-xs font-mono" style={{ color: colors.primary.green }}>
            Actual: €{payload[0].value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs font-mono" style={{ color: colors.primary.orange }}>
            Target: €{payload[1].value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <PortfolioLineChart
      title="Target 2035 Progression"
      subtitle="Actual vs Theoretical Path to 1M€"
      icon={Target}
      iconColor={colors.charts.purple}
      data={chartData}
      lines={[
        { dataKey: "actual", stroke: colors.primary.green, name: "Actual Value" },
        { dataKey: "theoretical", stroke: colors.primary.orange, name: "Target Path", strokeWidth: 2 }
      ]}
      xAxisKey="date"
      yAxisFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
      customTooltip={CustomTooltip}
      showLegend={true}
      height={350}
    />
  )
}

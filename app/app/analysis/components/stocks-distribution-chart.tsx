"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { PieChart as PieChartIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { colors } from "@/config";

import type { PortfolioAssetSnapshot } from "@/types/models";

interface StocksDistributionChartProps {
  assetSnapshots: PortfolioAssetSnapshot[]
}

export function StocksDistributionChart({ assetSnapshots }: StocksDistributionChartProps) {
  // Get latest snapshot stock assets
  const latestSnapshotId = assetSnapshots.length > 0
    ? assetSnapshots[assetSnapshots.length - 1].snapshot_id
    : null

  const latestStockAssets = assetSnapshots.filter(
    asset => asset.snapshot_id === latestSnapshotId && asset.asset_type?.toUpperCase() === "STOCKS_ETFS"
  )

  // Group by major categories or individual stocks
  const distribution: { [key: string]: number } = {}

  latestStockAssets.forEach(asset => {
    const name = asset.name
    const value = asset.value_usd || 0

    // Group by symbol or ticker
    distribution[name] = (distribution[name] || 0) + value
  })

  const chartData = Object.entries(distribution)
    .map(([name, value]) => ({
      name,
      value
    }))
    .sort((a, b) => b.value - a.value) // Sort by value descending

  // Color palette for stocks
  const STOCK_COLORS = [
    "rgb(59, 130, 246)",    // Blue
    "rgb(16, 185, 129)",    // Green
    "rgb(251, 146, 60)",    // Orange
    "rgb(168, 85, 247)",    // Purple
    "rgb(236, 72, 153)",    // Pink
    "rgb(234, 179, 8)",     // Yellow
    "rgb(20, 184, 166)",    // Teal
    "rgb(239, 68, 68)",     // Red
    "rgb(148, 163, 184)",   // Slate
    "rgb(14, 165, 233)",    // Sky
  ]

  const getColor = (index: number) => {
    return STOCK_COLORS[index % STOCK_COLORS.length]
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const total = chartData.reduce((sum, item) => sum + item.value, 0)
      const percentage = (payload[0].value / total) * 100

      return (
        <div
          className="px-3 py-2 rounded border"
          style={{
            backgroundColor: colors.background.main_0_85,
            borderColor: colors.card.border
          }}
        >
          <p className="text-xs font-mono text-slate-300 mb-1">{payload[0].name}</p>
          <p className="text-sm font-mono text-white font-semibold">
            ${payload[0].value.toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </p>
          <p className="text-xs font-mono text-slate-400">
            {percentage.toFixed(1)}%
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card
      className="bg-slate-900/50 border-white/10 relative overflow-hidden hover:border-white/20 transition-all"
      style={{ backgroundColor: colors.background.main_0_85, borderColor: colors.card.border }}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
          >
            <PieChartIcon className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-mono text-slate-300 uppercase">Asset Distribution</h3>
            <p className="text-xs font-mono text-slate-500">Stocks portfolio breakdown</p>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm font-mono text-slate-500">No data available</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-8">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(index)} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto">
              {chartData.map((entry, index) => {
                const total = chartData.reduce((sum, item) => sum + item.value, 0)
                const percentage = (entry.value / total) * 100

                return (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getColor(index) }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-mono text-slate-300 truncate">{entry.name}</p>
                      <p className="text-xs font-mono text-slate-500">
                        ${entry.value.toLocaleString("en-US", { maximumFractionDigits: 0 })} ({percentage.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

"use client";

import { PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { Card, CardContent } from "@/components/ui/card";

import { colors } from "@/config";

import { AssetType } from "@/types/enum";
import type { PortfolioAssetSnapshot } from "@/types/models";

interface DistributionChartProps {
  assetSnapshots: PortfolioAssetSnapshot[]
}

export function DistributionChart({ assetSnapshots }: DistributionChartProps) {
  // Get latest snapshot crypto assets
  const latestSnapshotId = assetSnapshots.length > 0
    ? assetSnapshots[assetSnapshots.length - 1].snapshot_id
    : null

  const latestCryptoAssets = assetSnapshots.filter(
    asset => asset.snapshot_id === latestSnapshotId && asset.asset_type?.toUpperCase() === AssetType.Crypto
  )

  // Group by major categories
  const distribution: { [key: string]: number } = {}

  latestCryptoAssets.forEach(asset => {
    const symbol = asset.symbol.toUpperCase()
    const value = asset.value_usd || 0

    if (symbol.includes("BTC") || symbol === "BITCOIN") {
      distribution["BTC"] = (distribution["BTC"] || 0) + value
    } else if (symbol.includes("ETH") || symbol === "ETHEREUM") {
      distribution["ETH"] = (distribution["ETH"] || 0) + value
    } else if (symbol.includes("USDT") || symbol.includes("USDC") || symbol.includes("DAI") || symbol.includes("BUSD")) {
      distribution["Stablecoins"] = (distribution["Stablecoins"] || 0) + value
    } else {
      distribution["Altcoins"] = (distribution["Altcoins"] || 0) + value
    }
  })

  const chartData = Object.entries(distribution).map(([name, value]) => ({
    name,
    value
  }))

  const COLORS = {
    "BTC": colors.charts.orange,
    "ETH": colors.charts.blue,
    "Stablecoins": colors.charts.green,
    "Altcoins": colors.charts.purple
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
      style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <div
            className="w-8 h-8 rounded flex items-center justify-center"
            style={{ backgroundColor: colors.card.border }}
          >
            <PieChartIcon className="w-4 h-4 text-green-400" />
          </div>
          <div>
            <h3 className="text-sm font-mono text-slate-300 uppercase">Asset Distribution</h3>
            <p className="text-xs font-mono text-slate-500">Crypto portfolio breakdown</p>
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
                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS] || "rgb(148, 163, 184)"} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            {/* Custom Legend */}
            <div className="flex flex-col gap-3">
              {chartData.map((entry, index) => {
                const total = chartData.reduce((sum, item) => sum + item.value, 0)
                const percentage = (entry.value / total) * 100

                return (
                  <div key={index} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] || "rgb(148, 163, 184)" }}
                    />
                    <div className="flex-1">
                      <p className="text-xs font-mono text-slate-300">{entry.name}</p>
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

"use client";

import { TrendingUp } from "lucide-react";

import { PortfolioLineChart } from "@/components/ui/line-chart";

import { AssetType } from "@/types/enum";
import { colors } from "@/config/colors";

import type { PortfolioSnapshot, PortfolioAssetSnapshot } from "@/types/models";

interface StocksValueChartProps {
  snapshots: PortfolioSnapshot[]
  assetSnapshots: PortfolioAssetSnapshot[]
}

export function StocksValueChart({ snapshots, assetSnapshots }: StocksValueChartProps) {
  // Calculate stocks value in EUR for each snapshot
  const chartData = snapshots.map(snap => {
    // Get all stock/ETF assets for this snapshot
    const stockAssets = assetSnapshots.filter(
      asset => asset.snapshot_id === snap.id && asset.asset_type?.toUpperCase() === AssetType.Stocks_Etfs
    )

    const totalStocksEUR = stockAssets.reduce((sum, asset) => sum + (asset.value_eur || 0), 0)

    return {
      date: new Date(snap.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      value: totalStocksEUR
    }
  })

  // Calculate performance metrics
  const firstValue = chartData.length > 0 ? chartData[0].value : 0
  const latestValue = chartData.length > 0 ? chartData[chartData.length - 1].value : 0
  const performance = firstValue > 0 ? ((latestValue - firstValue) / firstValue) * 100 : 0

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

  const headerContent = (
    <div className="text-right">
      <p className="text-xs font-mono text-slate-500 mb-1">Performance</p>
      <p
        className="text-lg font-mono font-semibold"
        style={{ color: performance >= 0 ? colors.primary.green : colors.primary.red }}
      >
        {performance >= 0 ? "+" : ""}{performance.toFixed(2)}%
      </p>
    </div>
  )

  return (
    <div>
      <PortfolioLineChart
        title="Stocks & ETFs Portfolio (EUR)"
        subtitle="Total equity holdings"
        icon={TrendingUp}
        iconColor={colors.charts.purple}
        data={chartData}
        lines={[
          { dataKey: "value", stroke: colors.charts.purple }
        ]}
        xAxisKey="date"
        yAxisFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
        customTooltip={CustomTooltip}
        headerContent={headerContent}
      />

      {/* Reference Index Note */}
      {chartData.length > 0 && (
        <div className="mt-4 p-3 rounded" style={{ backgroundColor: colors.card.background }}>
          <p className="text-xs font-mono text-slate-400">
            📊 Note: For benchmark comparison with MSCI World or S&P 500, historical index data would be needed. Current view shows portfolio absolute performance.
          </p>
        </div>
      )}
    </div>
  )
}

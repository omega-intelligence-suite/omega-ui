"use client"

import { Activity } from "lucide-react";
import { PortfolioLineChart } from "@/components/ui/line-chart";

import { colors } from "@/config/colors";

import type { PortfolioSnapshot, PortfolioAssetSnapshot } from "@/types/models";

interface AlphaBTCChartProps {
  snapshots: PortfolioSnapshot[]
  assetSnapshots: PortfolioAssetSnapshot[]
}

export function AlphaBTCChart({ snapshots, assetSnapshots }: AlphaBTCChartProps) {
  // Calculate performance comparison: Portfolio vs BTC
  const chartData = snapshots.map((snap, index) => {
    if (index === 0) {
      return {
        date: new Date(snap.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        portfolio: 0,
        btc: 0
      }
    }

    const firstSnapshot = snapshots[0]

    // Get crypto assets for current and first snapshot
    // Note: asset_type values can be "CRYPTO", "crypto", or variations
    const currentCryptoAssets = assetSnapshots.filter(
      asset => asset.snapshot_id === snap.id && asset.asset_type?.toUpperCase() === "CRYPTO"
    )
    const firstCryptoAssets = assetSnapshots.filter(
      asset => asset.snapshot_id === firstSnapshot.id && asset.asset_type?.toUpperCase() === "CRYPTO"
    )

    const currentValue = currentCryptoAssets.reduce((sum, asset) => sum + (asset.value_usd || 0), 0)
    const firstValue = firstCryptoAssets.reduce((sum, asset) => sum + (asset.value_usd || 0), 0)
    // Portfolio performance %
    const portfolioPerf = firstValue > 0 ? ((currentValue - firstValue) / firstValue) * 100 : 0

    // BTC performance % (using btc_price_usd from snapshot)
    const currentBTCPrice = snap.btc_price_usd || 0
    const firstBTCPrice = firstSnapshot.btc_price_usd || 1
    const btcPerf = ((currentBTCPrice - firstBTCPrice) / firstBTCPrice) * 100

    return {
      date: new Date(snap.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      portfolio: portfolioPerf,
      btc: btcPerf
    }
  })

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
          <p className="text-xs font-mono" style={{ color: colors.charts.green }}>
            Portfolio: {payload[0].value >= 0 ? "+" : ""}{payload[0].value.toFixed(2)}%
          </p>
          <p className="text-xs font-mono" style={{ color: colors.charts.orange }}>
            BTC: {payload[1].value >= 0 ? "+" : ""}{payload[1].value.toFixed(2)}%
          </p>
        </div>
      )
    }
    return null
  }

  const latestData = chartData[chartData.length - 1]
  const alpha = latestData ? latestData.portfolio - latestData.btc : 0

  const headerContent = (
    <div className="text-right">
      <p className="text-xs font-mono text-slate-500 mb-1">Current Alpha</p>
      <p
        className="text-lg font-mono font-semibold"
        style={{ color: alpha >= 0 ? colors.primary.green : colors.primary.red }}
      >
        {alpha >= 0 ? "+" : ""}{alpha.toFixed(2)}%
      </p>
    </div>
  )

  return (
    <PortfolioLineChart
      title="Alpha vs BTC"
      subtitle="Performance comparison"
      icon={Activity}
      iconColor={colors.charts.purple}
      data={chartData}
      lines={[
        { dataKey: "portfolio", stroke: colors.primary.green, name: "Portfolio" },
        { dataKey: "btc", stroke: colors.primary.orange, name: "Bitcoin" }
      ]}
      xAxisKey="date"
      yAxisFormatter={(value) => `${value.toFixed(0)}%`}
      customTooltip={CustomTooltip}
      headerContent={headerContent}
      showLegend={true}
    />
  )
}

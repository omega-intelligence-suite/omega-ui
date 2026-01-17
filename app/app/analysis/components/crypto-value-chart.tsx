'use client'

import { PortfolioLineChart } from '@/components/ui/line-chart'
import { DollarSign } from 'lucide-react'
import type { PortfolioSnapshot, PortfolioAssetSnapshot } from '@/types/models'

interface CryptoValueChartProps {
  snapshots: PortfolioSnapshot[]
  assetSnapshots: PortfolioAssetSnapshot[]
}

export function CryptoValueChart({ snapshots, assetSnapshots }: CryptoValueChartProps) {
  // Calculate crypto value in USD for each snapshot
  const chartData = snapshots.map(snap => {
    // Get all crypto assets for this snapshot
    const cryptoAssets = assetSnapshots.filter(
      asset => asset.snapshot_id === snap.id && asset.asset_type?.toUpperCase() === 'CRYPTO'
    )

    const totalCryptoUSD = cryptoAssets.reduce((sum, asset) => sum + (asset.value_usd || 0), 0)

    return {
      date: new Date(snap.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: totalCryptoUSD
    }
  })

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded border"
          style={{
            backgroundColor: "rgba(12, 14, 18, 0.85)",
            borderColor: "rgba(43, 48, 59, 0.5)"
          }}
        >
          <p className="text-xs font-mono text-slate-300">{payload[0].payload.date}</p>
          <p className="text-sm font-mono text-white font-semibold">
            ${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <PortfolioLineChart
      title="Crypto Portfolio Value (USD)"
      subtitle="Total cryptocurrency holdings"
      icon={DollarSign}
      iconColor="rgb(59, 130, 246)"
      data={chartData}
      lines={[
        { dataKey: 'value', stroke: 'rgb(59, 130, 246)' }
      ]}
      xAxisKey="date"
      yAxisFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
      customTooltip={CustomTooltip}
    />
  )
}

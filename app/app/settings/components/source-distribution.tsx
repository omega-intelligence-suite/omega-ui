'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SourceDistributionProps {
  sourceDistribution: Array<{
    source_name: string
    count: number
    last_24h_count: number
    avg_daily: number
  }>
}

const getSourceLabel = (sourceName: string): string => {
  const mapping: Record<string, string> = {
    'finnhub': 'Finnhub (Macro)',
    'finnhub_crypto': 'Finnhub (Crypto)',
    'gnews': 'Google News',
    'cryptopanic': 'CryptoPanic',
  }
  return mapping[sourceName.toLowerCase()] || sourceName
}

const getHealthPercentage = (last24h: number, avgDaily: number): { percentage: number; color: string } => {
  if (avgDaily === 0) return { percentage: 0, color: 'text-slate-400' }

  const percentage = (last24h / avgDaily) * 100

  if (percentage >= 80) {
    return { percentage, color: 'text-emerald-400' }
  } else if (percentage >= 50) {
    return { percentage, color: 'text-yellow-400' }
  } else {
    return { percentage, color: 'text-red-400' }
  }
}

export function SourceDistribution({ sourceDistribution }: SourceDistributionProps) {
  if (sourceDistribution.length === 0) {
    return null
  }

  return (
    <div className='flex flex-col space-y-4'>
      <h3 className="text-sm font-mono text-slate-400 uppercase">News flow by source</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sourceDistribution.map((source) => {
          const health = getHealthPercentage(source.last_24h_count, source.avg_daily)

          return (
            <Card key={source.source_name} className="bg-slate-900 border-slate-800" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{getSourceLabel(source.source_name)}</p>
                    <p className="text-xs text-slate-500 font-mono mt-1">
                      {source.count.toLocaleString()} total
                    </p>
                  </div>
                  <div
                    style={{
                      border: "1px solid red", borderRadius: "4px", padding: "2px 6px 1px 6px",
                      borderColor: "gray",
                      backgroundColor: "rgba(128, 128, 128, 0.1)",
                    }}
                  >
                    <p className='font-mono text-[10px] text-slate-400 uppercase'>{source.source_name}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-slate-400 font-mono mb-1">Last 24h</p>
                    <p className="text-lg font-bold text-slate-200 font-mono">
                      {source.last_24h_count}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-mono mb-1">Health</p>
                    <p className={`text-lg font-bold font-mono ${health.color}`}>
                      {Math.round(health.percentage)}%
                    </p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      health.percentage >= 80 ? 'bg-emerald-500' :
                      health.percentage >= 50 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(health.percentage, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

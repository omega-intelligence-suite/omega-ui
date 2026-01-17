'use client'

import { Card, CardContent } from '@/components/ui/card'
// import { NewsStats } from '../page'

interface MonitoringKPIsProps {
  newsStats: NewsStats | null
}

interface NewsStats {
  totalCount: number
  lastNewsDate: string | null
  sourceDistribution: Array<{
    source_name: string
    count: number
    last_24h_count: number
    avg_daily: number
  }>
}

function getTimeSince(date: string | null): string {
  if (!date) return 'N/A'

  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} min ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

function getFlowStatus(date: string | null): { status: string; color: string } {
  if (!date) return { status: 'UNKNOWN', color: 'text-slate-400' }

  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < 60) {
    return { status: 'ONLINE', color: 'rgb(20, 235, 163)' }
  } else if (diffMins < 180) {
    return { status: 'DEGRADED', color: 'rgb(235, 188, 20)' }
  } else {
    return { status: 'OFFLINE', color: 'rgb(220, 40, 40)' }
  }
}

export function MonitoringKPIs({ newsStats }: MonitoringKPIsProps) {
  if (!newsStats) {
    return null
  }

  const timeSince = getTimeSince(newsStats.lastNewsDate)
  const flowStatus = getFlowStatus(newsStats.lastNewsDate)

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-sm font-mono text-slate-400 uppercase">News global flow</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Volume */}
        <Card className="bg-slate-900 border-slate-800" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-400 uppercase">Total Volume</p>
              <p className="text-3xl font-bold text-white font-mono">
                {newsStats.totalCount.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 font-mono">news signals in database</p>
            </div>
          </CardContent>
        </Card>

        {/* Freshness */}
        <Card className="bg-slate-900 border-slate-800" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-400 uppercase">Freshness</p>
              <p className={`text-2xl font-bold font-mono`} style={{ color: newsStats.lastNewsDate && (new Date().getTime() - new Date(newsStats.lastNewsDate).getTime()) > 21600000 ? 'rgb(220, 40, 40)' : 'rgb(20, 235, 163)' }}>
                {timeSince}
              </p>
              <p className="text-xs text-slate-500 font-mono">since last news signal</p>
            </div>
          </CardContent>
        </Card>

        {/* Flow Status */}
        <Card className="bg-slate-900 border-slate-800" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-xs font-mono text-slate-400 uppercase">Flow Status</p>
              <p className={`text-2xl font-bold font-mono`} style={{ color: flowStatus.color }}>
                {flowStatus.status}
              </p>
              <p className="text-xs text-slate-500 font-mono">
                {flowStatus.status === 'ONLINE' ? 'All systems operational' :
                flowStatus.status === 'DEGRADED' ? 'Delayed ingestion detected' :
                'No recent data received'}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

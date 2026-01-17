'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Database, Layers, Clock, AlertTriangle } from 'lucide-react'
import type { PortfolioSnapshot } from '@/types/models'

interface SyncLog {
  timestamp: string
  event: string
  status: 'success' | 'warning' | 'error'
}

interface PortfolioMonitoringProps {
  lastSnapshot: PortfolioSnapshot | null
  totalSnapshots: number
  assetsTracked: number
  recentLogs: SyncLog[]
}

export function PortfolioMonitoring({
  lastSnapshot,
  totalSnapshots,
  assetsTracked,
  recentLogs
}: PortfolioMonitoringProps) {

  const getTimeSinceLastSnapshot = () => {
    if (!lastSnapshot) return { hours: 999, isStale: true }
    const now = new Date()
    const lastSync = new Date(lastSnapshot.created_at)
    const hours = (now.getTime() - lastSync.getTime()) / (1000 * 60 * 60)
    return { hours, isStale: hours > 24 }
  }

  const { hours: hoursSinceSync, isStale } = getTimeSinceLastSnapshot()

  const getStatusColor = () => {
    if (!lastSnapshot) return 'rgb(239, 68, 68)' // red - DOWN
    if (hoursSinceSync < 24) return 'rgb(20, 235, 163)' // green - ACTIVE
    if (hoursSinceSync < 48) return 'rgb(251, 146, 60)' // orange - STALE
    return 'rgb(239, 68, 68)' // red - DOWN
  }

  const getStatusLabel = () => {
    if (!lastSnapshot) return 'NO DATA'
    if (hoursSinceSync < 24) return 'SYNCED'
    if (hoursSinceSync < 48) return 'STALE'
    return 'CRITICAL'
  }

  const formatLastSync = () => {
    if (!lastSnapshot) return 'Never'
    const date = new Date(lastSnapshot.created_at)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffHours < 1) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ${diffMinutes}m ago`
    const diffDays = Math.floor(diffHours / 24)
    return `${diffDays}d ${diffHours % 24}h ago`
  }

  const getLogStatusColor = (status: 'success' | 'warning' | 'error') => {
    switch (status) {
      case 'success':
        return 'rgb(20, 235, 163)'
      case 'warning':
        return 'rgb(251, 146, 60)'
      case 'error':
        return 'rgb(239, 68, 68)'
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider">Portfolio Snapshots</h3>
        {isStale && (
          <div className="flex items-center gap-2 px-3 py-1 rounded border border-orange-500/30 bg-orange-500/10">
            <AlertTriangle className="w-3 h-3 text-orange-400" />
            <span className="text-xs font-mono text-orange-400">DATA STALE ({Math.floor(hoursSinceSync)}h)</span>
          </div>
        )}
      </div>

      {/* Sync Status Banner */}
      <Card
        className="bg-slate-900/50 border-white/10 relative overflow-hidden hover:border-white/20 transition-all"
        style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded flex items-center justify-center"
                style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
              >
                <Database className="w-6 h-6" style={{ color: getStatusColor() }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-lg font-mono font-semibold uppercase"
                    style={{ color: getStatusColor() }}
                  >
                    {getStatusLabel()}
                  </span>
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: getStatusColor() }}
                  />
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Last snapshot: {formatLastSync()}
                </p>
              </div>
            </div>

            {lastSnapshot && (
              <div className="text-right">
                <p className="text-xs font-mono text-slate-500 mb-1">Total Portfolio Value</p>
                <p className="text-xl font-mono text-white">
                  €{lastSnapshot.total_value_eur.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs font-mono text-slate-400">
                  ${(lastSnapshot.total_value_eur / lastSnapshot.usd_eur_rate).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Data Integrity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Global Snapshots */}
        <Card
          className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
          style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
                >
                  <Database className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase">Global Snapshots</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-semibold text-white">
                  {totalSnapshots.toLocaleString()}
                </span>
                <span className="text-xs font-mono text-slate-500">records</span>
              </div>
              {lastSnapshot && (
                <p className="text-xs font-mono text-slate-500">
                  Latest: {new Date(lastSnapshot.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assets Tracked */}
        <Card
          className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all"
          style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
                >
                  <Layers className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase">Assets Tracked</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-mono font-semibold text-white">
                  {assetsTracked}
                </span>
                <span className="text-xs font-mono text-slate-500">assets</span>
              </div>
              <p className="text-xs font-mono text-slate-500">
                Last snapshot cycle
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Execution Journal (Mini-Logs) */}
      <Card
        className="bg-slate-900/50 border-white/10 relative overflow-hidden hover:border-white/20 transition-all"
        style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
            >
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <h4 className="text-xs font-mono text-slate-400 uppercase">Recent Sync Events</h4>
          </div>

          <div className="space-y-2">
            {recentLogs.length === 0 ? (
              <p className="text-xs font-mono text-slate-500 text-center py-4">No recent events</p>
            ) : (
              recentLogs.map((log, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 py-2 px-3 rounded hover:bg-white/5 transition-colors"
                  style={{ backgroundColor: "rgba(43, 48, 59, 0.3)" }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getLogStatusColor(log.status) }}
                  />
                  <span className="text-xs font-mono text-slate-500">
                    {log.timestamp}
                  </span>
                  <span className="text-xs font-mono text-slate-300 flex-1">
                    {log.event}
                  </span>
                  <span
                    className="text-xs font-mono uppercase flex-shrink-0"
                    style={{ color: getLogStatusColor(log.status) }}
                  >
                    {log.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

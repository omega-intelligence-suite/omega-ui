'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Activity, Wallet } from 'lucide-react'

interface SystemHealthProps {
  globalPricePulse: {
    status: 'ACTIVE' | 'STALE' | 'DOWN'
    lastSync: string | null
    minutesAgo: number
    threshold: {
      greenMinutes: number
      orangeMinutes: number
    }
  }
  walletConnection: {
    status: 'ACTIVE' | 'STALE' | 'DOWN'
    lastSync: string | null
    minutesAgo: number
    threshold: {
      greenMinutes: number
      orangeMinutes: number
    }
  }
  reliabilityScore: number
}

export function SystemHealthMonitoring({ globalPricePulse, walletConnection, reliabilityScore }: SystemHealthProps) {
  const getStatusColor = (status: 'ACTIVE' | 'STALE' | 'DOWN') => {
    switch (status) {
      case 'ACTIVE':
        return 'rgb(20, 235, 163)'
      case 'STALE':
        return 'rgb(251, 146, 60)'
      case 'DOWN':
        return 'rgb(239, 68, 68)'
    }
  }

  const formatTime = (minutesAgo: number) => {
    if (minutesAgo < 1) return 'Just now'
    if (minutesAgo < 60) return `${Math.floor(minutesAgo)}m ago`
    const hours = Math.floor(minutesAgo / 60)
    return `${hours}h ${Math.floor(minutesAgo % 60)}m ago`
  }

  return (
    <section className="space-y-4">
      <h3 className="text-sm font-mono text-slate-400 uppercase tracking-wider">System Health & Sync</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Global Price Pulse */}
        <Card 
          className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all" 
          style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
                >
                  <Activity className="w-4 h-4" style={{ color: getStatusColor(globalPricePulse.status) }} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase">Price Pulse</p>
                </div>
              </div>
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: getStatusColor(globalPricePulse.status) }}
              />
            </div>

            <div className="space-y-2 flex flex-col justify-between">
              <div className="flex items-baseline gap-2">
                <span 
                  className="text-2xl font-mono font-semibold"
                  style={{ color: getStatusColor(globalPricePulse.status) }}
                >
                  {globalPricePulse.status}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500">
                Last sync {formatTime(globalPricePulse.minutesAgo)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Wallet Connection Status */}
        <Card 
          className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all" 
          style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded flex items-center justify-center"
                  style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
                >
                  <Wallet className="w-4 h-4" style={{ color: getStatusColor(walletConnection.status) }} />
                </div>
                <div>
                  <p className="text-xs font-mono text-slate-400 uppercase">Wallet Sync</p>
                </div>
              </div>
              <div 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: getStatusColor(walletConnection.status) }}
              />
            </div>

            <div className="space-y-2 flex flex-col justify-between">
              <div className="flex items-baseline gap-2">
                <span 
                  className="text-2xl font-mono font-semibold"
                  style={{ color: getStatusColor(walletConnection.status) }}
                >
                  {walletConnection.status}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500">
                Last sync {formatTime(walletConnection.minutesAgo)}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Sync Reliability Score */}
        <Card 
          className="bg-slate-900/50 border-white/10 relative overflow-hidden group hover:border-white/20 transition-all" 
          style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase">Reliability</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-baseline gap-2">
                <span 
                  className="text-3xl font-mono font-semibold"
                  style={{ color: reliabilityScore >= 90 ? 'rgb(20, 235, 163)' : reliabilityScore >= 70 ? 'rgb(251, 146, 60)' : 'rgb(239, 68, 68)' }}
                >
                  {reliabilityScore}
                </span>
                <span className="text-lg font-mono text-slate-400">%</span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}>
                <div 
                  className="h-full transition-all duration-500"
                  style={{ 
                    width: `${reliabilityScore}%`,
                    backgroundColor: reliabilityScore >= 90 ? 'rgb(20, 235, 163)' : reliabilityScore >= 70 ? 'rgb(251, 146, 60)' : 'rgb(239, 68, 68)'
                  }}
                />
              </div>
              
              <p className="text-xs font-mono text-slate-500">
                Assets synced in last hour
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

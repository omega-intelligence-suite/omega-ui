'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Zap, TrendingUp } from 'lucide-react'
import { SiCoinmarketcap } from 'react-icons/si'
import { TbBriefcase } from 'react-icons/tb'

export interface AIAgentStatus {
  name: string
  lastRun: string | null
  modelId: string | null
  icon: 'flash' | 'wallet' | 'market' | 'stocks'
  threshold?: {
    greenMinutes: number   // < greenMinutes = green
    orangeMinutes: number  // < orangeMinutes = orange, else red
  }
}

interface AIAgentsMonitoringProps {
  agents: AIAgentStatus[]
}

function getTimeSince(date: string | null): string {
  if (!date) return 'Never'

  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

function getStatusColor(date: string | null, threshold?: { greenMinutes: number; orangeMinutes: number }): string {
  if (!date) return 'rgb(100, 100, 100)' // Gray

  // Default thresholds if not provided
  const greenThreshold = threshold?.greenMinutes || 60
  const orangeThreshold = threshold?.orangeMinutes || 1440 // 24h

  const now = new Date()
  const past = new Date(date)
  const diffMs = now.getTime() - past.getTime()
  const diffMins = Math.floor(diffMs / 60000)

  if (diffMins < greenThreshold) return 'rgb(20, 235, 163)' // Green
  if (diffMins < orangeThreshold) return 'rgb(235, 188, 20)' // Orange
  return 'rgb(220, 40, 40)' // Red
}

const getIcon = (iconType: string) => {
  const iconProps = { size: 20, className: "text-slate-400" }
  switch (iconType) {
    case 'flash':
      return <Zap {...iconProps} />
    case 'wallet':
      return <TbBriefcase {...iconProps} />
    case 'market':
      return <SiCoinmarketcap {...iconProps} />
    case 'stocks':
      return <TrendingUp {...iconProps} />
    default:
      return <Zap {...iconProps} />
  }
}

export function AIAgentsMonitoring({ agents }: AIAgentsMonitoringProps) {
  if (agents.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col space-y-4">
      <h3 className="text-sm font-mono text-slate-400 uppercase">AI Agents Heartbeat</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {agents.map((agent) => {
          const statusColor = getStatusColor(agent.lastRun, agent.threshold)
          const timeSince = getTimeSince(agent.lastRun)

          return (
            <Card key={agent.name} className="bg-slate-900 border-slate-800" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getIcon(agent.icon)}
                    <p className="text-white font-medium text-sm">{agent.name}</p>
                  </div>
                  {/* LED Status Indicator */}
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: statusColor,
                      boxShadow: `0 0 8px ${statusColor}`
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Last Run</p>
                    <p className="text-sm font-mono text-slate-300">{timeSince}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-slate-500 uppercase">Model</p>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {agent.modelId || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

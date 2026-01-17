'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client'
import { Header } from "../../../components/ui/header"
import { Sidebar } from "../../../components/ui/sidebar"
import { MonitoringKPIs } from '../settings/components/monitoring-kpis'
import { SourceDistribution } from '../settings/components/source-distribution'
import { AIAgentsMonitoring, AIAgentStatus } from '../settings/components/ai-agents-monitoring'
import { SystemHealthMonitoring } from '../settings/components/system-health-monitoring'
import { PortfolioMonitoring } from '../settings/components/portfolio-monitoring'
import { AlertBanner } from '../settings/components/alert-banner'
import { MonitoringSkeleton } from './skeletons/monitoring-skeleton'

import { colors } from "@/config"

import type { PortfolioSnapshot } from '@/types/models'

export interface NewsStats {
  totalCount: number
  lastNewsDate: string | null
  sourceDistribution: Array<{
    source_name: string
    count: number
    last_24h_count: number
    avg_daily: number
  }>
}

export default function MonitoringPage() {
  const router = useRouter()
  const [newsStats, setNewsStats] = useState<NewsStats | null>(null)
  const [aiAgents, setAIAgents] = useState<AIAgentStatus[]>([])
  const [systemHealth, setSystemHealth] = useState<any>(null)
  const [portfolioData, setPortfolioData] = useState<{
    lastSnapshot: PortfolioSnapshot | null
    totalSnapshots: number
    assetsTracked: number
    recentLogs: Array<{ timestamp: string; event: string; status: 'success' | 'warning' | 'error' }>
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
        return
      }

      loadData()
    })
  }, [router])

  const loadData = async () => {
    const supabase = createClient()
    setIsLoading(true)

    // Load assets for system health
    const { data: assetsData } = await supabase
      .from('user_assets')
      .select('*')
      .order('name', { ascending: true })

    const { data: targetsData } = await supabase
      .from('asset_targets')
      .select('symbol, target_price_usd')

    const targetsMap = new Map(
      targetsData?.map(target => [target.symbol, target.target_price_usd]) || []
    )

    const assetsWithTargets = assetsData?.map(asset => ({
      ...asset,
      target_price_usd: targetsMap.get(asset.symbol) || null
    })) || []

    // Calculate system health metrics
    const now = new Date()

    const calculateMinutesAgo = (dateStr: string | null | undefined) => {
      if (!dateStr) return 999999
      const now = new Date()
      const date = new Date(dateStr)
      return (now.getTime() - date.getTime()) / (1000 * 60)
    }

    const getStatus = (minutes: number, greenMinutes: number, orangeMinutes: number): 'ACTIVE' | 'STALE' | 'DOWN' => {
      if (minutes < greenMinutes) return 'ACTIVE'
      if (minutes < orangeMinutes) return 'STALE'
      return 'DOWN'
    }

    // Global Price Pulse
    const priceSync = assetsWithTargets
      .map(a => a.last_price_sync_at)
      .filter(Boolean)
      .sort((a, b) => new Date(a!).getTime() - new Date(b!).getTime())[0]
    const priceSyncMinutes = calculateMinutesAgo(priceSync)
    const pricePulseThreshold = { greenMinutes: 15, orangeMinutes: 30 }

    // Wallet Connection
    const walletSync = assetsWithTargets
      .map(a => a.last_wallet_sync_at)
      .filter(Boolean)
      .sort((a, b) => new Date(a!).getTime() - new Date(b!).getTime())[0]
    const walletSyncMinutes = calculateMinutesAgo(walletSync)
    const walletConnectionThreshold = { greenMinutes: 60 * 7, orangeMinutes: 60 * 12 }

    // Sync Reliability Score
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
    const assetsUpdatedRecently = assetsWithTargets.filter(asset => {
      const lastSync = asset.last_price_sync_at || asset.last_wallet_sync_at
      if (!lastSync) return false
      return new Date(lastSync) > oneHourAgo
    }).length
    const reliabilityScore = assetsWithTargets.length > 0
      ? Math.round((assetsUpdatedRecently / assetsWithTargets.length) * 100)
      : 0

    setSystemHealth({
      globalPricePulse: {
        status: getStatus(priceSyncMinutes, pricePulseThreshold.greenMinutes, pricePulseThreshold.orangeMinutes),
        lastSync: priceSync || null,
        minutesAgo: priceSyncMinutes,
        threshold: pricePulseThreshold
      },
      walletConnection: {
        status: getStatus(walletSyncMinutes, walletConnectionThreshold.greenMinutes, walletConnectionThreshold.orangeMinutes),
        lastSync: walletSync || null,
        minutesAgo: walletSyncMinutes,
        threshold: walletConnectionThreshold
      },
      reliabilityScore
    })

    // Load news stats
    const { count: totalNews } = await supabase
      .from('news_signals')
      .select('*', { count: 'exact', head: true })

    const { data: lastNews } = await supabase
      .from('news_signals')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    const { data: distribution } = await supabase
      .from('news_signals')
      .select('source_name')

    const sourceMap = new Map<string, { total: number; last24h: number }>()
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    distribution?.forEach((item) => {
      const source = item.source_name || 'unknown'
      if (!sourceMap.has(source)) {
        sourceMap.set(source, { total: 0, last24h: 0 })
      }
      const stats = sourceMap.get(source)!
      stats.total++
    })

    const { data: last24hNews } = await supabase
      .from('news_signals')
      .select('source_name')
      .gte('published_at', yesterday.toISOString())

    last24hNews?.forEach((item) => {
      const source = item.source_name || 'unknown'
      if (sourceMap.has(source)) {
        sourceMap.get(source)!.last24h++
      }
    })

    const sourceDistribution = Array.from(sourceMap.entries()).map(([source, stats]) => ({
      source_name: source,
      count: stats.total,
      last_24h_count: stats.last24h,
      avg_daily: stats.total / 30,
    }))

    setNewsStats({
      totalCount: totalNews || 0,
      lastNewsDate: lastNews?.[0]?.created_at || null,
      sourceDistribution,
    })

    // Load AI Agents status
    const agentsData: AIAgentStatus[] = []

    const { data: flashBrief } = await supabase
      .from('flash_briefs')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    agentsData.push({
      name: 'Flash Brief',
      lastRun: flashBrief?.[0]?.created_at || null,
      modelId: "flash_briefs_agent",
      icon: 'flash',
      threshold: {
        greenMinutes: 60,
        orangeMinutes: 120
      }
    })

    const { data: walletBrief } = await supabase
      .from('wallet_briefs')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    agentsData.push({
      name: 'Crypto Wallet Analyst',
      lastRun: walletBrief?.[0]?.created_at || null,
      modelId: 'wallet_briefs_agent',
      icon: 'wallet',
      threshold: {
        greenMinutes: 60 * 24,
        orangeMinutes: 60 * 48
      }
    })

    const { data: marketBrief } = await supabase
      .from('market_briefs')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    agentsData.push({
      name: 'Market Analyst',
      lastRun: marketBrief?.[0]?.created_at || null,
      modelId: 'market_briefs_agent',
      icon: 'market',
      threshold: {
        greenMinutes: 60 * 24,
        orangeMinutes: 60 * 48
      }
    })

    const { data: stocksBrief } = await supabase
      .from('stocks_briefs')
      .select('created_at')
      .order('created_at', { ascending: false })
      .limit(1)

    agentsData.push({
      name: 'Stocks Wallet Analyst',
      lastRun: stocksBrief?.[0]?.created_at || null,
      modelId: 'stocks_briefs_agent',
      icon: 'stocks',
      threshold: {
        greenMinutes: 60 * 24,
        orangeMinutes: 60 * 48
      }
    })

    setAIAgents(agentsData)

    // Load Portfolio Monitoring Data
    const { data: lastSnapshot } = await supabase
      .from('portfolio_snapshots')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const { count: totalSnapshots } = await supabase
      .from('portfolio_snapshots')
      .select('*', { count: 'exact', head: true })

    const { count: assetsTracked } = lastSnapshot ? await supabase
      .from('portfolio_assets_history')
      .select('*', { count: 'exact', head: true })
      .eq('snapshot_id', lastSnapshot.id) : { count: 0 }

    const { data: recentSnapshots } = await supabase
      .from('portfolio_snapshots')
      .select('created_at, total_value_eur, usd_eur_rate')
      .order('created_at', { ascending: false })
      .limit(5)

    const recentLogs = recentSnapshots?.map((snap, index) => {
      const time = new Date(snap.created_at).toLocaleTimeString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
      const value = (snap.total_value_eur / snap.usd_eur_rate).toLocaleString('en-US', { maximumFractionDigits: 0 })
      return {
        timestamp: time,
        event: `Portfolio Snapshot - $${value} USD`,
        status: 'success' as const
      }
    }) || []

    setPortfolioData({
      lastSnapshot: lastSnapshot || null,
      totalSnapshots: totalSnapshots || 0,
      assetsTracked: assetsTracked || 0,
      recentLogs
    })

    setIsLoading(false)
  }

  if (isLoading) {
    return <MonitoringSkeleton />
  }

  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:min-h-0">
        <Sidebar />
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Alert Banner */}
            {systemHealth && (
              <AlertBanner
                show={systemHealth.globalPricePulse.minutesAgo > 120 || systemHealth.walletConnection.minutesAgo > 120}
                message="⚠️ Raspberry Pi sync pipeline appears down"
                minutesSinceLastSync={Math.min(systemHealth.globalPricePulse.minutesAgo, systemHealth.walletConnection.minutesAgo)}
              />
            )}

            {/* System Health */}
            {systemHealth && <SystemHealthMonitoring {...systemHealth} />}

            {/* AI Agents */}
            <AIAgentsMonitoring agents={aiAgents} />

            {/* Portfolio Monitoring */}
            {portfolioData && (
              <PortfolioMonitoring
                lastSnapshot={portfolioData.lastSnapshot}
                totalSnapshots={portfolioData.totalSnapshots}
                assetsTracked={portfolioData.assetsTracked}
                recentLogs={portfolioData.recentLogs}
              />
            )}

            {/* News Monitoring */}
            <MonitoringKPIs newsStats={newsStats} />
            <SourceDistribution sourceDistribution={newsStats?.sourceDistribution || []} />

          </div>
        </div>
      </main>
    </div>
  )
}

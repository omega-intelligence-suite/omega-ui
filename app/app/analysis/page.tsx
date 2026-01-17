'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { createClient } from '@/app/utils/supabase/client'

import { Header } from "../../../components/ui/header"
import { Sidebar } from "../../../components/ui/sidebar"
import { Tabs } from "../../../components/ui/tabs"
import { PerformanceChart } from './components/performance-chart'
import { Target2035Chart } from './components/target-2035-chart'
import { CryptoValueChart } from './components/crypto-value-chart'
import { AlphaBTCChart } from './components/alpha-btc-chart'
import { DistributionChart } from './components/distribution-chart'
import { StocksValueChart } from './components/stocks-value-chart'
import { StocksDistributionChart } from './components/stocks-distribution-chart'
import { AnalysisKPIs } from './components/analysis-kpis'
import { AnalysisSkeleton } from './skeletons/analysis-skeleton'

import { colors } from "@/config";

import type { PortfolioSnapshot, PortfolioAssetSnapshot } from '@/types/models'

export default function AnalysisPage() {
  const router = useRouter()
  const [snapshots, setSnapshots] = useState<PortfolioSnapshot[]>([])
  const [assetSnapshots, setAssetSnapshots] = useState<PortfolioAssetSnapshot[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'global' | 'crypto' | 'stocks'>('global')

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

    // Load all portfolio snapshots ordered by date
    const { data: snapshotsData } = await supabase
      .from('portfolio_snapshots')
      .select('*')
      .order('created_at', { ascending: true })

    setSnapshots(snapshotsData || [])

    // Load all asset snapshots
    const { data: assetSnapshotsData } = await supabase
      .from('portfolio_assets_history')
      .select('*')
      .order('created_at', { ascending: true })
    console.log('Loaded Asset Snapshots:', assetSnapshotsData);
    setAssetSnapshots(assetSnapshotsData || [])

    setIsLoading(false)
  }

  // Calculate KPIs
  const calculateKPIs = () => {
    if (snapshots.length < 2) {
      return { netWorthVelocity: 0, distanceToGoal: 0 }
    }

    const latestSnapshot = snapshots[snapshots.length - 1]
    const oldestSnapshot = snapshots[0]

    // Net Worth Velocity (gain moyen par mois)
    const totalGain = latestSnapshot.total_value_eur - oldestSnapshot.total_value_eur
    const daysDiff = (new Date(latestSnapshot.created_at).getTime() - new Date(oldestSnapshot.created_at).getTime()) / (1000 * 60 * 60 * 24)
    const monthsDiff = daysDiff / 30
    const netWorthVelocity = monthsDiff > 0 ? totalGain / monthsDiff : 0

    // Distance to Goal (%)
    const targetAmount = 1000000 // 1M€
    const currentValue = latestSnapshot.total_value_eur
    const distanceToGoal = (currentValue / targetAmount) * 100

    return { netWorthVelocity, distanceToGoal }
  }

  const kpis = calculateKPIs()

  if (isLoading) {
    return <AnalysisSkeleton />
  }

  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col min-h-0 sm:flex-row">
        <Sidebar />
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <div className="flex-1 flex flex-col p-4 md:p-8 sm:pb-4 min-h-0 pb-0 md:pb-0 max-h-full overflow-hidden">
              <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col min-h-0 overflow-hidden">
                <Tabs
                  activeTab={activeTab}
                  onTabChange={(tabId) => setActiveTab(tabId as 'global' | 'crypto' | 'stocks')}
                  tabs={[
                    {
                      id: 'global',
                      label: 'GLOBAL',
                      content: (
                        <section className="space-y-8 pb-8">
                          {/* KPIs */}
                          <AnalysisKPIs
                            netWorthVelocity={kpis.netWorthVelocity}
                            distanceToGoal={kpis.distanceToGoal}
                            currentValue={snapshots[snapshots.length - 1]?.total_value_eur || 0}
                            currentValueUsd={(snapshots[snapshots.length - 1]?.total_value_eur / snapshots[snapshots.length - 1]?.usd_eur_rate) || 0}
                          />

                          {/* Performance Historique */}
                          <PerformanceChart snapshots={snapshots} />

                          {/* Target 2035 */}
                          <Target2035Chart snapshots={snapshots} />
                        </section>
                      )
                    },
                    {
                      id: 'crypto',
                      label: 'CRYPTO',
                      content: (
                        <section className="space-y-8 pb-8">
                          {/* Crypto Value in USD */}
                          <CryptoValueChart snapshots={snapshots} assetSnapshots={assetSnapshots} />

                          {/* Alpha BTC */}
                          <AlphaBTCChart snapshots={snapshots} assetSnapshots={assetSnapshots} />

                          {/* Distribution */}
                          <DistributionChart assetSnapshots={assetSnapshots} />
                        </section>
                      )
                    },
                    {
                      id: 'stocks',
                      label: 'STOCKS',
                      content: (
                        <section className="space-y-8 pb-8">
                          {/* Stocks Value */}
                          <StocksValueChart snapshots={snapshots} assetSnapshots={assetSnapshots} />

                          {/* Distribution */}
                          <StocksDistributionChart assetSnapshots={assetSnapshots} />
                        </section>
                      )
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

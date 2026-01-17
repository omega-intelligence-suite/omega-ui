'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { CryptoAssetCard } from './components/crypto-asset-card'

import { NewsSection } from "./components/news-section";
import { MarketAnalysisSection } from "./components/market-analysis";
import { PortfolioAnalysisSection } from "./components/portfolio-analysis";
import { DailyFlashSection } from "./components/daily-flash";
import { Header } from "../../../components/ui/header";
import { Sidebar } from "../../../components/ui/sidebar";
import { CryptoAssetCardSkeleton } from "./skeletons/crypto-asset-card-skeleton";

import { colors } from "@/config";

import type { UserAssetViewModel } from "@/types/viewModels";
import type { AssetTarget, NewsSignal, MarketAnalysis, WalletBrief, DailyFlash } from '@/types/models';

export default function AppPage() {
  const router = useRouter()
  const [newsSignals, setNewsSignals] = useState<NewsSignal[] | null>(null)
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null)
  const [assets, setAssets] = useState<any[] | null>(null)
  const [assetTargets, setAssetTargets] = useState<AssetTarget[] | null>(null)
  const [walletBrief, setWalletBrief] = useState<WalletBrief | null>(null)
  const [dailyFlash, setDailyFlash] = useState<DailyFlash | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push('/login')
        return
      }

      // Load each query independently
      supabase
        .from('news_signals')
        .select('id, title, impact_score, sentiment, summary_short, impact_justification, published_at, url')
        .neq('source_name', 'finnhub')
        .order('published_at', { ascending: false })
        .limit(50)
        .then(({ data }) => setNewsSignals(data || []))

      supabase
        .from('market_briefs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .then(({ data }) => setMarketAnalysis(data?.[0] || null))

      supabase
        .from('user_assets')
        .select('id, symbol, balance, average_price, current_price, name, icon_url, change_24h, type')
        .eq('type', 'CRYPTO')
        .order('balance', { ascending: false })
        .then(({ data }) => setAssets(data || []))

      supabase
        .from('asset_targets')
        .select('id, symbol, target_price_usd')
        .then(({ data }) => setAssetTargets(data || []))

      supabase
        .from('wallet_briefs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .then(({ data }) => setWalletBrief(data?.[0] || null))

      supabase
        .from('flash_briefs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .then(({ data }) => setDailyFlash(data?.[0] || null))
    })
  }, [router])

  const computedAssets: UserAssetViewModel[] = assets
    ? assets.map((asset) => ({
      ...asset,
      usdBalance: asset.balance * asset.current_price,
    }))
      .sort((a, b) => b.usdBalance - a.usdBalance)
      .filter((asset) => asset.usdBalance > 0.001)
    : []

  const totalPortfolioValue = computedAssets.reduce(
    (total, asset) => total + asset.usdBalance,
    0
  )

  // Create a map of targets by symbol for easy lookup
  const targetMap = new Map(
    assetTargets?.map(target => [target.symbol, target]) || []
  )

  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header totalPortfolioValue={totalPortfolioValue} />
      <main className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden lg:min-h-0 sm:flex-row">
        <Sidebar />
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-y-hidden">
          <div className="flex-1 lg:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-10">

              <div className='space-y-6'>
                {/* <h3 className="text-sm text-slate-400 font-mono">CRYPTOS</h3> */}
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  <MarketAnalysisSection marketAnalysis={marketAnalysis} />
                  <PortfolioAnalysisSection walletBrief={walletBrief} />
                </div>
              </div>

              <div className="space-y-10">
                {/* <h3 className="text-sm text-slate-400 font-mono">PORTFOLIO</h3> */}
                <DailyFlashSection dailyFlash={dailyFlash} />
                {assets === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <CryptoAssetCardSkeleton key={i} />
                    ))}
                  </div>
                ) : computedAssets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {computedAssets.map((asset: UserAssetViewModel) => (
                      <CryptoAssetCard
                        key={asset.id}
                        asset={asset}
                        target={targetMap.get(asset.symbol) as AssetTarget}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                    <CardContent className="p-8 text-center">
                      <p className="text-slate-400 font-mono">NO CRYPTO FOUND</p>
                      <p className="text-slate-500 text-sm mt-2">Sync your wallet to see cryptos</p>
                    </CardContent>
                  </Card>
                )}
              </div>

            </div>
          </div>

          {/* Right Panel - News Section */}
          <NewsSection newsSignals={newsSignals} />
        </div>
      </main>
    </div>
  )
}

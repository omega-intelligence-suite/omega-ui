"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { createClient } from "@/app/utils/supabase/client"
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Sidebar } from "@/components/ui/sidebar";

import { StockAssetCard } from "./components/stock-asset-card";
import { StockAssetCardSkeleton } from "./skeletons/stock-asset-card-skeleton";
import { NewsSection } from "../crypto/components/news-section";
import { StocksAnalysis } from "./components/stocks-analysis";

import { colors } from "@/config";

import type { UserAssetViewModel } from "@/types/viewModels";
import type { AssetTarget, NewsSignal, WalletBrief } from "@/types/models";

export default function StocksETFsPage() {
  const router = useRouter()
  const [assets, setAssets] = useState<UserAssetViewModel[] | null>(null)
  const [assetTargets, setAssetTargets] = useState<AssetTarget[] | null>(null)
  const [walletBrief, setWalletBrief] = useState<WalletBrief | null>(null)
  const [newsSignals, setNewsSignals] = useState<NewsSignal[] | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login")
        return
      }

      // Load each query independently
      supabase
        .from("user_assets")
        .select("*")
        .eq("type", "STOCKS_ETFS")
        .then(({ data }) => setAssets(data || []))

      supabase
        .from("asset_targets")
        .select("id, symbol, target_price_usd")
        .then(({ data }) => setAssetTargets(data || []))

      supabase
        .from("stocks_briefs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1)
        .then(({ data }) => setWalletBrief(data?.[0] || null))

      supabase
        .from("news_signals")
        .select("*")
        .eq("source_name", "Finnhub")
        .order("published_at", { ascending: false })
        .limit(50)
        .then(({ data }) => setNewsSignals(data || []))
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

  const targetMap = new Map(
    assetTargets?.map(target => [target.symbol, target]) || []
  )

  const totalPortfolioValue = computedAssets.reduce((total, asset) => total + asset.usdBalance, 0);

  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header totalPortfolioValue={totalPortfolioValue} currency="€" />
      <main className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden lg:min-h-0 sm:flex-row">
        <Sidebar />
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-y-hidden">
          <div className="flex-1 lg:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
            <div className="max-w-6xl mx-auto space-y-10">

              <div className="space-y-6">
                <StocksAnalysis walletBrief={walletBrief} />
              </div>

              <div className="space-y-6">
                {/* <h3 className="text-sm text-slate-400 font-mono">PORTFOLIO</h3> */}
                {assets === null ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <StockAssetCardSkeleton key={i} />
                    ))}
                  </div>
                ) : computedAssets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {computedAssets.map((asset: UserAssetViewModel) => (
                      <StockAssetCard
                        key={asset.id}
                        asset={asset}
                        target={targetMap.get(asset.symbol) as AssetTarget}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                    <CardContent className="p-8 text-center">
                      <p className="text-slate-400 font-mono">NO ASSETS FOUND</p>
                      <p className="text-slate-500 text-sm mt-2">Sync your wallet to see assets</p>
                    </CardContent>
                  </Card>
                )}
              </div>

            </div>
          </div>
          <NewsSection newsSignals={newsSignals} />
        </div>
      </main>
    </div>
  );
};
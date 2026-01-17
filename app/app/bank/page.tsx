'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client'
import { Header } from "../../../components/ui/header";
import { Sidebar } from "../../../components/ui/sidebar";
import { BankAssetCard } from './components/bank-asset-card';
import { BankAssetCardSkeleton } from './skeletons/bank-asset-card-skeleton';

import { colors } from "@/config";

import { Card, CardContent } from '@/components/ui/card';
import type { UserAssetViewModel } from "@/types/viewModels";
import type { AssetTarget } from '@/types/models';

export default function BankPage() {
  const router = useRouter()
  const [assets, setAssets] = useState<any[] | null>(null)
  const [assetTargets, setAssetTargets] = useState<AssetTarget[] | null>(null)

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
        .from('user_assets')
        .select('*')
        .eq('type', 'BANK')
        .then(({ data }) => setAssets(data || []))

      supabase
        .from('asset_targets')
        .select('id, symbol, target_price_usd')
        .then(({ data }) => setAssetTargets(data || []))
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
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:min-h-0">
        <Sidebar />
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-6xl mx-auto space-y-10">

            <div className='space-y-6'>
              {/* <h3 className="text-sm text-slate-400 font-mono">AI INSIGHTS</h3> */}
              <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                {/* <p>1</p>
                <p>2</p> */}
              </div>
            </div>

            <div className="space-y-6">
              {/* <h3 className="text-sm text-slate-400 font-mono">PORTFOLIO</h3> */}
              {assets === null ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {[...Array(4)].map((_, i) => (
                    <BankAssetCardSkeleton key={i} />
                  ))}
                </div>
              ) : computedAssets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {computedAssets.map((asset: UserAssetViewModel) => (
                    <BankAssetCard
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
      </main>
    </div>
  );
};
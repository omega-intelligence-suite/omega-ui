"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/app/utils/supabase/client"
import { Header } from "../../../components/ui/header";
import { Sidebar } from "../../../components/ui/sidebar";
import { TemperatureCard } from "./components/temperature-card";
import { YieldOnCostCard } from "./components/yield-on-cost-card";
import { TargetStatusCard } from "./components/target-status-card";
import { TemperatureCardSkeleton } from "./skeletons/temperature-card-skeleton";
import { YieldOnCostCardSkeleton } from "./skeletons/yield-on-cost-card-skeleton";
import { TargetStatusCardSkeleton } from "./skeletons/target-status-card-skeleton";

import { colors } from "@/config";

import type { UserAssetViewModel } from "@/types/viewModels";
import type { AssetTarget } from "@/types/models";

export default function OverviewPage() {
  const router = useRouter()
  const [assets, setAssets] = useState<any[] | null>(null)
  const [assetTargets, setAssetTargets] = useState<AssetTarget[] | null>(null)

  useEffect(() => {
    const supabase = createClient()

    // Check auth
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login")
        return
      }

      // Load all assets (crypto + stocks + bank)
      supabase
        .from("user_assets")
        .select("*")
        .then(({ data }) => setAssets(data || []))

      supabase
        .from("asset_targets")
        .select("id, symbol, target_price_usd")
        .then(({ data }) => setAssetTargets(data || []))
    })
  }, [router])

  const computedAssets: UserAssetViewModel[] = assets
    ? assets.map((asset) => ({
      ...asset,
      usdBalance: asset.balance * asset.current_price,
    }))
      .filter((asset) => asset.usdBalance > 0.001)
    : []

  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:min-h-0">
        <Sidebar />
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Grille des composants */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Yield on Cost */}
              {assets === null ? (
                <YieldOnCostCardSkeleton />
              ) : computedAssets.length > 0 ? (
                <YieldOnCostCard assets={computedAssets} />
              ) : null}

              {/* Température du Portefeuille */}
              {assets === null ? (
                <TemperatureCardSkeleton />
              ) : computedAssets.length > 0 ? (
                <TemperatureCard assets={computedAssets} />
              ) : null}

            </div>

            {/* Statut des Objectifs (full width) */}
            {assets === null || assetTargets === null ? (
              <TargetStatusCardSkeleton />
            ) : computedAssets.length > 0 && assetTargets.length > 0 ? (
              <TargetStatusCard assets={computedAssets} targets={assetTargets} />
            ) : null}

            {/* Message si pas d'assets */}
            {computedAssets.length === 0 && assets !== null && (
              <div className="text-center py-12">
                <p className="text-slate-400 font-mono">No assets found</p>
                <p className="text-slate-500 text-sm mt-2">Sync your portfolio to see analyses</p>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
};
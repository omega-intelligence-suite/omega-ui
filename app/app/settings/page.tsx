"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/app/utils/supabase/client"
import { Header } from "../../../components/ui/header"
import { Sidebar } from "../../../components/ui/sidebar"
import { AssetList } from "./components/asset-list"
import { SettingsSimpleSkeleton } from "./skeletons/settings-simple-skeleton"

import { colors } from "@/config"

import type { UserAsset } from "@/types/models"

export default function SettingsPage() {
  const router = useRouter()
  const [assets, setAssets] = useState<UserAsset[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login")
        return
      }

      loadData()
    })
  }, [router])

  const loadData = async () => {
    const supabase = createClient()
    setIsLoading(true)

    // Load assets
    const { data: assetsData } = await supabase
      .from("user_assets")
      .select("*")
      .order("name", { ascending: true })

    // Load asset targets
    const { data: targetsData } = await supabase
      .from("asset_targets")
      .select("symbol, target_price_usd")

    // Create a map of targets by symbol
    const targetsMap = new Map(
      targetsData?.map(target => [target.symbol, target.target_price_usd]) || []
    )

    // Merge assets with their targets
    const assetsWithTargets = assetsData?.map(asset => ({
      ...asset,
      target_price_usd: targetsMap.get(asset.symbol) || null
    })) || []

    setAssets(assetsWithTargets)
    setIsLoading(false)
  }

  if (isLoading) {
    return <SettingsSimpleSkeleton />
  }

  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:min-h-0">
        <Sidebar />
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Asset List */}
            <AssetList assets={assets || []} onUpdate={loadData} />

          </div>
        </div>
      </main>
    </div>
  )
}

"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/card";

import { colors } from "@/config";

import { AssetType } from "@/types/enum";

import type { UserAssetViewModel } from "@/types/viewModels"

interface YieldOnCostCardProps {
  assets: UserAssetViewModel[]
}

export const YieldOnCostCard: React.FC<YieldOnCostCardProps> = ({ assets }) => {
  const { globalYOC, topContributors } = useMemo(() => {
    // Calculer le YOC pour chaque asset : (Prix Actuel / Prix Moyen d'Achat) - 1
    const assetsWithYOC = assets
      .filter(asset => asset.average_price > 0 && asset.usdBalance > 0 && asset.type !== AssetType.Bank)
      .map(asset => ({
        ...asset,
        yoc: ((asset.current_price - asset.average_price) / asset.average_price) * 100,
        yocValue: (asset.current_price - asset.average_price) * asset.balance,
      }))

    // Calculer le YOC global pondéré par la valeur
    const totalInvested = assetsWithYOC.reduce((sum, asset) => sum + (asset.average_price * asset.balance), 0)
    const totalCurrent = assetsWithYOC.reduce((sum, asset) => sum + asset.usdBalance, 0)
    const globalYield = totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0

    // Top 2 contributeurs au Yield on Cost
    const topTwo = assetsWithYOC
      .filter(asset => asset.yoc > 0)
      .sort((a, b) => b.yoc - a.yoc)
      .slice(0, 2)

    return {
      globalYOC: globalYield,
      topContributors: topTwo,
    }
  }, [assets])


  return (
    <Card className="bg-slate-900/50 p-6 border-white/10 rounded-xl" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            {/* <h3 className="text-sm font-mono text-slate-100 uppercase tracking-wider">Yield on Cost</h3> */}
          </div>
        </div>

        {/* KPI Global massif */}
        <div className="flex flex-col items-center py-6">
          <div
            className={`text-6xl font-semibold font-mono  bg-clip-text text-transparent`}
            style={{
              filter: `drop-shadow(0 0 20px ${globalYOC > 0 ? colors.primary.green : (globalYOC < 0 ? colors.primary.red : "grey")})`,
              color: globalYOC > 0 ? colors.primary.green : (globalYOC < 0 ? colors.primary.red : "grey"),
            }}
          >
            {globalYOC > 0 ? "+" : ""}{globalYOC.toFixed(2)}%
          </div>
          <div className="text-xs text-slate-500 font-mono mt-2 uppercase tracking-wider">
            <p className="font-mono text-xs text-slate-400">Yield on Cost</p>
          </div>
        </div>

        {/* Top 2 Contributeurs */}
        {topContributors.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <div className="text-xs text-slate-500 font-mono mb-4 uppercase tracking-wider">
              Top Contributeurs
            </div>
            <div className="space-y-3">
              {topContributors.map((asset, index) => (
                <div key={asset.id} className="flex items-center gap-3">
                  {/* Rang */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono ${index === 0
                    ? "bg-gradient-to-br from-yellow-500/20 to-amber-500/20 text-yellow-400 border border-yellow-500/30"
                    : "bg-gradient-to-br from-slate-500/20 to-slate-600/20 text-slate-400 border border-slate-500/30"
                    }`}>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  {asset.icon_url ? (
                    <img src={asset.icon_url} alt={asset.symbol} className="w-8 h-8 rounded-full" />
                  ) : (
                    <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-mono">{asset.symbol.charAt(0)}</span>
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-mono text-slate-200 truncate">{asset.name}</div>
                    <div className="text-xs text-slate-500 font-mono">{asset.symbol.toUpperCase()}</div>
                  </div>

                  {/* YOC */}
                  <div className="flex flex-col items-end">
                    <div className={`text-sm font-mono bg-clip-text text-slate-200`}>
                      +{asset.yoc.toFixed(1)}%
                    </div>
                    <div className="text-xs text-slate-500 font-mono">
                      +${asset.yocValue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Indicateur visuel de croissance */}
        <div className="relative h-1 bg-slate-800/50 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-1000"
            style={{
              width: `${Math.min(Math.max((globalYOC / 50) * 100, 0), 100)}%`,
              boxShadow: "0 0 12px rgba(16, 185, 129, 0.6)",
            }}
          />
        </div>
      </div>
    </Card>
  )
}

"use client";

import { useMemo } from "react";
import { Target, TrendingDown } from "lucide-react";

import { Card } from "@/components/ui/card";

import { colors } from "@/config";

import { AssetTarget } from "@/types/models";
import type { UserAssetViewModel } from "@/types/viewModels";

interface TargetStatusCardProps {
  assets: UserAssetViewModel[]
  targets: AssetTarget[]
}

export const TargetStatusCard: React.FC<TargetStatusCardProps> = ({ assets, targets }) => {
  const { nearMaturity, dcaOpportunities } = useMemo(() => {
    // Créer une map des targets par symbol
    const targetMap = new Map(targets.map(t => [t.symbol, t.target_price_usd]))

    // Calculer l'écart au target pour chaque asset
    const assetsWithTarget = assets
      .filter(asset => targetMap.has(asset.symbol) && asset.current_price > 0)
      .map(asset => {
        const targetPrice = targetMap.get(asset.symbol)!
        // Calcul : (Target_Price - Current_Price) / Current_Price
        const percentageToTarget = ((targetPrice - asset.current_price) / asset.current_price) * 100
        const progressToTarget = (asset.current_price / targetPrice) * 100

        return {
          ...asset,
          targetPrice,
          percentageToTarget,
          progressToTarget: Math.min(progressToTarget, 100),
        }
      })

    // Top 3 actifs les plus proches du target (progress > 70%)
    const mature = assetsWithTarget
      .filter(asset => asset.progressToTarget >= 70)
      .sort((a, b) => b.progressToTarget - a.progressToTarget)
      .slice(0, 3)

    // Top 3 actifs les plus loin du target (progress < 70%)
    const opportunities = assetsWithTarget
      .filter(asset => asset.progressToTarget < 70)
      .sort((a, b) => a.progressToTarget - b.progressToTarget)
      .slice(0, 3)

    return {
      nearMaturity: mature,
      dcaOpportunities: opportunities,
    }
  }, [assets, targets])

  const AssetProgressBar: React.FC<{ asset: any }> = ({ asset }) => (
    <div className="flex items-center gap-3">
      {/* Icon */}
      {asset.icon_url ? (
        <img src={asset.icon_url} alt={asset.symbol} className="w-8 h-8 rounded-full flex-shrink-0" />
      ) : (
        <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs text-slate-400 font-mono">{asset.symbol.charAt(0)}</span>
        </div>
      )}

      {/* Info & Progress */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-mono text-slate-200 truncate">{asset.name}</span>
            <span className="text-xs text-slate-500 font-mono flex-shrink-0">{asset.symbol.toUpperCase()}</span>
          </div>
          <span className={`text-xs font-mono ml-2 flex-shrink-0 ${asset.progressToTarget >= 70 ? "text-emerald-400" : "text-orange-400"
            }`}>
            {asset.progressToTarget.toFixed(1)}%
          </span>
        </div>

        {/* Barre de progression compacte */}
        <div className="relative h-1 bg-slate-800/50 rounded-full overflow-hidden">
          <div
            className={`absolute inset-y-0 left-0 bg-gradient-to-r rounded-full transition-all duration-500`}
            style={{
              width: `${asset.progressToTarget}%`,
              boxShadow: `0 0 8px ${asset.progressToTarget >= 70 ? "#10b98160" : "#f59e0b60"}`,
              backgroundColor: asset.progressToTarget >= 70
                ? colors.primary.green
                : (asset.progressToTarget >= 30
                  ? colors.primary.yellow
                  : colors.primary.red),
            }}
          />
        </div>

        {/* Prix actuel vs Target */}
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-slate-500 font-mono">
            ${asset.current_price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-xs text-slate-400 font-mono">
            → ${asset.targetPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <Card className="bg-slate-900/50 p-6 border-white/10 rounded-xl" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      <div className="flex flex-col gap-10">
        {/* Section Maturité Proche */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <Target className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-200">Exit incoming</div>
              <div className="text-xs text-slate-500 font-mono">Assets nearly hitting the target (&gt;70%)</div>
            </div>
          </div>

          <div className="space-y-4">
            {nearMaturity.length > 0 ? (
              nearMaturity.map(asset => (
                <AssetProgressBar key={asset.id} asset={asset} />
              ))
            ) : (
              <div className="text-center py-4 text-sm text-slate-500 font-mono">
                Aucun actif proche du target
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Section Opportunités DCA */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <TrendingDown className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-200">DCA Opportunities</div>
              <div className="text-xs text-slate-500 font-mono">Assets far from the target (&lt;70%)</div>
            </div>
          </div>

          <div className="space-y-4">
            {dcaOpportunities.length > 0 ? (
              dcaOpportunities.map(asset => (
                <AssetProgressBar key={asset.id} asset={asset} />
              ))
            ) : (
              <div className="text-center py-4 text-sm text-slate-500 font-mono">
                Aucune opportunité DCA
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

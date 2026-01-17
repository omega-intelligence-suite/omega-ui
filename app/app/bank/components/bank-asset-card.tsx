"use client";

import { Card, CardContent } from "@/components/ui/card";

import { colors } from "@/config/colors";

import type { AssetTarget } from "@/types/models";
import type { UserAssetViewModel } from "@/types/viewModels";

interface AssetCardProps {
  asset: UserAssetViewModel
  target: AssetTarget
}

export function BankAssetCard({ asset, target }: AssetCardProps) {
  // Calculate progress percentage towards target
  const targetProgress = target && target.target_price_usd > 0
    ? Math.min((asset.usdBalance / target.target_price_usd) * 100, 100)
    : -1;

  return (
    <Card className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex align-start">
                <div className="w-8 h-8 mr-3">
                  {asset.icon_url ? (
                    <img
                      src={asset.icon_url}
                      alt={asset.symbol}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center">
                      <span className="text-xs text-slate-400 font-mono">{asset.symbol.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-md font-semibold text-slate-100 font-mono">{asset.name}</p>
                {/* <p className="text-xs text-slate-400 font-mono">{asset.symbol.toUpperCase()}</p> */}
                <span className="text-xs text-slate-500 font-mono">Solde: {asset.balance > 0.009 ? asset.balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : asset.balance.toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 })}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3">
            <div className="flex flex-col space-y-1 items-center">
              <div className="flex flex-col">
                <p className="text-xs text-slate-400 font-mono">BALANCE</p>
                <span className="text-sm text-slate-100 font-mono">€{asset.usdBalance?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 items-center">
              <div className="flex flex-col">
                <p className="text-xs text-slate-400 font-mono">AVG. PRICE</p>
                <span className="text-sm text-slate-100 font-mono">-</span>
              </div>
            </div>
            <div className="flex flex-col space-y-1 items-center">
              <div className="flex flex-col">
                <p className="text-xs text-slate-400 font-mono">CURRENT PRICE</p>
                <div className="flex gap-1 items-end">
                  <span className="text-sm text-slate-100 font-mono">-</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-400 font-mono">Progress to target (€{target?.target_price_usd > 0.009 ? target?.target_price_usd?.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : target?.target_price_usd?.toLocaleString("en-US", { minimumFractionDigits: 8, maximumFractionDigits: 8 })})</span>
                <span className={`text-xs font-mono text-slate-400`}>{targetProgress > -1 ? targetProgress?.toFixed(1) : "-"}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all`}
                  style={{
                    backgroundColor: targetProgress >= 70
                      ? colors.primary.green
                      : targetProgress >= 30
                        ? colors.primary.orange
                        : colors.primary.red,
                    width: `${targetProgress === -1 ? 0 : targetProgress}%`
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}

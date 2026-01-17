"use client";

import { useMemo } from "react";

import { Card } from "@/components/ui/card";

import { colors } from "@/config";

import { AssetType } from "@/types/enum";
import type { UserAssetViewModel } from "@/types/viewModels";

interface TemperatureCardProps {
  assets: UserAssetViewModel[]
}

// Définition des piliers et leurs couleurs
const PILLAR_CONFIG = {
  1: { name: "Bank", color: "rgba(6, 181, 212, 1)", label: "Pilier 1 - Bank" },
  2: { name: "Stocks / ETFs", color: "rgba(16, 185, 129, 1)", label: "Pilier 2 - Stocks / ETFs" },
  3: { name: "Cryptos", color: "rgba(169, 85, 247, 1)", label: "Pilier 3 - Cryptos" },
}

// Allocation cible théorique (%)
const TARGET_ALLOCATION = {
  1: 25, // 25% Bank
  2: 50, // 50% Stocks / ETFs
  3: 25, // 25% Cryptos
}

export const TemperatureCard: React.FC<TemperatureCardProps> = ({ assets }) => {
  const { pillarData, healthScore } = useMemo(() => {
    // Calculer la valeur totale du portefeuille
    const totalValue = assets.reduce((sum, asset) => sum + asset.usdBalance, 0)

    // Grouper par pilier (on utilise le type pour déterminer le pilier)
    const pillarValues = {
      1: 0, // Bank
      2: 0, // Stocks
      3: 0, // Crypto (Pépites)
    }

    assets.forEach(asset => {
      if (asset.type === AssetType.Stocks_Etfs) {
        // Distinguer ETF et Stocks via le nom ou un autre critère
        // Pour simplifier, on met tout en Pilier 2 (Stocks)
        // Ajustez cette logique selon vos données
        pillarValues[2] += asset.usdBalance
      } else if (asset.type === AssetType.Crypto) {
        pillarValues[3] += asset.usdBalance
      } else if (asset.type === AssetType.Bank) {
        pillarValues[1] += asset.usdBalance
      }
    })

    // Calculer les pourcentages actuels
    const pillarPercentages = {
      1: totalValue > 0 ? (pillarValues[1] / totalValue) * 100 : 0,
      2: totalValue > 0 ? (pillarValues[2] / totalValue) * 100 : 0,
      3: totalValue > 0 ? (pillarValues[3] / totalValue) * 100 : 0,
    }

    // Calculer le score de santé (écart entre allocation actuelle et cible)
    const deviations = [
      Math.abs(pillarPercentages[1] - TARGET_ALLOCATION[1]),
      Math.abs(pillarPercentages[2] - TARGET_ALLOCATION[2]),
      Math.abs(pillarPercentages[3] - TARGET_ALLOCATION[3]),
    ]
    const totalDeviation = deviations.reduce((sum, dev) => sum + dev, 0)
    const health = Math.max(0, 100 - totalDeviation)

    // Préparer les données pour le donut
    const data = [
      { pillar: 1, value: pillarValues[1], percentage: pillarPercentages[1] },
      { pillar: 2, value: pillarValues[2], percentage: pillarPercentages[2] },
      { pillar: 3, value: pillarValues[3], percentage: pillarPercentages[3] },
    ].filter(item => item.value > 0)

    return {
      pillarData: data,
      healthScore: Math.round(health),
    }
  }, [assets])

  // Calculer les angles pour le donut SVG
  const donutSegments = useMemo(() => {
    let cumulativeAngle = 0
    const gapAngle = 3 // Gap de 3 degrés entre les segments
    return pillarData.map(item => {
      const angle = (item.percentage / 100) * 360
      const segment = {
        pillar: item.pillar,
        startAngle: cumulativeAngle + gapAngle / 2,
        endAngle: cumulativeAngle + angle - gapAngle / 2,
        percentage: item.percentage,
        value: item.value,
      }
      cumulativeAngle += angle
      return segment
    })
  }, [pillarData])

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    }
  }

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(" ")
  }

  return (
    <Card className="bg-slate-900/50 p-6 border-white/10 rounded-xl" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      <div className="flex flex-col gap-6">

        {/* Graphique Donut */}
        <div className="flex items-center justify-center relative p-6">
          <svg width="200" height="200" viewBox="-10 -10 220 220" className="transform -rotate-90 overflow-visible">
            {/* Cercle de fond */}
            <circle
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="10"
            />

            {/* Segments du donut */}
            {donutSegments.map((segment, index) => {
              const path = describeArc(100, 100, 85, segment.startAngle, segment.endAngle)
              return (
                <path
                  key={index}
                  d={path}
                  fill="none"
                  stroke={PILLAR_CONFIG[segment.pillar as keyof typeof PILLAR_CONFIG].color}
                  strokeWidth="10"
                  className="transition-all duration-500 hover:opacity-80"
                  style={{
                    // filter: `drop-shadow(0 0 4px ${PILLAR_CONFIG[segment.pillar as keyof typeof PILLAR_CONFIG].color}) drop-shadow(0 0 2px ${PILLAR_CONFIG[segment.pillar as keyof typeof PILLAR_CONFIG].color})`,
                  }}
                />
              )
            })}
          </svg>

          {/* Score de santé au centre */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-4xl font-bold font-mono" style={{
              background: `linear-gradient(135deg, white, white)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              {healthScore}
            </div>
            <div className="text-xs text-slate-400 font-mono mt-1">Health Score</div>
          </div>
        </div>

        {/* Légende */}
        <div className="grid grid-cols-3 gap-4">
          {pillarData.map(item => (
            <div key={item.pillar} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: PILLAR_CONFIG[item.pillar as keyof typeof PILLAR_CONFIG].color,
                    // boxShadow: `0 0 12px ${PILLAR_CONFIG[item.pillar as keyof typeof PILLAR_CONFIG].color}60`,
                  }}
                />
                <span className="text-xs font-mono text-slate-400">
                  {PILLAR_CONFIG[item.pillar as keyof typeof PILLAR_CONFIG].name}
                </span>
              </div>
              <div className="text-sm font-bold font-mono text-slate-200">
                {item.percentage.toFixed(1)}%
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {["Stocks / ETFs", "Bank"].includes(PILLAR_CONFIG[item.pillar as keyof typeof PILLAR_CONFIG].name) ? "€" : "$"}
                {item.value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </div>
            </div>
          ))}
        </div>

        {/* Allocation cible */}
        {/* <div className="border-t border-white/10 pt-4">
          <div className="text-xs text-slate-400 font-mono mb-3">Target Allocation</div>
          <div className="flex gap-4 text-xs font-mono text-slate-400">
            <span>Bank: {TARGET_ALLOCATION[1]}%</span>
            <span>Stocks / ETFs: {TARGET_ALLOCATION[2]}%</span>
            <span>Cryptos: {TARGET_ALLOCATION[3]}%</span>
          </div>
        </div> */}
      </div>
    </Card>
  )
}

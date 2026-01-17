import { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { HiOutlineSparkles } from "react-icons/hi";
import { SiCoinmarketcap } from "react-icons/si";

import { Card } from "@/components/ui/card";
import { MarketAnalysisSkeleton } from "../skeletons/market-analysis-skeleton";

import { colors } from "@/config/colors";

import type { MarketAnalysis } from "@/types/models";

export const MarketAnalysisSection: FC<{ marketAnalysis?: MarketAnalysis | null }> = ({ marketAnalysis }) => {
  if (!marketAnalysis) {
    return <MarketAnalysisSkeleton />;
  }
  return (
    <Card className="bg-slate-900 p-6 border-none" style={{ backgroundColor: "rgba(20, 24, 31, 0.5)", border: `1px solid ${colors.primary.blue_0_25}` }}>
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div style={{ alignItems: "center", padding: "8px", borderRadius: "8px", backgroundColor: colors.primary.blue_0_1 }}>
              <SiCoinmarketcap style={{ color: colors.primary.blue_0_75 }} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-sm">Market Analysis</p>
                <HiOutlineSparkles style={{ color: colors.primary.yellow, fontSize: "1rem" }} />
              </div>
              <p className="text-xs font-mono text-slate-400">AI-powered market insights</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm">"{marketAnalysis?.brief ?? "No market analysis available."}"</p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2">
            <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 6px 3px 6px", borderRadius: "4px", backgroundColor: colors.primary.blue_0_1 }}>
              <p className="font-mono text-xs text-slate-400">Sentiment:</p>
              <p className="font-mono text-xs text-slate-300">{marketAnalysis?.sentiment}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-slate-500">Last update {marketAnalysis ? formatDistanceToNow(new Date(marketAnalysis.created_at)) : "N/A"}</p>
        </div>
      </div>
    </Card>
  );
};

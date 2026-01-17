import { FC } from "react";
import { formatDistanceToNow } from "date-fns";
import { HiOutlineSparkles } from "react-icons/hi";
import { TbBriefcase } from "react-icons/tb";


import { Card } from "@/components/ui/card";
import { PortfolioAnalysisSkeleton } from "../skeletons/portfolio-analysis-skeleton";

import { colors } from "@/config";

import type { WalletBrief } from "@/types/models";

export const PortfolioAnalysisSection: FC<{ walletBrief?: WalletBrief | null }> = ({ walletBrief }) => {
  if (!walletBrief) {
    return <PortfolioAnalysisSkeleton />;
  }
  return (
    <Card className="bg-slate-900 p-6 border-none" style={{ backgroundColor: colors.primary.purple_0_1, border: `1px solid ${colors.primary.purple_0_25}` }}>
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div style={{ display: "flex", alignItems: "center", padding: "8px", borderRadius: "8px", backgroundColor: colors.primary.purple_0_1 }}>
              <TbBriefcase style={{ color: colors.primary.purple_0_75 }} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-sm">Portfolio Analysis</p>
                <HiOutlineSparkles style={{ color: colors.primary.yellow, fontSize: "1rem" }} />
              </div>
              <p className="text-xs font-mono text-slate-400">AI-powered portfolio insights</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm">"{walletBrief?.summary ?? "No portfolio analysis available."}"</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-2">
            <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 6px 3px 6px", borderRadius: "4px", backgroundColor: colors.primary.purple_0_1 }}>
              <p className="font-mono text-xs text-slate-400">Risk:</p>
              <p className="font-mono text-xs text-slate-300">{walletBrief?.risk_score}</p>
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 6px 3px 6px", borderRadius: "4px", backgroundColor: colors.primary.purple_0_1 }}>
              <p className="font-mono text-xs text-slate-400">Narrative:</p>
              <p className="font-mono text-xs text-slate-300">{walletBrief?.narrative_score}</p>
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 6px 3px 6px", borderRadius: "4px", backgroundColor: colors.primary.purple_0_1 }}>
              <p className="font-mono text-xs text-slate-400">Velocity:</p>
              <p className="font-mono text-xs text-slate-300">{walletBrief?.velocity_score}</p>
            </div>
            <div style={{ display: "flex", gap: "4px", alignItems: "center", padding: "4px 6px 3px 6px", borderRadius: "4px", backgroundColor: colors.primary.purple_0_1 }}>
              <p className="font-mono text-xs text-slate-400">BTC Accumulation:</p>
              <p className="font-mono text-xs text-slate-300">{walletBrief?.btc_accumulation_index}</p>
            </div>
          </div>
          <p className="font-mono text-xs text-slate-500">Last update {walletBrief ? formatDistanceToNow(new Date(walletBrief.created_at)) : "N/A"}</p>
        </div>
      </div>
    </Card>
  );
};
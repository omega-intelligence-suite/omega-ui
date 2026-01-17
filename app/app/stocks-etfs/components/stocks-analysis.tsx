import { FC } from "react";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { TbBriefcase } from "react-icons/tb";
import { HiOutlineSparkles } from "react-icons/hi";

import { Card } from "@/components/ui/card";
import { StocksAnalysisSkeleton } from "../skeletons/stocks-analysis-skeleton";

import { colors } from "@/config";

import type { WalletBrief } from "@/types/models";

export const StocksAnalysis: FC<{ walletBrief?: WalletBrief | null }> = ({ walletBrief }) => {
  if (!walletBrief) {
    return <StocksAnalysisSkeleton />;
  }

  return (
    <Card className="bg-slate-900 p-6 border-none" style={{ backgroundColor: colors.primary.purple_0_1, border: "1px solid " + colors.primary.purple_0_25 }}>
      <div className="flex flex-col justify-between h-full gap-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div style={{ alignItems: "center", padding: "8px", borderRadius: "8px", backgroundColor: colors.primary.purple_0_1 }}>
              <TbBriefcase style={{ color: colors.primary.purple_0_75 }} />
            </div>
            <div className="flex flex-col">
              <div className="flex gap-2 items-center">
                <p className="text-sm">Stocks & ETFs Analysis</p>
                <HiOutlineSparkles style={{ color: colors.primary.yellow, fontSize: "1rem" }} />
              </div>
              <p className="text-xs font-mono text-slate-400">AI-powered stocks & ETFs insights</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm">"{walletBrief ? walletBrief.summary : "No market analysis available."}"</p>
        </div>
        <p className="font-mono text-xs text-slate-500">Last update {walletBrief ? formatDistanceToNow(new Date(walletBrief.created_at)) : "N/A"}</p>
      </div>
    </Card>
  );
};

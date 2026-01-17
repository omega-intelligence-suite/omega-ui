import { FC } from "react";
import { HiOutlineSparkles as HiOutlineSparkles2 } from "react-icons/hi2";
import { HiOutlineSparkles } from "react-icons/hi";
import { formatDistanceToNow } from "date-fns";

import { Card } from "@/components/ui/card";
import { DailyFlashSkeleton } from "../skeletons/daily-flash-skeleton";

import { colors } from "@/config/colors";

import type { DailyFlash } from "@/types/models";

export const DailyFlashSection: FC<{ dailyFlash?: DailyFlash | null }> = ({ dailyFlash }) => {
  if (!dailyFlash) {
    return <DailyFlashSkeleton />;
  }
  return (
    <Card
      className="bg-slate-900 p-6"
      style={{
        border: "1px solid transparent",
        borderColor: dailyFlash?.global_mood === "BULLISH" ? colors.primary.green_0_25 : (dailyFlash?.global_mood === "BEARISH" ? colors.primary.red_0_25 : colors.primary.yellow_0_25),
        backgroundColor: dailyFlash?.global_mood === "BULLISH" ? colors.primary.green_0_1 : (dailyFlash?.global_mood === "BEARISH" ? colors.primary.red_0_1 : colors.primary.yellow_0_1),
      }}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <div style={{ display: "flex", alignItems: "center", padding: "8px", borderRadius: "8px", backgroundColor: dailyFlash?.global_mood === "BULLISH" ? colors.primary.green_0_25 : (dailyFlash?.global_mood === "BEARISH" ? colors.primary.red_0_25 : colors.primary.yellow_0_25) }}>
            <HiOutlineSparkles2 style={{ color: dailyFlash?.global_mood === "BULLISH" ? colors.primary.green_0_75 : (dailyFlash?.global_mood === "BEARISH" ? colors.primary.red_0_75 : colors.primary.yellow_0_75) }} />
          </div>
          <div className="flex flex-col items-start">
            <div className="flex gap-2">
              <p className="text-sm">Daily Flash</p>
              <HiOutlineSparkles style={{ color: colors.primary.yellow }} />
            </div>
            <p className="text-slate-400 text-xs font-mono">AI-powered portofolio status</p>
          </div>
        </div>
        <p className="text-slate-400 text-sm">"{dailyFlash && dailyFlash.brief ? dailyFlash.brief : "No flash brief available."}"</p>
        <p className="text-slate-500 text-xs font-mono">Last update {dailyFlash && dailyFlash.created_at ? formatDistanceToNow(new Date(dailyFlash.created_at), { addSuffix: true }) : "N/A"}</p>
      </div>
    </Card>
  );
};

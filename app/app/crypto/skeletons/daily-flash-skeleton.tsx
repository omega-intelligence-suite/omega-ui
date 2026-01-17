import { FC } from "react";
import { Card } from "@/components/ui/card";

import { colors } from "@/config/colors";

export const DailyFlashSkeleton: FC = () => {
  return (
    <Card
      className="bg-slate-900 p-6 relative overflow-hidden"
      style={{ border: `1px solid ${colors.primary.yellow_0_25}`, backgroundColor: colors.primary.yellow_0_1 }}
    >
      {/* Terminal dots decoration */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-700/50 animate-pulse" style={{ animationDelay: "0ms" }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-700/50 animate-pulse" style={{ animationDelay: "150ms" }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-700/50 animate-pulse" style={{ animationDelay: "300ms" }}></div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect"></div>

      <div className="flex flex-col gap-4 relative">
        {/* Header section */}
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 rounded-lg bg-yellow-900/40 animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-28 bg-yellow-900/40 rounded animate-pulse" style={{ animationDelay: "100ms" }}></div>
            <div className="h-3 w-48 bg-yellow-900/30 rounded animate-pulse" style={{ animationDelay: "200ms" }}></div>
          </div>
        </div>

        {/* Content lines */}
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-yellow-900/30 rounded animate-pulse" style={{ animationDelay: "300ms" }}></div>
          <div className="h-3.5 w-[95%] bg-yellow-900/30 rounded animate-pulse" style={{ animationDelay: "400ms" }}></div>
          <div className="h-3.5 w-[80%] bg-yellow-900/30 rounded animate-pulse" style={{ animationDelay: "500ms" }}></div>
        </div>

        {/* Footer */}
        <div className="h-3 w-36 bg-yellow-900/30 rounded animate-pulse" style={{ animationDelay: "600ms" }}></div>
      </div>

      <style>{`
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            ${colors.primary.yellow_0_1} 50%,
            transparent 100%
          );
          animation: shimmer 2.5s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Card>
  );
};

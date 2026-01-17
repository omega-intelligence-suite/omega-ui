import { FC } from "react";
import { Card } from "@/components/ui/card";

import { colors } from "@/config/colors";

export const YieldOnCostCardSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900/50 p-6 border-white/10 rounded-xl relative overflow-hidden" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect"></div>

      <div className="flex flex-col gap-6 relative">
        {/* Header with icon */}
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-slate-800/60 rounded animate-pulse"></div>
          <div className="w-9 h-9 rounded-lg bg-slate-800/50 animate-pulse" style={{ animationDelay: '100ms' }}></div>
        </div>

        {/* KPI Global massif */}
        <div className="flex flex-col items-center py-6">
          <div className="h-16 w-48 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
          <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse mt-4" style={{ animationDelay: '300ms' }}></div>
        </div>

        {/* Top 2 Contributeurs */}
        <div className="border-t border-white/10 pt-4">
          <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse mb-4"></div>
          <div className="space-y-3">
            {[0, 1].map((i) => (
              <div key={i} className="flex items-center gap-3">
                {/* Rang */}
                <div className="w-6 h-6 rounded-full bg-slate-800/50 animate-pulse" style={{ animationDelay: `${400 + i * 100}ms` }}></div>

                {/* Icon */}
                <div className="w-8 h-8 rounded-full bg-slate-800/50 animate-pulse" style={{ animationDelay: `${500 + i * 100}ms` }}></div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="h-4 w-24 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${600 + i * 100}ms` }}></div>
                  <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${700 + i * 100}ms` }}></div>
                </div>

                {/* YOC */}
                <div className="flex flex-col items-end space-y-1">
                  <div className="h-5 w-16 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${800 + i * 100}ms` }}></div>
                  <div className="h-3 w-14 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${900 + i * 100}ms` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="relative h-1 bg-slate-800/50 rounded-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-[60%] bg-slate-700/50 rounded-full animate-pulse"></div>
        </div>
      </div>

      <style>{`
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(100, 116, 139, 0.05) 50%,
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

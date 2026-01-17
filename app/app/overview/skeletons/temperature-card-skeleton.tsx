import { FC } from "react";

import { Card } from "@/components/ui/card";

import { colors } from "@/config/colors";

export const TemperatureCardSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900/50 p-6 border-white/10 rounded-xl relative overflow-hidden" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect"></div>

      <div className="flex flex-col gap-6 relative">
        {/* Title */}
        <div className="h-4 w-40 bg-slate-800/60 rounded animate-pulse"></div>

        {/* Donut Chart placeholder */}
        <div className="flex items-center justify-center relative p-6">
          <div className="w-[200px] h-[200px] rounded-full border-[10px] border-slate-800/40 animate-pulse"></div>

          {/* Center score placeholder */}
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="h-10 w-16 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="h-3 w-24 bg-slate-800/40 rounded animate-pulse mt-2" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>

        {/* Legend - 3 columns */}
        <div className="grid grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-800/50 animate-pulse" style={{ animationDelay: `${400 + i * 100}ms` }}></div>
                <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${500 + i * 100}ms` }}></div>
              </div>
              <div className="h-4 w-12 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${600 + i * 100}ms` }}></div>
              <div className="h-3 w-20 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${700 + i * 100}ms` }}></div>
            </div>
          ))}
        </div>

        {/* Target allocation */}
        <div className="border-t border-white/10 pt-4">
          <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse mb-3"></div>
          <div className="flex gap-4">
            <div className="h-3 w-20 bg-slate-800/40 rounded animate-pulse"></div>
            <div className="h-3 w-28 bg-slate-800/40 rounded animate-pulse"></div>
            <div className="h-3 w-24 bg-slate-800/40 rounded animate-pulse"></div>
          </div>
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

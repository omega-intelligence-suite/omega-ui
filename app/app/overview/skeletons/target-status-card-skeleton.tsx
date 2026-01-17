import { FC } from "react";
import { Card } from "@/components/ui/card";

import { colors } from "@/config/colors";

export const TargetStatusCardSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900/50 p-6 border-white/10 rounded-xl relative overflow-hidden" style={{ backgroundColor: colors.card.background, borderColor: colors.card.border }}>
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line"></div>

      <div className="flex flex-col gap-6 relative">
        {/* Title */}
        <div>
          <div className="h-4 w-48 bg-slate-800/60 rounded animate-pulse"></div>
          <div className="h-3 w-56 bg-slate-800/40 rounded animate-pulse mt-2" style={{ animationDelay: '100ms' }}></div>
        </div>

        {/* Section Maturité Proche */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-emerald-900/30 animate-pulse"></div>
            <div className="space-y-1">
              <div className="h-4 w-32 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
              <div className="h-3 w-48 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>

          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-8 h-8 rounded-full bg-slate-800/50 animate-pulse flex-shrink-0" style={{ animationDelay: `${400 + i * 100}ms` }}></div>

                {/* Info & Progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-24 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${500 + i * 100}ms` }}></div>
                      <div className="h-3 w-12 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${600 + i * 100}ms` }}></div>
                    </div>
                    <div className="h-3 w-12 bg-emerald-900/40 rounded animate-pulse" style={{ animationDelay: `${700 + i * 100}ms` }}></div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-emerald-900/40 rounded-full animate-pulse"
                      style={{ width: `${70 + i * 10}%`, animationDelay: `${800 + i * 100}ms` }}
                    ></div>
                  </div>

                  {/* Prices */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${900 + i * 100}ms` }}></div>
                    <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${1000 + i * 100}ms` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Section Opportunités DCA */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-orange-900/30 animate-pulse"></div>
            <div className="space-y-1">
              <div className="h-4 w-36 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '1100ms' }}></div>
              <div className="h-3 w-44 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '1200ms' }}></div>
            </div>
          </div>

          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-8 h-8 rounded-full bg-slate-800/50 animate-pulse flex-shrink-0" style={{ animationDelay: `${1300 + i * 100}ms` }}></div>

                {/* Info & Progress */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-28 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${1400 + i * 100}ms` }}></div>
                      <div className="h-3 w-14 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${1500 + i * 100}ms` }}></div>
                    </div>
                    <div className="h-3 w-12 bg-orange-900/40 rounded animate-pulse" style={{ animationDelay: `${1600 + i * 100}ms` }}></div>
                  </div>

                  {/* Progress bar */}
                  <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden">
                    <div
                      className="absolute inset-y-0 left-0 bg-orange-900/40 rounded-full animate-pulse"
                      style={{ width: `${30 + i * 15}%`, animationDelay: `${1700 + i * 100}ms` }}
                    ></div>
                  </div>

                  {/* Prices */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${1800 + i * 100}ms` }}></div>
                    <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${1900 + i * 100}ms` }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scan-line {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(100, 116, 139, 0.08) 50%,
            transparent 100%
          );
          animation: scan 5s infinite;
          height: 100px;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
      `}</style>
    </Card>
  );
};

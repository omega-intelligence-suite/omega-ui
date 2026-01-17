import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const CryptoAssetCardSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor:"rgba(43, 48, 59, 0.5)"}}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 shimmer-effect"></div>

      <CardContent className="p-4 relative">
        <div className="space-y-3">
          {/* Header with icon and info */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              {/* Icon */}
              <div className="w-8 h-8 rounded-full bg-slate-800/60 animate-pulse"></div>
              
              {/* Asset info */}
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-24 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
                <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="h-3 w-20 bg-slate-800/30 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>

            {/* Action buttons and change */}
            <div className="flex gap-4 items-center">
              <div className="flex gap-2">
                <div className="w-4 h-4 rounded bg-slate-800/40 animate-pulse" style={{ animationDelay: '400ms' }}></div>
                <div className="w-4 h-4 rounded bg-slate-800/40 animate-pulse" style={{ animationDelay: '500ms' }}></div>
              </div>
              <div className="h-3 w-14 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '600ms' }}></div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col space-y-1.5 items-center">
                <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${700 + i * 100}ms` }}></div>
                <div className="h-4 w-20 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${800 + i * 100}ms` }}></div>
              </div>
            ))}
          </div>

          {/* Progress bar section */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '1100ms' }}></div>
              <div className="h-3 w-12 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '1200ms' }}></div>
            </div>
            <div className="w-full h-1 bg-slate-800/60 rounded-full overflow-hidden">
              <div className="h-full bg-slate-700/50 rounded-full progress-bar" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </CardContent>

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

        .progress-bar {
          animation: progress-pulse 2s ease-in-out infinite;
        }

        @keyframes progress-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </Card>
  );
};

import { FC } from "react";
import { Card } from "@/components/ui/card";

export const MarketAnalysisSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900 p-6 border-none relative overflow-hidden" style={{backgroundColor: "rgba(20, 24, 31, 0.5)", border:"1px solid rgba(0, 234, 255, 0.25)"}}>
      {/* Terminal dots decoration */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50 animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50 animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50 animate-pulse" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect"></div>

      <div className="flex flex-col justify-between h-full gap-4 relative">
        <div className="flex flex-col space-y-4">
          {/* Header section */}
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-slate-800/60 animate-pulse" style={{ animationDelay: '0ms' }}></div>
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-4 w-32 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
              <div className="h-3 w-44 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
            </div>
          </div>

          {/* Content lines */}
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
            <div className="h-3.5 w-[95%] bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '400ms' }}></div>
            <div className="h-3.5 w-[85%] bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '500ms' }}>
              {/* Typing cursor effect */}
              {/* <div className="inline-block w-1 h-3.5 ml-1 bg-cyan-500/60 animate-blink"></div> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <div className="h-6 w-24 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '600ms' }}></div>
          </div>
          {/* Footer */}
          <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '700ms' }}></div>
        </div>
      </div>

      <style>{`
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(0, 234, 255, 0.03) 50%,
            transparent 100%
          );
          animation: shimmer 3s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </Card>
  );
};

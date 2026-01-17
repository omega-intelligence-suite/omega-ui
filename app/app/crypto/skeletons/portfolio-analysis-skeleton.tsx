import { FC } from "react";
import { Card } from "@/components/ui/card";

export const PortfolioAnalysisSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900 p-6 border-none relative overflow-hidden" style={{backgroundColor: "rgba(153, 71, 235, 0.05)", border: "1px solid rgba(153, 71, 235, 0.25)"}}>
      {/* Terminal dots decoration */}
      <div className="absolute top-2 right-2 flex gap-1">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-700/50 animate-pulse" style={{ animationDelay: '0ms' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-purple-700/50 animate-pulse" style={{ animationDelay: '150ms' }}></div>
        <div className="w-1.5 h-1.5 rounded-full bg-purple-700/50 animate-pulse" style={{ animationDelay: '300ms' }}></div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line"></div>

      <div className="flex flex-col space-y-4 relative">
        {/* Header section */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-purple-900/40 animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-4 w-36 bg-purple-900/40 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
            <div className="h-3 w-48 bg-purple-900/30 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <div className="h-3.5 w-full bg-purple-900/30 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
          <div className="h-3.5 w-[90%] bg-purple-900/30 rounded animate-pulse" style={{ animationDelay: '400ms' }}>
          </div>
        </div>

        {/* Metrics badges */}
        <div className="flex flex-wrap gap-2">
          <div className="h-6 w-16 bg-purple-900/40 rounded animate-pulse" style={{ animationDelay: '500ms' }}></div>
          <div className="h-6 w-20 bg-purple-900/40 rounded animate-pulse" style={{ animationDelay: '600ms' }}></div>
          <div className="h-6 w-18 bg-purple-900/40 rounded animate-pulse" style={{ animationDelay: '700ms' }}></div>
          <div className="h-6 w-24 bg-purple-900/40 rounded animate-pulse" style={{ animationDelay: '800ms' }}></div>
        </div>

        {/* Footer */}
        <div className="h-3 w-32 bg-purple-900/30 rounded animate-pulse" style={{ animationDelay: '900ms' }}></div>
      </div>

      <style>{`
        .scan-line {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(153, 71, 235, 0.05) 50%,
            transparent 100%
          );
          animation: scan 4s infinite;
          height: 100px;
        }
        
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(400%); }
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

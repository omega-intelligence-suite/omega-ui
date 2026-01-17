import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const BankAssetCardSkeleton: FC = () => {
  return (
    <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor:"rgba(43, 48, 59, 0.5)"}}>
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line"></div>

      <CardContent className="p-4 relative">
        <div className="space-y-3">
          {/* Header with icon and info */}
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              {/* Icon */}
              <div className="w-8 h-8 rounded-full bg-slate-800/60 animate-pulse"></div>

              {/* Asset info */}
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-28 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
                <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
                <div className="h-3 w-24 bg-slate-800/30 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>

            {/* ROI */}
            <div className="flex gap-4 items-center">
              <div className="h-3 w-16 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '400ms' }}></div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col space-y-1.5 items-center">
                <div className="h-3 w-20 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${500 + i * 100}ms` }}></div>
                <div className="h-4 w-16 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${600 + i * 100}ms` }}></div>
              </div>
            ))}
          </div>

          {/* Progress bar section */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center">
              <div className="h-3 w-36 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '900ms' }}></div>
              <div className="h-3 w-12 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '1000ms' }}>
              </div>
            </div>
            <div className="w-full h-1 bg-slate-800/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-full" style={{ width: '55%', animation: 'slide 3s ease-in-out infinite' }}></div>
            </div>
          </div>
        </div>
      </CardContent>

      <style>{`
        .scan-line {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(100, 116, 139, 0.08) 50%,
            transparent 100%
          );
          animation: scan 5s infinite;
          height: 80px;
        }

        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }

        @keyframes slide {
          0%, 100% { transform: translateX(-10%); }
          50% { transform: translateX(10%); }
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

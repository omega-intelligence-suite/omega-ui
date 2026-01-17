import { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const NewsCardSkeleton: FC = () => {
  return (
    <Card
      className="bg-slate-900 border-slate-800 relative overflow-hidden"
      style={{backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor:"rgba(43, 48, 59, 0.5)"}}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 shimmer-effect"></div>

      <CardContent className="p-3 relative">
        <div className="space-y-2">
          {/* Impact score and sentiment badge */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="h-5 w-8 bg-slate-800/50 rounded animate-pulse"></div>
            <div className="h-5 w-16 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
          </div>
          
          {/* Title */}
          <div className="space-y-1">
            <div className="h-3.5 w-full bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="h-3.5 w-[85%] bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: '300ms' }}></div>
          </div>
          
          {/* Summary */}
          <div className="space-y-1">
            <div className="h-3 w-full bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '400ms' }}></div>
            <div className="h-3 w-[75%] bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '500ms' }}></div>
          </div>

          {/* Impact justification */}
          <div className="space-y-1">
            <div className="h-3 w-full bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '600ms' }}></div>
            <div className="h-3 w-[90%] bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '700ms' }}></div>
          </div>

          {/* Timestamp */}
          <div className="h-3 w-24 bg-slate-800/30 rounded animate-pulse" style={{ animationDelay: '800ms' }}></div>
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
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </Card>
  );
};

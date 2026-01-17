"use client";

import { FC, useState } from "react";
import { formatDistanceToNow } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { NewsCardSkeleton } from "../skeletons/news-card-skeleton";

import { colors } from "@/config/colors";

import type { NewsSignal } from "@/types/models";

export const NewsSection: FC<{ newsSignals: NewsSignal[] | null }> = ({ newsSignals }) => {
  return (
    <div className="border-t md:w-80 lg:border-l border-slate-800 flex flex-col lg:h-full">
      <div className="p-4 pt-8 pb-8 flex-shrink-0 backdrop-blur" style={{ backgroundColor: "transparent" }}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-slate-400 font-mono">MARKET NEWS</h3>
        </div>
      </div>
      <div className="lg:flex-1 lg:overflow-y-auto p-3 lg:min-h-0">
        {newsSignals === null || newsSignals === undefined ? (
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))}
          </div>
        ) : newsSignals.length > 0 ? (
          <div className="space-y-2">
            {newsSignals.map((signal: NewsSignal) => <NewsCard key={signal.id} signal={signal} />)}
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-slate-400 font-mono text-xs">NO SIGNALS</p>
              <p className="text-slate-500 text-xs mt-1">Monitoring...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NewsCard: FC<{ signal: NewsSignal }> = ({ signal }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowMore = signal.impact_justification && signal.impact_justification.length > 100;

  return (
    <Card
      key={signal.id}
      className="bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors"
      style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
    >
      <CardContent className="p-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-1.5 flex-wrap">
            <p className="text-sm" style={{ color: signal.impact_score > 7 ? colors.primary.green : signal.impact_score > 4 ? colors.primary.yellow : colors.primary.red }}>{signal.impact_score}</p>
            <div style={{
              border: "1px solid red", borderRadius: "4px", padding: "2px 6px 1px 6px",
              borderColor: signal.sentiment === "BULLISH" ? colors.primary.green : (signal.sentiment === "BEARISH" ? colors.primary.red : "gray"),
              backgroundColor: signal.sentiment === "BULLISH" ? "rgba(20, 235, 163, 0.1)" : (signal.sentiment === "BEARISH" ? "rgba(220, 40, 40, 0.1)" : "rgba(128, 128, 128, 0.1)"),
            }}>
              <p className="text-xs font-mono" style={{ color: signal.sentiment === "BULLISH" ? colors.primary.green : (signal.sentiment === "BEARISH" ? colors.primary.red : "gray") }}>{signal.sentiment}</p>
            </div>
          </div>
          <a
            href={signal.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-100 font-medium leading-tight line-clamp-2 hover:underline"
          >
            {signal.title}
          </a>
          <p className="text-xs text-slate-400 line-clamp-2">{signal.summary_short}</p>
          {signal.impact_justification && (
            <div>
              <p className={`text-xs text-slate-400 ${!isExpanded && shouldShowMore ? "line-clamp-2" : ""}`}>
                {signal.impact_justification}
              </p>
              {shouldShowMore && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-xs text-slate-500 hover:text-slate-300 font-mono mt-1 transition-colors"
                >
                  {isExpanded ? "← Show less" : "Show more →"}
                </button>
              )}
            </div>
          )}
          <p className="text-xs text-slate-500 font-mono">{formatDistanceToNow(new Date(signal.published_at), { addSuffix: true })}</p>
        </div>
      </CardContent>
    </Card>
  );
};

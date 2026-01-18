"use client";

import { CheckCircle2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Step {
  id: string;
  label: string;
  checked: boolean;
}

interface ProgressSidebarProps {
  steps: Step[];
  onToggle: (id: string) => void;
  className?: string;
}

export function ProgressSidebar({ steps, onToggle, className }: ProgressSidebarProps) {
  const completedCount = steps.filter((s) => s.checked).length;
  const progress = Math.round((completedCount / steps.length) * 100);

  return (
    <aside className={cn("w-full h-full bg-zinc-900/30 border-l border-zinc-800 p-6 flex flex-col", className)}>
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-zinc-100 font-mono uppercase tracking-wider mb-2">
          Launch Readiness
        </h3>
        <div className="flex items-end justify-between mb-2">
          <span className="text-4xl font-bold text-emerald-500 font-mono">{progress}%</span>
          <span className="text-xs text-zinc-500 font-mono mb-1">SYSTEM_CHECK</span>
        </div>
        <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {steps.map((step) => (
          <button
            key={step.id}
            onClick={() => onToggle(step.id)}
            className={cn(
              "w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all group",
              step.checked
                ? "bg-emerald-950/10 border-emerald-900/30"
                : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
            )}
          >
            <div className={cn(
              "mt-0.5 transition-colors",
              step.checked ? "text-emerald-500" : "text-zinc-600 group-hover:text-zinc-500"
            )}>
              {step.checked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
            </div>
            <span className={cn(
              "text-sm font-medium transition-colors",
              step.checked ? "text-emerald-400/80 line-through" : "text-zinc-300"
            )}>
              {step.label}
            </span>
          </button>
        ))}
      </div>

      {/* Footer Status */}
      <div className="mt-8 pt-6 border-t border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          ORBITAL_LINK_ESTABLISHED
        </div>
      </div>
    </aside>
  );
}

import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WarningBlockProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function WarningBlock({ title, children, className }: WarningBlockProps) {
  return (
    <div className={cn("rounded-lg border border-amber-900/50 bg-amber-950/10 p-4", className)}>
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-500 font-mono uppercase tracking-wider">
            {title}
          </h4>
          <div className="text-sm text-amber-200/80 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

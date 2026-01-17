"use client";

import { Terminal, ArrowRight, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function FinalCTA() {
  const [copied, setCopied] = useState(false);
  const command = " && cd omega-core && ./setup.sh";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-omega-green/5 rounded-full blur-[120px] opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 font-sans">
          Ready to Architect Your Wealth?
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-sans">
          No subscriptions. No data harvesting. Just raw, sovereign financial intelligence running on your hardware.
        </p>

        {/* Terminal Block */}
        <div className="max-w-2xl mx-auto bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden shadow-2xl mb-10 text-left">
          <div className="flex items-center justify-between px-4 py-3 bg-zinc-950 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-zinc-500 font-mono">bash — 80x24</div>
          </div>
          <div className="p-6 font-mono text-sm relative group">
            <div className="flex items-start gap-3 text-zinc-300">
              <span className="text-omega-green select-none">$</span>
              <p className="break-all">git clone https://github.com/omega-intelligence-suite/omega-core.git</p>
            </div>
            <div className="flex items-start gap-3 text-zinc-300">
              <span className="text-omega-green select-none">$</span>
              <p className="break-all">cd omega-core && ./setup.sh</p>
            </div>

            <button
              onClick={handleCopy}
              className="absolute top-4 right-4 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all opacity-0 group-hover:opacity-100"
            >
              {copied ? <Check className="w-4 h-4 text-omega-green" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="https://github.com/omega-intelligence-suite/omega-core"
            target="_blank"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg bg-omega-green text-zinc-950 font-bold text-lg overflow-hidden transition-all hover:bg-emerald-400 w-full sm:w-auto"
          >
            <Terminal className="w-5 h-5" />
            <span className="relative z-10">View on GitHub</span>
          </Link>

          <Link
            href="/app/overview"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm font-medium text-lg text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white hover:border-zinc-700 w-full sm:w-auto"
          >
            Enter Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <p className="mt-8 text-sm text-zinc-500 font-mono">
          MIT License. Open Source. Forever Free.
        </p>
      </div>
    </section>
  );
}

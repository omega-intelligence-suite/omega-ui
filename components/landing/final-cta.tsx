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
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 font-mono">
          The 2026-2030 window is open.
        </h2>
        <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto font-sans">
          Stop tracking. Start executing. Deploy your private wealth engine today.
        </p>

        {/* Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/deploy"
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 rounded-lg bg-omega-green text-zinc-950 font-bold text-xl overflow-hidden transition-all hover:bg-emerald-400 w-full sm:w-auto shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
          >
            <Terminal className="w-6 h-6" />
            <span className="relative z-10">Execute Deployment Mission</span>
          </Link>
        </div>

        <p className="mt-8 text-sm text-zinc-500 font-mono">
          MIT License. Open Source. Forever Free.
        </p>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Rocket } from "lucide-react";

interface MissionLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export function MissionLayout({ children, sidebar }: MissionLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-omega-green/30 flex flex-col md:flex-row">

      {/* Main Content Area (60-70%) */}
      <main className="flex-1 flex flex-col min-h-screen relative">
        {/* Navigation Header */}
        <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Abort Mission</span>
          </Link>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800">
            <Rocket className="w-3 h-3 text-omega-green" />
            <span className="text-xs font-mono text-zinc-300">ORBITAL 1: FOUNDATION</span>
          </div>
        </nav>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
            {children}
          </div>
        </div>
      </main>

      {/* Sidebar (40-30%) - Hidden on mobile, fixed on desktop */}
      <div className="hidden md:block w-96 h-screen sticky top-0 border-l border-zinc-900">
        {sidebar}
      </div>
    </div>
  );
}

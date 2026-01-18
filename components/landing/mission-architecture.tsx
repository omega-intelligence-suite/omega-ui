"use client";

import { Database, Server, Shield, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function MissionArchitecture() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-4 font-sans">
            The Sovereign Stack
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto font-sans">
            Your wealth engine is built on three pillars of independence. No black boxes. No third-party custody.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Cell 1: Cloud */}
          <div className="group relative p-8 rounded-2xl border border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 transition-colors">
                <Database className="w-6 h-6 text-emerald-500" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-mono">01. Forge Cloud</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Provision your private Supabase instance. Total data residency. You hold the keys to your financial vault.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                POSTGRESQL RLS
              </div>
            </div>
          </div>

          {/* Cell 2: Core */}
          <div className="group relative p-8 rounded-2xl border border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 transition-colors">
                <Server className="w-6 h-6 text-emerald-500" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-mono">02. Ignite Core</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Deploy the Dockerized engine on your local hardware (Pi/VPS). The brain that processes your wealth trajectory.
              </p>

              <div className="bg-zinc-950 rounded border border-zinc-800 p-3 font-mono text-xs text-zinc-400 group-hover:border-zinc-700 transition-colors">
                <span className="text-emerald-500">$</span> docker-compose up -d
              </div>
            </div>
          </div>

          {/* Cell 3: Alerts */}
          <div className="group relative p-8 rounded-2xl border border-zinc-900 bg-zinc-900/30 hover:bg-zinc-900/50 hover:border-zinc-800 transition-all duration-300 hover:scale-[1.02]">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-emerald-500/30 transition-colors">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 font-mono">03. Secure Comms</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Connect Telegram & Groq for encrypted intelligence reports. Receive alpha directly to your device.
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                E2E ENCRYPTED
              </div>
            </div>
          </div>

        </div>

        {/* Footer CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/deploy"
            className="inline-flex items-center gap-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors hover:underline underline-offset-4 group"
          >
            Initiate Launch Sequence
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}

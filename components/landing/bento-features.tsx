"use client";

import {
  Server,
  Shield,
  Cpu,
  Database,
  Lock,
  Zap,
  Globe,
  Code
} from "lucide-react";

import { colors } from "@/config";

const features = [
  {
    title: "Sovereign Execution",
    description: "Your engine runs on your metal. Deploy OMEGA-Core on Raspberry Pi, NAS, or VPS via Docker. No black boxes.",
    icon: Server,
    className: "md:col-span-2",
    gradient: "from-zinc-800 to-zinc-900",
    iconColor: "text-omega-green",
    borderColor: "border-zinc-800",
  },
  {
    title: "AI-Driven Alpha",
    description: "Groq-powered intelligence correlates real-time news (CryptoPanic, Finnhub) with your portfolio performance.",
    icon: Cpu,
    className: "md:col-span-1",
    gradient: "from-zinc-900 to-zinc-950",
    iconColor: "text-omega-purple",
    borderColor: "border-zinc-800",
  },
  {
    title: "Institutional Privacy",
    description: "Bank-grade security via Supabase RLS. Your data is encrypted, isolated, and accessible only by you.",
    icon: Lock,
    className: "md:col-span-1",
    gradient: "from-zinc-900 to-zinc-950",
    iconColor: "text-blue-400",
    borderColor: "border-zinc-800",
  },
  {
    title: "The Cloud Foundation",
    description: "A robust PostgreSQL backbone ensures data persistence and historical snapshots for your 2035 trajectory.",
    icon: Database,
    className: "md:col-span-2",
    gradient: "from-zinc-800 to-zinc-900",
    iconColor: "text-emerald-400",
    borderColor: "border-zinc-800",
  },
];

export function BentoFeatures() {
  return (
    <section id="features" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm mb-6">
            <Code className="w-4 h-4 text-zinc-400" />
            <span className="text-xs font-mono font-medium text-zinc-400 tracking-tight">
              INFRASTRUCTURE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6 font-sans">
            The Stack. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-500">
              Engineered for Sovereignty.
            </span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-sans">
            A hybrid architecture combining local execution with cloud persistence.
            You own the engine. You own the data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative rounded-2xl border ${feature.borderColor} bg-zinc-900/50 p-8 hover:bg-zinc-900 transition-all duration-300 ${feature.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 font-sans tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-zinc-400 leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Tech Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Server className="w-4 h-4" /> Docker
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Database className="w-4 h-4" /> Supabase
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Cpu className="w-4 h-4" /> Groq AI
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Globe className="w-4 h-4" /> Next.js
          </div>
          <div className="flex items-center gap-2 text-zinc-500 font-mono text-sm">
            <Zap className="w-4 h-4" /> Python
          </div>
        </div>
      </div>
    </section>
  );
}

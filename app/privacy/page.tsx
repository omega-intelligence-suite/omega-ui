"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Server, Lock, Database, Globe } from "lucide-react";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-omega-green/30">
      {/* Navigation */}
      <nav className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Return to OMEGA</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-omega-green animate-pulse" />
            <span className="text-xs font-mono text-omega-green">SOVEREIGNTY_MODE: ACTIVE</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-6">
            <Shield className="w-4 h-4 text-omega-green" />
            <span className="text-xs font-mono text-zinc-400">LEGAL_PROTOCOL_V1.0</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Privacy & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-omega-green to-emerald-500">
              Data Sovereignty Policy
            </span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            OMEGA is not a service. It is a tool. We provide the code; you provide the infrastructure.
            This architecture ensures that <span className="text-white font-medium">we cannot see, store, or sell your data</span> because we never touch it.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-16">

          {/* Manifesto */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Server className="w-6 h-6 text-zinc-500" />
              Data Sovereignty Manifesto
            </h2>
            <div className="prose prose-invert prose-zinc max-w-none">
              <p className="text-zinc-300 text-lg leading-relaxed">
                Privacy is not a setting; it is the architecture. OMEGA operates on a <span className="text-omega-green font-mono">Zero-Knowledge</span> basis regarding your financial life.
              </p>
              <div className="mt-6 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <p className="font-mono text-sm text-emerald-400 mb-2">// THE CORE PRINCIPLE</p>
                <p className="text-white font-medium text-lg">
                  "Your data never touches our servers because OMEGA does not operate servers for your financial data."
                </p>
              </div>
            </div>
          </section>

          {/* Data Processing */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-6 h-6 text-zinc-500" />
              User-Managed Data Processing
            </h2>
            <p className="text-zinc-400 mb-6">
              All data processing occurs within your personal infrastructure. You are the Data Controller and the Data Processor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-white font-bold mb-3 font-mono">OMEGA-CORE (Docker)</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li className="flex gap-2"><span className="text-omega-green">✓</span> API Keys (Binance, OpenAI, etc.)</li>
                  <li className="flex gap-2"><span className="text-omega-green">✓</span> Raw Financial Balances</li>
                  <li className="flex gap-2"><span className="text-omega-green">✓</span> Asset Tickers & Allocations</li>
                </ul>
                <p className="mt-4 text-xs text-zinc-500">
                  Resides on your hardware (Raspberry Pi, VPS, Localhost).
                </p>
              </div>
              <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800">
                <h3 className="text-white font-bold mb-3 font-mono">OMEGA-CLOUD (Supabase)</h3>
                <ul className="space-y-2 text-zinc-400 text-sm">
                  <li className="flex gap-2"><span className="text-omega-green">✓</span> Historical Snapshots</li>
                  <li className="flex gap-2"><span className="text-omega-green">✓</span> User Authentication (Auth)</li>
                  <li className="flex gap-2"><span className="text-omega-green">✓</span> Row Level Security (RLS) Policies</li>
                </ul>
                <p className="mt-4 text-xs text-zinc-500">
                  Hosted in your personal Supabase project.
                </p>
              </div>
            </div>
          </section>

          {/* Third Party */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Globe className="w-6 h-6 text-zinc-500" />
              Third-Party API Integration
            </h2>
            <p className="text-zinc-400 mb-6">
              OMEGA acts as a bridge between your local environment and external services. These connections are direct and do not pass through OMEGA infrastructure.
            </p>

            <div className="space-y-6">
              <div className="border-l-2 border-zinc-800 pl-6">
                <h3 className="text-white font-bold mb-2">Supabase (BaaS)</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  You contract directly with Supabase. Your database credentials (<span className="font-mono text-xs bg-zinc-900 px-1 py-0.5 rounded">service_role_key</span>, <span className="font-mono text-xs bg-zinc-900 px-1 py-0.5 rounded">anon_key</span>) are stored in your local <span className="font-mono text-xs bg-zinc-900 px-1 py-0.5 rounded">.env</span> file. OMEGA has no access to your instance.
                </p>
              </div>

              <div className="border-l-2 border-zinc-800 pl-6">
                <h3 className="text-white font-bold mb-2">Groq & LLMs</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  When using AI features, data sent for analysis (e.g., "Summarize this portfolio performance") is transmitted directly from your <span className="font-mono text-xs bg-zinc-900 px-1 py-0.5 rounded">omega-core</span> container to the provider (Groq, OpenAI). This data is subject to your personal API agreement with those providers.
                </p>
              </div>

              <div className="border-l-2 border-zinc-800 pl-6">
                <h3 className="text-white font-bold mb-2">Exchanges & Market Data</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  The Engine queries exchanges (Binance, Coinbase) and data providers (Yahoo Finance) directly from your IP address. No proxy servers are used.
                </p>
              </div>
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-6 h-6 text-zinc-500" />
              Security Responsibility
            </h2>
            <div className="bg-amber-900/10 border border-amber-900/20 rounded-xl p-6">
              <p className="text-amber-200/80 text-sm leading-relaxed">
                <strong>Shared Responsibility Model:</strong> OMEGA provides secure code patterns (RLS, Environment Variable management), but you are responsible for:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-amber-200/60 text-sm">
                <li>Securing the hardware running <span className="font-mono">omega-core</span>.</li>
                <li>Managing access to your Supabase project.</li>
                <li>Keeping your API keys private and rotating them if compromised.</li>
                <li>Ensuring your Docker container is not exposed to the public internet without proper safeguards (VPN, Reverse Proxy).</li>
              </ul>
            </div>
          </section>

          {/* GDPR */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">GDPR & Data Rights</h2>
            <p className="text-zinc-400 mb-6">
              Under GDPR, you have the Right to Access, Rectify, and Erase your data. In the OMEGA architecture, these rights are intrinsically fulfilled by your ownership:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <h4 className="text-white font-bold mb-2 text-sm">Right to Access</h4>
                <p className="text-zinc-500 text-xs">You have direct SQL access to your entire database via Supabase.</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <h4 className="text-white font-bold mb-2 text-sm">Right to Rectify</h4>
                <p className="text-zinc-500 text-xs">You can modify any record directly in your database tables.</p>
              </div>
              <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                <h4 className="text-white font-bold mb-2 text-sm">Right to Erasure</h4>
                <p className="text-zinc-500 text-xs">Deleting your Supabase project permanently destroys all data.</p>
              </div>
            </div>
          </section>

          {/* Footer Clause */}
          <section className="border-t border-zinc-900 pt-10">
            <p className="text-zinc-500 text-sm">
              <strong>Changes to this Policy:</strong> While our core architecture of "Zero-Knowledge" will not change, we may update this document to reflect new features or legal requirements. Check this page periodically.
            </p>
            <p className="text-zinc-600 text-xs mt-4 font-mono">
              Last Updated: January 2026
            </p>
          </section>

        </div>
      </div>

      <LandingFooter />
    </main>
  );
}

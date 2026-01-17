"use client";

import Link from "next/link";
import { ArrowLeft, Shield, Lock, Server, Eye, Key, Database, Cpu } from "lucide-react";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function Security() {
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
            <span className="text-xs font-mono text-omega-green">SYSTEM_STATUS: SECURE</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-24">
        {/* Header */}
        <header className="mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 mb-6">
            <Shield className="w-4 h-4 text-omega-green" />
            <span className="text-xs font-mono text-zinc-400">INFRASTRUCTURE_AUDIT</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            Hardened <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-omega-green to-emerald-500">
              Infrastructure
            </span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            OMEGA is built on a "Zero-Trust, Zero-Knowledge" architecture.
            We assume the network is hostile and design accordingly.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-16">

          {/* Zero-Knowledge Architecture */}
          <section className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                <Eye className="w-6 h-6 text-omega-green" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white mb-2 font-mono">ZERO_KNOWLEDGE_ARCHITECTURE</h2>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  The OMEGA Engine (<span className="font-mono text-xs text-emerald-400">omega-core</span>) runs entirely on your local hardware.
                  Your API secrets (Binance, Groq, OpenAI) are stored in a local <span className="font-mono text-xs text-emerald-400">.env</span> file
                  that never leaves your machine.
                </p>
                <div className="flex gap-2 text-xs font-mono text-zinc-500">
                  <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">NO_CLOUD_KEY_STORAGE</span>
                  <span className="px-2 py-1 bg-zinc-900 rounded border border-zinc-800">LOCAL_EXECUTION</span>
                </div>
              </div>
            </div>
          </section>

          {/* Technical Specs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* RLS */}
            <div className="p-6 rounded-xl bg-zinc-900/20 border border-zinc-800 hover:border-omega-green/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-zinc-400" />
                <h3 className="font-bold text-white font-mono">POSTGRESQL_RLS</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Row Level Security ensures data isolation at the database engine level.
                Even if a query is injected, it cannot return rows that do not match the <span className="font-mono text-xs text-emerald-400">auth.uid()</span> of the requester.
              </p>
              <div className="text-xs font-mono text-zinc-500">
                POLICY: "Users can only select their own rows"
              </div>
            </div>

            {/* Docker Isolation */}
            <div className="p-6 rounded-xl bg-zinc-900/20 border border-zinc-800 hover:border-omega-green/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Server className="w-5 h-5 text-zinc-400" />
                <h3 className="font-bold text-white font-mono">DOCKER_ISOLATION</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                The Core engine runs in a sandboxed container. It has no access to your host filesystem beyond the specific bind mounts you explicitly configure.
              </p>
              <div className="text-xs font-mono text-zinc-500">
                CONTAINER: "omega-core:latest"
              </div>
            </div>

            {/* JWT Auth */}
            <div className="p-6 rounded-xl bg-zinc-900/20 border border-zinc-800 hover:border-omega-green/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Key className="w-5 h-5 text-zinc-400" />
                <h3 className="font-bold text-white font-mono">JWT_AUTHENTICATION</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                Communication between the UI and the Cloud is secured via short-lived JSON Web Tokens.
                Tokens are rotated automatically and signed by Supabase's Auth service.
              </p>
              <div className="text-xs font-mono text-zinc-500">
                STANDARD: "RFC 7519"
              </div>
            </div>

            {/* Auditability */}
            <div className="p-6 rounded-xl bg-zinc-900/20 border border-zinc-800 hover:border-omega-green/30 transition-colors">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-zinc-400" />
                <h3 className="font-bold text-white font-mono">FULL_AUDITABILITY</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                OMEGA is open source. You don't have to trust us. You can verify every line of code
                that handles your wealth data before you deploy it.
              </p>
              <div className="text-xs font-mono text-zinc-500">
                LICENSE: "MIT"
              </div>
            </div>

          </div>

          {/* Encryption Standards */}
          <section>
            <h2 className="text-xl font-bold text-white mb-6 font-mono">ENCRYPTION_STANDARDS</h2>
            <div className="overflow-hidden rounded-xl border border-zinc-800">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-900 text-zinc-400 font-mono">
                  <tr>
                    <th className="p-4 font-medium">LAYER</th>
                    <th className="p-4 font-medium">TECHNOLOGY</th>
                    <th className="p-4 font-medium">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                  <tr>
                    <td className="p-4 text-white font-medium">Data at Rest</td>
                    <td className="p-4 text-zinc-400 font-mono">AES-256 (Supabase)</td>
                    <td className="p-4 text-emerald-400 font-mono">ACTIVE</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-white font-medium">Data in Transit</td>
                    <td className="p-4 text-zinc-400 font-mono">TLS 1.3</td>
                    <td className="p-4 text-emerald-400 font-mono">ACTIVE</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-white font-medium">API Secrets</td>
                    <td className="p-4 text-zinc-400 font-mono">Local Environment Variables</td>
                    <td className="p-4 text-emerald-400 font-mono">ISOLATED</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>

      <LandingFooter />
    </main>
  );
}

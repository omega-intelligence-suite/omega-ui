"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Database, Key, Server, Shield } from "lucide-react";
import { MissionLayout } from "@/components/deploy/mission-layout";
import { ProgressSidebar, Step } from "@/components/deploy/progress-sidebar";
import { CodeBlock } from "@/components/deploy/code-block";
import { WarningBlock } from "@/components/deploy/warning-block";

const INITIAL_STEPS: Step[] = [
  { id: "supabase-project", label: "Create Supabase Project", checked: false },
  { id: "env-vars", label: "Secure API Credentials", checked: false },
  { id: "schema-ignition", label: "Execute Schema Ignition", checked: false },
  { id: "rls-policy", label: "Activate RLS Policies", checked: false },
];

export default function DeploymentMission() {
  const [steps, setSteps] = useState(INITIAL_STEPS);

  const handleToggle = (id: string) => {
    setSteps(steps.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const allCompleted = steps.every(s => s.checked);

  return (
    <MissionLayout
      sidebar={<ProgressSidebar steps={steps} onToggle={handleToggle} />}
    >
      <div className="space-y-12">

        {/* Header */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Orbital 1: <span className="text-transparent bg-clip-text bg-gradient-to-r from-omega-green to-emerald-500">Foundation</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Establish your sovereign cloud perimeter. In this phase, we provision the database that will serve as the vault for your financial intelligence.
          </p>
        </div>

        <hr className="border-zinc-800" />

        {/* Phase 1.1: The Sovereign Cloud */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              <Database className="w-6 h-6 text-omega-green" />
            </div>
            <h2 className="text-2xl font-bold text-white">Phase 1.1: The Sovereign Cloud</h2>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <p>
              OMEGA requires a PostgreSQL database to store your historical snapshots and user settings.
              We use <strong>Supabase</strong> because it provides an open-source, production-grade Postgres instance with built-in Auth and APIs.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-zinc-300 marker:text-emerald-500">
              <li>Navigate to <Link href="https://database.new" target="_blank" className="text-emerald-400 hover:underline">database.new</Link> to create a new project.</li>
              <li>Select the region physically closest to your server (Raspberry Pi / VPS) to minimize latency.</li>
              <li>Set a strong database password and store it in your password manager.</li>
            </ol>
          </div>

          <WarningBlock title="CRITICAL: API CREDENTIALS">
            <p className="mb-2">Once your project is created, go to <strong>Project Settings &gt; API</strong>.</p>
            <p>You need to copy two values:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-amber-100/70">
              <li><strong>Project URL</strong> (e.g., https://xyz.supabase.co)</li>
              <li><strong>service_role key</strong> (This is your "Master Key". Never share it.)</li>
            </ul>
          </WarningBlock>
        </section>

        {/* Phase 1.2: Schema Ignition */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-zinc-900 rounded-lg border border-zinc-800">
              <Server className="w-6 h-6 text-omega-green" />
            </div>
            <h2 className="text-2xl font-bold text-white">Phase 1.2: Schema Ignition</h2>
          </div>

          <div className="prose prose-invert prose-zinc max-w-none">
            <p>
              Now we must define the structure of your vault. Navigate to the <strong>SQL Editor</strong> in your Supabase dashboard and execute the following block.
            </p>
            <p>
              This script creates the necessary tables (`assets`, `user_assets`) and enables Row Level Security (RLS) to ensure your data remains private.
            </p>
          </div>

          <CodeBlock
            language="sql"
            command={`-- 1. Enable RLS
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_assets ENABLE ROW LEVEL SECURITY;

-- 2. Create Tables (Simplified)
CREATE TABLE IF NOT EXISTS public.user_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  symbol TEXT NOT NULL,
  balance NUMERIC DEFAULT 0,
  type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create Security Policies
CREATE POLICY "Users can only access own data" ON public.assets 
FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can only access own user_assets" ON public.user_assets 
FOR ALL USING (auth.uid() = user_id);`}
          />
        </section>

        {/* Navigation */}
        <div className="pt-12 flex items-center justify-between">
          <button disabled className="px-6 py-3 rounded-lg border border-zinc-800 text-zinc-600 cursor-not-allowed font-mono text-sm">
            &lt; PREVIOUS ORBITAL
          </button>

          <button
            className={`px-8 py-3 rounded-lg font-bold text-sm font-mono flex items-center gap-2 transition-all ${allCompleted
                ? "bg-omega-green text-zinc-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
                : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
              }`}
          >
            NEXT ORBITAL &gt;
          </button>
        </div>

      </div>
    </MissionLayout>
  );
}

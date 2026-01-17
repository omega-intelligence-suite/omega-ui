'use client';

import { Shield, Lock, Server, Key, Database, CheckCircle2 } from 'lucide-react';

export function SecuritySection() {
  const securityFeatures = [
    {
      icon: Server,
      title: 'Self-Hostable',
      description: 'Deploy on your Raspberry Pi or any Linux server. Total infrastructure control.',
    },
    {
      icon: Database,
      title: 'Supabase RLS',
      description: 'Row-Level Security ensures your data is isolated and encrypted at rest.',
    },
    {
      icon: Key,
      title: 'API Key Control',
      description: 'You manage your exchange API keys. No third-party intermediaries.',
    },
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All sensitive data encrypted before storage. Zero-knowledge architecture.',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-omega-purple/20 bg-omega-purple/10 backdrop-blur-sm">
              <Shield className="w-4 h-4 text-omega-purple" />
              <span className="text-sm font-medium text-omega-purple">
                Security & Privacy
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter">
                <span className="text-slate-100">Your Data.</span>
                <br />
                <span className="bg-gradient-to-r from-omega-purple to-indigo-400 bg-clip-text text-transparent">
                  Your Fortress.
                </span>
              </h2>
              <p className="text-xl text-slate-400 leading-relaxed font-inter">
                Built with a privacy-first philosophy. No compromises, no backdoors, no surveillance.
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-slate-300 leading-relaxed font-inter">
              <p>
                In an era of data breaches and centralized vulnerabilities,
                <span className="text-omega-purple font-semibold"> OMEGA</span> gives you
                complete control over your financial intelligence.
              </p>

              <p>
                Deploy the entire stack on your infrastructure. Your portfolio data never
                leaves your perimeter. <span className="text-slate-100 font-semibold">Your wealth, your rules.</span>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-omega-green" />
                <span className="text-sm text-slate-300">Open Source Ready</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-omega-green" />
                <span className="text-sm text-slate-300">SOC 2 Compliant</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-omega-green" />
                <span className="text-sm text-slate-300">GDPR Aligned</span>
              </div>
            </div>
          </div>

          {/* Right: Security Features Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group relative rounded-xl border border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-omega-purple/30 hover:scale-105"
                  >
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-omega-purple/0 to-indigo-500/0 group-hover:from-omega-purple/10 group-hover:to-indigo-500/10 rounded-xl transition-all duration-300" />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-4">
                        <div className="inline-flex p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 group-hover:border-omega-purple/30 transition-colors">
                          <Icon className="w-5 h-5 text-omega-purple" />
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-base font-bold tracking-tight text-slate-100 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed font-inter">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Decorative glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-omega-purple/20 to-indigo-500/20 blur-3xl -z-10 opacity-30" />
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/50 to-slate-950/50 backdrop-blur-sm p-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 p-3 rounded-full bg-omega-purple/10 border border-omega-purple/20">
                <Lock className="w-6 h-6 text-omega-purple" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold tracking-tight text-slate-100">Zero-Knowledge Architecture</h3>
                <p className="text-sm text-slate-400 font-inter">We can't access your data even if we wanted to</p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 hover:border-omega-purple/30 transition-all"
            >
              Read Security Docs
              <span className="text-omega-purple">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

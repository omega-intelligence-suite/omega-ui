'use client';

import { Github, Twitter, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900 bg-zinc-950 px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-omega-green to-omega-purple flex items-center justify-center shadow-lg shadow-omega-green/10">
                <span className="text-white font-bold text-xl font-sans">Ω</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-white font-sans">OMEGA</span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm font-sans">
              Your Wealth Operating System. Engineered for strategic accumulation on the 2026-2035 cycle.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="inline-flex p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-zinc-400 group-hover:text-omega-green transition-colors" />
              </a>
              <a
                href="#"
                className="inline-flex p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-omega-green transition-colors" />
              </a>
              <a
                href="#"
                className="inline-flex p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all group"
                aria-label="Email"
              >
                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-omega-green transition-colors" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold tracking-tight text-white mb-4 font-sans">Product</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-sm text-zinc-400 hover:text-omega-green transition-colors font-sans">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/app/overview" className="text-sm text-zinc-400 hover:text-omega-green transition-colors font-sans">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/app/analysis" className="text-sm text-zinc-400 hover:text-omega-green transition-colors font-sans">
                  Analytics
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-omega-green transition-colors font-sans">
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold tracking-tight text-white mb-4 font-sans">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-omega-purple transition-colors inline-flex items-center gap-1 font-sans">
                  Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-omega-purple transition-colors inline-flex items-center gap-1 font-sans">
                  API Reference
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-omega-purple transition-colors font-sans">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-zinc-400 hover:text-omega-purple transition-colors font-sans">
                  Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500 font-mono">
            © {currentYear} OMEGA. Built with precision and discipline.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-mono">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-mono">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors font-mono">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

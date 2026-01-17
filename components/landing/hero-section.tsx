"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

import { colors } from "@/config";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8" style={{ backgroundColor: colors.card.background }}>
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Built for the 2026-2030 cycle
          </span>
        </div>

        {/* Main heading with gradient */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          <span className="block mb-2">Your Wealth</span>
          <span className="block bg-gradient-to-r from-primary via-blue-400 to-primary bg-clip-text text-transparent animate-gradient">
            Operating System
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          Strategic accumulation engineered for the next cycle.{" "}
          <span className="text-foreground font-semibold">No trading, no noise.</span>
          {" "}Just disciplined growth toward 1M€ by 2035.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app/overview"
            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
          >
            <span className="relative z-10">Get Early Access</span>
            <ArrowRight className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="#features"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm font-semibold text-lg transition-all hover:bg-white/10 hover:border-white/20"
          >
            Explore Features
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10">
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">1M€</div>
            <div className="text-sm text-muted-foreground">Target 2035</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Privacy First</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">Multi</div>
            <div className="text-sm text-muted-foreground">Asset Class</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">AI</div>
            <div className="text-sm text-muted-foreground">Powered Insights</div>
          </div>
        </div>
      </div>
    </section>
  );
}

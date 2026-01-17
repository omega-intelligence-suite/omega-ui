"use client"

import { Header } from "@/components/ui/header"
import { Sidebar } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"

import { colors } from "@/config"

export function SettingsSimpleSkeleton() {
  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:min-h-0">
        <Sidebar />
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-6">

            {/* Page Title Skeleton */}
            <div className="space-y-2">
              <div className="h-8 w-64 bg-slate-800/60 rounded animate-pulse"></div>
              <div className="h-4 w-80 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: "100ms" }}></div>
            </div>

            {/* Asset Management Table Skeleton */}
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
              <div className="absolute inset-0 shimmer-effect"></div>
              <CardContent className="p-6 relative">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="h-4 w-32 bg-slate-800/60 rounded animate-pulse"></div>
                  <div className="h-9 w-36 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: "100ms" }}></div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-8 w-20 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 50}ms` }}></div>
                  ))}
                </div>

                {/* Table Header */}
                <div className="border-b border-white/10 pb-3 mb-4">
                  <div className="grid grid-cols-8 gap-4">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="h-3 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 50}ms` }}></div>
                    ))}
                  </div>
                </div>

                {/* Table Rows */}
                {[...Array(6)].map((_, rowIndex) => (
                  <div key={rowIndex} className="border-b border-white/5 py-3">
                    <div className="grid grid-cols-8 gap-4 items-center">
                      <div className="h-4 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 100}ms` }}></div>
                      <div className="h-4 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 100 + 50}ms` }}></div>
                      <div className="h-5 w-20 bg-slate-800/50 rounded-full animate-pulse" style={{ animationDelay: `${rowIndex * 100 + 100}ms` }}></div>
                      <div className="h-5 w-16 bg-slate-800/50 rounded-full animate-pulse" style={{ animationDelay: `${rowIndex * 100 + 150}ms` }}></div>
                      <div className="h-4 bg-slate-800/50 rounded animate-pulse ml-auto" style={{ animationDelay: `${rowIndex * 100 + 200}ms` }}></div>
                      <div className="h-4 bg-slate-800/50 rounded animate-pulse ml-auto" style={{ animationDelay: `${rowIndex * 100 + 250}ms` }}></div>
                      <div className="h-4 bg-slate-800/50 rounded animate-pulse ml-auto" style={{ animationDelay: `${rowIndex * 100 + 300}ms` }}></div>
                      <div className="flex gap-2 justify-end">
                        <div className="h-4 w-10 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 100 + 350}ms` }}></div>
                        <div className="h-4 w-12 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${rowIndex * 100 + 400}ms` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}

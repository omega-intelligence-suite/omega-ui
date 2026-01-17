"use client"

import { Header } from "@/components/ui/header"
import { Sidebar } from "@/components/ui/sidebar"
import { Card, CardContent } from "@/components/ui/card"

import { colors } from "@/config"

export function MonitoringSkeleton() {
  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col md:flex-row md:overflow-hidden md:min-h-0">
        <Sidebar />
        <div className="flex-1 md:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Page Title Skeleton */}
            <div className="space-y-2">
              <div className="h-8 w-64 bg-slate-800/60 rounded animate-pulse"></div>
              <div className="h-4 w-96 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: "100ms" }}></div>
            </div>

            {/* System Health Section */}
            <section className="space-y-4">
              <div className="h-5 w-48 bg-slate-800/60 rounded animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                    <div className="absolute inset-0 shimmer-effect"></div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                          <div className="h-3 w-28 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }}></div>
                        </div>
                        <div className="w-2 h-2 bg-slate-800/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                      </div>
                      <div className="h-8 w-24 bg-slate-800/60 rounded animate-pulse mb-2" style={{ animationDelay: `${i * 100 + 150}ms` }}></div>
                      <div className="h-3 w-20 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 200}ms` }}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* AI Agents Section */}
            <section className="space-y-4">
              <div className="h-5 w-40 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: "300ms" }}></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                    <div className="absolute inset-0 shimmer-effect"></div>
                    <CardContent className="p-4 relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                        <div className="h-3 w-24 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }}></div>
                      </div>
                      <div className="h-6 w-20 bg-slate-800/60 rounded animate-pulse mb-2" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                      <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 150}ms` }}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Portfolio Monitoring Section */}
            <section className="space-y-4">
              <div className="h-5 w-56 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: "600ms" }}></div>
              <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                <div className="absolute inset-0 shimmer-effect"></div>
                <CardContent className="p-6 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {[...Array(2)].map((_, i) => (
                      <Card key={i} className="bg-slate-800/30 border-slate-700/50 relative overflow-hidden">
                        <div className="absolute inset-0 shimmer-effect"></div>
                        <CardContent className="p-4 relative">
                          <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse mb-2" style={{ animationDelay: `${i * 100}ms` }}></div>
                          <div className="h-8 w-24 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {/* Logs */}
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-2 rounded bg-slate-800/20">
                        <div className="w-2 h-2 bg-slate-800/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 50}ms` }}></div>
                        <div className="h-3 w-32 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 50 + 50}ms` }}></div>
                        <div className="h-3 flex-1 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 50 + 100}ms` }}></div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* News Monitoring Section */}
            <section className="space-y-4">
              <div className="h-5 w-48 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: "900ms" }}></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                    <div className="absolute inset-0 shimmer-effect"></div>
                    <CardContent className="p-6 relative">
                      <div className="h-3 w-24 bg-slate-800/40 rounded animate-pulse mb-2" style={{ animationDelay: `${i * 100}ms` }}></div>
                      <div className="h-8 w-32 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Source Distribution */}
            <section>
              <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                <div className="absolute inset-0 shimmer-effect"></div>
                <CardContent className="p-6 relative">
                  <div className="h-4 w-48 bg-slate-800/60 rounded animate-pulse mb-6"></div>
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded bg-slate-800/20">
                        <div className="h-4 w-32 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                        <div className="flex gap-4">
                          <div className="h-4 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }}></div>
                          <div className="h-4 w-12 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>

          </div>
        </div>
      </main>
    </div>
  )
}

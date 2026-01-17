'use client'

import { Header } from "../../../../components/ui/header"
import { Sidebar } from "../../../../components/ui/sidebar"
import { Card, CardContent } from '@/components/ui/card'

import { colors } from "@/config";

export function AnalysisSkeleton() {
  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden lg:min-h-0 sm:flex-row">
        <Sidebar />
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-y-hidden">
          <div className="flex-1 lg:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Tabs Skeleton */}
              <div className="flex gap-4 border-b pb-3" style={{ borderColor: "rgba(43, 48, 59, 0.5)" }}>
                <div className="h-5 w-16 bg-slate-800/60 rounded animate-pulse"></div>
                <div className="h-5 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '100ms' }}></div>
                <div className="h-5 w-16 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: '200ms' }}></div>
              </div>

              <div className="space-y-8">
                {/* KPIs Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card
                      key={i}
                      className="bg-slate-900 border-slate-800 relative overflow-hidden"
                      style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
                    >
                      <div className="absolute inset-0 shimmer-effect"></div>
                      <CardContent className="p-6 relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                            <div className="h-3 w-28 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }}></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="h-8 w-32 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                          <div className="h-3 w-24 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 150}ms` }}></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Chart Skeletons */}
                {[...Array(2)].map((_, i) => (
                  <Card
                    key={i}
                    className="bg-slate-900 border-slate-800 relative overflow-hidden"
                    style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
                  >
                    <div className="absolute inset-0 shimmer-effect"></div>
                    <CardContent className="p-6 relative">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 200}ms` }}></div>
                        <div className="h-4 w-48 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 200 + 50}ms` }}></div>
                      </div>
                      <div className="h-64 w-full bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 200 + 100}ms` }}></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

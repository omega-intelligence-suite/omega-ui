import { Card, CardContent } from "@/components/ui/card";
import { Header } from "../../../../components/ui/header";
import { Sidebar } from "../../../../components/ui/sidebar";

import { colors } from "@/config";

export function SettingsSkeleton() {
  return (
    <div className="min-h-screen md:h-screen bg-slate-950 flex flex-col md:overflow-hidden" style={{ backgroundColor: colors.background.main }}>
      <Header />
      <main className="flex-1 flex flex-col overflow-y-auto lg:overflow-hidden lg:min-h-0 sm:flex-row">
        <Sidebar />
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-y-auto lg:overflow-y-hidden">
          <div className="flex-1 lg:overflow-y-auto p-4 md:p-8 pb-20 md:pb-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* System Health Skeleton */}
              <section className="space-y-4">
                <div className="h-4 w-48 bg-slate-800/60 rounded animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                      <div className="absolute inset-0 shimmer-effect"></div>
                      <CardContent className="p-6 relative">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-slate-800/60 rounded animate-pulse"></div>
                            <div className="h-3 w-20 bg-slate-800/60 rounded animate-pulse"></div>
                          </div>
                          <div className="w-2 h-2 bg-slate-800/60 rounded-full animate-pulse"></div>
                        </div>
                        <div className="h-8 w-24 bg-slate-800/60 rounded animate-pulse mb-2"></div>
                        <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Tabs Skeleton */}
              <div className="flex gap-4 border-b pb-3" style={{ borderColor: "rgba(43, 48, 59, 0.5)" }}>
                <div className="h-5 w-24 bg-slate-800/60 rounded animate-pulse"></div>
                <div className="h-5 w-32 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: "100ms" }}></div>
              </div>

              {/* Asset Management Section */}
              <section className="space-y-4">
                <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                  <div className="absolute inset-0 shimmer-effect"></div>
                  <CardContent className="p-6 relative">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="h-4 w-32 bg-slate-800/60 rounded animate-pulse"></div>
                      <div className="h-9 w-36 bg-slate-800/60 rounded animate-pulse"></div>
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
                    {[...Array(5)].map((_, rowIndex) => (
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
              </section>

              {/* Monitoring Section */}
              <section className="space-y-4">
                <div className="h-6 w-56 bg-slate-800/60 rounded animate-pulse"></div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                      <div className="absolute inset-0 shimmer-effect"></div>
                      <CardContent className="p-6 relative">
                        <div className="space-y-2">
                          <div className="h-3 w-24 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                          <div className="h-8 w-32 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                          <div className="h-3 w-40 bg-slate-800/30 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 200}ms` }}></div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Source Distribution */}
                <Card className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                  <div className="absolute inset-0 shimmer-effect"></div>
                  <CardContent className="p-6 relative">
                    <div className="h-4 w-48 bg-slate-800/60 rounded animate-pulse mb-4"></div>

                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1 space-y-2">
                              <div className="h-4 w-48 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                              <div className="h-3 w-32 bg-slate-800/30 rounded animate-pulse" style={{ animationDelay: `${i * 150 + 50}ms` }}></div>
                            </div>
                            <div className="h-5 w-24 bg-slate-800/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 150 + 100}ms` }}></div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mt-3">
                            <div>
                              <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse mb-1" style={{ animationDelay: `${i * 150 + 150}ms` }}></div>
                              <div className="h-6 w-12 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 150 + 200}ms` }}></div>
                            </div>
                            <div>
                              <div className="h-3 w-16 bg-slate-800/40 rounded animate-pulse mb-1" style={{ animationDelay: `${i * 150 + 250}ms` }}></div>
                              <div className="h-6 w-12 bg-slate-800/60 rounded animate-pulse" style={{ animationDelay: `${i * 150 + 300}ms` }}></div>
                            </div>
                          </div>

                          <div className="mt-3 h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-slate-700/60 rounded-full animate-pulse" style={{ animationDelay: `${i * 150 + 350}ms` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Agents Skeleton */}
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-48 bg-slate-800/60 rounded animate-pulse mb-4"></div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                      <Card key={i} className="bg-slate-900 border-slate-800 relative overflow-hidden" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
                        <div className="absolute inset-0 shimmer-effect"></div>
                        <CardContent className="p-4 relative">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
                              <div className="h-4 w-24 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 50}ms` }}></div>
                            </div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-800/50 animate-pulse" style={{ animationDelay: `${i * 100 + 100}ms` }}></div>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="h-3 w-16 bg-slate-800/30 rounded animate-pulse mb-1" style={{ animationDelay: `${i * 100 + 150}ms` }}></div>
                              <div className="h-4 w-20 bg-slate-800/50 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 200}ms` }}></div>
                            </div>
                            <div>
                              <div className="h-3 w-12 bg-slate-800/30 rounded animate-pulse mb-1" style={{ animationDelay: `${i * 100 + 250}ms` }}></div>
                              <div className="h-3 w-28 bg-slate-800/40 rounded animate-pulse" style={{ animationDelay: `${i * 100 + 300}ms` }}></div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

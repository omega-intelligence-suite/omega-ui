"use client"

import { FC } from "react"
import Link from "next/link";
import { usePathname } from "next/navigation"

import { BiBitcoin } from "react-icons/bi";
import { MdOutlineCandlestickChart } from "react-icons/md";
import { GrOverview } from "react-icons/gr";
import { TbActivity, TbChartLine, TbSettings, TbBuildingBank } from "react-icons/tb";

import { colors } from "@/config";

export const Sidebar: FC = () => {
  const pathname = usePathname()

  const navItems = [
    { icon: GrOverview, href: "/app/overview", label: "Overview" },
    { icon: BiBitcoin, href: "/app/crypto", label: "Crypto" },
    { icon: MdOutlineCandlestickChart, href: "/app/stocks-etfs", label: "Stocks" },
    { icon: TbBuildingBank, href: "/app/bank", label: "Bank" },
    { icon: TbChartLine, href: "/app/analysis", label: "Analysis" },
  ]

  const bottomNavItems = [
    { icon: TbActivity, href: "/app/monitoring", label: "Monitoring" },
    { icon: TbSettings, href: "/app/settings", label: "Settings" },
  ]

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <div className="hidden md:flex w-16 min-w-16 flex-shrink-0 bg-slate-950 flex-col items-center py-6 space-y-6" style={{ backgroundColor: colors.background.main, paddingTop: "40px" }}>
        <div className="flex flex-col justify-between flex-1 mb-6">
          <div className="flex flex-col items-center space-y-6">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    transition-colors duration-200
                    ${isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                  title={item.label}
                >
                  <Icon size={20} />
                </Link>
              )
            })}
          </div>
          <div className="flex flex-col items-center space-y-6">
            {bottomNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    w-10 h-10 rounded-lg flex items-center justify-center
                    transition-colors duration-200 mb-2
                    ${isActive
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }
                  `}
                  title={item.label}
                >
                  <Icon size={20} />
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950 border-t border-slate-800 z-50" style={{ backgroundColor: colors.background.main }}>
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center flex-1 h-full
                  transition-colors duration-200
                  ${isActive
                    ? "text-white"
                    : "text-slate-400"
                  }
                `}
              >
                <Icon size={24} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            )
          })}
          {bottomNavItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center flex-1 h-full
                  transition-colors duration-200
                  ${isActive
                    ? "text-white"
                    : "text-slate-400"
                  }
                `}
              >
                <Icon size={24} />
                <span className="text-[10px] mt-1 font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

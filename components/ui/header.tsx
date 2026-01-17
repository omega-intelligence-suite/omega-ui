'use client'
import { FC, useState } from "react";
import { HiOutlineRefresh } from "react-icons/hi";

import { useRouter } from 'next/navigation'
import { createClient } from '@/app/utils/supabase/client'

export const Header: FC<{ totalPortfolioValue?: number, currency?: "€" | "$" }> = ({ totalPortfolioValue, currency = "$" }) => {
  const router = useRouter()
  const supabase = createClient()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    router.refresh()
    setTimeout(() => {
      setIsRefreshing(false)
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 1000)
    }, 1000)
  }

  return (
    <header className="border-b backdrop-blur flex-shrink-0 flex justify-center w-full sticky top-0 z-50" style={{backgroundColor: 'transparent'}}>
      <div className="w-full px-4 md:px-6 py-4 flex justify-between items-center">
        <div className="flex gap-1 flex-wrap items-center" style={{maxWidth: '30%'}}>
          <p className="font-mono text-xs text-slate-600">OMEGA</p>
          <p className="font-mono text-xs text-slate-200" style={{color: 'rgba(20, 235, 163, 0.8)'}}>INTELLIGENCE</p>
        </div>
        <div className="flex gap-2 items-center">
          { (totalPortfolioValue !== undefined && totalPortfolioValue !== null && totalPortfolioValue > -1) && (
            <p className="text-md md:text-xl text-slate-200 font-mono">{currency}{totalPortfolioValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          )}
          <HiOutlineRefresh
            className={`text-sm cursor-pointer transition-colors text-slate-400 hover:text-slate-200 ${isRefreshing ? 'animate-spin text-slate-400' : ''}`}
            style={{color: isSuccess ? 'rgba(20, 235, 163, 0.8)' : 'inherit'}}
            onClick={handleRefresh}
          />
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-mono text-xs text-slate-400 hover:text-red-500 hover:underline transition-colors cursor-pointer" onClick={handleSignOut}>SIGN OUT</p>
        </div>
      </div>
    </header>
  );
}
'use client'

import { AlertTriangle, X } from 'lucide-react'
import { useState } from 'react'

interface AlertBannerProps {
  show: boolean
  message: string
  minutesSinceLastSync: number
}

export function AlertBanner({ show, message, minutesSinceLastSync }: AlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (!show || dismissed) return null

  return (
    <div 
      className="w-full p-4 mb-6 rounded border flex items-center justify-between animate-pulse"
      style={{ 
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        borderColor: "rgba(239, 68, 68, 0.3)"
      }}
    >
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-mono text-red-400">{message}</p>
          <p className="text-xs font-mono text-red-400/70 mt-1">
            Last sync: {Math.floor(minutesSinceLastSync / 60)}h {Math.floor(minutesSinceLastSync % 60)}m ago
          </p>
        </div>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-red-400/70 hover:text-red-400 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

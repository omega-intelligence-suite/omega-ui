'use client'

import { ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Tab Headers - Fixed */}
      <div className="flex gap-4 border-b flex-shrink-0" style={{ borderColor: "rgba(43, 48, 59, 0.5)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`pb-3 px-1 font-mono text-sm transition-colors relative ${
              activeTab === tab.id
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-300'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5"
                style={{ backgroundColor: 'rgb(20, 235, 163)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pt-6">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`pb-8 ${activeTab === tab.id ? 'block' : 'hidden'}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}

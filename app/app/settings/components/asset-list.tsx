'use client'

import { useState, useOptimistic, useMemo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DollarSign, Wallet, ArrowUpDown } from 'lucide-react'
import { AssetDrawer } from './asset-drawer'
import { createClient } from '@/app/utils/supabase/client'

import type { UserAsset } from '@/types/models'

interface AssetListProps {
  assets: UserAsset[]
  onUpdate: () => void
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'CRYPTO':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'STOCKS_ETFS':
      return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    case 'BANK':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    default:
      return 'bg-slate-500/20 text-slate-400 border-slate-500/30'
  }
}

const getSyncStatus = (lastSync: string | null | undefined, type: 'price' | 'wallet'): { color: string; minutesAgo: number } => {
  if (!lastSync) return { color: 'rgb(100, 116, 139)', minutesAgo: 999999 } // slate-500
  
  const now = new Date()
  const syncDate = new Date(lastSync)
  const minutesAgo = (now.getTime() - syncDate.getTime()) / (1000 * 60)
  
  if (type === 'price') {
    // Price sync runs every 10 min
    if (minutesAgo < 15) return { color: 'rgb(20, 235, 163)', minutesAgo } // green
    if (minutesAgo < 30) return { color: 'rgb(251, 146, 60)', minutesAgo } // orange
    return { color: 'rgb(239, 68, 68)', minutesAgo } // red
  } else {
    // Wallet sync runs every 6 hours (360 min)
    if (minutesAgo < 60*7) return { color: 'rgb(20, 235, 163)', minutesAgo } // green - < 7h
    if (minutesAgo < 60*12) return { color: 'rgb(251, 146, 60)', minutesAgo } // orange - < 12h
    return { color: 'rgb(239, 68, 68)', minutesAgo } // red - >= 12h
  }
}

const formatSyncTime = (lastSync: string | null | undefined) => {
  if (!lastSync) return 'Never'
  
  const now = new Date()
  const syncDate = new Date(lastSync)
  const minutesAgo = (now.getTime() - syncDate.getTime()) / (1000 * 60)
  
  if (minutesAgo < 1) return 'Just now'
  if (minutesAgo < 60) return `${Math.floor(minutesAgo)}m ago`
  const hours = Math.floor(minutesAgo / 60)
  const minutes = Math.floor(minutesAgo % 60)
  return `${hours}h${minutes}m ago`
}

export function AssetList({ assets, onUpdate }: AssetListProps) {
  const [optimisticAssets, setOptimisticAssets] = useOptimistic(assets)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingAsset, setEditingAsset] = useState<UserAsset | null>(null)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [filterType, setFilterType] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<'name' | 'type'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const handleAdd = () => {
    setEditingAsset(null)
    setIsDrawerOpen(true)
  }

  const handleEdit = (asset: UserAsset) => {
    setEditingAsset(asset)
    setIsDrawerOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this asset?')) return

    setIsDeleting(id)
    const supabase = createClient()

    const { error } = await supabase
      .from('user_assets')
      .delete()
      .eq('id', id)

    setIsDeleting(null)

    if (!error) {
      onUpdate()
    } else {
      alert('Error deleting asset: ' + error.message)
    }
  }

  const handleSave = () => {
    setIsDrawerOpen(false)
    onUpdate()
  }

  const filteredAndSortedAssets = useMemo(() => {
    // Filter by type
    let filtered = filterType === 'ALL' 
      ? optimisticAssets 
      : optimisticAssets.filter(asset => asset.type === filterType)

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'name') {
        comparison = a.name?.localeCompare(b.name)
      } else if (sortBy === 'type') {
        comparison = a.type.localeCompare(b.type)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    return sorted
  }, [optimisticAssets, filterType, sortBy, sortOrder])

  const toggleSort = (field: 'name' | 'type') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(field)
      setSortOrder('asc')
    }
  }

  return (
    <>
      <Card className="bg-slate-900/50 border-white/10" style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-slate-400 font-mono">
              {filteredAndSortedAssets.length} of {assets.length} asset{assets.length !== 1 ? 's' : ''}
            </p>

            <p className="font-mono text-xs text-slate-400 hover:text-slate-200 hover:underline transition-colors cursor-pointer" onClick={handleAdd}>+ ADD ASSET</p>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {/* Filter by Type */}
            <div className="flex gap-2">
              <p className="text-xs font-mono text-slate-500 uppercase self-center">Filter:</p>
              {['ALL', 'CRYPTO', 'STOCKS_ETFS', 'BANK'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-3 py-1 rounded text-xs font-mono uppercase transition-all border ${
                    filterType === type
                      ? 'border-white/30 bg-transparent text-white'
                      : 'border-white/10 bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-300'
                  }`}
                >
                  {type === 'STOCKS_ETFS' ? 'STOCKS' : type}
                </button>
              ))}
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2 ml-auto">
              <p className="text-xs font-mono text-slate-500 uppercase self-center">Sort by:</p>
              <button
                onClick={() => toggleSort('name')}
                className={`px-3 py-1 rounded text-xs font-mono uppercase transition-all border flex items-center gap-1 ${
                  sortBy === 'name'
                    ? 'border-white/30 bg-transparent text-white'
                    : 'border-white/10 bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-300'
                }`}
              >
                NAME
                {sortBy === 'name' && (
                  <ArrowUpDown className="w-3 h-3" style={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} />
                )}
              </button>
              <button
                onClick={() => toggleSort('type')}
                className={`px-3 py-1 rounded text-xs font-mono uppercase transition-all border flex items-center gap-1 ${
                  sortBy === 'type'
                    ? 'border-white/30 bg-transparent text-white'
                    : 'border-white/10 bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-300'
                }`}
              >
                TYPE
                {sortBy === 'type' && (
                  <ArrowUpDown className="w-3 h-3" style={{ transform: sortOrder === 'desc' ? 'rotate(180deg)' : 'none' }} />
                )}
              </button>
            </div>
          </div>

          {filteredAndSortedAssets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 font-mono">NO ASSETS FOUND</p>
              <p className="text-slate-500 text-sm mt-2">
                {assets.length === 0 ? 'Click "+ ADD ASSET" to get started' : 'Try adjusting your filters'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-6 px-6">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>ASSET NAME</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>TICKER</th>
                    <th className="text-left py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>TYPE</th>
                    <th className="text-right py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>QUANTITY</th>
                    <th className="text-right py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>AVG PRICE</th>
                    <th className="text-right py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>TARGET</th>
                    <th className="text-center py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>SYNC STATUS</th>
                    <th className="text-right py-3 px-4 text-xs font-mono text-slate-400" style={{fontWeight: '400'}}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedAssets.map((asset) => {
                    const priceSync = getSyncStatus(asset.last_price_sync_at, 'price')
                    const walletSync = getSyncStatus(asset.last_wallet_sync_at, 'wallet')

                    return (
                      <tr
                        key={asset.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        style={{ opacity: isDeleting === asset.id ? 0.5 : 1 }}
                      >
                        <td className="py-3 px-4 text-white font-mono text-sm">{asset.name}</td>
                        <td className="py-3 px-4 text-slate-300 font-mono text-sm">{asset.symbol}</td>
                        <td className="py-3 px-4">
                          <div
                            style={{ borderRadius: "4px", padding: "2px 6px 1px 6px" }}
                            className={`border ${getTypeColor(asset.type)} w-fit`}
                          >
                            <p className='font-mono text-xs uppercase '>{asset.type}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right text-slate-300 font-mono">
                          {asset.balance.toLocaleString('en-US', { maximumFractionDigits: 6 })}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-300 font-mono">
                          ${asset.average_price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3 px-4 text-right text-slate-300 font-mono">
                          {asset.target_price_usd ? `$${asset.target_price_usd.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-3">
                            {/* Price Sync Heartbeat */}
                            <div className="relative group">
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center"
                                style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
                              >
                                <DollarSign 
                                  className="w-3.5 h-3.5"
                                  style={{ color: priceSync.color }}
                                />
                              </div>
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
                                style={{ backgroundColor: "rgba(12, 14, 18, 0.85)" }}>
                                <p className="text-xs font-mono text-slate-300">
                                  Price: {formatSyncTime(asset.last_price_sync_at)}
                                </p>
                              </div>
                            </div>
                            
                            {/* Wallet Sync Heartbeat */}
                            <div className="relative group">
                              <div 
                                className="w-6 h-6 rounded flex items-center justify-center"
                                style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
                              >
                                <Wallet 
                                  className="w-3.5 h-3.5"
                                  style={{ color: walletSync.color }}
                                />
                              </div>
                              {/* Tooltip */}
                              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10"
                                style={{ backgroundColor: "rgba(12, 14, 18, 0.85)" }}>
                                <p className="text-xs font-mono text-slate-300">
                                  Wallet: {formatSyncTime(asset.last_wallet_sync_at)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit(asset)}
                              className="text-slate-400 hover:text-white transition-colors text-xs font-mono uppercase"
                              disabled={isDeleting === asset.id}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(asset.id)}
                              className="text-slate-400 hover:text-red-400 transition-colors text-xs font-mono uppercase"
                              disabled={isDeleting === asset.id}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                  )})}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <AssetDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onSave={handleSave}
        asset={editingAsset}
      />
    </>
  )
}

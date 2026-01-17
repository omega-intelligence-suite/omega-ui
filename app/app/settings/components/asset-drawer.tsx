"use client"

import { useState, useEffect } from "react"

import { createClient } from "@/app/utils/supabase/client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { colors } from "@/config"

import type { UserAsset } from "@/types/models"

interface AssetDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
  asset: UserAsset | null
}

export function AssetDrawer({ isOpen, onClose, onSave, asset }: AssetDrawerProps) {
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    icon_url: "",
    type: "CRYPTO",
    balance: 0,
    average_price: 0,
    target_price_usd: 0,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const loadAssetData = async () => {
      if (asset) {
        const supabase = createClient()

        // Fetch target price from asset_targets table
        const { data: targetData } = await supabase
          .from("asset_targets")
          .select("target_price_usd")
          .eq("symbol", asset.symbol)
          .single()

        setFormData({
          name: asset.name,
          symbol: asset.symbol,
          icon_url: asset.icon_url,
          type: asset.type,
          balance: asset.balance,
          average_price: asset.average_price,
          target_price_usd: targetData?.target_price_usd || 0,
        })
      } else {
        setFormData({
          name: "",
          symbol: "",
          icon_url: "",
          type: "CRYPTO",
          balance: 0,
          average_price: 0,
          target_price_usd: 0,
        })
      }
    }

    if (isOpen) {
      loadAssetData()
    }
  }, [asset, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    const supabase = createClient()

    // Prepare user_asset data (without target_price_usd)
    const { target_price_usd, ...assetData } = formData

    try {
      if (asset) {
        // Update user_asset
        const { error: assetError } = await supabase
          .from("user_assets")
          .update(assetData)
          .eq("id", asset.id)

        if (assetError) {
          alert("Error updating asset: " + assetError.message)
          setIsSaving(false)
          return
        }

        // Update or insert asset_target
        if (target_price_usd && target_price_usd > 0) {
          // Check if target exists
          const { data: existingTarget } = await supabase
            .from("asset_targets")
            .select("id")
            .eq("symbol", formData.symbol)
            .single()

          if (existingTarget) {
            // Update existing target
            const { error: targetError } = await supabase
              .from("asset_targets")
              .update({ target_price_usd })
              .eq("symbol", formData.symbol)

            if (targetError) {
              alert("Error updating target: " + targetError.message)
              setIsSaving(false)
              return
            }
          } else {
            // Create new target
            const { error: targetError } = await supabase
              .from("asset_targets")
              .insert([{ symbol: formData.symbol, target_price_usd }])

            if (targetError) {
              alert("Error creating target: " + targetError.message)
              setIsSaving(false)
              return
            }
          }
        } else {
          // Remove target if price is 0 or empty
          await supabase
            .from("asset_targets")
            .delete()
            .eq("symbol", formData.symbol)
        }
      } else {
        // Insert new user_asset
        const { error: assetError } = await supabase
          .from("user_assets")
          .insert([assetData])

        if (assetError) {
          alert("Error creating asset: " + assetError.message)
          setIsSaving(false)
          return
        }

        // Create asset_target if provided
        if (target_price_usd && target_price_usd > 0) {
          const { error: targetError } = await supabase
            .from("asset_targets")
            .insert([{ symbol: formData.symbol, target_price_usd }])

          if (targetError) {
            alert("Error creating target: " + targetError.message)
            setIsSaving(false)
            return
          }
        }
      }

      setIsSaving(false)
      onSave()
    } catch (error) {
      alert("Unexpected error: " + error)
      setIsSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full md:w-[500px] bg-slate-950 border-l border-white/10 z-50 overflow-y-auto" style={{ backgroundColor: colors.background.main, marginTop: 0 }}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                ASSET NAME *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Bitcoin"
                required
                className="border-white/10 text-white font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                TICKER / SYMBOL *
              </label>
              <Input
                value={formData.symbol}
                onChange={(e) => setFormData({ ...formData, symbol: e.target.value.toUpperCase() })}
                placeholder="BTC"
                required
                className="border-white/10 text-white font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                TYPE *
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full h-10 rounded-md border border-white/10 bg-slate-900 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                style={{ backgroundColor: "transparent" }}
                required
              >
                <option value="CRYPTO">CRYPTO</option>
                <option value="STOCKS_ETFS">STOCKS_ETFS</option>
                <option value="BANK">BANK</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                Icon URL
              </label>
              <Input
                type="url"
                value={formData.icon_url}
                onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                placeholder="https://example.com/icon.png"
                className="border-white/10 text-white font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                QUANTITY *
              </label>
              <Input
                type="number"
                step="any"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                required
                className="border-white/10 text-white font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                AVERAGE PRICE (USD) *
              </label>
              <Input
                type="number"
                step="any"
                value={formData.average_price}
                onChange={(e) => setFormData({ ...formData, average_price: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                required
                className="border-white/10 text-white font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-slate-400 mb-2">
                TARGET PRICE (USD)
              </label>
              <Input
                type="number"
                step="any"
                value={formData.target_price_usd}
                onChange={(e) => setFormData({ ...formData, target_price_usd: parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
                className="border-white/10 text-white font-mono"
                style={{ backgroundColor: "transparent" }}
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="flex-1 bg-transparent font-mono border-white/10 text-white hover:bg-white/5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSaving}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white font-mono border border-white/10"
              >
                {isSaving ? "Saving..." : asset ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

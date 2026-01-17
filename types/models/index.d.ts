export interface AssetTarget {
  id: string
  symbol: string
  target_price_usd: number
};

export interface DailyFlash {
  id: string
  brief: string
  global_mood: "BULLISH" | "BEARISH" | "NEUTRAL"
  created_at: string
}

export interface MarketAnalysis {
  id: string
  brief: string
  sentiment: string
  created_at: string
}

export interface NewsSignal {
  id: string
  title: string
  url: string
  impact_score: number
  sentiment: string
  summary_short: string
  impact_justification: string
  published_at: string
}

export interface WalletBrief {
  id: string
  summary: string
  risk_score: string
  narrative_score: string
  velocity_score: string
  btc_accumulation_index: string
  created_at: string
}

export interface UserAsset {
  id: string
  name: string
  symbol: string
  type: 'CRYPTO' | 'STOCKS_ETFS'
  pillar: number
  balance: number
  average_price: number
  current_price: number
  change_24h: number
  icon_url: string
  target_price_usd?: number | null
  udpated_at: string
  last_price_sync_at?: string | null
  last_wallet_sync_at?: string | null
}

export interface PortfolioSnapshot {
  id: string
  total_value_eur: number
  total_invested_eur: number
  btc_price_usd: number
  daily_pnl_eur: number
  usd_eur_rate: number
  created_at: string
}

export interface PortfolioAssetSnapshot {
  id: string
  snapshot_id: string
  symbol: string
  name: string
  balance: number
  value_eur: number
  value_usd: number
  asset_type: string
  created_at: string
}
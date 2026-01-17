export interface UserAssetViewModel {
  id: string
  symbol: string
  name: string
  icon_url: string
  balance: number
  average_price: number
  current_price: number
  usdBalance: number
  change_24h: number
  type: string
  pillar?: 1 | 2 | 3  // Pilier d'investissement: 1 = ETF, 2 = Stocks, 3 = Pépites (Crypto)
};

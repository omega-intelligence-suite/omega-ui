'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent } from './card'
import { LucideIcon } from 'lucide-react'

interface LineConfig {
  dataKey: string
  stroke: string
  name?: string
  strokeWidth?: number
}

interface PortfolioLineChartProps {
  title: string
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  data: any[]
  lines: LineConfig[]
  xAxisKey: string
  yAxisFormatter?: (value: number) => string
  tooltipFormatter?: (value: number, name: string) => string
  height?: number
  showLegend?: boolean
  headerContent?: React.ReactNode
  customTooltip?: React.ComponentType<any>
}

export function PortfolioLineChart({
  title,
  subtitle,
  icon: Icon,
  iconColor = 'rgb(20, 235, 163)',
  data,
  lines,
  xAxisKey,
  yAxisFormatter,
  tooltipFormatter,
  height = 300,
  showLegend = false,
  headerContent,
  customTooltip: CustomTooltip
}: PortfolioLineChartProps) {
  // Calculate Y-axis domain: start at 10% below the minimum value
  const calculateYDomain = (): [number, number] => {
    if (data.length === 0) return [0, 100]
    
    const allValues: number[] = []
    lines.forEach(line => {
      data.forEach(item => {
        const value = item[line.dataKey]
        if (typeof value === 'number' && !isNaN(value)) {
          allValues.push(value)
        }
      })
    })

    if (allValues.length === 0) return [0, 100]

    const minValue = Math.min(...allValues)
    const maxValue = Math.max(...allValues)
    
    // Start at 10% below minimum, unless minimum is 0 or negative
    const yMin = minValue > 0 ? minValue * 0.9 : minValue * 1.1
    const yMax = maxValue > 0 ? maxValue * 1.05 : maxValue * 0.95
    
    return [yMin, yMax]
  }

  const DefaultTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="px-3 py-2 rounded border"
          style={{
            backgroundColor: "rgba(12, 14, 18, 0.85)",
            borderColor: "rgba(43, 48, 59, 0.5)"
          }}
        >
          <p className="text-xs font-mono text-slate-300 mb-1">{payload[0].payload[xAxisKey]}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs font-mono" style={{ color: entry.color }}>
              {entry.name || entry.dataKey}: {tooltipFormatter ? tooltipFormatter(entry.value, entry.name) : entry.value}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const TooltipComponent = CustomTooltip || DefaultTooltip

  return (
    <Card
      className="bg-slate-900/50 border-white/10 relative overflow-hidden hover:border-white/20 transition-all"
      style={{ backgroundColor: "hsl(220 20% 16% / 0.3)", borderColor: "rgba(43, 48, 59, 0.5)" }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center"
              style={{ backgroundColor: "rgba(43, 48, 59, 0.5)" }}
            >
              <Icon className="w-4 h-4" style={{ color: iconColor }} />
            </div>
            <div>
              <h3 className="text-sm font-mono text-slate-300 uppercase">{title}</h3>
              {subtitle && <p className="text-xs font-mono text-slate-500">{subtitle}</p>}
            </div>
          </div>

          {headerContent}
        </div>

        {data.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm font-mono text-slate-500">No data available</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.2)" />
              <XAxis
                dataKey={xAxisKey}
                stroke="rgb(148, 163, 184)"
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
              />
              <YAxis
                stroke="rgb(148, 163, 184)"
                style={{ fontSize: '12px', fontFamily: 'monospace' }}
                tickFormatter={yAxisFormatter}
                domain={calculateYDomain()}
              />
              <Tooltip content={<TooltipComponent />} />
              {showLegend && <Legend />}
              {lines.map((lineConfig, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={lineConfig.dataKey}
                  stroke={lineConfig.stroke}
                  strokeWidth={lineConfig.strokeWidth || 2}
                  name={lineConfig.name}
                  dot={{ fill: lineConfig.stroke, r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

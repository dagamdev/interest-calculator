import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, PiggyBank, ArrowUpRight, Shield } from "lucide-react"

interface SummaryCardsProps {
  initialCapital: number
  finalCapital: number
  totalProfit: number
  totalWithdrawn: number
  reinvestmentPercentage: number
  decimalPlaces: number // Changed from boolean to number
}

export function SummaryCards({
  initialCapital,
  finalCapital,
  totalProfit,
  totalWithdrawn,
  reinvestmentPercentage,
  decimalPlaces,
}: SummaryCardsProps) {
  const percentageGain = initialCapital > 0 ? ((finalCapital - initialCapital) / initialCapital) * 100 : 0

  const totalReinvested = totalProfit - totalWithdrawn

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("es-MX", {
      minimumFractionDigits: decimalPlaces === 0 ? 0 : Math.min(2, decimalPlaces),
      maximumFractionDigits: decimalPlaces,
    }).format(value)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
      {/* Capital final */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Capital final</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{formatNumber(finalCapital)}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">+{percentageGain.toFixed(2)}%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Inicial + Reinvertido + Asegurado</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/10">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ganancia total */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Ganancia total</p>
              <p className="text-2xl md:text-3xl font-bold text-accent">{formatNumber(totalProfit)}</p>
              <p className="text-sm text-muted-foreground mt-2">Acumulada en todas las operaciones</p>
            </div>
            <div className="p-3 rounded-lg bg-accent/10">
              <PiggyBank className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total reinvertido */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total reinvertido</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{formatNumber(totalReinvested)}</p>
              <p className="text-sm text-muted-foreground mt-2">{reinvestmentPercentage}% de las ganancias</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary">
              <TrendingUp className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total asegurado</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">{formatNumber(totalWithdrawn)}</p>
              <p className="text-sm text-muted-foreground mt-2">{100 - reinvestmentPercentage}% de las ganancias</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary">
              <Shield className="h-6 w-6 text-muted-foreground" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
